import medallionApi from "@api/medallion-api";
import type { FetchResponse } from "api/dist/core";
import {
  ApiV1OrgProvidersListProvidersMetadataParam,
  PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsResponse200,
} from "@api/medallion-api/types";

export async function getPayers(
  state: ApiV1OrgProvidersListProvidersMetadataParam["license_state"],
) {
  const res = await medallionApi.api_v1_org_providers_list_providers({
    license_state: state,
  });
  if (!res.data.results) return;
  //TODO: filter by region
  const payersArr: {
    res: Promise<
      FetchResponse<
        200,
        PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsResponse200
      >
    >;
    created: string;
  }[] = [];

  for (const provider of res.data.results) {
    const res2 =
      medallionApi.p_api_v1_service_requests_payer_enrollments_list_payerEnrollmentServiceRequests(
        { provider: provider.id },
      );
    payersArr.push({
      res: res2,
      created: provider.created,
    });
  }
  const results = await Promise.all(payersArr.map((item) => item.res));
  const combinedResults = payersArr.map((item, index) => ({
    created: item.created,
    res: results[index],
  }));
  return combinedResults.flatMap((com) => getPayerObjArr(com.res, com.created));
}

function getPayerObjArr(
  res: FetchResponse<
    200,
    PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsResponse200
  >,
  created: string,
) {
  return res.data.results?.map((payer) => ({
    id: payer.id,
    name: payer.payer_name,
    payerPracticeAddresses: payer.practices?.map((pract) => pract.name),
    providerCreationDate: created,
  }));
}
