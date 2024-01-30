export interface IProducts {
    // productId: number
    // id?: string | undefined
    // productName: string | undefined
    // productTypeId: number | undefined
    // productCode?: number | undefined
    // warehouseId?: number | undefined
    // productSize: string | undefined
    // approximateWeight: number | string | undefined
    // numberInPackage: number | string | undefined
    // statusId?: number | string | undefined
    // description: string | undefined
    // brandName?: string | undefined
    // productIntegratedName?: string | undefined
    // productThickness?: number | string | undefined
    // productStandardId?: number | string | undefined
    // productStateId?: number | string | undefined
    // productInventories?: IProductInventories[]
    // isActive?: boolean | undefined
    id?: string | undefined
    productCode?: number | undefined
    productName?: string | undefined
    productTypeId?: number | undefined
    productTypeDesc?: string | undefined
    productSize?: number | undefined
    productThickness?: number | undefined
    approximateWeight?: number | undefined
    numberInPackage?: number | undefined
    productStandardId?: number | undefined
    productStandardDesc?: string | undefined
    productStateId?: number | undefined
    productStateDesc?: string | undefined
    productMainUnitId?: number | undefined
    productMainUnitDesc?: string | undefined
    productSubUnitId?: number | undefined
    productSubUnitDesc?: string | undefined
    productBrandId?: number | undefined
    warehouseId ?: number | undefined
    productBrandName?: string | undefined
    maxInventory?: number | undefined
    minInventory?: number | undefined
    inventotyCriticalPoint?: number | undefined
    description?: string | undefined
    statusId?: number | undefined
    productIntegratedName?: string | undefined
    productPrice?: number | undefined
    createdDate?: string | undefined
    isActive?: boolean | undefined
    warehouse?: null | undefined
    productPrices?: any
    productInventories?: any
    inventory?: number | undefined

    purchaseInvoiceTypeId?: number | undefined

}

export interface IProductInventories {
    warehouseId: number | undefined
    warehouseType: string | undefined
    warehouseName: string | undefined
    productBrandId: number | undefined
    thickness: number | undefined
    approximateInventory: number | undefined
    floorInventory: number | undefined
    maxInventory: number | undefined
    minInventory: number | undefined
}

export interface IBrands {
    name: string | undefined
    status: number | undefined
    id: number | undefined
}

export interface ISuppliers {
    id?: string | undefined
    customerId: string | undefined
    customerFirstName?: string | undefined
    customerLastName?: string | undefined
    productName?: string | undefined
    productId: string | undefined
    price: number | undefined
    rentAmount: number | undefined
    overPrice: number | undefined
    priceDate: string | undefined
    rate: number | undefined
}

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


export interface IProductFilters {
    productSortBase?: number
    ByBrand?: boolean
    WarehouseId?: number
    PageNumber?: number
    PageSize?: number
}