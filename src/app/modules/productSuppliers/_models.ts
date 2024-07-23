export interface ISuppliers {
    id?: string | undefined
    customerId: string | undefined | any
    customerFirstName?: string | undefined
    customerLastName?: string | undefined
    productName?: string | undefined
    productId: string | undefined | any
    price: number | undefined
    rentAmount: number | undefined
    overPrice: number | undefined
    priceDate: string | undefined
    rate: number | undefined
}


export interface ISupplierFilter {
    PageNumber?: number
    PageSize?: number
}