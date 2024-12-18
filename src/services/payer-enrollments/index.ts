import medallionApi from '@api/medallion-api'
import {
     ApiV1OrgProvidersListProvidersMetadataParam,
     ApiV1OrgProvidersListProvidersResponse200,
} from '@api/medallion-api/types'
import { FetchResponse } from 'api/dist/core'
import { flatMap } from 'lodash'
import {
     createNonExistentPractices,
     createNonExistentPracticesInProvider,
} from '../practice'
import { Enrollment } from '../../types'
import { getCoveredProviders } from '../provider'
import { filterEnrollments } from './filter-enrollments'
import { enrollmentAndPracticePromise } from './enrollment-practice-promise'

export async function createEnrollments(
     enrollments: Enrollment[],
     state: string
) {
     await createNonExistentPractices(
          state,
          flatMap(enrollments.map((enroll) => enroll.practiceNames))
     )
     if (!state?.length) throw new Error('No State Provided')
     const providers = await medallionApi.api_v1_org_providers_list_providers({
          license_state: [
               state,
          ] as ApiV1OrgProvidersListProvidersMetadataParam['license_state'],
     })
     if (!providers.data.results?.length)
          throw new Error('Providers not found in State')

     const nonExistentEnrollments = await filterEnrollments(
          providers,
          enrollments
     )
     const enrollmentPromises = nonExistentEnrollments.map((enrollment) =>
          createEnrollment(enrollment, state, providers.data.results)
     )
     if (!enrollmentPromises.length) throw new Error('No Enrollments to Create')
     const resolved = await Promise.all(enrollmentPromises)
     return resolved.every(Boolean)
}

async function createEnrollment(
     enrollment: Enrollment,
     state: string,
     providers: FetchResponse<
          200,
          ApiV1OrgProvidersListProvidersResponse200
     >['data']['results']
): Promise<boolean> {
     const coveredProviders =
          (await getCoveredProviders(enrollment, providers)) || []
     const createPracticesPromisesInProviders = coveredProviders.map(
          (provider) =>
               createNonExistentPracticesInProvider(
                    provider.id,
                    state,
                    enrollment.practiceNames
               )
     )
     const enrollmentPromises = coveredProviders.map((provider) =>
          enrollmentAndPracticePromise(provider.id, enrollment, state)
     )
     await Promise.all(createPracticesPromisesInProviders)
     const resolved = await Promise.all(enrollmentPromises)
     return resolved.every((res) => res.res.ok)
}

export * from './enrollment-practice-promise'
export * from './filter-enrollments'
