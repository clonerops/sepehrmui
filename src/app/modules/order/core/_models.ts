import { IProducts } from "../../product/core/_models";

export interface IProduct {
    id: number;
    product: string;
    count: string;
    price: number;
}

export interface IProductOrder {
    productName: string
    count: string
    price: string
}

export interface ICreateOrder {
    id?: string
    customerId: string | undefined | null
    totalAmount: number | undefined | null
    orderCode?: number | undefined | null
    description: string | undefined | null
    exitType: number | undefined | null
    orderSendTypeId: number | undefined | null 
    paymentTypeId: number | undefined | null
    customerOfficialName: string | undefined | null
    customerOfficialCompanyId: number | undefined | null
    invoiceTypeId: number | undefined | null
    registerDate?: string | undefined | null
    freightName: string | undefined | null
    settlementDate: string | undefined | null
    dischargePlaceAddress: string | undefined | null
    freightDriverName: string | undefined | null
    carPlaque: string | undefined | null
    details: ICreateOrderDetails[] | undefined | null
    orderPayments?: IOrderPayment[] | undefined | null
    orderPayment?: IOrderPayment[] | undefined | null
    orderServices?: IOrderService[] | undefined | null
}

export interface ICreateOrderDetails {
    id?: string | undefined
    rowId: number | undefined | null
    productId: string | undefined | null
    // warehouseId: string | undefined | null
    warehouseId: number | undefined | null
    // warehouseTypeId: string | undefined | null
    proximateAmount: number | undefined | null
    numberInPackage: number | undefined | null
    price: number | undefined | null
    cargoSendDate: string | undefined | null
    purchasePrice?: number | undefined | null
    // purchaseInvoiceType: string | undefined | null
    purchaseInvoiceTypeId: number | undefined | null
    purchaserCustomerId: string  | undefined | null
    purchaseSettlementDate: string | undefined | null
    sellerCompanyRow: string | undefined | null
}

export interface IOrder extends ICreateOrder {
    id: string | undefined
}

export interface IOrderDetail extends IOrder {
    customerName: string | null | undefined
    orderSendTypeDesc: string | null | undefined
    paymentTypeDesc: string | null | undefined
    invoiceTypeDesc: string | null | undefined
    customerFirstName: string | null | undefined
    customerLastName: string | null | undefined
    productName: string | null | undefined
    warehouseName: string | null | undefined
    purchaseInvoiceTypeDesc: string | null | undefined
    purchaserCustomerName: string | null | undefined
    
}

export interface IOrderPayment {
    id?: any,
    amount?: any,
    paymentDate?: string | null | undefined,
    daysAfterExit?: number | null | undefined,
    paymentType?: number | null | undefined
}

export interface IOrderService {
    id?: any,
    orderId?: any,
    serviceId?: string | null | undefined,
    serviceName?: string | null | undefined,
    description?: string | null | undefined,
}


export interface IOrderItems {
    id?: string | null | undefined
    productId?: string | null | undefined
    productName?: string | null | undefined
    warehouseId?: string | null | undefined
    productBrandName?: string  | null | undefined
    productBrandId?: string  | null | undefined
    warehouseTypeId?: string  | null | undefined
    warehouseName?: string  | null | undefined
    productDesc?: string  | null | undefined
    purchasePrice?: number  | null | undefined
    purchaseSettlementDate?: string  | null | undefined
    purchaseInvoiceTypeId?: number   | null | undefined
    purchaseInvoiceTypeDesc?: string  | null | undefined
    sellerCompanyRow?: string | null | undefined
    proximateAmount?: string  | null | undefined
    proximateSubUnit?: string  | null | undefined
    purchaserCustomerId?: string  | null | undefined
    purchaserCustomerName?: string  | null | undefined
    mainUnit?: string  | null | undefined
    productMainUnitDesc?: string  | null | undefined
    subUnit?: string  | null | undefined
    productSubUnitDesc?: string  | null | undefined
    productSubUnitId?: number  | null | undefined
    price?: string  | null | undefined
    exchangeRate?: string  | null | undefined
    rowId?: string  | null | undefined
    description?: string  | null | undefined
}

export type ProductProps = {
    orders?: IOrderItems[] ;
    orderService?: IOrderService[] ;
    setOrders?: React.Dispatch<React.SetStateAction<IOrderItems[]>>;
    setOrderPayment?: React.Dispatch<React.SetStateAction<IOrderPayment[]>>;
    setIsBuy?:  React.Dispatch<React.SetStateAction<boolean>>;
    // setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>> | undefined;
    setFieldValue?: any;
    setIsUpdate?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    selectedOrderIndex?: number;
    setSelectedOrderIndex?: React.Dispatch<React.SetStateAction<number>> | undefined;
    products?: IProducts[]
    disabled?: boolean
}

export interface IApproveInvoice {
    orderId?: string | undefined | null,
    invoiceTypeId?: number | null | undefined,
    invoiceApproveDescription?: string | undefined | null,
    orderDetails?: [
      {
        productId: string | undefined | null,
        alternativeProductId: string | undefined | null,
        alternativeProductAmount: number | null | undefined,
        alternativeProductPrice: number | null | undefined
      }
    ],
    attachments?: any,
    orderStatusId?: number | null | undefined
  
}