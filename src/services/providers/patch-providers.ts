import medallionApi from '@api/medallion-api'
import { IProviderUpdateData } from '../../types'

async function patchProvider(provider: IProviderUpdateData) {
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
          id,
          cityOfBirth,
          stateOfBirth,
          eeo1Ethnicity,
     } = provider
     let updated = false
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
                         birth_city: cityOfBirth || '',
                         birth_state: stateOfBirth || '',
                         race: eeo1Ethnicity || '',
                    },
                    { provider_pk: id }
               )
          updated = res.res.ok
     } catch (error) {
          console.error(error)
     }
     return {
          ...provider,
          updated,
     }
}

async function patchProviders(providerData: IProviderUpdateData[]) {
     return await Promise.all(providerData.map((p) => patchProvider(p)))
}

export { patchProvider, patchProviders }
