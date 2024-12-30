import { HttpRequest, HttpResponseInit, app } from '@azure/functions'
import {
     getCurrentProviderDocuments,
     uploadProviderDocuments,
} from '../services/provider-documents'
import { IProviderDocumentUploadDTO } from '../types'
import { getProviders } from '../services'

async function providerDocumentHandler(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const payload = (await request.json()) as IProviderDocumentUploadDTO[]
          const personalEmails = payload.map((p) => p.personalEmail)
          const workEmail = payload.map((p) => p.workEmail)
          const res = await getProviders({
               search: [...personalEmails, ...workEmail].join(','),
          })
          const providers = res.results
          if (!providers?.length) throw new Error('No Providers found')
          const providerMap = new Map<
               string,
               { providerId: string; updated: boolean; currentDocs: string[] }
          >()
          await Promise.all(
               providers.map(async (p) => {
                    const docs = await getCurrentProviderDocuments(p.id)
                    providerMap.set(p.email, {
                         providerId: p.id,
                         currentDocs: docs,
                         updated: false,
                    })
               })
          )

          await Promise.all(
               payload.map((p) => uploadProviderDocuments(p, providerMap))
          )
          return {
               body: JSON.stringify({
                    updated: payload.map((p) => ({
                         ...p,
                         updated:
                              (providerMap.has(p.workEmail)
                                   ? providerMap.get(p.workEmail)?.updated
                                   : providerMap.get(p.personalEmail)
                                          ?.updated) || false,
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
