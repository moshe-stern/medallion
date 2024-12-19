import medallionApi from '@api/medallion-api'
import {
     ApiV1OrgLicensesCreateLicensesBodyParam,
     ApiV1OrgLicensesListLicensesResponse200,
} from '@api/medallion-api/types'
import { medallionPagination } from '..'

async function createLicense(body: ApiV1OrgLicensesCreateLicensesBodyParam) {
     return medallionApi.api_v1_org_licenses_create_licenses(body)
}

async function getLicenses(searchParams?: Record<string, string>) {
     const res = await medallionPagination<
          ApiV1OrgLicensesListLicensesResponse200['results']
     >('https://app.medallion.co/api/v1/org/licenses', searchParams)
     return res as ApiV1OrgLicensesListLicensesResponse200['results']
}

export { createLicense, getLicenses }
