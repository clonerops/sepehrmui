export interface ICargo {
    orderId?: string | null | undefined
    unloadingPlaceAddress?: string | null | undefined
    driverName?: string | null | undefined
    carPlaque?: string | null | undefined
    driverMobile?: string | null | undefined
    approvedUserName?: string | null | undefined
    approvedDate?: string | null | undefined
    rentAmount?: number | null ,
    isComplete?: boolean,
    vehicleTypeId?: number | null,
    deliveryDate?: string | null | undefined,
    description?: string | null | undefined 
}