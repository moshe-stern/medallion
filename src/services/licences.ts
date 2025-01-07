import medallionApi from '@api/medallion-api'
import {
     ApiV1OrgLicensesCreateLicensesBodyParam,
     ApiV1OrgLicensesListLicensesMetadataParam,
} from '@api/medallion-api/types'
import { ILicensePatchDTO } from '../types'

async function createLicense(body: ApiV1OrgLicensesCreateLicensesBodyParam) {
     return medallionApi.api_v1_org_licenses_create_licenses(body)
}

async function getLicenses(
     metadata?: ApiV1OrgLicensesListLicensesMetadataParam
) {
     const res = await medallionApi.api_v1_org_licenses_list_licenses(metadata)
     return res.data
}

async function patchLicense(license: ILicensePatchDTO) {
     let updated = false
     try {
          const res =
               await medallionApi.api_v1_org_licenses_partial_update_licenses({
                    id: license.id,
                    document: license.document,
               })
          updated = res.res.ok
     } catch (error) {
          console.error(error)
     }
     return {
          ...license,
          updated,
     }
}

async function patchLicenses(licenses: ILicensePatchDTO[]) {
     return Promise.all(licenses.map((l) => patchLicense(l)))
}

export { createLicense, getLicenses, patchLicense, patchLicenses }
