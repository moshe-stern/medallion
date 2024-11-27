import medallionApi from '@api/medallion-api'
import { ApiV1OrgProvidersListProvidersMetadataParam } from '@api/medallion-api/types'

export async function getPayers(
     state: ApiV1OrgProvidersListProvidersMetadataParam['license_state']
) {
     const res = await medallionApi.api_v1_org_providers_list_providers({
          license_state: state,
     })
     if (!res.data.results) return
     //TODO: filter by region
     const promises = res.data.results.map((provider) =>
          medallionApi.p_api_v1_service_requests_payer_enrollments_list_payerEnrollmentServiceRequests(
               { provider: provider.id }
          )
     )
     const results = (await Promise.all(promises)).map(
          (res) => res.data.results
     )
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
