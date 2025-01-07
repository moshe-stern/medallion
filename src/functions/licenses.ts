import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import { patchLicenses } from '../services/licences'
import { ILicensePatchDTO } from '../types'

async function licensesHandler(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const licenses = (await request.json()) as ILicensePatchDTO[]
          return {
               body: JSON.stringify(await patchLicenses(licenses)),
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

app.http('licenses', {
     methods: ['PATCH'],
     authLevel: 'function',
     handler: licensesHandler,
})
