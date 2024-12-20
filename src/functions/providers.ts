import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import { createProvider, getProviders, patchProviders } from '../services'
import { IProvider } from 'attain-aba-shared'
import { IProviderUpdateData } from '../types'

async function providersHandler(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          if (request.method === 'POST') {
               const res = await createProvider(
                    (await request.json()) as IProvider
               )
               if (res?.status) {
                    return {
                         body: JSON.stringify({
                              message: 'Successfully created Provider',
                         }),
                    }
               } else {
                    throw new Error('Failed to create Provider')
               }
          } else if (request.method === 'PATCH') {
               const updateData = (await request.json()) as {
                    data: IProviderUpdateData[]
                    offset?: number
               }
               if (!updateData || !updateData.data.length)
                    throw new Error('No provider data provided')
               const res = await patchProviders(updateData)
               return { body: JSON.stringify(res) }
          } else {
               const emailStr = request.query.get('email-string')
               const offset = +(request.query.get('offsett') || 0)
               const res = await getProviders({ offset })
               const { results: providers, count } = res
               if (!providers) {
                    throw new Error('Failed to get Providers')
               }
               if (emailStr) {
                    return {
                         body: JSON.stringify({
                              emails: providers?.map((d) => d.email).join(','),
                              remaining: (count || 0) - providers.length,
                         }),
                    }
               }
               return {
                    body: JSON.stringify({
                         providers,
                         remaining: (count || 0) - providers.length,
                    }),
               }
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

app.http('providers', {
     methods: ['PATCH', 'POST', 'GET'],
     authLevel: 'function',
     handler: providersHandler,
})
