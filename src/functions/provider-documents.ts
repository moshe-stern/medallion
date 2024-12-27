import { HttpRequest, HttpResponseInit, app } from '@azure/functions'
import { uploadProviderDocuments } from '../services/provider-documents'
import { IProviderDocumentUploadDTO } from '../types'
import { getProviders } from '../services'

async function providerDocumentHandler(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const payload = (await request.json()) as IProviderDocumentUploadDTO[]
          const personalEmails = payload.map((p) => p.email)
          const workEmail = payload.map((p) => p.workEmail)
          const res = await getProviders({
               search: [...personalEmails, ...workEmail].join(','),
          })
          const providers = res.results
          if (!providers) throw new Error('No Providers found')
          const providerMap = new Map<
               string,
               { providerId: string; updated: boolean }
          >()
          providers.forEach((p) => {
               providerMap.set(p.email, {
                    providerId: p.id,
                    updated: false,
               })
          })
          await Promise.all(
               payload.map((p) => uploadProviderDocuments(p, providerMap))
          )
          return {
               body: JSON.stringify({
                    updated: payload.map((p) => ({
                         ...p,
                         updated: providerMap.has(p.workEmail)
                              ? providerMap.get(p.workEmail)?.updated
                              : providerMap.get(p.email)?.updated,
                    })),
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
