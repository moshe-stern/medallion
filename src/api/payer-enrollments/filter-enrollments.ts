import { ApiV1OrgProvidersListProvidersResponse200 } from '@api/medallion-api/types'
import { flatMap, filter, some, isEqual } from 'lodash'
import { Enrollment } from '../../types'
import medallionApi from '@api/medallion-api'
import { FetchResponse } from 'api/dist/core'

export async function filterEnrollments(
     providers: FetchResponse<200, ApiV1OrgProvidersListProvidersResponse200>,
     enrollments: Enrollment[]
) {
     const fetchEnrollmentsPromises = (providers.data.results || []).map(
          (provider) =>
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
     return filter(
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
}
