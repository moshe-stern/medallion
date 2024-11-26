import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import { ApiV1OrgProvidersListProvidersMetadataParam } from '@api/medallion-api/types'
import { createEnrollments, Enrollment } from '../api/payer-enrollments'
import { flatMap, groupBy } from 'lodash'

async function handlePayerEnrollments(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const data = (await request.json()) as {
               enrollments: { Payor: string; ServiceAddress: string }[]
               state: ApiV1OrgProvidersListProvidersMetadataParam['license_state']
          }
          const mappedEnrollments: Enrollment[] = data.enrollments.map(
               (enroll) => ({
                    payerName: enroll.Payor,
                    practiceNames: [enroll.ServiceAddress],
               })
          )
          const enrollments = await createEnrollments(
               flatMap(groupBy(mappedEnrollments, 'payerName')),
               data.state
          )
          if (!enrollments) {
               throw new Error('Failed to create Enrollments')
          }
          return { body: JSON.stringify(enrollments) }
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
