import {
     ApiV1OrgPracticesCreatePracticesResponse201,
     ApiV1OrgProviderPracticeAssociationsCreatePracticesResponse201,
     ApiV1OrgProvidersListProvidersMetadataParam,
} from '@api/medallion-api/types'
import medallionApi from '@api/medallion-api'
import { difference, filter, includes, map, uniqBy } from 'lodash'
import { FetchResponse } from 'api/dist/core'
import { CLIENT_RENEG_LIMIT } from 'tls'

export async function createNonExistentPractices(
     state: string,
     practiceNames: string[]
) {
     const practicePromises: Promise<
          FetchResponse<201, ApiV1OrgPracticesCreatePracticesResponse201>
     >[] = []
     const res = await medallionApi.api_v1_org_practices_list_practices({
          address_state: [
               state,
          ] as ApiV1OrgProvidersListProvidersMetadataParam['license_state'],
     })
     const practices = res.data.results
     const filteredPractices = difference(
          practiceNames,
          (practices || []).map((pract) => pract.name)
     )
     // Add non existent Practices
     for (const name of filteredPractices) {
          const res = medallionApi.api_v1_org_practices_create_practices({
               name,
               address_state: state,
          })
          practicePromises.push(res)
     }
     await Promise.all(practicePromises)
}

export async function createNonExistentPracticesInProvider(
     providerId: string,
     state: string,
     practiceNames: string[]
) {
     const createProviderPracticePromise: Promise<
          FetchResponse<
               201,
               ApiV1OrgProviderPracticeAssociationsCreatePracticesResponse201
          >
     >[] = []
     //check for existing practices in provider
     const existingInProvider =
          await medallionApi.api_v1_org_provider_practice_associations_list_practices(
               {
                    state,
                    provider: providerId,
               }
          )
     const existingPracticeNames = map(
          existingInProvider.data.results,
          (exist) => exist.practice.name
     )
     //all practices in state
     const allPracticesInState =
          await medallionApi.api_v1_org_practices_list_practices({
               address_state: [
                    state,
               ] as ApiV1OrgProvidersListProvidersMetadataParam['license_state'],
          })
     const filteredAllPracticesInState = filter(
          allPracticesInState.data.results,
          (practice) => includes(practiceNames, practice.name)
     )
     const nonExistingPracticesInProvider = filter(
          filteredAllPracticesInState,
          (practice) => !includes(existingPracticeNames, practice.name)
     )
     for (const nonExistent of uniqBy(nonExistingPracticesInProvider, 'name')) {
          const res =
               medallionApi.api_v1_org_provider_practice_associations_create_practices(
                    {
                         provider: providerId,
                         practice: nonExistent.id,
                    }
               )
          createProviderPracticePromise.push(res)
     }
     await Promise.all(createProviderPracticePromise)
}
