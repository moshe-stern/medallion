import medallionApi from '@api/medallion-api'
import { Enrollment } from '../../types'

async function getExistingEnrollmentsRequests(
     providers: { id: string }[],
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
               practiceNames: (exist?.practices || [])
                    .map((pract) => pract.name)
                    .filter(Boolean) as string[],
               entity: exist?.par_group,
          }))
}

async function getExistingEnrollments(
     providers: { id: string }[],
     state: string
) {
     return (
          await Promise.all(
               (providers || []).map((p) =>
                    medallionApi
                         .p_api_v1_payer_enrollments_list_payerEnrollments({
                              provider: p.id,
                         })
                         .then((res) => res.data.results)
               )
          )
     )
          .flat()
          .filter((e) => e?.state === state)
          .map((exist) => ({
               id: exist?.id,
               payerName: exist?.payer_name,
               practiceNames: (exist?.practices || [])
                    .map((pract) => pract.name)
                    .filter(Boolean) as string[],
               entity: exist?.par_group,
          }))
}

async function getMissingEnrollments(
     provider: { id: string },
     state: string,
     enrollments: Enrollment[]
) {
     const requests = await getExistingEnrollmentsRequests([provider], state)
     const existing = await getExistingEnrollments([provider], state)
     const enrollmentMap = new Map<string, Set<string>>()
     requests.forEach(
          (r) =>
               r.payerName &&
               enrollmentMap.set(r.payerName, new Set(r.practiceNames))
     )
     existing.forEach(
          (e) =>
               e.payerName &&
               enrollmentMap.set(e.payerName, new Set(e.practiceNames))
     )
     return {
          ...provider,
          missing: enrollments
               .filter((e) => !enrollmentMap.has(e.payerName))
               .map((e) => e.payerName),
          payersMissingServiceAddresses: enrollments.filter((e) => {
               const map = enrollmentMap.get(e.payerName)
               if (map) {
                    const missingServiceAddresses = e.practiceNames.filter(
                         (p) => !map.has(p)
                    )
                    if (missingServiceAddresses.length) {
                         return {
                              payer: e.payerName,
                              addresses: missingServiceAddresses,
                         }
                    }
               }
          }),
     }
}
export {
     getExistingEnrollmentsRequests,
     getExistingEnrollments,
     getMissingEnrollments,
}
