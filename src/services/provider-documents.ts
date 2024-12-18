import medallionApi from '@api/medallion-api'
import {
     ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam,
     ApiV1OrgProvidersDocumentsCreateProviderDocumentsMetadataParam,
} from '@api/medallion-api/types'

async function uploadProviderDocument(documentPayload: {
     body: ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam
     metadata: ApiV1OrgProvidersDocumentsCreateProviderDocumentsMetadataParam
}) {
     return medallionApi.api_v1_org_providers_documents_create_providerDocuments(
          documentPayload.body,
          documentPayload.metadata
     )
}

export { uploadProviderDocument }
