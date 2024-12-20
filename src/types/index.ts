interface Enrollment {
     payerName: string
     practiceNames: string[]
     hasNonCompliantBcba?: boolean
     coveredRegions?: string[]
}

enum EReportType {
     PROVIDER_REQUIRED_DOCUMENTS = 'provider_required_documents',
     PAYER_LIST = 'PAYER_LIST',
}

interface IProviderUpdateData {
     employeeNumber: string
     employeeCode: string
     workStatus: string
     employeeTitle: string
     employeeEmail: string
}

export { Enrollment, EReportType, IProviderUpdateData }
