import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IBrand } from "./_models"

const useGetBrands = () => {
    return useQuery(['brands'], () => api.getBrands())
}

const usePostBrands = () => {
    return useMutation((formData: IBrand) => {
        return api.postBrands(formData)
    })
}


const useGetBrand = (id: string) => {
    return useQuery(['brands', id], () => api.getBrand(id))
}

const useUpdateBrands = () => {
    return useMutation((formData: IBrand) => {
        return api.updateBrands(formData)
    })
}

const useDeleteBrands = () => {
    return useMutation((id: number) => {
        return api.deleteBrand(id)
    })
}

export {
    useGetBrands,
    usePostBrands,
    useGetBrand,
    useUpdateBrands,
    useDeleteBrands
}