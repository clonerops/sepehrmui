import { IProducts } from "../products/_models"

export interface IProductPrice {
    id?: string | undefined
    price: number | undefined
    productId?: string | undefined
    productName?: string | undefined
    productBrandId: any
    brandName?: number | undefined
    product?: IProducts | undefined
    isActive?: boolean | undefined
}