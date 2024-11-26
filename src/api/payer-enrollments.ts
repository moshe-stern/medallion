import medallionApi from '@api/medallion-api'
import {
     ApiV1OrgPracticesCreatePracticesResponse201,
     ApiV1OrgProvidersListProvidersMetadataParam,
     ApiV1OrgProvidersListProvidersResponse200,
     PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsBodyParam,
     PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsResponse201,
} from '@api/medallion-api/types'
import { FetchResponse } from 'api/dist/core'
import { difference, map } from 'lodash'

export interface Enrollment {
     payerName: string
     practiceNames: string[]
}

export async function createEnrollments(
     enrollments: Enrollment[],
     state: ApiV1OrgProvidersListProvidersMetadataParam['license_state']
) {
     const providers = await medallionApi.api_v1_org_providers_list_providers({
          license_state: state,
     })
     if (!providers.data.results || !state?.length) return
     const enrollmentPromises: Promise<boolean>[] = []
     for (const enrollment of enrollments) {
          enrollmentPromises.push(
               createEnrollment(enrollment, state, providers.data.results)
          )
     }
     const resolved = await Promise.all(enrollmentPromises)
     return resolved.every(Boolean)
}

async function createEnrollment(
     enrollment: Enrollment,
     state: ApiV1OrgProvidersListProvidersMetadataParam['license_state'],
     providers: FetchResponse<
          200,
          ApiV1OrgProvidersListProvidersResponse200
     >['data']['results']
): Promise<boolean> {
     const { practiceNames, payerName } = enrollment
     const practicePromises: Promise<
          FetchResponse<201, ApiV1OrgPracticesCreatePracticesResponse201>
     >[] = []
     const promises: Promise<
          FetchResponse<
               201,
               PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsResponse201
          >
     >[] = []
     for (const provider of providers!) {
          promises.push(enrollmentAndPracticePromise(provider.id))
     }
     const resolved = await Promise.all(promises)
     return resolved.every((res) => res.res.ok)

     async function enrollmentAndPracticePromise(providerId: string) {
          const res = await medallionApi.api_v1_org_practices_list_practices({
               provider: providerId,
          })
          const practices = res.data.results
          const filteredPractices = difference(
               practiceNames,
               map(practices, 'name')
          )
          for (const name of filteredPractices) {
               const res = medallionApi.api_v1_org_practices_create_practices({
                    name,
               })
               practicePromises.push(res)
          }
          const addedPractices = await Promise.all(practicePromises)
          const combinedPractices = [
               ...addedPractices.map((added) => added.data),
               ...(practices || []),
          ]
          const res2 =
               medallionApi.p_api_v1_service_requests_payer_enrollments_create_payerEnrollmentServiceRequests(
                    {
                         payer_name: payerName,
                         practices: combinedPractices,
                         provider: providerId,
                         is_medallion_owned: true,
                         resourcetype:
                              'NewProviderPayerEnrollmentServiceRequest',
                         state: state![0] as PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsBodyParam['state'],
                    }
               )
          return res2
     }
}
