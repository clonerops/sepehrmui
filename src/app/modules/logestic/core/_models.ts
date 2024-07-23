


export interface IEvacuationPermit {
  purchaseOrderTransferRemittanceEntrancePermitId?: number | null | undefined
  purchaseOrderTransferRemittanceOnloadingPermitId?: number | null | undefined
  driverAccountNo?: string | null | undefined
  bankAccountOwnerName?: string | null | undefined
  // driverCreditCardNo?: string | null | undefined
  shippingName?: string | null | undefined
  fareAmount?: number | null | undefined
  otherCosts?: number | null | undefined
  description?: string | null | undefined
  attachments: any
  purchaseOrderTransferRemittanceOnloadingPermitDetails?: {
    purchaseOrderTransferRemittanceId?: string | null | undefined
    purchaseOrderTransferRemittanceOnloadingPermitId?: number | null | undefined
    onloadedAmount?: number | null | undefined
  }[]

}
