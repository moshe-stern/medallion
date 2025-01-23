import { ApiV1OrgProvidersListProvidersResponse200 } from '@api/medallion-api/types'
import medallionApi from '@api/medallion-api'
import { FetchResponse } from 'api/dist/core'

async function getExistingEnrollments(
     providers: FetchResponse<
          200,
          ApiV1OrgProvidersListProvidersResponse200
     >['data']['results'],
     state: string
) {
     return (
          await Promise.all(
               (providers || []).map((p) =>
                    medallionApi
                         .p_api_v1_service_requests_payer_enrollments_list_payerEnrollmentServiceRequests(
                              {
                                   provider: p.id,
                              }
                         )
                         .then((res) => res.data.results)
               )
          )
     )
          .flat()
          .filter((e) => e?.state === state)
          .map((exist) => ({
               id: exist?.id,
               payerName: exist?.payer_name,
               practiceNames: exist?.practices?.map((pract) => pract.name),
               entity: exist?.par_group,
          }))
}

export { getExistingEnrollments }
