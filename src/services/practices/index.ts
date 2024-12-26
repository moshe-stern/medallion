import { ApiV1OrgProvidersListProvidersResponse200 } from '@api/medallion-api/types'
import { Enrollment } from '../../types'
import { getCoveredProviders } from '../providers'
import {
     createNonExistentPractices,
     createNonExistentPracticesInProvider,
} from './create-practices'
import { FetchResponse } from 'api/dist/core'

export async function handlePracticeAndProviderMapCreationForEnrollments(
     enrollments: Enrollment[],
     state: string,
     providers: FetchResponse<
          200,
          ApiV1OrgProvidersListProvidersResponse200
     >['data']['results']
) {
     const providerMap = new Map<Enrollment, string[]>()
     const uniquePracticeNames = Array.from(
          new Set(enrollments.flatMap((enroll) => enroll.practiceNames))
     )
     await createNonExistentPractices(state, uniquePracticeNames)
     await Promise.all(
          enrollments.map(async (e) => {
               const provider = await getCoveredProviders(e, providers)
               providerMap.set(
                    e,
                    (provider || []).map((p) => p.id)
               )
          })
     )
     const providerIds = Array.from(new Set([...providerMap.values()].flat()))
     await Promise.all(
          providerIds.map((p) =>
               createNonExistentPracticesInProvider(
                    p,
                    state,
                    uniquePracticeNames
               )
          )
     )
     return providerMap
}

export * from './create-practices'
