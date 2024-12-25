interface Enrollment {
     payerName: string
     practiceNames: string[]
     hasNonCompliantBcba?: boolean
     coveredRegions?: string[]
     entity?: string
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
     zipCode: string
}

export { Enrollment, EReportType, IProviderUpdateData }
