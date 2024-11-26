import medallionApi from '@api/medallion-api'
import {
     ApiV1OrgPracticesCreatePracticesResponse201,
     ApiV1OrgProviderPracticeAssociationsCreatePracticesResponse201,
     ApiV1OrgProvidersListProvidersMetadataParam,
     ApiV1OrgProvidersListProvidersResponse200,
     PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsBodyParam,
     PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsResponse201,
     PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsResponse200,
} from '@api/medallion-api/types'
import { FetchResponse } from 'api/dist/core'
import {
     difference,
     filter,
     flatMap,
     groupBy,
     includes,
     isEqual,
     map,
     some,
} from 'lodash'
import { CLIENT_RENEG_LIMIT } from 'tls'
import {
     createNonExistentPractices,
     createNonExistentPracticesInProvider,
} from './practice'

export interface Enrollment {
     payerName: string
     practiceNames: string[]
}

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

     //check for existing enrollments
     const fetchEnrollmentsPromises = providers.data.results.map((provider) =>
          medallionApi.p_api_v1_service_requests_payer_enrollments_list_payerEnrollmentServiceRequests(
               {
                    provider: provider.id,
               }
          )
     )

     const existingEnrollmentsResponses = await Promise.all(
          fetchEnrollmentsPromises
     )

     const resolvedExistingEnrollments = flatMap(
          existingEnrollmentsResponses.map((response) => response.data.results)
     )

     const resolvedEnrollments = resolvedExistingEnrollments.map((exist) => ({
          payerName: exist?.payer_name,
          practiceNames: exist?.practices?.map((pract) => pract.name),
     }))
     const nonExistentEnrollments = filter(
          enrollments,
          (enrollment) =>
               !some(
                    resolvedEnrollments,
                    (resolvedEnrollment) =>
                         resolvedEnrollment.payerName ===
                              enrollment.payerName &&
                         isEqual(
                              enrollment.practiceNames,
                              resolvedEnrollment.practiceNames
                         )
               )
     )
     //create enrollments
     const enrollmentPromises: Promise<boolean>[] = []
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
     state: string,
     providers: FetchResponse<
          200,
          ApiV1OrgProvidersListProvidersResponse200
     >['data']['results']
): Promise<boolean> {
     const createPracticesPromisesInProviders = (providers || []).map(
          (provider) =>
               createNonExistentPracticesInProvider(
                    provider.id,
                    state,
                    enrollment.practiceNames
               )
     )
     const enrollmentPromises = (providers || []).map((provider) =>
          enrollmentAndPracticePromise(provider.id, enrollment, state)
     )
     await Promise.all(createPracticesPromisesInProviders)
     const resolved = await Promise.all(enrollmentPromises)
     return resolved.every((res) => res.res.ok)
}

async function enrollmentAndPracticePromise(
     providerId: string,
     enrollment: Enrollment,
     state: string
) {
     const { practiceNames, payerName } = enrollment
     const providerPractices =
          await medallionApi.api_v1_org_provider_practice_associations_list_practices(
               {
                    state,
                    provider: providerId,
               }
          )
     const filteredPractices = filter(
          providerPractices.data.results?.map((pract) => pract.practice),
          (pract) => includes(practiceNames, pract.name)
     )
     const res2 =
          medallionApi.p_api_v1_service_requests_payer_enrollments_create_payerEnrollmentServiceRequests(
               {
                    payer_name: payerName,
                    practices: filteredPractices,
                    provider: providerId,
                    is_medallion_owned: true,
                    resourcetype: 'NewProviderPayerEnrollmentServiceRequest',
                    state: state as PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsBodyParam['state'],
               }
          )
     return res2
}
