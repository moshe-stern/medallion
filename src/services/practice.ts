import { ApiV1OrgProvidersListProvidersMetadataParam } from '@api/medallion-api/types'
import medallionApi from '@api/medallion-api'
import { difference, filter, includes, map, uniqBy } from 'lodash'

export async function createNonExistentPractices(
     state: string,
     practiceNames: string[]
) {
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
     const practicePromises = filteredPractices.map((pract) =>
          medallionApi.api_v1_org_practices_create_practices({
               name: pract,
               address_state: state,
          })
     )
     await Promise.all(practicePromises)
}

export async function createNonExistentPracticesInProvider(
     providerId: string,
     state: string,
     practiceNames: string[]
) {
     //add unique and non existent Practices to Provider
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
     const createProviderPracticePromise = uniqBy(
          nonExistingPracticesInProvider,
          'name'
     ).map((nonExistent) =>
          medallionApi.api_v1_org_provider_practice_associations_create_practices(
               {
                    provider: providerId,
                    practice: nonExistent.id,
               }
          )
     )
     await Promise.all(createProviderPracticePromise)
}
