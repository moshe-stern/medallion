import type * as types from './types'
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas'
import APICore from 'api/dist/core'
declare class SDK {
     spec: Oas
     core: APICore
     constructor()
     /**
      * Optionally configure various options that the SDK allows.
      *
      * @param config Object of supported SDK options and toggles.
      * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
      * should be represented in milliseconds.
      */
     config(config: ConfigOptions): void
     /**
      * If the API you're using requires authentication you can supply the required credentials
      * through this method and the library will magically determine how they should be used
      * within your API request.
      *
      * With the exception of OpenID and MutualTLS, it supports all forms of authentication
      * supported by the OpenAPI specification.
      *
      * @example <caption>HTTP Basic auth</caption>
      * sdk.auth('username', 'password');
      *
      * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
      * sdk.auth('myBearerToken');
      *
      * @example <caption>API Keys</caption>
      * sdk.auth('myApiKey');
      *
      * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
      * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
      * @param values Your auth credentials for the API; can specify up to two strings or numbers.
      */
     auth(...values: string[] | number[]): this
     /**
      * If the API you're using offers alternate server URLs, and server variables, you can tell
      * the SDK which one to use with this method. To use it you can supply either one of the
      * server URLs that are contained within the OpenAPI definition (along with any server
      * variables), or you can pass it a fully qualified URL to use (that may or may not exist
      * within the OpenAPI definition).
      *
      * @example <caption>Server URL with server variables</caption>
      * sdk.server('https://{region}.api.example.com/{basePath}', {
      *   name: 'eu',
      *   basePath: 'v14',
      * });
      *
      * @example <caption>Fully qualified server URL</caption>
      * sdk.server('https://eu.api.example.com/v14');
      *
      * @param url Server URL
      * @param variables An object of variables to replace into the server URL.
      */
     server(url: string, variables?: {}): void
     /**
      * List provider additional names across org
      *
      * @summary GET Org Additional Names
      */
     api_v1_org_additional_names_list_additionalNames(
          metadata?: types.ApiV1OrgAdditionalNamesListAdditionalNamesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgAdditionalNamesListAdditionalNamesResponse200
          >
     >
     /**
      * List board certificates
      *
      * @summary GET Board Certificates
      */
     api_v1_org_board_certificates_list_boardCertificates(
          metadata?: types.ApiV1OrgBoardCertificatesListBoardCertificatesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgBoardCertificatesListBoardCertificatesResponse200
          >
     >
     /**
      * Create a new board certificate
      *
      * @summary POST a Board Certificate
      */
     api_v1_org_board_certificates_create_boardCertificates(
          body: types.ApiV1OrgBoardCertificatesCreateBoardCertificatesBodyParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgBoardCertificatesCreateBoardCertificatesResponse201
          >
     >
     /**
      * Get a board certificate
      *
      * @summary GET a Board Certificate
      */
     api_v1_org_board_certificates_retrieve_boardCertificates(
          metadata: types.ApiV1OrgBoardCertificatesRetrieveBoardCertificatesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgBoardCertificatesRetrieveBoardCertificatesResponse200
          >
     >
     /**
      * Modify an existing board certificate
      *
      * @summary PATCH a Board Certificate
      */
     api_v1_org_board_certificates_partial_update_boardCertificates(
          body: types.ApiV1OrgBoardCertificatesPartialUpdateBoardCertificatesBodyParam,
          metadata: types.ApiV1OrgBoardCertificatesPartialUpdateBoardCertificatesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgBoardCertificatesPartialUpdateBoardCertificatesResponse200
          >
     >
     api_v1_org_board_certificates_partial_update_boardCertificates(
          metadata: types.ApiV1OrgBoardCertificatesPartialUpdateBoardCertificatesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgBoardCertificatesPartialUpdateBoardCertificatesResponse200
          >
     >
     /**
      * Delete a board certificate
      *
      * @summary DELETE a Board Certificate
      */
     api_v1_org_board_certificates_destroy_boardCertificates(
          metadata: types.ApiV1OrgBoardCertificatesDestroyBoardCertificatesMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List cme credits
      *
      * @summary GET Cme Credits
      */
     api_v1_org_cme_credits_list_cmeCredits(
          metadata?: types.ApiV1OrgCmeCreditsListCmeCreditsMetadataParam
     ): Promise<
          FetchResponse<200, types.ApiV1OrgCmeCreditsListCmeCreditsResponse200>
     >
     /**
      * Create a new cme credit
      *
      * @summary POST a Cme Credit
      */
     api_v1_org_cme_credits_create_cmeCredits(
          body: types.ApiV1OrgCmeCreditsCreateCmeCreditsBodyParam,
          metadata?: types.ApiV1OrgCmeCreditsCreateCmeCreditsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgCmeCreditsCreateCmeCreditsResponse201
          >
     >
     /**
      * Get a cme credit
      *
      * @summary GET a Cme Credit
      */
     api_v1_org_cme_credits_retrieve_cmeCredits(
          metadata: types.ApiV1OrgCmeCreditsRetrieveCmeCreditsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgCmeCreditsRetrieveCmeCreditsResponse200
          >
     >
     /**
      * Modify an existing cme credit
      *
      * @summary PATCH a Cme Credit
      */
     api_v1_org_cme_credits_partial_update_cmeCredits(
          body: types.ApiV1OrgCmeCreditsPartialUpdateCmeCreditsBodyParam,
          metadata: types.ApiV1OrgCmeCreditsPartialUpdateCmeCreditsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgCmeCreditsPartialUpdateCmeCreditsResponse200
          >
     >
     api_v1_org_cme_credits_partial_update_cmeCredits(
          metadata: types.ApiV1OrgCmeCreditsPartialUpdateCmeCreditsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgCmeCreditsPartialUpdateCmeCreditsResponse200
          >
     >
     /**
      * Delete a cme credit
      *
      * @summary DELETE a Cme Credit
      */
     api_v1_org_cme_credits_destroy_cmeCredits(
          metadata: types.ApiV1OrgCmeCreditsDestroyCmeCreditsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List licenses
      *
      * @summary GET Licenses
      */
     api_v1_org_licenses_list_licenses(
          metadata?: types.ApiV1OrgLicensesListLicensesMetadataParam
     ): Promise<
          FetchResponse<200, types.ApiV1OrgLicensesListLicensesResponse200>
     >
     /**
      * Create a new license
      *
      * @summary POST a License
      */
     api_v1_org_licenses_create_licenses(
          body: types.ApiV1OrgLicensesCreateLicensesBodyParam
     ): Promise<
          FetchResponse<200, types.ApiV1OrgLicensesCreateLicensesResponse200>
     >
     /**
      * Bulk update existing licenses
      *
      * @summary PATCH Licenses
      */
     api_v1_org_licenses_partial_update_licenses(
          body?: types.ApiV1OrgLicensesPartialUpdateLicensesBodyParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgLicensesPartialUpdateLicensesResponse200
          >
     >
     /**
      * Get a license
      *
      * @summary GET a License
      */
     api_v1_org_licenses_retrieve_licenses(
          metadata: types.ApiV1OrgLicensesRetrieveLicensesMetadataParam
     ): Promise<
          FetchResponse<200, types.ApiV1OrgLicensesRetrieveLicensesResponse200>
     >
     /**
      * Modify an existing license
      *
      * @summary PATCH a License
      */
     api_v1_org_licenses_detail_partial_update(
          body: types.ApiV1OrgLicensesDetailPartialUpdateBodyParam,
          metadata: types.ApiV1OrgLicensesDetailPartialUpdateMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgLicensesDetailPartialUpdateResponse200
          >
     >
     api_v1_org_licenses_detail_partial_update(
          metadata: types.ApiV1OrgLicensesDetailPartialUpdateMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgLicensesDetailPartialUpdateResponse200
          >
     >
     /**
      * Delete a license
      *
      * @summary DELETE a License
      */
     api_v1_org_licenses_destroy_licenses(
          metadata: types.ApiV1OrgLicensesDestroyLicensesMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List the historical updates made to a license
      *
      * @summary GET License History
      */
     api_v1_org_licenses_history_list_licenses(
          metadata: types.ApiV1OrgLicensesHistoryListLicensesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgLicensesHistoryListLicensesResponse200
          >
     >
     /**
      * List the historical updates made to all org licenses
      *
      * @summary GET Licenses History
      */
     api_v1_org_licenses_bulk_history_list_licenses(
          metadata?: types.ApiV1OrgLicensesBulkHistoryListLicensesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgLicensesBulkHistoryListLicensesResponse200
          >
     >
     /**
      * List org medical programs
      *
      * @summary GET Org Medical Programs
      */
     api_v1_org_medical_programs_list_medicalPrograms(
          metadata?: types.ApiV1OrgMedicalProgramsListMedicalProgramsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgMedicalProgramsListMedicalProgramsResponse200
          >
     >
     /**
      * List practices
      *
      * @summary GET Practices
      */
     api_v1_org_practices_list_practices(
          metadata?: types.ApiV1OrgPracticesListPracticesMetadataParam
     ): Promise<
          FetchResponse<200, types.ApiV1OrgPracticesListPracticesResponse200>
     >
     /**
      * Create a new practice
      *
      * @summary POST a Practice
      */
     api_v1_org_practices_create_practices(
          body: types.ApiV1OrgPracticesCreatePracticesBodyParam,
          metadata?: types.ApiV1OrgPracticesCreatePracticesMetadataParam
     ): Promise<
          FetchResponse<201, types.ApiV1OrgPracticesCreatePracticesResponse201>
     >
     /**
      * Get a practice
      *
      * @summary GET a Practice
      */
     api_v1_org_practices_retrieve_practices(
          metadata: types.ApiV1OrgPracticesRetrievePracticesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgPracticesRetrievePracticesResponse200
          >
     >
     /**
      * Modify an existing practice
      *
      * @summary PATCH a Practice
      */
     api_v1_org_practices_partial_update_practices(
          body: types.ApiV1OrgPracticesPartialUpdatePracticesBodyParam,
          metadata: types.ApiV1OrgPracticesPartialUpdatePracticesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgPracticesPartialUpdatePracticesResponse200
          >
     >
     api_v1_org_practices_partial_update_practices(
          metadata: types.ApiV1OrgPracticesPartialUpdatePracticesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgPracticesPartialUpdatePracticesResponse200
          >
     >
     /**
      * List provider practice associations
      *
      * @summary GET Provider Practice Associations
      */
     api_v1_org_provider_practice_associations_list_practices(
          metadata?: types.ApiV1OrgProviderPracticeAssociationsListPracticesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProviderPracticeAssociationsListPracticesResponse200
          >
     >
     /**
      * Create a new provider practice association
      *
      * @summary POST a Provider Practice Association
      */
     api_v1_org_provider_practice_associations_create_practices(
          body: types.ApiV1OrgProviderPracticeAssociationsCreatePracticesBodyParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProviderPracticeAssociationsCreatePracticesResponse201
          >
     >
     /**
      * Get a provider practice association
      *
      * @summary GET a Provider Practice Association
      */
     api_v1_org_provider_practice_associations_retrieve_practices(
          metadata: types.ApiV1OrgProviderPracticeAssociationsRetrievePracticesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProviderPracticeAssociationsRetrievePracticesResponse200
          >
     >
     /**
      * Modify an existing provider practice association
      *
      * @summary PATCH a Provider Practice Association
      */
     api_v1_org_provider_practice_associations_partial_update_practices(
          body: types.ApiV1OrgProviderPracticeAssociationsPartialUpdatePracticesBodyParam,
          metadata: types.ApiV1OrgProviderPracticeAssociationsPartialUpdatePracticesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProviderPracticeAssociationsPartialUpdatePracticesResponse200
          >
     >
     api_v1_org_provider_practice_associations_partial_update_practices(
          metadata: types.ApiV1OrgProviderPracticeAssociationsPartialUpdatePracticesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProviderPracticeAssociationsPartialUpdatePracticesResponse200
          >
     >
     /**
      * Delete a provider practice association
      *
      * @summary DELETE a Provider Practice Association
      */
     api_v1_org_provider_practice_associations_destroy_practices(
          metadata: types.ApiV1OrgProviderPracticeAssociationsDestroyPracticesMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List providers
      *
      * @summary GET Providers
      */
     api_v1_org_providers_list_providers(
          metadata?: types.ApiV1OrgProvidersListProvidersMetadataParam
     ): Promise<
          FetchResponse<200, types.ApiV1OrgProvidersListProvidersResponse200>
     >
     /**
      * Get a provider
      *
      * @summary GET a Provider
      */
     api_v1_org_providers_retrieve_providers(
          metadata: types.ApiV1OrgProvidersRetrieveProvidersMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersRetrieveProvidersResponse200
          >
     >
     /**
      * Modify an existing provider
      *
      * @summary PATCH a Provider
      */
     api_v1_org_providers_partial_update_providers(
          body: types.ApiV1OrgProvidersPartialUpdateProvidersBodyParam,
          metadata: types.ApiV1OrgProvidersPartialUpdateProvidersMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersPartialUpdateProvidersResponse200
          >
     >
     api_v1_org_providers_partial_update_providers(
          metadata: types.ApiV1OrgProvidersPartialUpdateProvidersMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersPartialUpdateProvidersResponse200
          >
     >
     /**
      * List provider additional names
      *
      * @summary GET Provider Additional Names
      */
     api_v1_org_providers_additional_names_list_additionalNames(
          metadata: types.ApiV1OrgProvidersAdditionalNamesListAdditionalNamesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersAdditionalNamesListAdditionalNamesResponse200
          >
     >
     /**
      * Create a new additional name
      *
      * @summary POST an Additional Name
      */
     api_v1_org_providers_additional_names_create_additionalNames(
          body: types.ApiV1OrgProvidersAdditionalNamesCreateAdditionalNamesBodyParam,
          metadata: types.ApiV1OrgProvidersAdditionalNamesCreateAdditionalNamesMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersAdditionalNamesCreateAdditionalNamesResponse201
          >
     >
     /**
      * Get a additional name
      *
      * @summary GET an Additional Name
      */
     api_v1_org_providers_additional_names_retrieve_additionalNames(
          metadata: types.ApiV1OrgProvidersAdditionalNamesRetrieveAdditionalNamesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersAdditionalNamesRetrieveAdditionalNamesResponse200
          >
     >
     /**
      * Modify an existing additional name
      *
      * @summary PATCH an Additional Name
      */
     api_v1_org_providers_additional_names_partial_update_additionalNames(
          body: types.ApiV1OrgProvidersAdditionalNamesPartialUpdateAdditionalNamesBodyParam,
          metadata: types.ApiV1OrgProvidersAdditionalNamesPartialUpdateAdditionalNamesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersAdditionalNamesPartialUpdateAdditionalNamesResponse200
          >
     >
     api_v1_org_providers_additional_names_partial_update_additionalNames(
          metadata: types.ApiV1OrgProvidersAdditionalNamesPartialUpdateAdditionalNamesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersAdditionalNamesPartialUpdateAdditionalNamesResponse200
          >
     >
     /**
      * Delete a additional name
      *
      * @summary DELETE an Additional Name
      */
     api_v1_org_providers_additional_names_destroy_additionalNames(
          metadata: types.ApiV1OrgProvidersAdditionalNamesDestroyAdditionalNamesMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List addresses
      *
      * @summary GET Addresses
      */
     api_v1_org_providers_addresses_list_addresses(
          metadata: types.ApiV1OrgProvidersAddressesListAddressesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersAddressesListAddressesResponse200
          >
     >
     /**
      * Create a new address
      *
      * @summary POST an Addresse
      */
     api_v1_org_providers_addresses_create_addresses(
          body: types.ApiV1OrgProvidersAddressesCreateAddressesBodyParam,
          metadata: types.ApiV1OrgProvidersAddressesCreateAddressesMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersAddressesCreateAddressesResponse201
          >
     >
     /**
      * Get an address
      *
      * @summary GET an Addresse
      */
     api_v1_org_providers_addresses_retrieve_addresses(
          metadata: types.ApiV1OrgProvidersAddressesRetrieveAddressesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersAddressesRetrieveAddressesResponse200
          >
     >
     /**
      * Modify an existing address
      *
      * @summary PATCH an Addresse
      */
     api_v1_org_providers_addresses_partial_update_addresses(
          body: types.ApiV1OrgProvidersAddressesPartialUpdateAddressesBodyParam,
          metadata: types.ApiV1OrgProvidersAddressesPartialUpdateAddressesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersAddressesPartialUpdateAddressesResponse200
          >
     >
     api_v1_org_providers_addresses_partial_update_addresses(
          metadata: types.ApiV1OrgProvidersAddressesPartialUpdateAddressesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersAddressesPartialUpdateAddressesResponse200
          >
     >
     /**
      * Delete an address
      *
      * @summary DELETE an Addresse
      */
     api_v1_org_providers_addresses_destroy_addresses(
          metadata: types.ApiV1OrgProvidersAddressesDestroyAddressesMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List collaborative agreements
      *
      * @summary GET Collaborative Agreements
      */
     api_v1_org_providers_collaborative_agreements_list_collaborativeAgreements(
          metadata: types.ApiV1OrgProvidersCollaborativeAgreementsListCollaborativeAgreementsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersCollaborativeAgreementsListCollaborativeAgreementsResponse200
          >
     >
     /**
      * Create a new Collaborative Agreement. Either `supervisor_id` or `name` must be
      * specified.
      *
      * @summary POST a Collaborative Agreement
      */
     api_v1_org_providers_collaborative_agreements_create_collaborativeAgreements(
          body: types.ApiV1OrgProvidersCollaborativeAgreementsCreateCollaborativeAgreementsBodyParam,
          metadata: types.ApiV1OrgProvidersCollaborativeAgreementsCreateCollaborativeAgreementsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersCollaborativeAgreementsCreateCollaborativeAgreementsResponse201
          >
     >
     api_v1_org_providers_collaborative_agreements_create_collaborativeAgreements(
          metadata: types.ApiV1OrgProvidersCollaborativeAgreementsCreateCollaborativeAgreementsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersCollaborativeAgreementsCreateCollaborativeAgreementsResponse201
          >
     >
     /**
      * Get a collaborative agreement
      *
      * @summary GET a Collaborative Agreement
      */
     api_v1_org_providers_collaborative_agreements_retrieve_collaborativeAgreements(
          metadata: types.ApiV1OrgProvidersCollaborativeAgreementsRetrieveCollaborativeAgreementsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersCollaborativeAgreementsRetrieveCollaborativeAgreementsResponse200
          >
     >
     /**
      * Modify an existing collaborative agreement. Either `supervisor_id`, `name`, or a valid
      * instance with a non-empty `name` is required.
      *
      * @summary PATCH a Collaborative Agreement
      */
     api_v1_org_providers_collaborative_agreements_partial_update_collaborativeAgreements(
          body: types.ApiV1OrgProvidersCollaborativeAgreementsPartialUpdateCollaborativeAgreementsBodyParam,
          metadata: types.ApiV1OrgProvidersCollaborativeAgreementsPartialUpdateCollaborativeAgreementsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersCollaborativeAgreementsPartialUpdateCollaborativeAgreementsResponse200
          >
     >
     api_v1_org_providers_collaborative_agreements_partial_update_collaborativeAgreements(
          metadata: types.ApiV1OrgProvidersCollaborativeAgreementsPartialUpdateCollaborativeAgreementsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersCollaborativeAgreementsPartialUpdateCollaborativeAgreementsResponse200
          >
     >
     /**
      * Delete a collaborative agreement
      *
      * @summary DELETE a Collaborative Agreement
      */
     api_v1_org_providers_collaborative_agreements_destroy_collaborativeAgreements(
          metadata: types.ApiV1OrgProvidersCollaborativeAgreementsDestroyCollaborativeAgreementsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List provider documents. To retrieve the Documents themselves, fetch a
      * `time_limited_url` from the [Documents](p_api_v1_documents_retrieve_documents) endpoint
      *
      * @summary GET Provider Documents
      */
     api_v1_org_providers_documents_list_providerDocuments(
          metadata: types.ApiV1OrgProvidersDocumentsListProviderDocumentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersDocumentsListProviderDocumentsResponse200
          >
     >
     /**
      * To upload a new Document to a Provider, POST a valid image or PDF file as the `content`:
      *
      *     headers = {"Accept": "application/json", "x-api-key": "YOUR-API-KEY"}
      *     provider_pk = "<PROVIDER ID>"
      *     with open("./filename.pdf", "rb") as f:
      *         data = {"title": "Provider Resume", "kind": "cv"}
      *         files = [("content", f)]
      *         response = requests.post(
      *             f"https://api.medallion.co/api/v1/org/providers/{provider_pk}/documents/",
      *             headers=headers,
      *             data=data,
      *             files=files,
      *         )
      *         response.raise_for_status()
      *
      *
      * @summary POST a Provider Document
      */
     api_v1_org_providers_documents_create_providerDocuments(
          body: types.ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam,
          metadata: types.ApiV1OrgProvidersDocumentsCreateProviderDocumentsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersDocumentsCreateProviderDocumentsResponse201
          >
     >
     /**
      * Get a provider document. To retrieve the Document itself, fetch a `time_limited_url`
      * from the [Documents](p_api_v1_documents_retrieve_documents) endpoint
      *
      * @summary GET a Provider Document
      */
     api_v1_org_providers_documents_retrieve_providerDocuments(
          metadata: types.ApiV1OrgProvidersDocumentsRetrieveProviderDocumentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersDocumentsRetrieveProviderDocumentsResponse200
          >
     >
     /**
      * Modify an existing provider document
      *
      * @summary PATCH a Provider Document
      */
     api_v1_org_providers_documents_partial_update_providerDocuments(
          body: types.ApiV1OrgProvidersDocumentsPartialUpdateProviderDocumentsBodyParam,
          metadata: types.ApiV1OrgProvidersDocumentsPartialUpdateProviderDocumentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersDocumentsPartialUpdateProviderDocumentsResponse200
          >
     >
     api_v1_org_providers_documents_partial_update_providerDocuments(
          metadata: types.ApiV1OrgProvidersDocumentsPartialUpdateProviderDocumentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersDocumentsPartialUpdateProviderDocumentsResponse200
          >
     >
     /**
      * Delete a provider document
      *
      * @summary DELETE a Provider Document
      */
     api_v1_org_providers_documents_destroy_providerDocuments(
          metadata: types.ApiV1OrgProvidersDocumentsDestroyProviderDocumentsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List educations
      *
      * @summary GET Educations
      */
     api_v1_org_providers_educations_list_educations(
          metadata: types.ApiV1OrgProvidersEducationsListEducationsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersEducationsListEducationsResponse200
          >
     >
     /**
      * Create a new education
      *
      * @summary POST an Education
      */
     api_v1_org_providers_educations_create_educations(
          body: types.ApiV1OrgProvidersEducationsCreateEducationsBodyParam,
          metadata: types.ApiV1OrgProvidersEducationsCreateEducationsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersEducationsCreateEducationsResponse201
          >
     >
     /**
      * Get a education
      *
      * @summary GET an Education
      */
     api_v1_org_providers_educations_retrieve_educations(
          metadata: types.ApiV1OrgProvidersEducationsRetrieveEducationsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersEducationsRetrieveEducationsResponse200
          >
     >
     /**
      * Modify an existing education
      *
      * @summary PATCH an Education
      */
     api_v1_org_providers_educations_partial_update_educations(
          body: types.ApiV1OrgProvidersEducationsPartialUpdateEducationsBodyParam,
          metadata: types.ApiV1OrgProvidersEducationsPartialUpdateEducationsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersEducationsPartialUpdateEducationsResponse200
          >
     >
     api_v1_org_providers_educations_partial_update_educations(
          metadata: types.ApiV1OrgProvidersEducationsPartialUpdateEducationsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersEducationsPartialUpdateEducationsResponse200
          >
     >
     /**
      * Delete a education
      *
      * @summary DELETE an Education
      */
     api_v1_org_providers_educations_destroy_educations(
          metadata: types.ApiV1OrgProvidersEducationsDestroyEducationsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List exams
      *
      * @summary GET Exams
      */
     api_v1_org_providers_exams_list_exams(
          metadata: types.ApiV1OrgProvidersExamsListExamsMetadataParam
     ): Promise<
          FetchResponse<200, types.ApiV1OrgProvidersExamsListExamsResponse200>
     >
     /**
      * Create a new exam
      *
      * @summary POST an Exam
      */
     api_v1_org_providers_exams_create_exams(
          body: types.ApiV1OrgProvidersExamsCreateExamsBodyParam,
          metadata: types.ApiV1OrgProvidersExamsCreateExamsMetadataParam
     ): Promise<
          FetchResponse<201, types.ApiV1OrgProvidersExamsCreateExamsResponse201>
     >
     api_v1_org_providers_exams_create_exams(
          metadata: types.ApiV1OrgProvidersExamsCreateExamsMetadataParam
     ): Promise<
          FetchResponse<201, types.ApiV1OrgProvidersExamsCreateExamsResponse201>
     >
     /**
      * Get a exam
      *
      * @summary GET an Exam
      */
     api_v1_org_providers_exams_retrieve_exams(
          metadata: types.ApiV1OrgProvidersExamsRetrieveExamsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersExamsRetrieveExamsResponse200
          >
     >
     /**
      * Modify an existing exam
      *
      * @summary PATCH an Exam
      */
     api_v1_org_providers_exams_partial_update_exams(
          body: types.ApiV1OrgProvidersExamsPartialUpdateExamsBodyParam,
          metadata: types.ApiV1OrgProvidersExamsPartialUpdateExamsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersExamsPartialUpdateExamsResponse200
          >
     >
     api_v1_org_providers_exams_partial_update_exams(
          metadata: types.ApiV1OrgProvidersExamsPartialUpdateExamsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersExamsPartialUpdateExamsResponse200
          >
     >
     /**
      * Delete a exam
      *
      * @summary DELETE an Exam
      */
     api_v1_org_providers_exams_destroy_exams(
          metadata: types.ApiV1OrgProvidersExamsDestroyExamsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List gap records
      *
      * @summary GET Gap Records
      */
     api_v1_org_providers_gap_records_list_gapRecords(
          metadata: types.ApiV1OrgProvidersGapRecordsListGapRecordsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersGapRecordsListGapRecordsResponse200
          >
     >
     /**
      * Create a new gap record
      *
      * @summary POST a Gap Record
      */
     api_v1_org_providers_gap_records_create_gapRecords(
          body: types.ApiV1OrgProvidersGapRecordsCreateGapRecordsBodyParam,
          metadata: types.ApiV1OrgProvidersGapRecordsCreateGapRecordsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersGapRecordsCreateGapRecordsResponse201
          >
     >
     /**
      * Get a gap record
      *
      * @summary GET a Gap Record
      */
     api_v1_org_providers_gap_records_retrieve_gapRecords(
          metadata: types.ApiV1OrgProvidersGapRecordsRetrieveGapRecordsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersGapRecordsRetrieveGapRecordsResponse200
          >
     >
     /**
      * Modify an existing gap record
      *
      * @summary PATCH a Gap Record
      */
     api_v1_org_providers_gap_records_partial_update_gapRecords(
          body: types.ApiV1OrgProvidersGapRecordsPartialUpdateGapRecordsBodyParam,
          metadata: types.ApiV1OrgProvidersGapRecordsPartialUpdateGapRecordsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersGapRecordsPartialUpdateGapRecordsResponse200
          >
     >
     api_v1_org_providers_gap_records_partial_update_gapRecords(
          metadata: types.ApiV1OrgProvidersGapRecordsPartialUpdateGapRecordsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersGapRecordsPartialUpdateGapRecordsResponse200
          >
     >
     /**
      * Delete a gap record
      *
      * @summary DELETE a Gap Record
      */
     api_v1_org_providers_gap_records_destroy_gapRecords(
          metadata: types.ApiV1OrgProvidersGapRecordsDestroyGapRecordsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List malpractice insurances
      *
      * @summary GET Malpractice Insurances
      */
     api_v1_org_providers_malpractice_insurances_list_malpracticeInsurances(
          metadata: types.ApiV1OrgProvidersMalpracticeInsurancesListMalpracticeInsurancesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMalpracticeInsurancesListMalpracticeInsurancesResponse200
          >
     >
     /**
      * Create a new malpractice insurance
      *
      * @summary POST a Malpractice Insurance
      */
     api_v1_org_providers_malpractice_insurances_create_malpracticeInsurances(
          body: types.ApiV1OrgProvidersMalpracticeInsurancesCreateMalpracticeInsurancesBodyParam,
          metadata: types.ApiV1OrgProvidersMalpracticeInsurancesCreateMalpracticeInsurancesMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersMalpracticeInsurancesCreateMalpracticeInsurancesResponse201
          >
     >
     /**
      * Get a malpractice insurance
      *
      * @summary GET a Malpractice Insurance
      */
     api_v1_org_providers_malpractice_insurances_retrieve_malpracticeInsurances(
          metadata: types.ApiV1OrgProvidersMalpracticeInsurancesRetrieveMalpracticeInsurancesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMalpracticeInsurancesRetrieveMalpracticeInsurancesResponse200
          >
     >
     /**
      * Modify an existing malpractice insurance
      *
      * @summary PATCH a Malpractice Insurance
      */
     api_v1_org_providers_malpractice_insurances_partial_update_malpracticeInsurances(
          body: types.ApiV1OrgProvidersMalpracticeInsurancesPartialUpdateMalpracticeInsurancesBodyParam,
          metadata: types.ApiV1OrgProvidersMalpracticeInsurancesPartialUpdateMalpracticeInsurancesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMalpracticeInsurancesPartialUpdateMalpracticeInsurancesResponse200
          >
     >
     api_v1_org_providers_malpractice_insurances_partial_update_malpracticeInsurances(
          metadata: types.ApiV1OrgProvidersMalpracticeInsurancesPartialUpdateMalpracticeInsurancesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMalpracticeInsurancesPartialUpdateMalpracticeInsurancesResponse200
          >
     >
     /**
      * Delete a malpractice insurance
      *
      * @summary DELETE a Malpractice Insurance
      */
     api_v1_org_providers_malpractice_insurances_destroy_malpracticeInsurances(
          metadata: types.ApiV1OrgProvidersMalpracticeInsurancesDestroyMalpracticeInsurancesMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List provider medical programs
      *
      * @summary GET Provider Medical Programs
      */
     api_v1_org_providers_medical_programs_list_medicalPrograms(
          metadata: types.ApiV1OrgProvidersMedicalProgramsListMedicalProgramsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMedicalProgramsListMedicalProgramsResponse200
          >
     >
     /**
      * Create a new medical program
      *
      * @summary POST a Medical Program
      */
     api_v1_org_providers_medical_programs_create_medicalPrograms(
          body: types.ApiV1OrgProvidersMedicalProgramsCreateMedicalProgramsBodyParam,
          metadata: types.ApiV1OrgProvidersMedicalProgramsCreateMedicalProgramsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersMedicalProgramsCreateMedicalProgramsResponse201
          >
     >
     /**
      * Get a medical program
      *
      * @summary GET a Medical Program
      */
     api_v1_org_providers_medical_programs_retrieve_medicalPrograms(
          metadata: types.ApiV1OrgProvidersMedicalProgramsRetrieveMedicalProgramsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMedicalProgramsRetrieveMedicalProgramsResponse200
          >
     >
     /**
      * Modify an existing medical program
      *
      * @summary PATCH a Medical Program
      */
     api_v1_org_providers_medical_programs_partial_update_medicalPrograms(
          body: types.ApiV1OrgProvidersMedicalProgramsPartialUpdateMedicalProgramsBodyParam,
          metadata: types.ApiV1OrgProvidersMedicalProgramsPartialUpdateMedicalProgramsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMedicalProgramsPartialUpdateMedicalProgramsResponse200
          >
     >
     api_v1_org_providers_medical_programs_partial_update_medicalPrograms(
          metadata: types.ApiV1OrgProvidersMedicalProgramsPartialUpdateMedicalProgramsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMedicalProgramsPartialUpdateMedicalProgramsResponse200
          >
     >
     /**
      * Delete a medical program
      *
      * @summary DELETE a Medical Program
      */
     api_v1_org_providers_medical_programs_destroy_medicalPrograms(
          metadata: types.ApiV1OrgProvidersMedicalProgramsDestroyMedicalProgramsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List military history records
      *
      * @summary GET Military History Records
      */
     api_v1_org_providers_military_history_records_list_militaryHistoryRecords(
          metadata: types.ApiV1OrgProvidersMilitaryHistoryRecordsListMilitaryHistoryRecordsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMilitaryHistoryRecordsListMilitaryHistoryRecordsResponse200
          >
     >
     /**
      * Create a new military history record
      *
      * @summary POST a Military History Record
      */
     api_v1_org_providers_military_history_records_create_militaryHistoryRecords(
          body: types.ApiV1OrgProvidersMilitaryHistoryRecordsCreateMilitaryHistoryRecordsBodyParam,
          metadata: types.ApiV1OrgProvidersMilitaryHistoryRecordsCreateMilitaryHistoryRecordsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersMilitaryHistoryRecordsCreateMilitaryHistoryRecordsResponse201
          >
     >
     /**
      * Get a military history record
      *
      * @summary GET a Military History Record
      */
     api_v1_org_providers_military_history_records_retrieve_militaryHistoryRecords(
          metadata: types.ApiV1OrgProvidersMilitaryHistoryRecordsRetrieveMilitaryHistoryRecordsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMilitaryHistoryRecordsRetrieveMilitaryHistoryRecordsResponse200
          >
     >
     /**
      * Modify an existing military history record
      *
      * @summary PATCH a Military History Record
      */
     api_v1_org_providers_military_history_records_partial_update_militaryHistoryRecords(
          body: types.ApiV1OrgProvidersMilitaryHistoryRecordsPartialUpdateMilitaryHistoryRecordsBodyParam,
          metadata: types.ApiV1OrgProvidersMilitaryHistoryRecordsPartialUpdateMilitaryHistoryRecordsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMilitaryHistoryRecordsPartialUpdateMilitaryHistoryRecordsResponse200
          >
     >
     api_v1_org_providers_military_history_records_partial_update_militaryHistoryRecords(
          metadata: types.ApiV1OrgProvidersMilitaryHistoryRecordsPartialUpdateMilitaryHistoryRecordsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersMilitaryHistoryRecordsPartialUpdateMilitaryHistoryRecordsResponse200
          >
     >
     /**
      * Delete a military history record
      *
      * @summary DELETE a Military History Record
      */
     api_v1_org_providers_military_history_records_destroy_militaryHistoryRecords(
          metadata: types.ApiV1OrgProvidersMilitaryHistoryRecordsDestroyMilitaryHistoryRecordsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List provider status
      *
      * @summary GET Provider Status
      */
     api_v1_org_providers_status_retrieve_providerStatus(
          metadata: types.ApiV1OrgProvidersStatusRetrieveProviderStatusMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersStatusRetrieveProviderStatusResponse200
          >
     >
     /**
      * List supervisors
      *
      * @summary GET Supervisors
      */
     api_v1_org_providers_supervisors_list_supervisors(
          metadata: types.ApiV1OrgProvidersSupervisorsListSupervisorsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersSupervisorsListSupervisorsResponse200
          >
     >
     /**
      * Create a new supervisor
      *
      * @summary POST a Supervisor
      */
     api_v1_org_providers_supervisors_create_supervisors(
          body: types.ApiV1OrgProvidersSupervisorsCreateSupervisorsBodyParam,
          metadata: types.ApiV1OrgProvidersSupervisorsCreateSupervisorsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersSupervisorsCreateSupervisorsResponse201
          >
     >
     /**
      * Get a supervisor
      *
      * @summary GET a Supervisor
      */
     api_v1_org_providers_supervisors_retrieve_supervisors(
          metadata: types.ApiV1OrgProvidersSupervisorsRetrieveSupervisorsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersSupervisorsRetrieveSupervisorsResponse200
          >
     >
     /**
      * Modify an existing supervisor
      *
      * @summary PATCH a Supervisor
      */
     api_v1_org_providers_supervisors_partial_update_supervisors(
          body: types.ApiV1OrgProvidersSupervisorsPartialUpdateSupervisorsBodyParam,
          metadata: types.ApiV1OrgProvidersSupervisorsPartialUpdateSupervisorsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersSupervisorsPartialUpdateSupervisorsResponse200
          >
     >
     api_v1_org_providers_supervisors_partial_update_supervisors(
          metadata: types.ApiV1OrgProvidersSupervisorsPartialUpdateSupervisorsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersSupervisorsPartialUpdateSupervisorsResponse200
          >
     >
     /**
      * Delete a supervisor
      *
      * @summary DELETE a Supervisor
      */
     api_v1_org_providers_supervisors_destroy_supervisors(
          metadata: types.ApiV1OrgProvidersSupervisorsDestroySupervisorsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List trainings
      *
      * @summary GET Trainings
      */
     api_v1_org_providers_trainings_list_trainings(
          metadata: types.ApiV1OrgProvidersTrainingsListTrainingsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersTrainingsListTrainingsResponse200
          >
     >
     /**
      * Create a new training
      *
      * @summary POST a Training
      */
     api_v1_org_providers_trainings_create_trainings(
          body: types.ApiV1OrgProvidersTrainingsCreateTrainingsBodyParam,
          metadata: types.ApiV1OrgProvidersTrainingsCreateTrainingsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersTrainingsCreateTrainingsResponse201
          >
     >
     /**
      * Get a training
      *
      * @summary GET a Training
      */
     api_v1_org_providers_trainings_retrieve_trainings(
          metadata: types.ApiV1OrgProvidersTrainingsRetrieveTrainingsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersTrainingsRetrieveTrainingsResponse200
          >
     >
     /**
      * Modify an existing training
      *
      * @summary PATCH a Training
      */
     api_v1_org_providers_trainings_partial_update_trainings(
          body: types.ApiV1OrgProvidersTrainingsPartialUpdateTrainingsBodyParam,
          metadata: types.ApiV1OrgProvidersTrainingsPartialUpdateTrainingsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersTrainingsPartialUpdateTrainingsResponse200
          >
     >
     api_v1_org_providers_trainings_partial_update_trainings(
          metadata: types.ApiV1OrgProvidersTrainingsPartialUpdateTrainingsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersTrainingsPartialUpdateTrainingsResponse200
          >
     >
     /**
      * Delete a training
      *
      * @summary DELETE a Training
      */
     api_v1_org_providers_trainings_destroy_trainings(
          metadata: types.ApiV1OrgProvidersTrainingsDestroyTrainingsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List work experiences
      *
      * @summary GET Work Experiences
      */
     api_v1_org_providers_work_experience_list_workExperience(
          metadata: types.ApiV1OrgProvidersWorkExperienceListWorkExperienceMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersWorkExperienceListWorkExperienceResponse200
          >
     >
     /**
      * Create a new work experience
      *
      * @summary POST a Work Experience
      */
     api_v1_org_providers_work_experience_create_workExperience(
          body: types.ApiV1OrgProvidersWorkExperienceCreateWorkExperienceBodyParam,
          metadata: types.ApiV1OrgProvidersWorkExperienceCreateWorkExperienceMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersWorkExperienceCreateWorkExperienceResponse201
          >
     >
     api_v1_org_providers_work_experience_create_workExperience(
          metadata: types.ApiV1OrgProvidersWorkExperienceCreateWorkExperienceMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.ApiV1OrgProvidersWorkExperienceCreateWorkExperienceResponse201
          >
     >
     /**
      * Get a work experience
      *
      * @summary GET a Work Experience
      */
     api_v1_org_providers_work_experience_retrieve_workExperience(
          metadata: types.ApiV1OrgProvidersWorkExperienceRetrieveWorkExperienceMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersWorkExperienceRetrieveWorkExperienceResponse200
          >
     >
     /**
      * Modify an existing work experience
      *
      * @summary PATCH a Work Experience
      */
     api_v1_org_providers_work_experience_partial_update_workExperience(
          body: types.ApiV1OrgProvidersWorkExperiencePartialUpdateWorkExperienceBodyParam,
          metadata: types.ApiV1OrgProvidersWorkExperiencePartialUpdateWorkExperienceMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersWorkExperiencePartialUpdateWorkExperienceResponse200
          >
     >
     api_v1_org_providers_work_experience_partial_update_workExperience(
          metadata: types.ApiV1OrgProvidersWorkExperiencePartialUpdateWorkExperienceMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1OrgProvidersWorkExperiencePartialUpdateWorkExperienceResponse200
          >
     >
     /**
      * Delete a work experience
      *
      * @summary DELETE a Work Experience
      */
     api_v1_org_providers_work_experience_destroy_workExperience(
          metadata: types.ApiV1OrgProvidersWorkExperienceDestroyWorkExperienceMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List service requests
      *
      * @summary GET Service Requests
      */
     api_v1_staff_service_requests_list_serviceRequests(
          metadata?: types.ApiV1StaffServiceRequestsListServiceRequestsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1StaffServiceRequestsListServiceRequestsResponse200
          >
     >
     /**
      * Bulk delete service requests
      *
      * @summary DELETE Service Requests
      */
     api_v1_staff_service_requests_destroy_serviceRequests(
          metadata?: types.ApiV1StaffServiceRequestsDestroyServiceRequestsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * Get a service request
      *
      * @summary GET a Service Request
      */
     api_v1_staff_service_requests_retrieve_serviceRequests(
          metadata: types.ApiV1StaffServiceRequestsRetrieveServiceRequestsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.ApiV1StaffServiceRequestsRetrieveServiceRequestsResponse200
          >
     >
     /**
      * Delete a service request
      *
      * @summary DELETE a Service Request
      */
     api_v1_staff_service_requests_detail_delete(
          metadata: types.ApiV1StaffServiceRequestsDetailDeleteMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * Create a new CAQH Data Request
      *
      * @summary POST CAQH Data Requests
      */
     p_api_v1_caqh_data_request_create_caqhDataRequest(
          body: types.PApiV1CaqhDataRequestCreateCaqhDataRequestBodyParam
     ): Promise<
          FetchResponse<
               201,
               types.PApiV1CaqhDataRequestCreateCaqhDataRequestResponse201
          >
     >
     /**
      * Fetch a link to a given Document. The link will only be active for 24 hours.  Use as,
      * e.g.:
      *
      *     headers = {"Accept": "application/json", "x-api-key": "YOUR-API-KEY"}
      *
      *     providers = requests.get(
      *         "https://api.medallion.co/api/v1/org/providers",
      *         params={"limit": 100, "license_state": "CA"},
      *         headers=headers,
      *     ).json()["results"]
      *     provider_id = providers[0]["id"]
      *
      *     licenses = requests.get(
      *         "https://api.medallion.co/api/v1/org/licenses",
      *         params={"limit": 100, "provider__id": provider_id},
      *         headers=headers,
      *     ).json()["results"]
      *     license_document_id = licenses[0]["document"]["id"]
      *
      *     response = requests.get(
      *         f"https://api.medallion.co/p/api/v1/doc-files/{license_document_id}",
      *         headers=headers,
      *     )
      *
      *     time_limited_url = response.json().get("time_limited_url")
      *     file_response = requests.get(time_limited_url)
      *
      *
      *     file_ext = urlparse(time_limited_url).path.split(".").pop(1)
      *     with open(f"{license_document_id}.{file_type}", 'wb') as out:
      *         out.write(response.content)
      *
      *
      * @summary GET Document link
      */
     p_api_v1_documents_retrieve_documents(
          metadata: types.PApiV1DocumentsRetrieveDocumentsMetadataParam
     ): Promise<
          FetchResponse<200, types.PApiV1DocumentsRetrieveDocumentsResponse200>
     >
     /**
      * List employees
      *
      * @summary GET Employees
      */
     p_api_v1_employees_list_employees(
          metadata?: types.PApiV1EmployeesListEmployeesMetadataParam
     ): Promise<
          FetchResponse<200, types.PApiV1EmployeesListEmployeesResponse200>
     >
     /**
      * Update an employee
      *
      * @summary Employee Update
      */
     p_api_v1_employees_partial_update_employees(
          body: types.PApiV1EmployeesPartialUpdateEmployeesBodyParam,
          metadata: types.PApiV1EmployeesPartialUpdateEmployeesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1EmployeesPartialUpdateEmployeesResponse200
          >
     >
     p_api_v1_employees_partial_update_employees(
          metadata: types.PApiV1EmployeesPartialUpdateEmployeesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1EmployeesPartialUpdateEmployeesResponse200
          >
     >
     /**
      * Activate an employee
      *
      * @summary Employee Activation
      */
     p_api_v1_employees_activation_create_employees(
          metadata: types.PApiV1EmployeesActivationCreateEmployeesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1EmployeesActivationCreateEmployeesResponse200
          >
     >
     /**
      * Deactivate an employee
      *
      * @summary Employee Deactivation
      */
     p_api_v1_employees_deactivation_create_employees(
          metadata: types.PApiV1EmployeesDeactivationCreateEmployeesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1EmployeesDeactivationCreateEmployeesResponse200
          >
     >
     /**
      * Suppress ongoing monitoring alerts
      *
      * @summary Ongoing Monitoring Alert Suppression
      */
     p_api_v1_employees_ongoing_monitoring_alert_suppression_create_employees(
          metadata: types.PApiV1EmployeesOngoingMonitoringAlertSuppressionCreateEmployeesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1EmployeesOngoingMonitoringAlertSuppressionCreateEmployeesResponse200
          >
     >
     /**
      * Unsuppress ongoing monitoring alerts
      *
      * @summary Ongoing Monitoring Alert Unsuppresion
      */
     p_api_v1_employees_ongoing_monitoring_alert_unsuppression_create_employees(
          metadata: types.PApiV1EmployeesOngoingMonitoringAlertUnsuppressionCreateEmployeesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1EmployeesOngoingMonitoringAlertUnsuppressionCreateEmployeesResponse200
          >
     >
     /**
      * Bulk onboard or update employees
      *
      * @summary Bulk Onboarding
      * @throws FetchError<400, types.PApiV1EmployeesBulkOnboardingCreateEmployeesResponse400> Invalid employee information. Please check your data and re-request onboarding.
      */
     p_api_v1_employees_bulk_onboarding_create_employees(
          body: types.PApiV1EmployeesBulkOnboardingCreateEmployeesBodyParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List facilities
      *
      * @summary GET Facilities
      */
     p_api_v1_facilities_list_facilities(
          metadata?: types.PApiV1FacilitiesListFacilitiesMetadataParam
     ): Promise<
          FetchResponse<200, types.PApiV1FacilitiesListFacilitiesResponse200>
     >
     /**
      * Create a new facility
      *
      * @summary POST a Facility
      */
     p_api_v1_facilities_create_facilities(
          body: types.PApiV1FacilitiesCreateFacilitiesBodyParam
     ): Promise<
          FetchResponse<201, types.PApiV1FacilitiesCreateFacilitiesResponse201>
     >
     /**
      * Get a facility
      *
      * @summary GET a Facility
      */
     p_api_v1_facilities_retrieve_facilities(
          metadata: types.PApiV1FacilitiesRetrieveFacilitiesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1FacilitiesRetrieveFacilitiesResponse200
          >
     >
     /**
      * Modify an existing facility
      *
      * @summary PATCH a Facility
      */
     p_api_v1_facilities_partial_update_facilities(
          body: types.PApiV1FacilitiesPartialUpdateFacilitiesBodyParam,
          metadata: types.PApiV1FacilitiesPartialUpdateFacilitiesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1FacilitiesPartialUpdateFacilitiesResponse200
          >
     >
     p_api_v1_facilities_partial_update_facilities(
          metadata: types.PApiV1FacilitiesPartialUpdateFacilitiesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1FacilitiesPartialUpdateFacilitiesResponse200
          >
     >
     /**
      * Delete a facility
      *
      * @summary DELETE a Facility
      */
     p_api_v1_facilities_destroy_facilities(
          metadata: types.PApiV1FacilitiesDestroyFacilitiesMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List group profiles
      *
      * @summary GET Group Profiles
      */
     p_api_v1_group_profiles_list_groupProfiles(
          metadata?: types.PApiV1GroupProfilesListGroupProfilesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1GroupProfilesListGroupProfilesResponse200
          >
     >
     /**
      * Create a new group profile
      *
      * @summary POST a Group Profile
      */
     p_api_v1_group_profiles_create_groupProfiles(
          body: types.PApiV1GroupProfilesCreateGroupProfilesBodyParam
     ): Promise<
          FetchResponse<
               201,
               types.PApiV1GroupProfilesCreateGroupProfilesResponse201
          >
     >
     /**
      * List group profile documents. To retrieve the Documents themselves, fetch a
      * `time_limited_url` from the [Documents](p_api_v1_documents_retrieve_documents) endpoint
      *
      * @summary GET Group Profile Documents
      */
     p_api_v1_group_profiles_documents_list_groupProfileDocuments(
          metadata: types.PApiV1GroupProfilesDocumentsListGroupProfileDocumentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1GroupProfilesDocumentsListGroupProfileDocumentsResponse200
          >
     >
     /**
      * To upload a new Document to a Group Profile, POST a valid image or PDF file as the
      * `content`:
      *
      *     headers = {"Accept": "application/json", "x-api-key": "YOUR-API-KEY"}
      *     group_profile_pk = "<GROUP PROFILE ID>"
      *     with open("./filename.pdf", "rb") as f:
      *         data = {"title": "Insurance", "kind": "malpractice_coi"}
      *         files = [("content", f)]
      *         response = requests.post(
      *
      * f"https://api.medallion.co/p/api/v1/group-profiles/{group_profile_pk}/documents/",
      *             headers=headers,
      *             data=data,
      *             files=files,
      *         )
      *         response.raise_for_status()
      *
      *
      * @summary POST a Group Profile Document
      */
     p_api_v1_group_profiles_documents_create_groupProfileDocuments(
          body: types.PApiV1GroupProfilesDocumentsCreateGroupProfileDocumentsBodyParam,
          metadata: types.PApiV1GroupProfilesDocumentsCreateGroupProfileDocumentsMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.PApiV1GroupProfilesDocumentsCreateGroupProfileDocumentsResponse201
          >
     >
     /**
      * Get a group profile document. To retrieve the Document itself, fetch a
      * `time_limited_url` from the [Documents](p_api_v1_documents_retrieve_documents) endpoint
      *
      * @summary GET a Group Profile Document
      */
     p_api_v1_group_profiles_documents_retrieve_groupProfileDocuments(
          metadata: types.PApiV1GroupProfilesDocumentsRetrieveGroupProfileDocumentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1GroupProfilesDocumentsRetrieveGroupProfileDocumentsResponse200
          >
     >
     /**
      * Modify an existing group profile document
      *
      * @summary PATCH a Group Profile Document
      */
     p_api_v1_group_profiles_documents_partial_update_groupProfileDocuments(
          body: types.PApiV1GroupProfilesDocumentsPartialUpdateGroupProfileDocumentsBodyParam,
          metadata: types.PApiV1GroupProfilesDocumentsPartialUpdateGroupProfileDocumentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1GroupProfilesDocumentsPartialUpdateGroupProfileDocumentsResponse200
          >
     >
     p_api_v1_group_profiles_documents_partial_update_groupProfileDocuments(
          metadata: types.PApiV1GroupProfilesDocumentsPartialUpdateGroupProfileDocumentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1GroupProfilesDocumentsPartialUpdateGroupProfileDocumentsResponse200
          >
     >
     /**
      * Delete a group profile document
      *
      * @summary DELETE a Group Profile Document
      */
     p_api_v1_group_profiles_documents_destroy_groupProfileDocuments(
          metadata: types.PApiV1GroupProfilesDocumentsDestroyGroupProfileDocumentsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * Get a group profile
      *
      * @summary GET a Group Profile
      */
     p_api_v1_group_profiles_retrieve_groupProfiles(
          metadata: types.PApiV1GroupProfilesRetrieveGroupProfilesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1GroupProfilesRetrieveGroupProfilesResponse200
          >
     >
     /**
      * Modify an existing group profile
      *
      * @summary PATCH a Group Profile
      */
     p_api_v1_group_profiles_partial_update_groupProfiles(
          body: types.PApiV1GroupProfilesPartialUpdateGroupProfilesBodyParam,
          metadata: types.PApiV1GroupProfilesPartialUpdateGroupProfilesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1GroupProfilesPartialUpdateGroupProfilesResponse200
          >
     >
     p_api_v1_group_profiles_partial_update_groupProfiles(
          metadata: types.PApiV1GroupProfilesPartialUpdateGroupProfilesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1GroupProfilesPartialUpdateGroupProfilesResponse200
          >
     >
     /**
      * Delete a group profile
      *
      * @summary DELETE a Group Profile
      */
     p_api_v1_group_profiles_destroy_groupProfiles(
          metadata: types.PApiV1GroupProfilesDestroyGroupProfilesMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List hospital affiliations
      *
      * @summary GET Hospital Affiliations
      */
     p_api_v1_hospital_affiliations_list_hospitalAffiliations(
          metadata?: types.PApiV1HospitalAffiliationsListHospitalAffiliationsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1HospitalAffiliationsListHospitalAffiliationsResponse200
          >
     >
     /**
      * Get a hospital affiliation
      *
      * @summary GET a Hospital Affiliation
      */
     p_api_v1_hospital_affiliations_retrieve_hospitalAffiliations(
          metadata: types.PApiV1HospitalAffiliationsRetrieveHospitalAffiliationsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1HospitalAffiliationsRetrieveHospitalAffiliationsResponse200
          >
     >
     /**
      * List lines of business
      *
      * @summary GET Lines Of Business
      */
     p_api_v1_lines_of_business_list_linesOfBusiness(
          metadata?: types.PApiV1LinesOfBusinessListLinesOfBusinessMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1LinesOfBusinessListLinesOfBusinessResponse200
          >
     >
     /**
      * List credentialing files
      *
      * @summary GET Credentialing Files
      */
     p_api_v1_organizations_credentialing_files_list_credentialing(
          metadata: types.PApiV1OrganizationsCredentialingFilesListCredentialingMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsCredentialingFilesListCredentialingResponse200
          >
     >
     /**
      * Get a credentialing file
      *
      * @summary GET a Credentialing File
      */
     p_api_v1_organizations_credentialing_files_retrieve_credentialing(
          metadata: types.PApiV1OrganizationsCredentialingFilesRetrieveCredentialingMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsCredentialingFilesRetrieveCredentialingResponse200
          >
     >
     /**
      * List credentialing service requests
      *
      * @summary GET Credentialing Service Requests
      */
     p_api_v1_organizations_credentialing_service_requests_list_credentialing(
          metadata: types.PApiV1OrganizationsCredentialingServiceRequestsListCredentialingMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsCredentialingServiceRequestsListCredentialingResponse200
          >
     >
     /**
      * Create a new credentialing service request
      *
      * @summary POST a Credentialing Service Request
      */
     p_api_v1_organizations_credentialing_service_requests_create_credentialing(
          body: types.PApiV1OrganizationsCredentialingServiceRequestsCreateCredentialingBodyParam,
          metadata: types.PApiV1OrganizationsCredentialingServiceRequestsCreateCredentialingMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.PApiV1OrganizationsCredentialingServiceRequestsCreateCredentialingResponse201
          >
     >
     /**
      * List Invites
      *
      * @summary GET Invites
      */
     p_api_v1_organizations_invites_list_invites(
          metadata: types.PApiV1OrganizationsInvitesListInvitesMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsInvitesListInvitesResponse200
          >
     >
     /**
      * Create a new Invite
      *
      * @summary POST Invites
      */
     p_api_v1_organizations_invites_create_invites(
          body: types.PApiV1OrganizationsInvitesCreateInvitesBodyParam,
          metadata: types.PApiV1OrganizationsInvitesCreateInvitesMetadataParam
     ): Promise<
          FetchResponse<
               201,
               types.PApiV1OrganizationsInvitesCreateInvitesResponse201
          >
     >
     /**
      * Create a provider membership
      *
      * @summary Provider Membership
      */
     p_api_v1_organizations_memberships_create_members(
          body: types.PApiV1OrganizationsMembershipsCreateMembersBodyParam,
          metadata: types.PApiV1OrganizationsMembershipsCreateMembersMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsMembershipsCreateMembersResponse200
          >
     >
     /**
      * This endpoint is deprecated in version 2024-09-30, will be removed on 2024-11-30
      *
      * @summary License Service Request
      */
     p_api_v1_organizations_new_license_request_create_organizations(
          body: types.PApiV1OrganizationsNewLicenseRequestCreateOrganizationsBodyParam,
          metadata: types.PApiV1OrganizationsNewLicenseRequestCreateOrganizationsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsNewLicenseRequestCreateOrganizationsResponse200
          >
     >
     /**
      * List primary source verifications
      *
      * @summary Primary Source Verifications
      */
     p_api_v1_organizations_primary_source_verifications_list_organizations(
          metadata: types.PApiV1OrganizationsPrimarySourceVerificationsListOrganizationsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsPrimarySourceVerificationsListOrganizationsResponse200
          >
     >
     /**
      * Resend an invite email.
      *
      * @summary Resend Invite
      */
     p_api_v1_organizations_invites_resend_create_invites(
          metadata: types.PApiV1OrganizationsInvitesResendCreateInvitesMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * Revoke an issued invite. The member will no longer be able to sign up.
      *
      * @summary Revoke Invite
      */
     p_api_v1_organizations_invites_revoke_create_invites(
          metadata: types.PApiV1OrganizationsInvitesRevokeCreateInvitesMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List Memberships
      *
      * @summary GET Memberships
      */
     p_api_v1_organizations_members_list_members(
          metadata?: types.PApiV1OrganizationsMembersListMembersMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsMembersListMembersResponse200
          >
     >
     /**
      * Create a new Membership
      *
      * @summary POST Memberships
      */
     p_api_v1_organizations_members_create_members(
          body: types.PApiV1OrganizationsMembersCreateMembersBodyParam
     ): Promise<
          FetchResponse<
               201,
               types.PApiV1OrganizationsMembersCreateMembersResponse201
          >
     >
     /**
      * Get a Membership
      *
      * @summary GET Memberships
      */
     p_api_v1_organizations_members_retrieve_members(
          metadata: types.PApiV1OrganizationsMembersRetrieveMembersMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsMembersRetrieveMembersResponse200
          >
     >
     /**
      * Modify an existing Membership
      *
      * @summary PATCH Memberships
      */
     p_api_v1_organizations_members_partial_update_members(
          body: types.PApiV1OrganizationsMembersPartialUpdateMembersBodyParam,
          metadata: types.PApiV1OrganizationsMembersPartialUpdateMembersMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsMembersPartialUpdateMembersResponse200
          >
     >
     p_api_v1_organizations_members_partial_update_members(
          metadata: types.PApiV1OrganizationsMembersPartialUpdateMembersMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1OrganizationsMembersPartialUpdateMembersResponse200
          >
     >
     /**
      * Update a member's email. This will change their email for login and notifications
      *
      * @summary Membership Email Update
      */
     p_api_v1_organizations_members_change_email_create_members(
          body: types.PApiV1OrganizationsMembersChangeEmailCreateMembersBodyParam,
          metadata: types.PApiV1OrganizationsMembersChangeEmailCreateMembersMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List payer enrollments
      *
      * @summary GET Payer Enrollments
      */
     p_api_v1_payer_enrollments_list_payerEnrollments(
          metadata?: types.PApiV1PayerEnrollmentsListPayerEnrollmentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1PayerEnrollmentsListPayerEnrollmentsResponse200
          >
     >
     /**
      * Create a new payer enrollment
      *
      * @summary POST a Payer Enrollment
      */
     p_api_v1_payer_enrollments_create_payerEnrollments(
          body: types.PApiV1PayerEnrollmentsCreatePayerEnrollmentsBodyParam
     ): Promise<
          FetchResponse<
               201,
               types.PApiV1PayerEnrollmentsCreatePayerEnrollmentsResponse201
          >
     >
     /**
      * Get a payer enrollment
      *
      * @summary GET a Payer Enrollment
      */
     p_api_v1_payer_enrollments_retrieve_payerEnrollments(
          metadata: types.PApiV1PayerEnrollmentsRetrievePayerEnrollmentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1PayerEnrollmentsRetrievePayerEnrollmentsResponse200
          >
     >
     /**
      * Modify an existing payer enrollment
      *
      * @summary PATCH a Payer Enrollment
      */
     p_api_v1_payer_enrollments_partial_update_payerEnrollments(
          body: types.PApiV1PayerEnrollmentsPartialUpdatePayerEnrollmentsBodyParam,
          metadata: types.PApiV1PayerEnrollmentsPartialUpdatePayerEnrollmentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1PayerEnrollmentsPartialUpdatePayerEnrollmentsResponse200
          >
     >
     p_api_v1_payer_enrollments_partial_update_payerEnrollments(
          metadata: types.PApiV1PayerEnrollmentsPartialUpdatePayerEnrollmentsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1PayerEnrollmentsPartialUpdatePayerEnrollmentsResponse200
          >
     >
     /**
      * List practice groups
      *
      * @summary GET Practice Groups
      */
     p_api_v1_practice_group_associations_list_practiceGroups(
          metadata?: types.PApiV1PracticeGroupAssociationsListPracticeGroupsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1PracticeGroupAssociationsListPracticeGroupsResponse200
          >
     >
     /**
      * Create a new practice group
      *
      * @summary POST a Practice Group
      */
     p_api_v1_practice_group_associations_create_practiceGroups(
          body: types.PApiV1PracticeGroupAssociationsCreatePracticeGroupsBodyParam
     ): Promise<
          FetchResponse<
               201,
               types.PApiV1PracticeGroupAssociationsCreatePracticeGroupsResponse201
          >
     >
     /**
      * Get a practice group
      *
      * @summary GET a Practice Group
      */
     p_api_v1_practice_group_associations_retrieve_practiceGroups(
          metadata: types.PApiV1PracticeGroupAssociationsRetrievePracticeGroupsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1PracticeGroupAssociationsRetrievePracticeGroupsResponse200
          >
     >
     /**
      * Delete a practice group
      *
      * @summary DELETE a Practice Group
      */
     p_api_v1_practice_group_associations_destroy_practiceGroups(
          metadata: types.PApiV1PracticeGroupAssociationsDestroyPracticeGroupsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List provider practice group associations
      *
      * @summary GET Provider Practice Group Associations
      */
     p_api_v1_provider_practice_group_associations_list_providerPracticeGroupAssociations(
          metadata?: types.PApiV1ProviderPracticeGroupAssociationsListProviderPracticeGroupAssociationsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1ProviderPracticeGroupAssociationsListProviderPracticeGroupAssociationsResponse200
          >
     >
     /**
      * Create a new provider practice group association
      *
      * @summary POST a Provider Practice Group Association
      */
     p_api_v1_provider_practice_group_associations_create_providerPracticeGroupAssociations(
          body: types.PApiV1ProviderPracticeGroupAssociationsCreateProviderPracticeGroupAssociationsBodyParam
     ): Promise<
          FetchResponse<
               201,
               types.PApiV1ProviderPracticeGroupAssociationsCreateProviderPracticeGroupAssociationsResponse201
          >
     >
     /**
      * Get a provider practice group association
      *
      * @summary GET a Provider Practice Group Association
      */
     p_api_v1_provider_practice_group_associations_retrieve_providerPracticeGroupAssociations(
          metadata: types.PApiV1ProviderPracticeGroupAssociationsRetrieveProviderPracticeGroupAssociationsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1ProviderPracticeGroupAssociationsRetrieveProviderPracticeGroupAssociationsResponse200
          >
     >
     /**
      * Delete a provider practice group association
      *
      * @summary DELETE a Provider Practice Group Association
      */
     p_api_v1_provider_practice_group_associations_destroy_providerPracticeGroupAssociations(
          metadata: types.PApiV1ProviderPracticeGroupAssociationsDestroyProviderPracticeGroupAssociationsMetadataParam
     ): Promise<FetchResponse<number, unknown>>
     /**
      * List payer enrollment service requests
      *
      * @summary GET Payer Enrollment Service Requests
      */
     p_api_v1_service_requests_payer_enrollments_list_payerEnrollmentServiceRequests(
          metadata?: types.PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1ServiceRequestsPayerEnrollmentsListPayerEnrollmentServiceRequestsResponse200
          >
     >
     /**
      * Create a new payer enrollment service request
      *
      * @summary POST a Payer Enrollment Service Request
      */
     p_api_v1_service_requests_payer_enrollments_create_payerEnrollmentServiceRequests(
          body?: types.PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsBodyParam
     ): Promise<
          FetchResponse<
               201,
               types.PApiV1ServiceRequestsPayerEnrollmentsCreatePayerEnrollmentServiceRequestsResponse201
          >
     >
     /**
      * Get a payer enrollment service request
      *
      * @summary GET a Payer Enrollment Service Request
      */
     p_api_v1_service_requests_payer_enrollments_retrieve_payerEnrollmentServiceRequests(
          metadata: types.PApiV1ServiceRequestsPayerEnrollmentsRetrievePayerEnrollmentServiceRequestsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1ServiceRequestsPayerEnrollmentsRetrievePayerEnrollmentServiceRequestsResponse200
          >
     >
     /**
      * Modify an existing payer enrollment service request
      *
      * @summary PATCH a Payer Enrollment Service Request
      */
     p_api_v1_service_requests_payer_enrollments_partial_update_payerEnrollmentServiceRequests(
          body: types.PApiV1ServiceRequestsPayerEnrollmentsPartialUpdatePayerEnrollmentServiceRequestsBodyParam,
          metadata: types.PApiV1ServiceRequestsPayerEnrollmentsPartialUpdatePayerEnrollmentServiceRequestsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1ServiceRequestsPayerEnrollmentsPartialUpdatePayerEnrollmentServiceRequestsResponse200
          >
     >
     p_api_v1_service_requests_payer_enrollments_partial_update_payerEnrollmentServiceRequests(
          metadata: types.PApiV1ServiceRequestsPayerEnrollmentsPartialUpdatePayerEnrollmentServiceRequestsMetadataParam
     ): Promise<
          FetchResponse<
               200,
               types.PApiV1ServiceRequestsPayerEnrollmentsPartialUpdatePayerEnrollmentServiceRequestsResponse200
          >
     >
}
declare const createSDK: SDK
export = createSDK
