export interface ICustomer {
    id?: string | undefined
    customerCode?: number | undefined
    firstName?: string | undefined
    lastName?: string | undefined
    fatherName?: string | undefined
    officialName?: string | undefined
    nationalId2?: string | undefined
    nationalId?: string | undefined
    address1?: string | undefined
    customerType?: any
    customerValidityId?: any
    address2: string | undefined
    representative?: string | undefined
    isSupplier?: boolean | undefined
    settlementDay?: string | undefined | null
    customerDept?: string | undefined | null
    customerCurrentDept?: string | undefined | null
    customerValidityDesc?: string | undefined | null
    customerValidityColorCode?: string | undefined | null
    phonebook?: {
        phoneNumber: string
        phoneNumberTypeId: number
    }[] | undefined | null

}

export interface IPhoneBook {
    phoneNumber: string
    phoneNumberType: {
        label: string,
        value: number
    }
}

export interface ICustomerFilter {
    keyword?: string
    CustomerLabelId?: number
    ReportType?: number
    PageNumber?: number
    PageSize?: number
}


export interface ICustomerAccountFilter {
    customerId: string | null |undefined
    fromDate: string | null | undefined
    toDate: string | null | undefined
    billingReportType: number | null |undefined
    dateFilter: number | null |undefined
}