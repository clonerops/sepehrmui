// import { IBrand } from "../brands/_models"
// import { IProducts } from "../products/_models"

export interface ICustomerWarehouse {
    id?: number | null | undefined
    customerId: string | null | undefined
    warehouseId: number | null | undefined
    isActive?: boolean | null | undefined
}

// export interface IProductBrandList {
//     productId?: string | undefined | null,
//     productName?: string | undefined | null,
//     brandId?: number | undefined | null,
//     brandName?: string | undefined | null,
//     productPrice?: number | undefined | null,
//     product?: IProducts,
//     brand?: IBrand,
//     id?: number | undefined | null,
//     isActive?: boolean | undefined | null
//   }