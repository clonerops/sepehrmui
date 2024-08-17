export interface IRentPayment {
    id?: string
    receivePaymentOriginId?: number
    puOrderTransRemittUnloadingPermitIds?: any
    ladingExitPermitIds?: any
    totalFareAmount?: number
    description?: string
}
  

export interface IRentFilter {
    referenceCode?: string
    driverName?: string
    driverMobile?: string
    orderType?: string
    fromDate?: string | null
    toDate?: string | null
    pageNumber?: number
    pageSize?: number
}

export interface IRentPaymentFields {
    referenceCode: number,
    ladingExitPermitId: string,
    unloadingPermitId: string,
    referenceDate: string,
    cargoAnnounceNo: number,
    orderTypeDesc: string,
    cargoTotalWeight: number,
    driverName:  string,
    driverMobile: string,
    driverAccountNo: string,
    accountOwnerName: string,
    otherCosts: number,
    totalAmount: number,
    totalPayableAmount: number,
    totalLadingAmount: number
}
  