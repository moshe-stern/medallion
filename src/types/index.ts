import { ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam, ApiV1OrgProvidersDocumentsCreateProviderDocumentsMetadataParam } from "@api/medallion-api/types"

interface Enrollment {
     payerName: string
     practiceNames: string[]
     hasNonCompliantBcba?: boolean
     coveredRegions?: string[]
     entity?: string
     linesOfBusiness?: string[]
}

enum EReportType {
     PROVIDER_REQUIRED_DOCUMENTS = 'provider_required_documents',
     PAYER_LIST = 'PAYER_LIST',
}

interface IProviderUpdateData {
     employeeNumber: string
     employeeCode: string
     workStatus: string
     employeeEmail: string
     position: string
     gender: string
     cellphone: string
     employeeStatus: string
     metaDataS1: string
     metaDataS2: string
     line1: string
     line2: string
     city: string
     addressState: string
     zipCode: string,
     cityOfBirth: string
     birthState: string
     race: string,
     documents?: ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam[]

}
interface IProviderDocumentUpload {
     body: ApiV1OrgProvidersDocumentsCreateProviderDocumentsBodyParam
     metadata: ApiV1OrgProvidersDocumentsCreateProviderDocumentsMetadataParam
}

export { Enrollment, EReportType, IProviderUpdateData, IProviderDocumentUpload}
