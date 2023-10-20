import { IProducts } from "../../product/core/_models"
import { IBrand } from "../brands/_models"

export interface IProductBrand {
    id?: number | null | undefined
    productId: string | null | undefined
    brandId: number | null | undefined
    isActive?: boolean | null | undefined
}

export interface IProductBrandList {
    productId?: string | undefined | null,
    productName?: string | undefined | null,
    brandId?: number | undefined | null,
    brandName?: string | undefined | null,
    productPrice?: number | undefined | null,
    product?: IProducts,
    brand?: IBrand,
    id?: number | undefined | null,
    isActive?: boolean | undefined | null
  }