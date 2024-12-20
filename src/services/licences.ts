import medallionApi from '@api/medallion-api'
import {
     ApiV1OrgLicensesCreateLicensesBodyParam,
     ApiV1OrgLicensesListLicensesMetadataParam,
} from '@api/medallion-api/types'

async function createLicense(body: ApiV1OrgLicensesCreateLicensesBodyParam) {
     return medallionApi.api_v1_org_licenses_create_licenses(body)
}

async function getLicenses(metadata?: ApiV1OrgLicensesListLicensesMetadataParam) {
     const res = await medallionApi.api_v1_org_licenses_list_licenses(metadata)
     return res.data
}

export { createLicense, getLicenses }
