export interface IRentPayment {
    id?: string
    receivePaymentOriginId: number
    cargoExitPermitId: number
    purchaseOrderTransferRemittanceUnloadingPermitId: string
    ladingExitPermitId: string
    totalFareAmount: number
    description: string
  }
  

export interface IRentFilter {
    ladingExitPermitId?: string
    purchaseOrderTransferRemittanceUnloadingPermitId?: string
    pageNumber?: number
    pageSize?: number
}