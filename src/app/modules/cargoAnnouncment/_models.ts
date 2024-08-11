export interface ICargo {
    id?: string | null | undefined;
    orderId?: string | null | undefined;
    unloadingPlaceAddress?: string | null | undefined;
    shippingName?: string | null | undefined;
    driverName?: string | null | undefined;
    carPlaque?: string | null | undefined;
    driverMobile?: string | null | undefined;
    approvedUserName?: string | null | undefined;
    approvedDate?: string | null | undefined;
    fareAmount?: any;
    isComplete?: boolean;
    vehicleTypeId?: number | null;
    deliveryDate?: string | null | undefined;
    description?: string | null | undefined;
    cargoAnnounceDetails?: any;
    attachments?: any;
}

export interface ICargoFilter {
    PageNumber?: number | null | undefined;
    PageSize?: number | null | undefined;
    OrderCode?: number | null | undefined;
    CustomerId?: string | null | undefined;
    OrderId?: string | null | undefined;
}


export interface ICargoDetail {
    id?: number;
    description?: string;
    fareAmount?: string;
    bankAccountNo?: string;
    bankAccountOwnerName?: string;
    otherAmount?: string;
    orderDetailId?: {
        value: number;
        label: string;
        productId: string;
    };
    orderDetailName?: string;
    ladingAmount?: any;
  }
  
  