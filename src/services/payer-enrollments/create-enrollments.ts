import medallionApi from '@api/medallion-api'
import { ApiV1OrgProvidersListProvidersMetadataParam } from '@api/medallion-api/types'
import { Enrollment } from '../../types'
import { filterEnrollments } from './filter-enrollments'
import { enrollmentAndPracticePromise } from './enrollment-practice-promise'
import { getGroupProfileIdByName } from '../group-profiles'
import { handlePracticeAndProviderMapCreationForEnrollments } from '../practices'

async function createEnrollments(enrollments: Enrollment[], state: string) {
     if (!state?.length) throw new Error('No State Provided')
     const res = await medallionApi.api_v1_org_providers_list_providers({
          license_state: [
               state,
          ] as ApiV1OrgProvidersListProvidersMetadataParam['license_state'],
     })
     const providers = res.data.results
     if (!providers?.length) throw new Error('Providers not found in State')
     let nonExistentEnrollments = await filterEnrollments(
          providers,
          enrollments,
          state
     )
     nonExistentEnrollments = await Promise.all(
          nonExistentEnrollments.map(async (e) => ({
               ...e,
               entity: await getGroupProfileIdByName(e.entity),
          }))
     )
     const providerMap =
          await handlePracticeAndProviderMapCreationForEnrollments(
               nonExistentEnrollments,
               state,
               providers
          )
     const enrollmentPromises = await Promise.all(
          nonExistentEnrollments.map((enrollment) =>
               createEnrollment(
                    enrollment,
                    state,
                    providerMap.get(enrollment) || []
               )
          )
     )
     if (!enrollmentPromises.length) throw new Error('No Enrollments to Create')
     const resolved = await Promise.all(enrollmentPromises)
     return resolved.every(Boolean)
}

async function createEnrollment(
     enrollment: Enrollment,
     state: string,
     providers: string[]
): Promise<boolean> {
     const enrollmentPromises = providers.map((provider) =>
          enrollmentAndPracticePromise(provider, enrollment, state)
     )
     const resolved = await Promise.all(enrollmentPromises)
     if (!resolved.length) return false
     return resolved.every((res) => (res ? res.res.ok : false))
}

export { createEnrollments }
