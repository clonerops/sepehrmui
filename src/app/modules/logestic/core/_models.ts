export interface ICargo {
    id?: string | null | undefined
    orderId?: string | null | undefined
    unloadingPlaceAddress?: string | null | undefined
    driverName?: string | null | undefined
    carPlaque?: string | null | undefined
    driverMobile?: string | null | undefined
    approvedUserName?: string | null | undefined
    approvedDate?: string | null | undefined
    fareAmount?: any
    isComplete?: boolean
    vehicleTypeId?: number | null
    deliveryDate?: string | null | undefined
    description?: string | null | undefined 
}

export interface ILadingLicence {
    id?: string | null | undefined
    cargoAnnounceId?: string | null | undefined
    description?: string | null | undefined
    ladingLicenseDetails?: [
      {
        orderDetailId?: string | null | undefined
        ladingAmount?: number | null | undefined
      }
    ]
}

export interface IExitRemittance {
  ladingLicenseId?: number | null | undefined
  bankAccountNo?: string | null | undefined
  bankAccountOwnerName?: string | null | undefined
  creditCardNo?: string | null | undefined
  fareAmount?: number | null | undefined
  otherAmount?: number | null | undefined
  description?: string | null | undefined
  attachments: any
  cargoExitPermitDetails?: {
    ladingLicenseDetailId?: number | null | undefined
    realAmount?: number | null | undefined
    productSubUnitId?: number | null | undefined
    productSubUnitAmount?: number | null | undefined
  }[]

}

export interface ITransferRemittance {
  id?: string | null | undefined
  originWarehouseId: number | null | undefined,
  destinationWarehouseId: number | null | undefined,
  transferRemittanceTypeId: number | null | undefined,
  details: [
    {
      productBrandId: number | null | undefined,
      transferAmount: number | null | undefined,
    }
  ],
  description: string | null | undefined
  unloadingPlaceAddress?: string | null | undefined
  driverName?: string | null | undefined
  carPlaque?: string | null | undefined
  driverMobile?: string | null | undefined
  fareAmount?: any
  vehicleTypeId?: number | null
  deliveryDate?: string | null | undefined

}


export interface IEvacuationPermit {
  purchaseOrderTransferRemittanceEntrancePermitId?: number | null | undefined
  purchaseOrderTransferRemittanceOnloadingPermitId?: number | null | undefined
  driverAccountNo?: string | null | undefined
  bankAccountOwnerName?: string | null | undefined
  driverCreditCardNo?: string | null | undefined
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

