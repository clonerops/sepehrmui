import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { ICustomerWarehouse } from "./_models"

const useGetCustomerWarehouses = () => {
    return useQuery(['customerWarehouse'], () =>
        api.getCustomerWarehouses(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostCustomerWarehouses = () => {
    return useMutation((formData: ICustomerWarehouse) => {
        return api.postCustomerWarehouses(formData)
    })
}
const useGetCustomerWarehousesByProductId = (productId: string) => {
    return useQuery(['customerWarehouse', productId], () => 
        api.getCustomerWarehousesByProductId(productId))
}


const useGetCustomerWarehouse = (id: string) => {
    return useQuery(['customerWarehouses', id], () => 
        api.getCustomerWarehouse(id))
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
    useGetCustomerWarehousesByProductId,
    usePostCustomerWarehouses,
    useGetCustomerWarehouse,
    useUpdateCustomerWarehouses,
    useDeleteCustomerWarehouses
}
