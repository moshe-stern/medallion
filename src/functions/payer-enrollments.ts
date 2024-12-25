import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import { createEnrollments } from '../services/payer-enrollments'
import { flatMap, groupBy, map, mapValues } from 'lodash'
import { Enrollment } from '../types'

async function handlePayerEnrollments(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const data = (await request.json()) as {
               enrollments: {
                    Payor: string
                    ServiceAddress: string
                    Entity: string
               }[]
               state: string
          }
          const mappedEnrollments: Enrollment[] = data.enrollments.map(
               (enroll) => ({
                    payerName: enroll.Payor,
                    practiceNames: [enroll.ServiceAddress],
                    entity: enroll.Entity,
               })
          )
          const grouped = mapValues(
               groupBy(mappedEnrollments, 'payerName'),
               (payorGroup) =>
                    payorGroup.map((item) => ({
                         practices: item.practiceNames,
                         entity: item.entity,
                    }))
          )
          const mappedGroup: Enrollment[] = map(
               grouped,
               (group, payerName) => ({
                    payerName,
                    practiceNames: flatMap(group, (item) => item.practices),
                    entity: group[0].entity,
               })
          )
          const enrollments = await createEnrollments(mappedGroup, data.state)
          if (!enrollments) {
               throw new Error('Failed to create Enrollments')
          }
          return { status: 201 }
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
