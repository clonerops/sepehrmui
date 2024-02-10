import { IProducts } from "../../product/core/_models"

export interface IProductPrice {
    id?: string | undefined
    price: number | undefined
    productId?: string | undefined
    productName?: string | undefined
    productBrandId: number | undefined
    brandName?: number | undefined
    product?: IProducts | undefined
    isActive?: boolean | undefined
}