import medallionApi from '@api/medallion-api'
import { IProviderUpdateData } from '../../types'
import { getProviders } from '.'

async function patchProvider(
     provider: IProviderUpdateData,
     providerMap: Map<
          string,
          {
               providerId: string
               updated: boolean
          }
     >
) {
     const {
          position,
          employeeCode,
          employeeNumber,
          dolStatus,
          gender,
          street,
          streetLine2,
          city,
          state,
          zipcode,
          primaryPhone,
          metaDataS1,
          metaDataS2,
          workEmail,
          personalEmail,
          cityOfBirth,
          stateOfBirth,
          eeo1Ethnicity,
     } = provider
     const map = providerMap.has(workEmail)
          ? providerMap.get(workEmail)
          : providerMap.get(personalEmail)
     if (!map) return false
     try {
          const res =
               await medallionApi.api_v1_org_providers_partial_update_providers(
                    {
                         employment_title: position || '',
                         employee_id: employeeCode,
                         employee_number: employeeNumber,
                         employment_type: dolStatus,
                         gender,
                         line_1: street,
                         line_2: streetLine2,
                         city,
                         address_state: state,
                         postal_code: zipcode,
                         country: 'US',
                         primary_phone: primaryPhone,
                         metadata_s1: metaDataS1,
                         metadata_s2: metaDataS2,
                         birth_city: cityOfBirth,
                         birth_state: stateOfBirth,
                         race: eeo1Ethnicity,
                    },
                    { provider_pk: map.providerId }
               )
          map.updated = res.res.ok
     } catch (error) {
          console.error(error)
     }
}

async function patchProviders(providerData: IProviderUpdateData[]) {
     const personalEmails = providerData.map((p) => p.personalEmail)
     const workEmail = providerData.map((p) => p.workEmail)
     const res = await getProviders({
          search: [...personalEmails, ...workEmail].join(','),
     })
     if (!res?.results?.length) throw new Error('No Providers Found')
     const { results: providers, count } = res
     const providerMap = new Map<
          string,
          { providerId: string; updated: boolean }
     >()
     providers.forEach((p) => {
          providerMap.set(p?.email, { providerId: p.id, updated: false })
     })
     await Promise.all(providerData.map((p) => patchProvider(p, providerMap)))
     return {
          updated: providerData.map((p) => ({
               ...p,
               updated:
                    (providerMap.has(p.workEmail)
                         ? providerMap.get(p.workEmail)?.updated
                         : providerMap.get(p.personalEmail)?.updated) || false,
          })),
          total: count,
     }
}

export { patchProvider, patchProviders }
