import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { getPayers } from "../api";
import { ApiV1OrgProvidersListProvidersMetadataParam } from "@api/medallion-api/types";

async function handleGetPayers(
  request: HttpRequest,
): Promise<HttpResponseInit> {
  const { state } = request.params as unknown as {
    state: ApiV1OrgProvidersListProvidersMetadataParam["license_state"];
  };
  try {
    const payers = await getPayers(state);
    if (!payers) {
      throw new Error("Failed to get Payors");
    }
    return { body: JSON.stringify(payers) };
  } catch (error) {
    return { body: JSON.stringify(error) };
  }
}

app.http("payers", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: handleGetPayers,
  route: "payers/{state}",
});
