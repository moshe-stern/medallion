import medallionApi from '@api/medallion-api'
import { IProviderUpdateData } from '../../types'
import { ApiV1OrgProvidersPartialUpdateProvidersBodyParam } from '@api/medallion-api/types'
import { getProviders } from '.'

async function patchProvider(
     provider: ApiV1OrgProvidersPartialUpdateProvidersBodyParam,
     providerMap: Map<
          string,
          {
               providerId: string
               updated: boolean
          }
     >,
     providerEmail: string
) {
     const map = providerMap.get(providerEmail)
     if (!map) return false
     const res =
          await medallionApi.api_v1_org_providers_partial_update_providers(
               validatePayload(provider),
               { provider_pk: map.providerId }
          )
     const ok = res.res.ok
     map.updated = ok
     return ok
}

async function patchProviders(updateData: {
     data: IProviderUpdateData[]
     offset?: number
}) {
     const providerData = updateData.data
     const res = await getProviders({
          search: providerData.map((p) => p.employeeEmail).join(','),
          offset: updateData.offset || 0,
     })
     const { results: providers, count } = res
     if (!providers) return
     const providerMap = new Map<
          string,
          { providerId: string; updated: boolean }
     >()
     providers.forEach((p) => {
          providerMap.set(p?.email, { providerId: p.id, updated: false })
     })
     const promises = providerData.map((p) =>
          patchProvider(
               {
                    employment_title: p.position,
                    employee_id: p.employeeCode,
                    employee_number: p.employeeNumber,
                    employment_type: p.workStatus,
                    medallion_email: p.employeeEmail,
                    gender: p.gender,
                    line_1: p.line1,
                    line_2: p.line2,
                    city: p.city,
                    address_state: p.addressState,
                    postal_code: p.zipCode,
                    country: 'US',
                    primary_phone: p.cellphone,
                    employment_status: p.employeeStatus,
                    metadata_s1: p.metaDataS1,
                    metadata_s2: p.metaDataS2,
               },
               providerMap,
               p.employeeEmail
          )
     )
     await Promise.all(promises)
     return {
          updated: providerData.map((p) => ({
               ...p,
               updated: providerMap.get(p.employeeEmail)?.updated || false,
          })),
          total: count,
     }
}

function validatePayload(
     provider: ApiV1OrgProvidersPartialUpdateProvidersBodyParam
): ApiV1OrgProvidersPartialUpdateProvidersBodyParam {
     const { employment_type, gender, employment_status } = provider
     const employementType =
          (employment_type === 'Full-Time' ||
               employment_type === 'Part-Time') &&
          employment_type.toLowerCase().replace('-', '_')
     const parsedGender =
          (gender === 'Female' || gender === 'Male') &&
          provider.gender.toLowerCase()
     let employmentStatus = ''
     switch (employment_status) {
          case 'Terminated':
               employmentStatus = 'inactive'
               break
          case 'Active':
               employmentStatus = 'active'
               break
     }
     return {
          ...provider,
          employment_type: employementType || null,
          gender: parsedGender || null,
          employment_status: employmentStatus,
     }
}

export { patchProvider, patchProviders }
