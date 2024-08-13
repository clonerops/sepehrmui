import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from './_requests'

const useGetTransferWarehouseLists = () => {
    return useQuery(['transferWarehouseInventory'], () => api.getTransferWarehouseInventoryLists())
}

const usePostTransferWarehouseInventory = () => {
    return useMutation((formData: any) => {
        return api.postTransferWarehouseInventory(formData)
    })
}
const useGetTransferWarehouseInventory = (id: any) => {
    return useQuery(['transferWarehouseInventory', id], () => api.getTransferWarehouseInventoryById(id))
}
const useUpdateTransferWarehouseInventory = () => {
    return useMutation((formData: any) => {
        return api.updateTransferWarehouseInventory(formData)
    })
}

export {
    useGetTransferWarehouseLists,
    usePostTransferWarehouseInventory,
    useGetTransferWarehouseInventory,
    useUpdateTransferWarehouseInventory
}

