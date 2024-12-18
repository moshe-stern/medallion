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

export { Enrollment, EReportType }
