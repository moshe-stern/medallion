'use strict'
var __importDefault =
     (this && this.__importDefault) ||
     function (mod) {
          return mod && mod.__esModule ? mod : { default: mod }
     }
var oas_1 = __importDefault(require('oas'))
var core_1 = __importDefault(require('api/dist/core'))
var openapi_json_1 = __importDefault(require('./openapi.json'))
var SDK = /** @class */ (function () {
     function SDK() {
          this.spec = oas_1.default.init(openapi_json_1.default)
          this.core = new core_1.default(
               this.spec,
               'medallion-api/1.0.0 (api/6.1.2)'
          )
     }
     /**
      * Optionally configure various options that the SDK allows.
      *
      * @param config Object of supported SDK options and toggles.
      * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
      * should be represented in milliseconds.
      */
     SDK.prototype.config = function (config) {
          this.core.setConfig(config)
     }
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
     SDK.prototype.auth = function () {
          var _a
          var values = []
          for (var _i = 0; _i < arguments.length; _i++) {
               values[_i] = arguments[_i]
          }
          ;(_a = this.core).setAuth.apply(_a, values)
          return this
     }
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
     SDK.prototype.server = function (url, variables) {
          if (variables === void 0) {
               variables = {}
          }
          this.core.setServer(url, variables)
     }
     /**
      * List provider additional names across org
      *
      * @summary GET Org Additional Names
      */
     SDK.prototype.api_v1_org_additional_names_list_additionalNames = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/additional-names/',
               'get',
               metadata
          )
     }
     /**
      * List board certificates
      *
      * @summary GET Board Certificates
      */
     SDK.prototype.api_v1_org_board_certificates_list_boardCertificates =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/board-certificates/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new board certificate
      *
      * @summary POST a Board Certificate
      */
     SDK.prototype.api_v1_org_board_certificates_create_boardCertificates =
          function (body) {
               return this.core.fetch(
                    '/api/v1/org/board-certificates/',
                    'post',
                    body
               )
          }
     /**
      * Get a board certificate
      *
      * @summary GET a Board Certificate
      */
     SDK.prototype.api_v1_org_board_certificates_retrieve_boardCertificates =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/board-certificates/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_board_certificates_partial_update_boardCertificates =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/board-certificates/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a board certificate
      *
      * @summary DELETE a Board Certificate
      */
     SDK.prototype.api_v1_org_board_certificates_destroy_boardCertificates =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/board-certificates/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List cme credits
      *
      * @summary GET Cme Credits
      */
     SDK.prototype.api_v1_org_cme_credits_list_cmeCredits = function (
          metadata
     ) {
          return this.core.fetch('/api/v1/org/cme-credits/', 'get', metadata)
     }
     /**
      * Create a new cme credit
      *
      * @summary POST a Cme Credit
      */
     SDK.prototype.api_v1_org_cme_credits_create_cmeCredits = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/cme-credits/',
               'post',
               body,
               metadata
          )
     }
     /**
      * Get a cme credit
      *
      * @summary GET a Cme Credit
      */
     SDK.prototype.api_v1_org_cme_credits_retrieve_cmeCredits = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/cme-credits/{id}/',
               'get',
               metadata
          )
     }
     SDK.prototype.api_v1_org_cme_credits_partial_update_cmeCredits = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/cme-credits/{id}/',
               'patch',
               body,
               metadata
          )
     }
     /**
      * Delete a cme credit
      *
      * @summary DELETE a Cme Credit
      */
     SDK.prototype.api_v1_org_cme_credits_destroy_cmeCredits = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/cme-credits/{id}/',
               'delete',
               metadata
          )
     }
     /**
      * List licenses
      *
      * @summary GET Licenses
      */
     SDK.prototype.api_v1_org_licenses_list_licenses = function (metadata) {
          return this.core.fetch('/api/v1/org/licenses/', 'get', metadata)
     }
     /**
      * Create a new license
      *
      * @summary POST a License
      */
     SDK.prototype.api_v1_org_licenses_create_licenses = function (body) {
          return this.core.fetch('/api/v1/org/licenses/', 'post', body)
     }
     /**
      * Bulk update existing licenses
      *
      * @summary PATCH Licenses
      */
     SDK.prototype.api_v1_org_licenses_partial_update_licenses = function (
          body
     ) {
          return this.core.fetch('/api/v1/org/licenses/', 'patch', body)
     }
     /**
      * Get a license
      *
      * @summary GET a License
      */
     SDK.prototype.api_v1_org_licenses_retrieve_licenses = function (metadata) {
          return this.core.fetch('/api/v1/org/licenses/{id}/', 'get', metadata)
     }
     SDK.prototype.api_v1_org_licenses_detail_partial_update = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/licenses/{id}/',
               'patch',
               body,
               metadata
          )
     }
     /**
      * Delete a license
      *
      * @summary DELETE a License
      */
     SDK.prototype.api_v1_org_licenses_destroy_licenses = function (metadata) {
          return this.core.fetch(
               '/api/v1/org/licenses/{id}/',
               'delete',
               metadata
          )
     }
     /**
      * List the historical updates made to a license
      *
      * @summary GET License History
      */
     SDK.prototype.api_v1_org_licenses_history_list_licenses = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/licenses/{id}/history/',
               'get',
               metadata
          )
     }
     /**
      * List the historical updates made to all org licenses
      *
      * @summary GET Licenses History
      */
     SDK.prototype.api_v1_org_licenses_bulk_history_list_licenses = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/licenses/bulk-history/',
               'get',
               metadata
          )
     }
     /**
      * List org medical programs
      *
      * @summary GET Org Medical Programs
      */
     SDK.prototype.api_v1_org_medical_programs_list_medicalPrograms = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/medical-programs/',
               'get',
               metadata
          )
     }
     /**
      * List practices
      *
      * @summary GET Practices
      */
     SDK.prototype.api_v1_org_practices_list_practices = function (metadata) {
          return this.core.fetch('/api/v1/org/practices/', 'get', metadata)
     }
     /**
      * Create a new practice
      *
      * @summary POST a Practice
      */
     SDK.prototype.api_v1_org_practices_create_practices = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/practices/',
               'post',
               body,
               metadata
          )
     }
     /**
      * Get a practice
      *
      * @summary GET a Practice
      */
     SDK.prototype.api_v1_org_practices_retrieve_practices = function (
          metadata
     ) {
          return this.core.fetch('/api/v1/org/practices/{id}/', 'get', metadata)
     }
     SDK.prototype.api_v1_org_practices_partial_update_practices = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/practices/{id}/',
               'patch',
               body,
               metadata
          )
     }
     /**
      * List provider practice associations
      *
      * @summary GET Provider Practice Associations
      */
     SDK.prototype.api_v1_org_provider_practice_associations_list_practices =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/provider-practice-associations/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new provider practice association
      *
      * @summary POST a Provider Practice Association
      */
     SDK.prototype.api_v1_org_provider_practice_associations_create_practices =
          function (body) {
               return this.core.fetch(
                    '/api/v1/org/provider-practice-associations/',
                    'post',
                    body
               )
          }
     /**
      * Get a provider practice association
      *
      * @summary GET a Provider Practice Association
      */
     SDK.prototype.api_v1_org_provider_practice_associations_retrieve_practices =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/provider-practice-associations/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_provider_practice_associations_partial_update_practices =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/provider-practice-associations/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a provider practice association
      *
      * @summary DELETE a Provider Practice Association
      */
     SDK.prototype.api_v1_org_provider_practice_associations_destroy_practices =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/provider-practice-associations/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List providers
      *
      * @summary GET Providers
      */
     SDK.prototype.api_v1_org_providers_list_providers = function (metadata) {
          return this.core.fetch('/api/v1/org/providers/', 'get', metadata)
     }
     /**
      * Get a provider
      *
      * @summary GET a Provider
      */
     SDK.prototype.api_v1_org_providers_retrieve_providers = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/',
               'get',
               metadata
          )
     }
     SDK.prototype.api_v1_org_providers_partial_update_providers = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/',
               'patch',
               body,
               metadata
          )
     }
     /**
      * List provider additional names
      *
      * @summary GET Provider Additional Names
      */
     SDK.prototype.api_v1_org_providers_additional_names_list_additionalNames =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/additional-names/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new additional name
      *
      * @summary POST an Additional Name
      */
     SDK.prototype.api_v1_org_providers_additional_names_create_additionalNames =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/additional-names/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a additional name
      *
      * @summary GET an Additional Name
      */
     SDK.prototype.api_v1_org_providers_additional_names_retrieve_additionalNames =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/additional-names/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_additional_names_partial_update_additionalNames =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/additional-names/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a additional name
      *
      * @summary DELETE an Additional Name
      */
     SDK.prototype.api_v1_org_providers_additional_names_destroy_additionalNames =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/additional-names/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List addresses
      *
      * @summary GET Addresses
      */
     SDK.prototype.api_v1_org_providers_addresses_list_addresses = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/addresses/',
               'get',
               metadata
          )
     }
     /**
      * Create a new address
      *
      * @summary POST an Addresse
      */
     SDK.prototype.api_v1_org_providers_addresses_create_addresses = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/addresses/',
               'post',
               body,
               metadata
          )
     }
     /**
      * Get an address
      *
      * @summary GET an Addresse
      */
     SDK.prototype.api_v1_org_providers_addresses_retrieve_addresses =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/addresses/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_addresses_partial_update_addresses =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/addresses/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete an address
      *
      * @summary DELETE an Addresse
      */
     SDK.prototype.api_v1_org_providers_addresses_destroy_addresses = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/addresses/{id}/',
               'delete',
               metadata
          )
     }
     /**
      * List collaborative agreements
      *
      * @summary GET Collaborative Agreements
      */
     SDK.prototype.api_v1_org_providers_collaborative_agreements_list_collaborativeAgreements =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/collaborative-agreements/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_collaborative_agreements_create_collaborativeAgreements =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/collaborative-agreements/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a collaborative agreement
      *
      * @summary GET a Collaborative Agreement
      */
     SDK.prototype.api_v1_org_providers_collaborative_agreements_retrieve_collaborativeAgreements =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/collaborative-agreements/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_collaborative_agreements_partial_update_collaborativeAgreements =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/collaborative-agreements/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a collaborative agreement
      *
      * @summary DELETE a Collaborative Agreement
      */
     SDK.prototype.api_v1_org_providers_collaborative_agreements_destroy_collaborativeAgreements =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/collaborative-agreements/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List provider documents. To retrieve the Documents themselves, fetch a
      * `time_limited_url` from the [Documents](p_api_v1_documents_retrieve_documents) endpoint
      *
      * @summary GET Provider Documents
      */
     SDK.prototype.api_v1_org_providers_documents_list_providerDocuments =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/documents/',
                    'get',
                    metadata
               )
          }
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
     SDK.prototype.api_v1_org_providers_documents_create_providerDocuments =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/documents/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a provider document. To retrieve the Document itself, fetch a `time_limited_url`
      * from the [Documents](p_api_v1_documents_retrieve_documents) endpoint
      *
      * @summary GET a Provider Document
      */
     SDK.prototype.api_v1_org_providers_documents_retrieve_providerDocuments =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/documents/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_documents_partial_update_providerDocuments =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/documents/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a provider document
      *
      * @summary DELETE a Provider Document
      */
     SDK.prototype.api_v1_org_providers_documents_destroy_providerDocuments =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/documents/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List educations
      *
      * @summary GET Educations
      */
     SDK.prototype.api_v1_org_providers_educations_list_educations = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/educations/',
               'get',
               metadata
          )
     }
     /**
      * Create a new education
      *
      * @summary POST an Education
      */
     SDK.prototype.api_v1_org_providers_educations_create_educations =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/educations/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a education
      *
      * @summary GET an Education
      */
     SDK.prototype.api_v1_org_providers_educations_retrieve_educations =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/educations/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_educations_partial_update_educations =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/educations/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a education
      *
      * @summary DELETE an Education
      */
     SDK.prototype.api_v1_org_providers_educations_destroy_educations =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/educations/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List exams
      *
      * @summary GET Exams
      */
     SDK.prototype.api_v1_org_providers_exams_list_exams = function (metadata) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/exams/',
               'get',
               metadata
          )
     }
     SDK.prototype.api_v1_org_providers_exams_create_exams = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/exams/',
               'post',
               body,
               metadata
          )
     }
     /**
      * Get a exam
      *
      * @summary GET an Exam
      */
     SDK.prototype.api_v1_org_providers_exams_retrieve_exams = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/exams/{id}/',
               'get',
               metadata
          )
     }
     SDK.prototype.api_v1_org_providers_exams_partial_update_exams = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/exams/{id}/',
               'patch',
               body,
               metadata
          )
     }
     /**
      * Delete a exam
      *
      * @summary DELETE an Exam
      */
     SDK.prototype.api_v1_org_providers_exams_destroy_exams = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/exams/{id}/',
               'delete',
               metadata
          )
     }
     /**
      * List gap records
      *
      * @summary GET Gap Records
      */
     SDK.prototype.api_v1_org_providers_gap_records_list_gapRecords = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/gap-records/',
               'get',
               metadata
          )
     }
     /**
      * Create a new gap record
      *
      * @summary POST a Gap Record
      */
     SDK.prototype.api_v1_org_providers_gap_records_create_gapRecords =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/gap-records/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a gap record
      *
      * @summary GET a Gap Record
      */
     SDK.prototype.api_v1_org_providers_gap_records_retrieve_gapRecords =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/gap-records/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_gap_records_partial_update_gapRecords =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/gap-records/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a gap record
      *
      * @summary DELETE a Gap Record
      */
     SDK.prototype.api_v1_org_providers_gap_records_destroy_gapRecords =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/gap-records/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List malpractice insurances
      *
      * @summary GET Malpractice Insurances
      */
     SDK.prototype.api_v1_org_providers_malpractice_insurances_list_malpracticeInsurances =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/malpractice-insurances/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new malpractice insurance
      *
      * @summary POST a Malpractice Insurance
      */
     SDK.prototype.api_v1_org_providers_malpractice_insurances_create_malpracticeInsurances =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/malpractice-insurances/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a malpractice insurance
      *
      * @summary GET a Malpractice Insurance
      */
     SDK.prototype.api_v1_org_providers_malpractice_insurances_retrieve_malpracticeInsurances =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/malpractice-insurances/{id}',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_malpractice_insurances_partial_update_malpracticeInsurances =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/malpractice-insurances/{id}',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a malpractice insurance
      *
      * @summary DELETE a Malpractice Insurance
      */
     SDK.prototype.api_v1_org_providers_malpractice_insurances_destroy_malpracticeInsurances =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/malpractice-insurances/{id}',
                    'delete',
                    metadata
               )
          }
     /**
      * List provider medical programs
      *
      * @summary GET Provider Medical Programs
      */
     SDK.prototype.api_v1_org_providers_medical_programs_list_medicalPrograms =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/medical-programs/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new medical program
      *
      * @summary POST a Medical Program
      */
     SDK.prototype.api_v1_org_providers_medical_programs_create_medicalPrograms =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/medical-programs/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a medical program
      *
      * @summary GET a Medical Program
      */
     SDK.prototype.api_v1_org_providers_medical_programs_retrieve_medicalPrograms =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/medical-programs/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_medical_programs_partial_update_medicalPrograms =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/medical-programs/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a medical program
      *
      * @summary DELETE a Medical Program
      */
     SDK.prototype.api_v1_org_providers_medical_programs_destroy_medicalPrograms =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/medical-programs/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List military history records
      *
      * @summary GET Military History Records
      */
     SDK.prototype.api_v1_org_providers_military_history_records_list_militaryHistoryRecords =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/military-history-records/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new military history record
      *
      * @summary POST a Military History Record
      */
     SDK.prototype.api_v1_org_providers_military_history_records_create_militaryHistoryRecords =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/military-history-records/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a military history record
      *
      * @summary GET a Military History Record
      */
     SDK.prototype.api_v1_org_providers_military_history_records_retrieve_militaryHistoryRecords =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/military-history-records/{id}',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_military_history_records_partial_update_militaryHistoryRecords =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/military-history-records/{id}',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a military history record
      *
      * @summary DELETE a Military History Record
      */
     SDK.prototype.api_v1_org_providers_military_history_records_destroy_militaryHistoryRecords =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/military-history-records/{id}',
                    'delete',
                    metadata
               )
          }
     /**
      * List provider status
      *
      * @summary GET Provider Status
      */
     SDK.prototype.api_v1_org_providers_status_retrieve_providerStatus =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/status/',
                    'get',
                    metadata
               )
          }
     /**
      * List supervisors
      *
      * @summary GET Supervisors
      */
     SDK.prototype.api_v1_org_providers_supervisors_list_supervisors =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/supervisors/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new supervisor
      *
      * @summary POST a Supervisor
      */
     SDK.prototype.api_v1_org_providers_supervisors_create_supervisors =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/supervisors/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a supervisor
      *
      * @summary GET a Supervisor
      */
     SDK.prototype.api_v1_org_providers_supervisors_retrieve_supervisors =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/supervisors/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_supervisors_partial_update_supervisors =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/supervisors/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a supervisor
      *
      * @summary DELETE a Supervisor
      */
     SDK.prototype.api_v1_org_providers_supervisors_destroy_supervisors =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/supervisors/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List trainings
      *
      * @summary GET Trainings
      */
     SDK.prototype.api_v1_org_providers_trainings_list_trainings = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/trainings/',
               'get',
               metadata
          )
     }
     /**
      * Create a new training
      *
      * @summary POST a Training
      */
     SDK.prototype.api_v1_org_providers_trainings_create_trainings = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/trainings/',
               'post',
               body,
               metadata
          )
     }
     /**
      * Get a training
      *
      * @summary GET a Training
      */
     SDK.prototype.api_v1_org_providers_trainings_retrieve_trainings =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/trainings/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_trainings_partial_update_trainings =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/trainings/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a training
      *
      * @summary DELETE a Training
      */
     SDK.prototype.api_v1_org_providers_trainings_destroy_trainings = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/org/providers/{provider_pk}/trainings/{id}/',
               'delete',
               metadata
          )
     }
     /**
      * List work experiences
      *
      * @summary GET Work Experiences
      */
     SDK.prototype.api_v1_org_providers_work_experience_list_workExperience =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/work-experience/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_work_experience_create_workExperience =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/work-experience/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a work experience
      *
      * @summary GET a Work Experience
      */
     SDK.prototype.api_v1_org_providers_work_experience_retrieve_workExperience =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/work-experience/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.api_v1_org_providers_work_experience_partial_update_workExperience =
          function (body, metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/work-experience/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a work experience
      *
      * @summary DELETE a Work Experience
      */
     SDK.prototype.api_v1_org_providers_work_experience_destroy_workExperience =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/org/providers/{provider_pk}/work-experience/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List service requests
      *
      * @summary GET Service Requests
      */
     SDK.prototype.api_v1_staff_service_requests_list_serviceRequests =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/staff/service-requests/',
                    'get',
                    metadata
               )
          }
     /**
      * Bulk delete service requests
      *
      * @summary DELETE Service Requests
      */
     SDK.prototype.api_v1_staff_service_requests_destroy_serviceRequests =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/staff/service-requests/',
                    'delete',
                    metadata
               )
          }
     /**
      * Get a service request
      *
      * @summary GET a Service Request
      */
     SDK.prototype.api_v1_staff_service_requests_retrieve_serviceRequests =
          function (metadata) {
               return this.core.fetch(
                    '/api/v1/staff/service-requests/{id}/',
                    'get',
                    metadata
               )
          }
     /**
      * Delete a service request
      *
      * @summary DELETE a Service Request
      */
     SDK.prototype.api_v1_staff_service_requests_detail_delete = function (
          metadata
     ) {
          return this.core.fetch(
               '/api/v1/staff/service-requests/{id}/',
               'delete',
               metadata
          )
     }
     /**
      * Create a new CAQH Data Request
      *
      * @summary POST CAQH Data Requests
      */
     SDK.prototype.p_api_v1_caqh_data_request_create_caqhDataRequest =
          function (body) {
               return this.core.fetch(
                    '/p/api/v1/caqh-data-request/',
                    'post',
                    body
               )
          }
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
     SDK.prototype.p_api_v1_documents_retrieve_documents = function (metadata) {
          return this.core.fetch('/p/api/v1/documents/{id}/', 'get', metadata)
     }
     /**
      * List employees
      *
      * @summary GET Employees
      */
     SDK.prototype.p_api_v1_employees_list_employees = function (metadata) {
          return this.core.fetch('/p/api/v1/employees/', 'get', metadata)
     }
     SDK.prototype.p_api_v1_employees_partial_update_employees = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/employees/{id}',
               'patch',
               body,
               metadata
          )
     }
     /**
      * Activate an employee
      *
      * @summary Employee Activation
      */
     SDK.prototype.p_api_v1_employees_activation_create_employees = function (
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/employees/{id}/activation',
               'post',
               metadata
          )
     }
     /**
      * Deactivate an employee
      *
      * @summary Employee Deactivation
      */
     SDK.prototype.p_api_v1_employees_deactivation_create_employees = function (
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/employees/{id}/deactivation',
               'post',
               metadata
          )
     }
     /**
      * Suppress ongoing monitoring alerts
      *
      * @summary Ongoing Monitoring Alert Suppression
      */
     SDK.prototype.p_api_v1_employees_ongoing_monitoring_alert_suppression_create_employees =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/employees/{id}/ongoing-monitoring-alert-suppression',
                    'post',
                    metadata
               )
          }
     /**
      * Unsuppress ongoing monitoring alerts
      *
      * @summary Ongoing Monitoring Alert Unsuppresion
      */
     SDK.prototype.p_api_v1_employees_ongoing_monitoring_alert_unsuppression_create_employees =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/employees/{id}/ongoing-monitoring-alert-unsuppression',
                    'post',
                    metadata
               )
          }
     /**
      * Bulk onboard or update employees
      *
      * @summary Bulk Onboarding
      * @throws FetchError<400, types.PApiV1EmployeesBulkOnboardingCreateEmployeesResponse400> Invalid employee information. Please check your data and re-request onboarding.
      */
     SDK.prototype.p_api_v1_employees_bulk_onboarding_create_employees =
          function (body) {
               return this.core.fetch(
                    '/p/api/v1/employees/bulk-onboarding',
                    'post',
                    body
               )
          }
     /**
      * List facilities
      *
      * @summary GET Facilities
      */
     SDK.prototype.p_api_v1_facilities_list_facilities = function (metadata) {
          return this.core.fetch('/p/api/v1/facilities/', 'get', metadata)
     }
     /**
      * Create a new facility
      *
      * @summary POST a Facility
      */
     SDK.prototype.p_api_v1_facilities_create_facilities = function (body) {
          return this.core.fetch('/p/api/v1/facilities/', 'post', body)
     }
     /**
      * Get a facility
      *
      * @summary GET a Facility
      */
     SDK.prototype.p_api_v1_facilities_retrieve_facilities = function (
          metadata
     ) {
          return this.core.fetch('/p/api/v1/facilities/{id}/', 'get', metadata)
     }
     SDK.prototype.p_api_v1_facilities_partial_update_facilities = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/facilities/{id}/',
               'patch',
               body,
               metadata
          )
     }
     /**
      * Delete a facility
      *
      * @summary DELETE a Facility
      */
     SDK.prototype.p_api_v1_facilities_destroy_facilities = function (
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/facilities/{id}/',
               'delete',
               metadata
          )
     }
     /**
      * List group profiles
      *
      * @summary GET Group Profiles
      */
     SDK.prototype.p_api_v1_group_profiles_list_groupProfiles = function (
          metadata
     ) {
          return this.core.fetch('/p/api/v1/group-profiles/', 'get', metadata)
     }
     /**
      * Create a new group profile
      *
      * @summary POST a Group Profile
      */
     SDK.prototype.p_api_v1_group_profiles_create_groupProfiles = function (
          body
     ) {
          return this.core.fetch('/p/api/v1/group-profiles/', 'post', body)
     }
     /**
      * List group profile documents. To retrieve the Documents themselves, fetch a
      * `time_limited_url` from the [Documents](p_api_v1_documents_retrieve_documents) endpoint
      *
      * @summary GET Group Profile Documents
      */
     SDK.prototype.p_api_v1_group_profiles_documents_list_groupProfileDocuments =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/group-profiles/{group_profile_pk}/documents/',
                    'get',
                    metadata
               )
          }
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
     SDK.prototype.p_api_v1_group_profiles_documents_create_groupProfileDocuments =
          function (body, metadata) {
               return this.core.fetch(
                    '/p/api/v1/group-profiles/{group_profile_pk}/documents/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * Get a group profile document. To retrieve the Document itself, fetch a
      * `time_limited_url` from the [Documents](p_api_v1_documents_retrieve_documents) endpoint
      *
      * @summary GET a Group Profile Document
      */
     SDK.prototype.p_api_v1_group_profiles_documents_retrieve_groupProfileDocuments =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/group-profiles/{group_profile_pk}/documents/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.p_api_v1_group_profiles_documents_partial_update_groupProfileDocuments =
          function (body, metadata) {
               return this.core.fetch(
                    '/p/api/v1/group-profiles/{group_profile_pk}/documents/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a group profile document
      *
      * @summary DELETE a Group Profile Document
      */
     SDK.prototype.p_api_v1_group_profiles_documents_destroy_groupProfileDocuments =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/group-profiles/{group_profile_pk}/documents/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * Get a group profile
      *
      * @summary GET a Group Profile
      */
     SDK.prototype.p_api_v1_group_profiles_retrieve_groupProfiles = function (
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/group-profiles/{id}/',
               'get',
               metadata
          )
     }
     SDK.prototype.p_api_v1_group_profiles_partial_update_groupProfiles =
          function (body, metadata) {
               return this.core.fetch(
                    '/p/api/v1/group-profiles/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Delete a group profile
      *
      * @summary DELETE a Group Profile
      */
     SDK.prototype.p_api_v1_group_profiles_destroy_groupProfiles = function (
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/group-profiles/{id}/',
               'delete',
               metadata
          )
     }
     /**
      * List hospital affiliations
      *
      * @summary GET Hospital Affiliations
      */
     SDK.prototype.p_api_v1_hospital_affiliations_list_hospitalAffiliations =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/hospital-affiliations/',
                    'get',
                    metadata
               )
          }
     /**
      * Get a hospital affiliation
      *
      * @summary GET a Hospital Affiliation
      */
     SDK.prototype.p_api_v1_hospital_affiliations_retrieve_hospitalAffiliations =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/hospital-affiliations/{id}/',
                    'get',
                    metadata
               )
          }
     /**
      * List lines of business
      *
      * @summary GET Lines Of Business
      */
     SDK.prototype.p_api_v1_lines_of_business_list_linesOfBusiness = function (
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/lines-of-business/',
               'get',
               metadata
          )
     }
     /**
      * List credentialing files
      *
      * @summary GET Credentialing Files
      */
     SDK.prototype.p_api_v1_organizations_credentialing_files_list_credentialing =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/{organization_id}/credentialing-files/',
                    'get',
                    metadata
               )
          }
     /**
      * Get a credentialing file
      *
      * @summary GET a Credentialing File
      */
     SDK.prototype.p_api_v1_organizations_credentialing_files_retrieve_credentialing =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/{organization_id}/credentialing-files/{id}/',
                    'get',
                    metadata
               )
          }
     /**
      * List credentialing service requests
      *
      * @summary GET Credentialing Service Requests
      */
     SDK.prototype.p_api_v1_organizations_credentialing_service_requests_list_credentialing =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/{organization_id}/credentialing-service-requests/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new credentialing service request
      *
      * @summary POST a Credentialing Service Request
      */
     SDK.prototype.p_api_v1_organizations_credentialing_service_requests_create_credentialing =
          function (body, metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/{organization_id}/credentialing-service-requests/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * List Invites
      *
      * @summary GET Invites
      */
     SDK.prototype.p_api_v1_organizations_invites_list_invites = function (
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/organizations/{organization_id}/invites/',
               'get',
               metadata
          )
     }
     /**
      * Create a new Invite
      *
      * @summary POST Invites
      */
     SDK.prototype.p_api_v1_organizations_invites_create_invites = function (
          body,
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/organizations/{organization_id}/invites/',
               'post',
               body,
               metadata
          )
     }
     /**
      * Create a provider membership
      *
      * @summary Provider Membership
      */
     SDK.prototype.p_api_v1_organizations_memberships_create_members =
          function (body, metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/{organization_id}/memberships/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * This endpoint is deprecated in version 2024-09-30, will be removed on 2024-11-30
      *
      * @summary License Service Request
      */
     SDK.prototype.p_api_v1_organizations_new_license_request_create_organizations =
          function (body, metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/{organization_id}/new-license-request/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * List primary source verifications
      *
      * @summary Primary Source Verifications
      */
     SDK.prototype.p_api_v1_organizations_primary_source_verifications_list_organizations =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/{organization_id}/primary-source-verifications/',
                    'get',
                    metadata
               )
          }
     /**
      * Resend an invite email.
      *
      * @summary Resend Invite
      */
     SDK.prototype.p_api_v1_organizations_invites_resend_create_invites =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/invites/{id}/resend/',
                    'post',
                    metadata
               )
          }
     /**
      * Revoke an issued invite. The member will no longer be able to sign up.
      *
      * @summary Revoke Invite
      */
     SDK.prototype.p_api_v1_organizations_invites_revoke_create_invites =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/invites/{id}/revoke/',
                    'post',
                    metadata
               )
          }
     /**
      * List Memberships
      *
      * @summary GET Memberships
      */
     SDK.prototype.p_api_v1_organizations_members_list_members = function (
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/organizations/members/',
               'get',
               metadata
          )
     }
     /**
      * Create a new Membership
      *
      * @summary POST Memberships
      */
     SDK.prototype.p_api_v1_organizations_members_create_members = function (
          body
     ) {
          return this.core.fetch(
               '/p/api/v1/organizations/members/',
               'post',
               body
          )
     }
     /**
      * Get a Membership
      *
      * @summary GET Memberships
      */
     SDK.prototype.p_api_v1_organizations_members_retrieve_members = function (
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/organizations/members/{id}/',
               'get',
               metadata
          )
     }
     SDK.prototype.p_api_v1_organizations_members_partial_update_members =
          function (body, metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/members/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * Update a member's email. This will change their email for login and notifications
      *
      * @summary Membership Email Update
      */
     SDK.prototype.p_api_v1_organizations_members_change_email_create_members =
          function (body, metadata) {
               return this.core.fetch(
                    '/p/api/v1/organizations/members/{id}/change-email/',
                    'post',
                    body,
                    metadata
               )
          }
     /**
      * List payer enrollments
      *
      * @summary GET Payer Enrollments
      */
     SDK.prototype.p_api_v1_payer_enrollments_list_payerEnrollments = function (
          metadata
     ) {
          return this.core.fetch(
               '/p/api/v1/payer-enrollments/',
               'get',
               metadata
          )
     }
     /**
      * Create a new payer enrollment
      *
      * @summary POST a Payer Enrollment
      */
     SDK.prototype.p_api_v1_payer_enrollments_create_payerEnrollments =
          function (body) {
               return this.core.fetch(
                    '/p/api/v1/payer-enrollments/',
                    'post',
                    body
               )
          }
     /**
      * Get a payer enrollment
      *
      * @summary GET a Payer Enrollment
      */
     SDK.prototype.p_api_v1_payer_enrollments_retrieve_payerEnrollments =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/payer-enrollments/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.p_api_v1_payer_enrollments_partial_update_payerEnrollments =
          function (body, metadata) {
               return this.core.fetch(
                    '/p/api/v1/payer-enrollments/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     /**
      * List practice groups
      *
      * @summary GET Practice Groups
      */
     SDK.prototype.p_api_v1_practice_group_associations_list_practiceGroups =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/practice-group-associations/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new practice group
      *
      * @summary POST a Practice Group
      */
     SDK.prototype.p_api_v1_practice_group_associations_create_practiceGroups =
          function (body) {
               return this.core.fetch(
                    '/p/api/v1/practice-group-associations/',
                    'post',
                    body
               )
          }
     /**
      * Get a practice group
      *
      * @summary GET a Practice Group
      */
     SDK.prototype.p_api_v1_practice_group_associations_retrieve_practiceGroups =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/practice-group-associations/{id}/',
                    'get',
                    metadata
               )
          }
     /**
      * Delete a practice group
      *
      * @summary DELETE a Practice Group
      */
     SDK.prototype.p_api_v1_practice_group_associations_destroy_practiceGroups =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/practice-group-associations/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List provider practice group associations
      *
      * @summary GET Provider Practice Group Associations
      */
     SDK.prototype.p_api_v1_provider_practice_group_associations_list_providerPracticeGroupAssociations =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/provider-practice-group-associations/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new provider practice group association
      *
      * @summary POST a Provider Practice Group Association
      */
     SDK.prototype.p_api_v1_provider_practice_group_associations_create_providerPracticeGroupAssociations =
          function (body) {
               return this.core.fetch(
                    '/p/api/v1/provider-practice-group-associations/',
                    'post',
                    body
               )
          }
     /**
      * Get a provider practice group association
      *
      * @summary GET a Provider Practice Group Association
      */
     SDK.prototype.p_api_v1_provider_practice_group_associations_retrieve_providerPracticeGroupAssociations =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/provider-practice-group-associations/{id}/',
                    'get',
                    metadata
               )
          }
     /**
      * Delete a provider practice group association
      *
      * @summary DELETE a Provider Practice Group Association
      */
     SDK.prototype.p_api_v1_provider_practice_group_associations_destroy_providerPracticeGroupAssociations =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/provider-practice-group-associations/{id}/',
                    'delete',
                    metadata
               )
          }
     /**
      * List payer enrollment service requests
      *
      * @summary GET Payer Enrollment Service Requests
      */
     SDK.prototype.p_api_v1_service_requests_payer_enrollments_list_payerEnrollmentServiceRequests =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/service-requests/payer-enrollments/',
                    'get',
                    metadata
               )
          }
     /**
      * Create a new payer enrollment service request
      *
      * @summary POST a Payer Enrollment Service Request
      */
     SDK.prototype.p_api_v1_service_requests_payer_enrollments_create_payerEnrollmentServiceRequests =
          function (body) {
               return this.core.fetch(
                    '/p/api/v1/service-requests/payer-enrollments/',
                    'post',
                    body
               )
          }
     /**
      * Get a payer enrollment service request
      *
      * @summary GET a Payer Enrollment Service Request
      */
     SDK.prototype.p_api_v1_service_requests_payer_enrollments_retrieve_payerEnrollmentServiceRequests =
          function (metadata) {
               return this.core.fetch(
                    '/p/api/v1/service-requests/payer-enrollments/{id}/',
                    'get',
                    metadata
               )
          }
     SDK.prototype.p_api_v1_service_requests_payer_enrollments_partial_update_payerEnrollmentServiceRequests =
          function (body, metadata) {
               return this.core.fetch(
                    '/p/api/v1/service-requests/payer-enrollments/{id}/',
                    'patch',
                    body,
                    metadata
               )
          }
     return SDK
})()
var createSDK = (function () {
     return new SDK()
})()
module.exports = createSDK
