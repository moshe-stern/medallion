import { ApiV1OrgProvidersListProvidersResponse200 } from '@api/medallion-api/types'
import { filter } from 'lodash'
import { Enrollment } from '../../types'
import medallionApi from '@api/medallion-api'
import { FetchResponse } from 'api/dist/core'

async function getExistingEnrollments(
     providers: FetchResponse<
          200,
          ApiV1OrgProvidersListProvidersResponse200
     >['data']['results'],
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
     return existingEnrollmentsResponses
          .flat()
          .filter((e) => e?.state === state)
          .map((exist) => ({
               id: exist?.id,
               payerName: exist?.payer_name,
               practiceNames: exist?.practices?.map((pract) => pract.name),
               entity: exist?.par_group,
          }))
}


export {
     getExistingEnrollments
}