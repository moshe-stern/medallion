import medallionApi from '@api/medallion-api'
import { IProviderUpdateData } from '../../types'
import { ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam, ApiV1OrgProvidersPartialUpdateProvidersBodyParam } from '@api/medallion-api/types'
import { getProviders } from '.'
import { uploadProviderDocument } from '../provider-documents'

async function patchProvider(
     provider: ApiV1OrgProvidersPartialUpdateProvidersBodyParam,
     providerMap: Map<
          string,
          {
               providerId: string
               updated: boolean
          }
     >,
     providerEmail: string,
     documents: ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam[]
) {
     const map = providerMap.get(providerEmail)
     if (!map) return false
     try {
          const res =
               await medallionApi.api_v1_org_providers_partial_update_providers(
                    validatePayload(provider),
                    { provider_pk: map.providerId }
               )
          const res2 = await Promise.all(documents.map(d => uploadProviderDocument(d, map.providerId)))
          map.updated = res.res.ok && res2.every(Boolean)
     } catch (error) {
          console.error(error)
     }
}

async function patchProviders(providerData: IProviderUpdateData[]) {
     const res = await getProviders({
          search: providerData
               .map((p) => p.employeeEmail.toLowerCase())
               .join(','),
     })
     const { results: providers, count } = res
     if (!providers) return
     const providerMap = new Map<
          string,
          { providerId: string; updated: boolean }
     >()
     providers.forEach((p) => {
          providerMap.set(p?.email, { providerId: p.id, updated: false })
     })
     await Promise.all(
          providerData.map((p) =>
               patchProvider(
                    {
                         employment_title: p.position || '',
                         employee_id: p.employeeCode,
                         employee_number: p.employeeNumber,
                         employment_type: p.workStatus,
                         medallion_email: p.employeeEmail,
                         gender: p.gender,
                         line_1: p.line1,
                         line_2: p.line2,
                         city: p.city,
                         address_state: p.addressState,
                         postal_code: p.zipCode,
                         country: 'US',
                         primary_phone: p.cellphone,
                         metadata_s1: p.metaDataS1,
                         metadata_s2: p.metaDataS2,
                         birth_city: p.cityOfBirth,
                         birth_state: p.birthState,
                         race: p.race
                    },
                    providerMap,
                    p.employeeEmail,
                    p.documents || []
               )
          ),

     )
     return {
          updated: providerData.map((p) => ({
               ...p,
               updated: providerMap.get(p.employeeEmail)?.updated || false,
          })),
          total: count,
     }
}

function validatePayload(
     provider: ApiV1OrgProvidersPartialUpdateProvidersBodyParam
): ApiV1OrgProvidersPartialUpdateProvidersBodyParam {
     const { employment_type, gender } = provider
     const employementType =
          (employment_type === 'Full-Time' ||
               employment_type === 'Part-Time') &&
          employment_type.toLowerCase().replace('-', '_')
     const parsedGender =
          (gender === 'Female' || gender === 'Male') &&
          provider.gender.toLowerCase()
     return {
          ...provider,
          employment_type: employementType || null,
          gender: parsedGender || null,
     }
}

export { patchProvider, patchProviders }
