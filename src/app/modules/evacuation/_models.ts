export interface IEvacuationPermit {

  transferRemittanceEntrancePermitId?: string | null | undefined,
  driverAccountNo?: string | null | undefined,
  driverCreditCardNo?: string | null | undefined,
  otherCosts?: number | null | undefined,
  driverName?: string | null | undefined,
  fareAmount?: number | null | undefined,
  shippingName?: string | null | undefined,
  plaque?: string | null | undefined,
  vehicleTypeId?: number | null | undefined,
  driverMobile?: string | null | undefined,
  deliverDate?: string | null | undefined,
  unloadingPlaceAddress?: string | null | undefined,
  description?: string | null | undefined,
  unloadingPermitDetails: any,
  attachments?: any
}
