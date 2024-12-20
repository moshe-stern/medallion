import medallionApi from '@api/medallion-api'

import { IProvider } from 'attain-aba-shared'

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
export { createProvider }
