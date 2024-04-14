export interface IRentPayment {
    id?: string
    receivePaymentOriginId: number
    cargoExitPermitId: number
    purchaseOrderTransferRemittanceUnloadingPermitId: string
    ladingExitPermitId: string
    totalFareAmount: number
    description: string
  }
  