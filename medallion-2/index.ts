import medallionApi from '@api/medallion-api';


async function medallion() {
  medallionApi.auth('');
  const res = await medallionApi.api_v1_org_providers_list_providers()
  const providerId = res.data.results?.find(prov => prov.full_name === 'CASEY LOUGHREY')?.id
  const res2 = await medallionApi.p_api_v1_group_profiles_list_groupProfiles()
  // medallionApi.p_api_v1_payer_enrollments_create_payerEnrollments({
  //   kind: 'provider',
  //   state: 'AK',
  //   par_status: 'non-par',
  //   provider: providerId,
  //   payer_id: '777',
  //   payer_name: 'Sir Godrick the Seconde',
  //   effective_date: null,
  //   revalidation_date: null
  // })
  //   .then(({ data }) => console.log(data))
  //   .catch(err => console.error(err));
  
  medallionApi.p_api_v1_service_requests_payer_enrollments_create_payerEnrollmentServiceRequests({
      payer_name: "Testing api",
      state: "NJ",
      is_medallion_owned: true,
      status: "requested",
      status_reason: null,
      status_category: "requested",
      par_status: null,
      status_update_time: "2024-11-21T20:00:03.828101Z",
      created: "2024-11-21T20:00:03.827340Z",
      provider: providerId!,
      "practices": [
        {
          "id": "8b0f7cb7-ced9-4e16-8f05-61ea30c31064",
          "name": "Connect Plus Therapy - 1902 Fairfax Avenue, Suite 117, Cherry Hill, NJ 08003",
          "country": null,
          "city": "Cherry Hill",
          "county": "",
          "line_1": "1902 Fairfax Avenue",
          "line_2": "",
          "postal_code": "08003",
          "postal_code_plus_4": null,
          "address_state": "NJ"
        },
        {
          "id": "6749952a-f991-4cf4-8d5b-4ff86dae28ad",
          "name": "Connect Plus Therapy - 1166 River Avenue, Lakewood, NJ 08701",
          "country": null,
          "city": "Lakewood",
          "county": "",
          "line_1": "1166 River Avenue",
          "line_2": "",
          "postal_code": "08701",
          "postal_code_plus_4": null,
          "address_state": "NJ"
        },
        {
          "id": "fa6cc715-fd22-49a9-abdd-76751ff87327",
          "name": "Connect Plus Therapy - 1 Allison Drive (Aetna, Quest)",
          "country": null,
          "city": "Cherry Hill",
          "county": "",
          "line_1": "1 Allison Drive",
          "line_2": "",
          "postal_code": "08003",
          "postal_code_plus_4": null,
          "address_state": "NJ"
        }
      ],
      "lines_of_business": [
        {
          "id": "e8bfdbb9-32ac-4a4c-9704-8f64e0d6d66a",
          "label": "Commercial"
        }
      ],
      resourcetype:'NewProviderPayerEnrollmentServiceRequest'
    })
    .then(({ data }) => console.log(data))
    .catch(err => console.error(err));
}

medallion()