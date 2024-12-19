import { app, HttpRequest, HttpResponseInit } from '@azure/functions'
import { getPayers, handleRequiredDocumentsReport } from '../services'
import { ApiV1OrgProvidersListProvidersMetadataParam } from '@api/medallion-api/types'
import { EReportType } from '../types'

async function handleReports(request: HttpRequest): Promise<HttpResponseInit> {
     const reportType = request.query.get('reportType')
     const state = request.query
          .get('state')
          ?.toString() as ApiV1OrgProvidersListProvidersMetadataParam['license_state']
     try {
          switch (reportType) {
               case EReportType.PROVIDER_REQUIRED_DOCUMENTS:
                    return {
                         body: JSON.stringify(
                              await handleRequiredDocumentsReport()
                         ),
                    }
               case EReportType.PAYER_LIST:
                    if (!state) {
                         throw new Error('Invalid State')
                    } else {
                         const payers = await getPayers(state)
                         if (!payers) {
                              throw new Error('Failed to get Payors')
                         }
                         return { body: JSON.stringify(payers) }
                    }
               default:
                    throw new Error('Invalid Report type')
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

app.http('reports', {
     methods: ['GET'],
     authLevel: 'function',
     handler: handleReports,
})
