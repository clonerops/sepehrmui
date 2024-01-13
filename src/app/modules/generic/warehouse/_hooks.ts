import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IWarehouse } from "./_models"

const useGetWarehouses = () => {
    return useQuery(['Warehouses'], () => api.getWarehouses(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}
const usePostWarehouses = () => {
    return useMutation((formData: IWarehouse) => {
        return api.postWarehouses(formData)
    })
}


const useGetWarehouse = (id: number) => {
    return useQuery(['Warehouses', id], () => api.getWarehouse(id))
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
}