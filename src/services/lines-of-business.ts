import { medallionPagination } from './helpers'

async function getLinesOfBusiness() {
     return medallionPagination<{ id: string; label: string }>(
          'https://app.medallion.co/p/api/v1/lines-of-business/'
     )
}

export { getLinesOfBusiness }
