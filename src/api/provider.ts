import medallionApi from '@api/medallion-api'
import { Enrollment } from '../types'
import { ApiV1OrgProvidersListProvidersResponse200 } from '@api/medallion-api/types'
import { groupBy, filter, every, includes } from 'lodash'
import { FetchResponse } from 'api/dist/core'
import { IProvider, getProvidersByEmail } from 'attain-aba-shared'

async function createProvider(provider: IProvider) {
     if (!provider.email || !provider.email) return
     //TODO add profession need acronyms
     const member =
          await medallionApi.p_api_v1_organizations_members_create_members({
               user: { email: provider.email },
               role: 'provider',
          })
     const id = member.data.provider?.id
     if (!id) return
     await medallionApi.api_v1_org_providers_partial_update_providers(
          { npi: +provider.id },
          { provider_pk: id }
     )
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

export { createProvider, getCoveredProviders }
