import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IWarehouse, IWarehouseFilter } from "./_models"

const useGetWarehouses = () => {
    return useQuery(['Warehouses'], () =>
        api.getWarehouses(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const useGetWarehousesByFilter = () => {
    return useMutation((filter: IWarehouseFilter) => {
        return api.getWarehousesByFilter(filter)
    })

}


const usePostWarehouses = () => {
    return useMutation((formData: IWarehouse) => {
        return api.postWarehouses(formData)
    })
}


const useGetWarehouse = (id: number) => {
    return useQuery(['Warehouse', id], () =>
        api.getWarehouse(id))
}

const useUpdateWarehouses = () => {
    return useMutation((formData: IWarehouse) => {
        return api.updateWarehouses(formData)
    })
}

const useDeleteWarehouses = () => {
    return useMutation((id: number) => {
        return api.deleteWarehouse(id)
    })
}

export {
    useGetWarehouses,
    usePostWarehouses,
    useGetWarehouse,
    useUpdateWarehouses,
    useDeleteWarehouses,
    useGetWarehousesByFilter
}