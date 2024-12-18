import medallionApi from '@api/medallion-api'
import { ApiV1OrgLicensesCreateLicensesBodyParam } from '@api/medallion-api/types'

async function createLicense(body: ApiV1OrgLicensesCreateLicensesBodyParam) {
     return medallionApi.api_v1_org_licenses_create_licenses(body)
}

export { createLicense }
