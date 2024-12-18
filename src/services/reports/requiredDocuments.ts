import { getProviders } from '../provider'
import medallionApi from '@api/medallion-api'

async function handleRequiredDocumentsReport() {
     const res = await getProviders()
     const providers = res.data.results
     if (!providers) return
     const res2 = await medallionApi.api_v1_org_licenses_list_licenses()
     const licenses = res2.data.results
     if (!licenses) return
     const licensesByProviderId = new Map<
          string,
          { missingDocument: boolean; licenseNumber: string | undefined }[]
     >()
     licenses.forEach((license) => {
          if (!licensesByProviderId.has(license.provider.toString())) {
               licensesByProviderId.set(license.provider.toString(), [])
          }
          licensesByProviderId.get(license.provider.toString())!.push({
               missingDocument: !license.document,
               licenseNumber: license.license_number,
          })
     })

     const providerMap = providers.map((p) =>
          getLicenseArr(p.full_name, p.id, licensesByProviderId)
     )
     return providerMap.filter(Boolean)
}

async function getLicenseArr(
     providerName: string,
     providerId: string,
     licenses: Map<
          string,
          {
               missingDocument: boolean
               licenseNumber: string | undefined
          }[]
     >
) {
     console.log([...licenses.keys()].includes(providerId))
     return licenses.get(providerId.toString())?.map((l) => ({
          missingDocument: l.missingDocument,
          licenseNumber: l.licenseNumber,
          providerId,
          providerName,
     }))
}

export { handleRequiredDocumentsReport }
