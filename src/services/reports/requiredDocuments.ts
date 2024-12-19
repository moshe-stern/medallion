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
          if (!licensesByProviderId.has(license.provider)) {
               licensesByProviderId.set(license.provider, [])
          }
          licensesByProviderId.get(license.provider)!.push({
               missingDocument: !license.document,
               licenseNumber: license.license_number,
          })
     })

     const providerMapPromises = providers.map((p) =>
          getLicenseArr(p.full_name, p.id, licensesByProviderId)
     )
     const resolved = await Promise.all(providerMapPromises)
     return resolved.filter(Boolean).flat()
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
     if (!licenses.has(providerId)) return
     return licenses.get(providerId)!.map((l) => ({
          missingDocument: l.missingDocument,
          licenseNumber: l.licenseNumber,
          providerId,
          providerName,
     }))
}

export { handleRequiredDocumentsReport }
