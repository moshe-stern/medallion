import medallionApi from '@api/medallion-api'
import { Enrollment } from '../types'
import {
     ApiV1OrgProvidersListProvidersResponse200,
     ApiV1OrgProvidersPartialUpdateProvidersMetadataParam,
} from '@api/medallion-api/types'
import { groupBy, filter, every, includes } from 'lodash'
import { FetchResponse } from 'api/dist/core'
import { IProvider, getProvidersByEmail } from 'attain-aba-shared'
import { medallionPagination } from '..'

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

async function patchProviders(
     providerData: {
          employeeNumber: string
          employeeCode: string
          workStatus: string
          employeeTitle: string
          employeeEmail: string
     }[]
) {
     const providers = await getProviders({
          search: providerData.map((p) => p.employeeEmail).join(','),
     })
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
     return providerData.map((p) => ({
          ...p,
          updated: providerMap.get(p.employeeEmail)?.updated || false,
     }))
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

async function getProviders(searchParams?: Record<string, string>) {
     const res = await medallionPagination<
          ApiV1OrgProvidersListProvidersResponse200['results']
     >('https://app.medallion.co/api/v1/org/providers', searchParams)
     return res as ApiV1OrgProvidersListProvidersResponse200['results']
}

export { createProvider, getCoveredProviders, patchProviders, getProviders }
