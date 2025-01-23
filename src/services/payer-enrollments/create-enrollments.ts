import medallionApi from '@api/medallion-api'
import { ApiV1OrgProvidersListProvidersMetadataParam } from '@api/medallion-api/types'
import { Enrollment } from '../../types'
import { getExistingEnrollments } from './enrollment-helpers'
import { enrollmentAndPracticePromise } from './enrollment-practice-promise'
import { getGroupProfileIdByName } from '../group-profiles'
import { createNonExistentPracticesInProvidersForEnrollments } from '../practices'
import { getLinesOfBusiness } from '../lines-of-business'

async function createEnrollments(enrollments: Enrollment[], state: string) {
     const res = await medallionApi.api_v1_org_providers_list_providers({
          license_state: [
               state,
          ] as ApiV1OrgProvidersListProvidersMetadataParam['license_state'],
     })
     const providers = res.data.results
     if (!providers?.length) throw new Error('Providers not found in State')
     const existingEnrollments = await getExistingEnrollments(providers, state)
     const businesses = await getLinesOfBusiness()
     const enrollmentData = async (e: Enrollment) => {
          return {
               ...e,
               id: existingEnrollments.find(
                    (existing) => e.payerName === existing.payerName
               )?.id,
               entity: await getGroupProfileIdByName(e.entity),
               linesOfBusiness: businesses.filter((b) =>
                    (e.linesOfBusiness as string[]).includes(b.label)
               ),
          }
     }
     enrollments = await Promise.all(enrollments.map(enrollmentData))
     const providerMap =
          await createNonExistentPracticesInProvidersForEnrollments(
               enrollments,
               state,
               providers
          )
     return await Promise.all(
          enrollments.map((enrollment) => ({
               ...enrollment,
               updated: createEnrollment(
                    enrollment,
                    state,
                    providerMap.get(enrollment) || []
               ),
          }))
     )
}

async function createEnrollment(
     enrollment: Enrollment,
     state: string,
     providers: string[]
): Promise<boolean> {
     const resolved = await Promise.all(
          providers.map((provider) =>
               enrollmentAndPracticePromise(provider, enrollment, state)
          )
     )
     if (!resolved.length) return false
     return resolved.every((res) => (res ? res.res.ok : false))
}

export { createEnrollments }
