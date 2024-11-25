import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getPayers } from "../api";
import { ApiV1OrgProvidersListProvidersMetadataParam } from "@api/medallion-api/types";

async function handleGetPayers(request: HttpRequest): Promise<HttpResponseInit> {
    const { state } = request.params as unknown as { state: ApiV1OrgProvidersListProvidersMetadataParam['license_state'] } 
    const payers = await getPayers(state)
    return { body: JSON.stringify(payers), status: 200 }
}

app.http('payers', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: handleGetPayers,
    route: 'payers/{state}'
})
