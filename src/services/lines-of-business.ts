import { medallionPagination } from './helpers'
import { BASE_URL } from 'attain-aba-shared'

async function getLinesOfBusiness() {
     return medallionPagination<{ id: string; label: string }>(
          BASE_URL + '/lines-of-business/'
     )
}

export { getLinesOfBusiness }
