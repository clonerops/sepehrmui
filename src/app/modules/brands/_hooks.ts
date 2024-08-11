import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IBrand } from "./_models"

const useGetBrands = () => {
    return useQuery(['Brands'], () => 
        api.getBrands(),  {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostBrands = () => {
    return useMutation((formData: IBrand) => {
        return api.postBrands(formData)
    })
}


const useGetBrand = (id: string) => {
    return useQuery(['Brands', id], () => api.getBrand(id))
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