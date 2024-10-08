export interface ISendTypes {
    description: string
    id: number
}
export interface IRentPaymentType {
    desc: string
    id: number
}
export interface IPurchaseInvoice {
    desc: string
    id: number
}
export interface IInvoiceType {
    typeDesc: string
    id: number
}
export interface ICustomerValidities {
    validityDesc: string
    id: number
}
export interface IWarehouseTypes {
    validityDesc: string
    id: number
    isActive: boolean
}
export interface IWarehouse {
    name: string | null,
    warehouseTypeId: number | null,
    warehouseType: string | number | null,
    products: string | number | null,
    id: number | null,
}
export interface IReceivePaymentSources extends IPurchaseInvoice { }

export interface IService {
    description: string,
    id?: number,
    isActive: boolean
}

export interface IProductType {
    desc: string,
    typeColor: string | null,
    id: number,
    isActive: boolean
}

export interface IVehicleType {
    name: string
    id: number,
    isActive: boolean
}

export interface ITransferRemittanceStatus {
    id: number
    statusDesc: string
}

export interface IOfficialBank {
    id: number
    bankName: string
    isActive: boolean
}

export interface IOrderExitTypes {
    exitTypeDesc: string
    id: number
    isActive: boolean
}

export interface IUnit {
    id?: number | null | undefined
    unitName: string | null | undefined
}

export interface IPhoneBookType {
    typeDescription: string,
    id: number,
    isActive: boolean
}

export interface ICustomerLabelType {
    typeDescription: string,
    id: number,
    isActive: boolean
}

export interface IRequestPaymentReason {
    reasonDesc: string,
    id: number,
    isActive: boolean
}