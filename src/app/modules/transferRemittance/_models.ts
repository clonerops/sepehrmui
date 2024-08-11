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


export interface ITransferRemittanceFilter {
  id?: number, 
  TransferEntransePermitNo?: number, 
  TransferRemittStatusId?: number, 
  IsEntranced?: boolean,
  PageNumber?: number,
  PageSize?: number,

}