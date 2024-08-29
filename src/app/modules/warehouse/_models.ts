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


export enum WarehouseType {
    Vaseteh = 1,
    Amani = 2,
    Mabadi = 3,
    Rasmi = 4,
    Addi = 5,
    Kharid = 6,
    Karkhaneh = 7,
}