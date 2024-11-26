import medallionApi from '@api/medallion-api'
import {
     ApiV1OrgPracticesCreatePracticesResponse201,
     ApiV1OrgProvidersListProvidersMetadataParam,
     ApiV1OrgProvidersListProvidersResponse200,
     PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsBodyParam,
     PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsResponse201,
     PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsResponse200,
} from '@api/medallion-api/types'
import { FetchResponse } from 'api/dist/core'
import { difference, flatMap, map, some } from 'lodash'

export interface Enrollment {
     payerName: string
     practiceNames: string[]
}

export async function createEnrollments(
     enrollments: Enrollment[],
     state: ApiV1OrgProvidersListProvidersMetadataParam['license_state']
) {
     if (!state?.length) throw new Error('No State Provided')
     const providers = await medallionApi.api_v1_org_providers_list_providers({
          license_state: state,
     })
     if (!providers.data.results?.length)
          throw new Error('Providers not found in State')
     const existingEnrollmentsPromises: Promise<
          FetchResponse<
               200,
               PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsResponse200
          >
     >[] = []
     for (const provider of providers.data.results) {
          const existingEnrollmentsRes =
               medallionApi.p_api_v1_service_requests_payer_enrollments_list_payerEnrollmentServiceRequests(
                    {
                         provider: provider.id,
                    }
               )
          existingEnrollmentsPromises.push(existingEnrollmentsRes)
     }
     const resolvedExistingEnrollments = flatMap(
          (await Promise.all(existingEnrollmentsPromises)).map(
               (exist) => exist.data.results
          )
     )
     const enrollmentPromises: Promise<boolean>[] = []
     const nonExistentEnrollments = difference(
          enrollments,
          resolvedExistingEnrollments.map((exist) => ({
               payerName: exist?.payer_name,
               practiceNames: exist?.practices?.map((pract) => pract.name),
          }))
     ) as Enrollment[]
     for (const enrollment of nonExistentEnrollments) {
          enrollmentPromises.push(
               createEnrollment(enrollment, state, providers.data.results)
          )
     }
     if (!enrollmentPromises.length) throw new Error('No Enrollments to Create')
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
