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
               const updateData =
                    (await request.json()) as IProviderUpdateData[]
               
               if (!updateData || !updateData.length)
                    throw new Error('No provider data provided')
               if (updateData.length > 100)
                    throw new Error('Can only update 100 at a time')
               const res = await patchProviders(updateData)
               return { body: JSON.stringify(res) }
          } else {
               const emailStr = request.query.get('email-string')
               const offset = +(request.query.get('offset') || 0)
               const res = await getProviders({ offset })
               if(!res?.results?.length) throw new Error('Failed to get Providers')
               const { results: providers, count } = res
               if (emailStr) {
                    return {
                         body: JSON.stringify({
                              emails: providers
                                   ?.map((d) => d.email.toLowerCase())
                                   .join(','),
                              total: count,
                         }),
                    }
               }
               return {
                    body: JSON.stringify({
                         providers,
                         total: count,
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
