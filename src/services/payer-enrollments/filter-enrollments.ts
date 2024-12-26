import { ApiV1OrgProvidersListProvidersResponse200 } from '@api/medallion-api/types'
import { filter } from 'lodash'
import { Enrollment } from '../../types'
import medallionApi from '@api/medallion-api'
import { FetchResponse } from 'api/dist/core'

export async function filterEnrollments(
     providers: FetchResponse<
          200,
          ApiV1OrgProvidersListProvidersResponse200
     >['data']['results'],
     enrollments: Enrollment[],
     state: string
) {
     const existingEnrollmentsResponses = await Promise.all(
          (providers || []).map(async (provider) => {
               const res =
                    await medallionApi.p_api_v1_service_requests_payer_enrollments_list_payerEnrollmentServiceRequests(
                         {
                              provider: provider.id,
                         }
                    )
               return res.data.results
          })
     )
     const resolvedEnrollments = existingEnrollmentsResponses
          .flat()
          .filter((e) => e?.state === state)
          .map((exist) => ({
               payerName: exist?.payer_name,
               practiceNames: exist?.practices?.map((pract) => pract.name),
               entity: exist?.par_group,
          }))
     const filtered = filter(
          enrollments,
          (enrollment) =>
               !resolvedEnrollments.find(
                    (e) => e.payerName === enrollment.payerName
               )
     )
     return filtered
}
