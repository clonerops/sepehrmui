export interface IRentPayment {
    id?: string
    receivePaymentOriginId?: number
    cargoExitPermitId?: number
    purchaseOrderTransferRemittanceUnloadingPermitId?: string
    ladingExitPermitId?: string
    totalFareAmount?: number
    description?: string
}
  

export interface IRentFilter {
    ladingExitPermitId?: string
    purchaseOrderTransferRemittanceUnloadingPermitId?: string
    pageNumber?: number
    pageSize?: number
}

export interface IRentPaymentFields {
    referenceCode: number,
    ladingExitPermitId: string,
    purchaseOrderTransferRemittanceUnloadingPermitId: string,
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
  