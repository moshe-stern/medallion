import medallionApi from '@api/medallion-api'
import {
     ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam,
} from '@api/medallion-api/types'

async function uploadProviderDocument(
     body: ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam,
     providerId: string
) {
     const res = await medallionApi.api_v1_org_providers_documents_create_providerDocuments(
          body,
          { provider_pk: providerId }
     )
     return res.res.ok
}

export { uploadProviderDocument }
