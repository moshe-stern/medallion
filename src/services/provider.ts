import medallionApi from '@api/medallion-api'
import { Enrollment, IProviderUpdateData } from '../types'
import {
     ApiV1OrgProvidersListProvidersMetadataParam,
     ApiV1OrgProvidersListProvidersResponse200,
     ApiV1OrgProvidersPartialUpdateProvidersMetadataParam,
} from '@api/medallion-api/types'
import { groupBy, filter, every, includes } from 'lodash'
import { FetchResponse } from 'api/dist/core'
import { IProvider, getProvidersByEmail } from 'attain-aba-shared'

async function createProvider(provider: IProvider) {
     if (!provider.email || !provider.email) return
     const member =
          await medallionApi.p_api_v1_organizations_members_create_members({
               user: { email: provider.email },
               role: 'provider',
          })
     const id = member.data.provider?.id
     if (!id) return
     return medallionApi.api_v1_org_providers_partial_update_providers(
          { npi: +provider.id },
          { provider_pk: id }
     )
}

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
          offset: updateData.offset,
     })
     const providers = res.res
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
          remaining: (res.total || 0) - providerData.length
     }
}

async function getCoveredProviders(
     enrollment: Enrollment,
     providers: FetchResponse<
          200,
          ApiV1OrgProvidersListProvidersResponse200
     >['data']['results']
) {
     let validProviders: FetchResponse<
          200,
          ApiV1OrgProvidersListProvidersResponse200
     >['data']['results'] = []
     if (enrollment.coveredRegions) {
          const dbProviders = await getProvidersByEmail(
               (providers || []).map((prov) => prov.email)
          )
          const grouped = groupBy(dbProviders, 'email')
          const coveredProviders = filter(providers, (prov) =>
               every(
                    grouped[prov.email].map((group) => group.subRegion),
                    (region) => includes(enrollment.coveredRegions, region)
               )
          )
          validProviders = coveredProviders
     }
     if (enrollment.hasNonCompliantBcba) {
          const coveredProviders = (
               (validProviders.length && validProviders) ||
               providers ||
               []
          ).filter((prov) => prov.profession !== 'BCBA')
          validProviders = coveredProviders
     }
     return validProviders.length ? validProviders : providers
}

async function getProviders(
     metadata?: ApiV1OrgProvidersListProvidersMetadataParam
) {
     const res =
          await medallionApi.api_v1_org_providers_list_providers(metadata)
     return {
          res: res.data.results,
          total: res.data.count,
     }
}

export { createProvider, getCoveredProviders, patchProviders, getProviders }
