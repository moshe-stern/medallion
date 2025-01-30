import { DefaultAzureCredential } from '@azure/identity'

async function getAccessToken() {
     try {
          const credential = new DefaultAzureCredential()
          const tokenResponse = await credential.getToken(
               'https://analysis.windows.net/powerbi/api/.default'
          )
          return tokenResponse.token
     } catch (error) {
          console.error(error)
     }
}

async function queryDataset(query: string) {
     try {
          const datasetId = process.env.DATASET_ID
          const res = await fetch(
               `https://api.powerbi.com/v1.0/myorg/datasets/${datasetId}/executeQueries`,
               {
                    method: 'POST',
                    headers: await getHeaders(),
                    body: JSON.stringify({
                         queries: [
                              {
                                   query: query,
                              },
                         ],
                    }),
               }
          )
          const data = (await res.json()) as {
               results: [{ tables: [{ rows: Record<string, string>[] }] }]
          }
          return data.results[0].tables[0].rows
     } catch (error) {
          console.error(error)
     }
}

async function getHeaders() {
     return {
          'Content-type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}`,
     }
}

async function deletMissingPayerEnrollmentTable() {
     try {
          const datasetId = process.env.PUSH_DATASET_ID
          await fetch(
               `https://api.powerbi.com/v1.0/myorg/datasets/${datasetId}/tables/missingPayerEnrollments/rows`,
               {
                    method: 'DELETE',
                    headers: await getHeaders(),
               }
          )
     } catch (error) {
          console.error(error)
     }
}

async function updateMissingPayerEnrollmentTable(data: Array<unknown>) {
     try {
          const datasetId = process.env.PUSH_DATASET_ID
          const res = await fetch(
               `https://api.powerbi.com/v1.0/myorg/datasets/${datasetId}/tables/missingPayerEnrollments/rows`,
               {
                    method: 'POST',
                    body: JSON.stringify({ rows: data }),
                    headers: await getHeaders(),
               }
          )
          return res
     } catch (error) {
          console.error(error)
     }
}

export * from './payer-enrollments'
export {
     getAccessToken,
     queryDataset,
     updateMissingPayerEnrollmentTable,
     deletMissingPayerEnrollmentTable,
}
