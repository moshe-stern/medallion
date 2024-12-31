import medallionApi from '@api/medallion-api'
import { ApiV1OrgProvidersListProvidersMetadataParam } from '@api/medallion-api/types'
import { Enrollment } from '../../types'
import { getExistingEnrollments } from './enrollment-helpers'
import { enrollmentAndPracticePromise } from './enrollment-practice-promise'
import { getGroupProfileIdByName } from '../group-profiles'
import { handlePracticeAndProviderMapCreationForEnrollments } from '../practices'
import { getLinesOfBusiness } from '../lines-of-business'

async function createEnrollments(enrollments: Enrollment[], state: string) {
     if (!state?.length) throw new Error('No State Provided')
     const res = await medallionApi.api_v1_org_providers_list_providers({
          license_state: [
               state,
          ] as ApiV1OrgProvidersListProvidersMetadataParam['license_state'],
     })
     const providers = res.data.results
     if (!providers?.length) throw new Error('Providers not found in State')
     const existingEnrollments = await getExistingEnrollments(providers, state)
     const businesses = await getLinesOfBusiness()
     enrollments = await Promise.all(
          enrollments.map(async (e) => ({
               ...e,
               id: existingEnrollments.find(
                    (existing) => e.payerName === existing.payerName
               )?.id,
               entity: await getGroupProfileIdByName(e.entity),
               linesOfBusiness: businesses.filter((b) =>
                    (e.linesOfBusiness as string[]).includes(b.label)
               ),
          }))
     )
     const providerMap =
          await handlePracticeAndProviderMapCreationForEnrollments(
               enrollments,
               state,
               providers
          )
     const enrollmentPromises = await Promise.all(
          enrollments.map(async (enrollment) => ({
               ...enrollment,
               updated: await createEnrollment(
                    enrollment,
                    state,
                    providerMap.get(enrollment) || []
               ),
          }))
     )
     const resolved = await Promise.all(enrollmentPromises)
     return resolved
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
