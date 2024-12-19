import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import { createProvider, getProviders, patchProviders } from '../services'
import { IProvider } from 'attain-aba-shared'

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
               const providerData = (await request.json()) as {
                    employeeNumber: string
                    employeeCode: string
                    workStatus: string
                    employeeTitle: string
                    employeeEmail: string
               }[]
               if (!providerData || !providerData.length)
                    throw new Error('No provider data provided')
               const res = await patchProviders(providerData)
               return { body: JSON.stringify(res) }
          } else {
               const emailStr = request.query.get('email-string')
               const res = await getProviders()
               const data = res.data.results
               if (!res.res.ok) {
                    throw new Error('Failed to get Providers')
               }
               if (emailStr) {
                    return {
                         body: JSON.stringify(
                              data?.map((d) => d.email).join(',')
                         ),
                    }
               }
               return { body: JSON.stringify(data) }
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
     authLevel: 'anonymous',
     handler: providersHandler,
})
