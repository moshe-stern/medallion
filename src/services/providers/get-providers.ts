import medallionApi from '@api/medallion-api'
import { Enrollment } from '../../types'
import {
     ApiV1OrgProvidersListProvidersMetadataParam,
     ApiV1OrgProvidersListProvidersResponse200,
} from '@api/medallion-api/types'
import { groupBy, filter, every, includes } from 'lodash'
import { FetchResponse } from 'api/dist/core'
import { getProvidersByEmail } from 'attain-aba-shared'

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
     if (enrollment.coveredRegions.length) {
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
     try {
          const res =
               await medallionApi.api_v1_org_providers_list_providers(metadata)
          return res.data
     } catch (error) {
          console.error(error)
     }
}

export { getCoveredProviders, getProviders }
