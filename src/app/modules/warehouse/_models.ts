export interface IWarehouse {
    id?: number | null | undefined
    name: string | null | undefined
    warehouseTypeId?: number | null | undefined
    customerId?: string | null | undefined
}


export interface IWarehouseFilter {
    id?: number | null | undefined
    name?: string | null | undefined
    warehouseTypeId?: number | null | undefined
    warehouseId?: number | null | undefined
    customerId?: string | null | undefined
}
