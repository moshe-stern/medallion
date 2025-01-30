import medallionApi from '@api/medallion-api'
import { getPayerEnrollments } from '../medallion-dataset/payer-enrollments'
import { medallionPagination } from '../helpers'
import { ApiV1OrgProvidersListProvidersResponse200 } from '@api/medallion-api/types'

async function getExistingEnrollmentsRequests(
     providers: ApiV1OrgProvidersListProvidersResponse200['results'],
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
               provider: exist?.provider as string,
               practiceNames: (exist?.practices || [])
                    .map((pract) => pract.name)
                    .filter(Boolean) as string[],
               entity: exist?.par_group,
          }))
}

async function getExistingEnrollments(
     providers: ApiV1OrgProvidersListProvidersResponse200['results'],
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
               provider: exist?.provider,
               practiceNames: (exist?.practices || [])
                    .map((pract) => pract.name)
                    .filter(Boolean) as string[],
               entity: exist?.par_group,
          }))
}

async function getMissingEnrollments(state: string) {
     const [providers, enrollments] = await Promise.all([
          medallionPagination(
               'https://app.medallion.co/api/v1/org/providers/',
               { license_state: state }
          ) as Promise<ApiV1OrgProvidersListProvidersResponse200['results']>,
          getPayerEnrollments(state).then((r) =>
               (r || []).map((r: Record<string, string>) => ({
                    payerName: r['Payer_Enrollments[Payor]'],
                    practiceNames: new Set(
                         JSON.parse(
                              r['Payer_Enrollments[Service_Addresses]']
                         ) as string[]
                    ),
               }))
          ),
     ])
     const [requests, existing] = await Promise.all([
          getExistingEnrollmentsRequests(providers, state),
          getExistingEnrollments(providers, state),
     ])
     const providersEnrollmentMap = new Map<
          string,
          {
               id?: string
               payerName?: string
               provider?: string | null
               practiceNames: Set<string>
               entity: unknown
          }[]
     >()
     for (const r of [...requests, ...existing]) {
          if (r.provider && r.payerName) {
               const map = providersEnrollmentMap.get(r.provider) || []
               map.push({ ...r, practiceNames: new Set(r.practiceNames) })
               providersEnrollmentMap.set(r.provider, map)
          }
     }
     const enrollmentMap = new Map<string, Set<string>>()
     enrollments.forEach((e) => {
          enrollmentMap.set(e.payerName, e.practiceNames)
     })
     return [...providersEnrollmentMap.keys()].map((key) => {
          const providerEnrollments = providersEnrollmentMap.get(key) || []
          const providerPayers = new Set(
               providerEnrollments.map((e) => e.payerName)
          )
          const missing = enrollments
               .filter((e) => !providerPayers.has(e.payerName))
               .map((e) => e.payerName)
          const payersMissingServiceAddresses = enrollments.reduce(
               (missingList, e) => {
                    const providerEnrollment = providerEnrollments.find(
                         (pe) => pe.payerName === e.payerName
                    )
                    if (providerEnrollment) {
                         const missingAddresses = [...e.practiceNames].filter(
                              (addr) =>
                                   !providerEnrollment.practiceNames.has(addr)
                         )
                         if (missingAddresses.length) {
                              missingList.push({
                                   payer: e.payerName,
                                   addresses: missingAddresses,
                              })
                         }
                    }
                    return missingList
               },
               [] as { payer: string; addresses: string[] }[]
          )
          const provider = (providers || []).find((p) => p.id === key)
          return {
               id: provider?.id || key,
               email: provider?.email || '',
               full_name: provider?.full_name || '',
               payersState: state,
               missing: JSON.stringify(missing),
               payersMissingServiceAddresses: JSON.stringify(
                    payersMissingServiceAddresses
               ),
          }
     })
}
export {
     getExistingEnrollmentsRequests,
     getExistingEnrollments,
     getMissingEnrollments,
}
