import { medallionPagination } from './helpers'

async function getLinesOfBusiness() {
     return medallionPagination<{ id: string; label: string }>(
          '/lines-of-business/'
     )
}

export { getLinesOfBusiness }
