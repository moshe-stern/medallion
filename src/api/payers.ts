import medallionApi from '@api/medallion-api'
import type { FetchResponse } from 'api/dist/core'
import {
     ApiV1OrgProvidersListProvidersMetadataParam,
     PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsResponse200,
} from '@api/medallion-api/types'

export async function getPayers(
     state: ApiV1OrgProvidersListProvidersMetadataParam['license_state']
) {
     const res = await medallionApi.api_v1_org_providers_list_providers({
          license_state: state,
     })
     if (!res.data.results) return
     //TODO: filter by region
     const promises: Promise<
          FetchResponse<
               200,
               PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsResponse200
          >
     >[] = res.data.results.map((provider) =>
          medallionApi.p_api_v1_service_requests_payer_enrollments_list_payerEnrollmentServiceRequests(
               { provider: provider.id }
          )
     )
     const results = await (
          await Promise.all(promises)
     ).map((res) => res.data.results)
     const unmappedPractices = results.flatMap((result) =>
          (result || []).flatMap((res) =>
               (res.practices || []).map((practice) => ({
                    name: res.payer_name,
                    payerPracticeAddress: practice.name,
                    id: practice.id,
               }))
          )
     )
     return unmappedPractices
}

function getPayerObjArr(
     res: FetchResponse<
          200,
          PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsResponse200
     >,
     created: string
) {
     return res.data.results?.map((payer) => ({
          id: payer.id,
          name: payer.payer_name,
          payerPracticeAddresses: payer.practices?.map((pract) => pract.name),
          providerCreationDate: created,
     }))
}
