import {
     ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam,
     ApiV1OrgProvidersDocumentsCreateProviderDocumentsMetadataParam,
} from '@api/medallion-api/types'
import { HttpRequest, HttpResponseInit, app } from '@azure/functions'
import { uploadProviderDocument } from '../services/provider-documents'

async function providerDocumentHandler(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const documnetPayload = (await request.json()) as {
               body: ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam
               metadata: ApiV1OrgProvidersDocumentsCreateProviderDocumentsMetadataParam
          }
          const res = await uploadProviderDocument(documnetPayload)
          if (res.status === 201) {
               return {
                    body: JSON.stringify({
                         message: 'Successfully uploaded document',
                    }),
               }
          } else {
               throw new Error('Failed to upload provider document')
          }
     } catch (error) {
          return {
               body: JSON.stringify({
                    error:
                         (error as Error).message ||
                         'An unknown error occurred',
               }),
               status: 500,
          }
     }
}

app.http('provider-documents', {
     methods: ['POST'],
     authLevel: 'function',
     handler: providerDocumentHandler,
})
