import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import {
     createEnrollments,
     getMissingEnrollments,
} from '../services/payer-enrollments'
import { Enrollment } from '../types'
import { medallionPagination } from '../services'

async function handlePayerEnrollments(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const data = (await request.json()) as {
               enrollments: Enrollment[]
               state: string
          }
          if (!data || !data.enrollments || !data.state) {
               return {
                    status: 400,
               }
          }
          if (request.method === 'POST') {
               return {
                    status: 200,
                    body: JSON.stringify(
                         await createEnrollments(data.enrollments, data.state)
                    ),
               }
          } else if (request.method === 'GET') {
               const providers = await medallionPagination<{ id: string }>(
                    'org/providers',
                    { state: data.state }
               )
               return {
                    status: 200,
                    body: JSON.stringify(
                         await Promise.all(
                              providers.map((p) =>
                                   getMissingEnrollments(
                                        p,
                                        data.state,
                                        data.enrollments
                                   )
                              )
                         )
                    ),
               }
          } else {
               return {
                    status: 405,
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

app.http('payer-enrollments', {
     methods: ['POST', 'GET'],
     authLevel: 'function',
     handler: handlePayerEnrollments,
})
