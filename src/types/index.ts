interface Enrollment {
     payerName: string
     practiceNames: string[]
     hasNonCompliantBcba?: boolean
     coveredRegions?: string[]
}

export * from './provider'

export { Enrollment }
