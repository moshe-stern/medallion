import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import {
     createEnrollments,
     getMissingEnrollments,
} from '../services/payer-enrollments'
import { Enrollment } from '../types'
import {
     deletMissingPayerEnrollmentTable,
     getPayerEnrollmentsStates,
     updateMissingPayerEnrollmentTable,
} from '../services/medallion-dataset'

async function handlePayerEnrollments(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          if (request.method === 'POST') {
               const data = (await request.json()) as {
                    enrollments: Enrollment[]
                    state: string
               }
               if (!data || !data.enrollments || !data.state) {
                    return {
                         status: 400,
                    }
               }
               return {
                    status: 200,
                    body: JSON.stringify(
                         await createEnrollments(data.enrollments, data.state)
                    ),
               }
          } else if (request.method === 'GET') {
               const states = await getPayerEnrollmentsStates().then((r) =>
                    (r || []).map((r) => {
                         return r['Payer_Enrollments_States[State]']
                    })
               )
               const res = await Promise.all(
                    states.map((s) => getMissingEnrollments(s))
               )
               const flat = res.flat(1)
               await deletMissingPayerEnrollmentTable()
               const updated = await updateMissingPayerEnrollmentTable(flat)
               return {
                    body: JSON.stringify({
                         updated: updated?.ok
                    }),
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
