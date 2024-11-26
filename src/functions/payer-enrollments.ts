import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import { ApiV1OrgProvidersListProvidersMetadataParam } from '@api/medallion-api/types'
import { createEnrollments, Enrollment } from '../api/payer-enrollments'
import { flatMap, groupBy, map, mapValues } from 'lodash'

async function handlePayerEnrollments(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const data = (await request.json()) as {
               enrollments: { Payor: string; ServiceAddress: string }[]
               state: string
          }
          const mappedEnrollments: Enrollment[] = data.enrollments.map(
               (enroll) => ({
                    payerName: enroll.Payor,
                    practiceNames: [enroll.ServiceAddress],
               })
          )
          const grouped = mapValues(
               groupBy(mappedEnrollments, 'payerName'),
               (payorGroup) => payorGroup.map((item) => item.practiceNames)
          )
          const mappedGroup: Enrollment[] = map(
               grouped,
               (practiceNames, payerName) => ({
                    payerName,
                    practiceNames: flatMap(practiceNames),
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
     authLevel: 'anonymous',
     handler: handlePayerEnrollments,
})
