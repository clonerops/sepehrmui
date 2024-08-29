export interface IProductBrand {
    id?: number | null | undefined
    productId: string | null | undefined
    brandId: number | null | undefined
    isActive?: boolean | null | undefined
}

export interface IProductBrandFilter {
    PageNumber: number
    PageSize: number
}