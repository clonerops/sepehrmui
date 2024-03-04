export interface IProducts {
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

export interface IProductFilters {
    productSortBase?: number
    uploadedDate?: string
    ByBrand?: boolean
    HasPurchaseInventory?: boolean
    WarehouseId?: number
    WarehouseTypeId?: number
    PageNumber?: number
    PageSize?: number
    ProductTypeId?: number
    ProductName?: string
}