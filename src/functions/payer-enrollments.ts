import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import { getPayers } from '../api'
import { ApiV1OrgProvidersListProvidersMetadataParam } from '@api/medallion-api/types'
import { createEnrollment } from '../api/payer-enrollments'

async function handlePayerEnrollments(
     request: HttpRequest
): Promise<HttpResponseInit> {
     try {
          const data = (await request.json()) as {
               payerName: string
               practiceNames: string[]
               state: ApiV1OrgProvidersListProvidersMetadataParam['license_state']
          }
          const { payerName, practiceNames, state } = data
          const enrollments = await createEnrollment(
               payerName,
               practiceNames,
               state
          )
          if (!enrollments) {
               throw new Error('Failed to create Enrollments')
          }
          return { body: JSON.stringify(enrollments) }
     } catch (error) {
          return { body: JSON.stringify(error) }
     }
}

app.http('payer-enrollments', {
     methods: ['POST'],
     authLevel: 'anonymous',
     handler: handlePayerEnrollments,
})
