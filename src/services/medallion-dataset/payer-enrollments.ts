import { queryDataset } from '.'

async function getPayerEnrollments(state: string) {
     try {
          return queryDataset(
               `EVALUATE FILTER(Payer_Enrollments, Payer_Enrollments[State] = "${state}")`
          )
     } catch (error) {
          console.error(error)
     }
}

async function getPayerEnrollmentsStates() {
     try {
          return queryDataset('EVALUATE Payer_Enrollments_States')
     } catch (error) {
          console.error(error)
     }
}

export { getPayerEnrollments, getPayerEnrollmentsStates }
