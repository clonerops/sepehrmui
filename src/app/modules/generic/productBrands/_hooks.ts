import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IProductBrand } from "./_models"

const useGetProductBrands = () => {
    return useQuery(['productBrand'], () => api.getProductBrands())
}

const usePostProductBrands = () => {
    return useMutation((formData: IProductBrand) => {
        return api.postProductBrands(formData)
    })
}


const useGetProductBrand = (id: string) => {
    return useQuery(['ProductBrands', id], () => api.getProductBrand(id))
}

const useUpdateProductBrands = () => {
    return useMutation((formData: IProductBrand) => {
        return api.updateProductBrands(formData)
    })
}

const useDeleteProductBrands = () => {
    return useMutation((id: number) => {
        return api.deleteProductBrand(id)
    })
}

export {
    useGetProductBrands,
    usePostProductBrands,
    useGetProductBrand,
    useUpdateProductBrands,
    useDeleteProductBrands
}