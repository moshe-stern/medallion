import { HttpRequest, HttpResponseInit, app } from '@azure/functions'
import { handleProviderDocumentsUpload } from '../services/provider-documents'
import { IProviderDocumentUploadDTO } from '../types'

async function providerDocumentHandler(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const payload = (await request.json()) as IProviderDocumentUploadDTO[]
          const providerMap = await handleProviderDocumentsUpload(payload)
          return {
               body: JSON.stringify({
                    updated: payload.map((p) => {
                         const map = providerMap.get(p.workEmail) || providerMap.get(p.personalEmail)
                         const results = {
                              ...p,
                              providerId: map?.providerId,
                              files: p.files.map(f => ({
                                   ...f,
                                   id: map?.currentDocs.find(d => d.kind === f.kind)?.id
                              })),
                              updated: map?.updated || false
                         }
                         return results
                    }),
               }),
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
