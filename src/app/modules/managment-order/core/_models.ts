// Sale Order
export interface ISalesOrder {
    id?: string;
    customerId?: string;
    totalAmount?: number;
    description?: string;
    exitType?: number;
    orderSendTypeId?: number;
    paymentTypeId?: number;
    customerOfficialName?: string;
    customerOfficialCompanyId?: number;
    invoiceTypeId?: number;
    orderTypeId?: number;
    freightName?: string;
    isTemporary?: string;
    dischargePlaceAddress?: string;
    freightDriverName?: string;
    // registerDate?: string
    orderCode?: number;
    carPlaque?: string;
    // settlementDate?: string
    details?: ISaleOrderDetails[];
    orderPayments?: IOrderPayment[];
    // orderPayment?: IOrderPayment[];
    orderServices?: IOrderService[];
}

export interface ISaleOrderDetails {
    // id?: string;
    id?: number;
    rowId?: number;
    productId?: string;
    warehouseId?: number;
    proximateAmount?: number;
    numberInPackage?: number;
    price?: number;
    purchasePrice?: number;
    productSubUnitId?: number;
    productSubUnitAmount?: number;
    purchaseInvoiceTypeId?: number;
    purchaserCustomerId?: string;
    sellerCompanyRow?: string;
    description?: string;
    purchaseSettlementDate?: string;
    cargoSendDate?: string;
}

export interface IOrderPayment {
    // id?: string;
    // amount?: number;
    // paymentDate?: string
    // daysAfterExit?: number
    // paymentType?: number
    orderPaymentId?: string;
    orderPaymentAmount?: string;
    orderPaymentDate?: string
    orderPaymentDaysAfterExit?: number
    orderPaymentType?: number

}

export interface IOrderService {
    id?: number;
    // serviceId?: number;
    // serviceName?: string;
    // description?: string;
    orderServiceMainId?: number;
    orderServiceId?: number;
    serviceName?: string;
    orderServiceDescription?: string;
}












































export interface IApproveInvoice {
    orderId?: string | undefined | null;
    invoiceTypeId?: number | null | undefined;
    invoiceApproveDescription?: string | undefined | null;
    orderDetails?: [
        {
            productId: string | undefined | null;
            alternativeProductId: string | undefined | null;
            alternativeProductAmount: number | null | undefined;
            alternativeProductPrice: number | null | undefined;
        }
    ];
    attachments?: any;
    orderStatusId?: number | null | undefined;
}

export interface IOrderItems {
    id?: string | null | undefined;
    productId?: string | null | undefined;
    productName?: string | null | undefined;
    warehouseId?: string | null | undefined;
    productBrandName?: string | null | undefined;
    productBrandId?: string | null | undefined;
    warehouseTypeId?: string | null | undefined;
    warehouseName?: string | null | undefined;
    productDesc?: string | null | undefined;
    purchasePrice?: number | null | undefined;
    purchaseSettlementDate?: string | null | undefined;
    purchaseInvoiceTypeId?: number | null | undefined;
    purchaseInvoiceTypeDesc?: string | null | undefined;
    sellerCompanyRow?: string | null | undefined;
    proximateAmount?: string | null | undefined;
    proximateSubUnit?: string | null | undefined;
    purchaserCustomerId?: string | null | undefined;
    purchaserCustomerName?: string | null | undefined;
    mainUnit?: string | null | undefined;
    productMainUnitDesc?: string | null | undefined;
    subUnit?: string | null | undefined;
    productSubUnitDesc?: string | null | undefined;
    productSubUnitId?: number | null | undefined;
    price?: string | null | undefined;
    exchangeRate?: string | null | undefined;
    rowId?: string | null | undefined;
    description?: string | null | undefined;
    deliverDate?: string | null | undefined;
    originWarehouseId?: string | null | undefined;
    destinationWarehouseId?: string | null | undefined;
}

export interface IOrder extends ISalesOrder {
    id: string | undefined;
}

export interface ISaleOrderDetail extends IOrder {
    customerName: string | null | undefined;
    orderSendTypeDesc: string | null | undefined;
    paymentTypeDesc: string | null | undefined;
    invoiceTypeDesc: string | null | undefined;
    customerFirstName: string | null | undefined;
    customerLastName: string | null | undefined;
    productName: string | null | undefined;
    warehouseName: string | null | undefined;
    purchaseInvoiceTypeDesc: string | null | undefined;
    purchaserCustomerName: string | null | undefined;
}

// Purchaser Models

export interface IPurchaserOrderDetails {
    id?: string | undefined;
    rowId: number | undefined | null;
    productId: string | undefined | null;
    // warehouseId: number | undefined | null
    proximateAmount: number | undefined | null;
    numberInPackage: number | undefined | null;
    price: number | undefined | null;
    // cargoSendDate: string | undefined | null
    // purchasePrice?: number | undefined | null
    productBrandId?: number | undefined | null;
    productSubUnitId?: number | undefined | null;
    productSubUnitAmount?: number | undefined | null;
    // purchaseInvoiceTypeId: number | undefined | null
    // purchaserCustomerId: string  | undefined | null
    // purchaseSettlementDate: string | undefined | null
    description: string | undefined | null;
    // sellerCompanyRow: string | undefined | null
}

export interface IPurchaserOrder {
    id?: string;
    customerId: string | undefined | null;
    totalAmount: number | undefined | null;
    description: string | undefined | null;
    exitType: number | undefined | null;
    purchaseOrderSendTypeId: number | undefined | null;
    paymentTypeId: number | undefined | null;
    customerOfficialCompanyId: number | undefined | null;
    invoiceTypeId: number | undefined | null;
    isTemporary: boolean | undefined | null;
    details: IPurchaserOrderDetails[] | undefined | null;
    purchaseOrderPayments?: IOrderPayment[] | undefined | null;
    purchaseOrderServices?: IOrderService[] | undefined | null;
}

export interface IApprovePurchaserInvoice {
    orderId?: string | undefined | null;
    invoiceTypeId?: number | null | undefined;
    invoiceApproveDescription?: string | undefined | null;
    orderDetails?: [
        {
            productId: string | undefined | null;
            alternativeProductId: string | undefined | null;
            alternativeProductAmount: number | null | undefined;
            alternativeProductPrice: number | null | undefined;
        }
    ];
    attachments?: any;
    orderStatusId?: number | null | undefined;
}

export interface IPurchaserTransferBetweenWarehouse {
    orderId: string;
    warehouseId: number;
    transferDetails: [
        {
            purchaseOrderDetailId: number;
            productBrandName: string;
            transferedAmount: number;
        }
    ][];
}
