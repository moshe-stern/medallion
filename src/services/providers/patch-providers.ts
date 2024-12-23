import medallionApi from '@api/medallion-api'
import { IProviderUpdateData } from '../../types'
import { ApiV1OrgProvidersPartialUpdateProvidersMetadataParam } from '@api/medallion-api/types'
import { getProviders } from '.'

async function patchProvider(
     provider: Omit<
          ApiV1OrgProvidersPartialUpdateProvidersMetadataParam,
          'provider_pk'
     >,
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
     const employementType =
          (provider.employment_type === 'Full-Time' ||
               provider.employment_type === 'Part-Time') &&
          provider.employment_type.toLowerCase().replace('-', '_')
     const res =
          await medallionApi.api_v1_org_providers_partial_update_providers(
               { ...provider, employment_type: employementType || null },
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
                    employment_title: p.employeeTitle,
                    employee_id: p.employeeCode,
                    employee_number: p.employeeNumber,
                    employment_type: p.workStatus,
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

export { patchProvider, patchProviders }
