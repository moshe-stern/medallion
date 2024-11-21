"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const medallion_api_1 = __importDefault(require("@api/medallion-api"));
function medallion() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        medallion_api_1.default.auth('RAAST6r4.aUWJzHEXzSlLp41ct6NRel20OiSjZ61H');
        const res = yield medallion_api_1.default.api_v1_org_providers_list_providers();
        const providerId = (_b = (_a = res.data.results) === null || _a === void 0 ? void 0 : _a.find(prov => prov.full_name === 'CASEY LOUGHREY')) === null || _b === void 0 ? void 0 : _b.id;
        const res2 = yield medallion_api_1.default.p_api_v1_group_profiles_list_groupProfiles();
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
        medallion_api_1.default.p_api_v1_service_requests_payer_enrollments_create_payerEnrollmentServiceRequests({
            payer_name: "Testing api",
            state: "NJ",
            is_medallion_owned: true,
            status: "requested",
            status_reason: null,
            status_category: "requested",
            par_status: null,
            status_update_time: "2024-11-21T20:00:03.828101Z",
            created: "2024-11-21T20:00:03.827340Z",
            provider: providerId,
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
            resourcetype: 'NewProviderPayerEnrollmentServiceRequest'
        })
            .then(({ data }) => console.log(data))
            .catch(err => console.error(err));
    });
}
medallion();
