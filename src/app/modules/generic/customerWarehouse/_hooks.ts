import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { ICustomerWarehouse } from "./_models"
import { IWarehouseFilter } from "../warehouse/_models"

const useGetCustomerWarehouses = () => {
    return useQuery(['Warehouses'], () => api.getCustomerWarehouses(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const useGetCustomerWarehousesByFilter = () => {
    return useMutation((filter: IWarehouseFilter) => {
        return api.getCustomerWarehousesByFilter(filter)
    })

}


const usePostCustomerWarehouses = () => {
    return useMutation((formData: ICustomerWarehouse) => {
        return api.postCustomerWarehouses(formData)
    })
}


const useGetCustomerWarehouse = (id: number) => {
    return useQuery(['Warehouses', id], () => api.getCustomerWarehouse(id))
}

const useUpdateCustomerWarehouses = () => {
    return useMutation((formData: ICustomerWarehouse) => {
        return api.updateCustomerWarehouses(formData)
    })
}

const useDeleteCustomerWarehouses = () => {
    return useMutation((id: number) => {
        return api.deleteCustomerWarehouse(id)
    })
}

export {
    useGetCustomerWarehouses,
    usePostCustomerWarehouses,
    useGetCustomerWarehouse,
    useUpdateCustomerWarehouses,
    useDeleteCustomerWarehouses,
    useGetCustomerWarehousesByFilter
}