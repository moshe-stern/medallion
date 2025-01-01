interface Enrollment {
     id?: string
     payerName: string
     practiceNames: string[]
     hasNonCompliantBcba: boolean
     coveredRegions: string[]
     entity?: string
     linesOfBusiness: string[] | IBusinessLine[]
}

enum EReportType {
     PROVIDER_REQUIRED_DOCUMENTS = 'provider_required_documents',
     PAYER_LIST = 'PAYER_LIST',
}

interface IBusinessLine {
     id: string
     [x: string]: unknown
     label: string
}
interface IProviderUpdateData {
     id: string
     employeeCode: string
     employeeNumber: string
     employeeStatus: string
     position: string
     dolStatus: string
     primaryPhone: string
     street: string
     streetLine2: string
     city: string
     state: string
     zipcode: string
     gender: string
     cityOfBirth: string
     stateOfBirth: string
     eeo1Ethnicity: string
     metaDataS1: string
     metaDataS2: string
}
interface IProviderDocumentUploadDTO {
     files: {
          path: string
          kind: string
          title: string
     }[]
     providerId: string
}

interface IProviderDocument {
     id?: string
     fileContent?: Blob
     providerPk: string
     kind: string
     title: string
}
export {
     Enrollment,
     EReportType,
     IProviderUpdateData,
     IProviderDocumentUploadDTO,
     IProviderDocument,
     IBusinessLine,
}
