import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import { createEnrollments } from '../services/payer-enrollments'
import { Enrollment } from '../types'

async function handlePayerEnrollments(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const data = await request.json() as {
               enrollments: Enrollment[],
               state: string
          }
          return {
               status: 200,
               body: JSON.stringify(await createEnrollments(data.enrollments, data.state))
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
     methods: ['POST'],
     authLevel: 'function',
     handler: handlePayerEnrollments,
})
