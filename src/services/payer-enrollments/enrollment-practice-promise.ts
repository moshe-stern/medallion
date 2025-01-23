import { PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsBodyParam } from '@api/medallion-api/types'
import { filter, includes } from 'lodash'
import { Enrollment, IBusinessLine } from '../../types'
import medallionApi from '@api/medallion-api'

export async function enrollmentAndPracticePromise(
     providerId: string,
     enrollment: Enrollment,
     state: string
) {
     const { practiceNames, payerName, entity, linesOfBusiness, id } =
          enrollment
     try {
          const providerPractices =
               await medallionApi.api_v1_org_provider_practice_associations_list_practices(
                    {
                         state,
                         provider: providerId,
                    }
               )
          const filteredPractices = filter(
               (providerPractices.data.results || []).map(
                    (pract) => pract.practice
               ),
               (pract) => includes(practiceNames, pract.name)
          )
          const payload = {
               lines_of_business: linesOfBusiness as IBusinessLine[],
               payer_name: payerName,
               par_group: entity,
               practices: filteredPractices,
               provider: providerId,
               is_medallion_owned: true,
               resourcetype: 'NewProviderPayerEnrollmentServiceRequest',
               state: state as PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsBodyParam['state'],
          }
          const res2 = id
               ? await medallionApi.p_api_v1_service_requests_payer_enrollments_partial_update_payerEnrollmentServiceRequests(
                      {
                           ...payload,
                      },
                      { id }
                 )
               : await medallionApi.p_api_v1_service_requests_payer_enrollments_create_payerEnrollmentServiceRequests(
                      payload
                 )
          return res2
     } catch (error) {
          console.error(error)
     }
}
