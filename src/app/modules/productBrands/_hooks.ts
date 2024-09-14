import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IProductBrand, IProductBrandFilter } from "./_models"

const useGetProductBrands = () => {
    return useQuery(['ProductBrands'], 
        () => api.getProductBrands(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const useGetProductBrandsByMutation = () => {
    return useMutation((formData: IProductBrandFilter) => {
        return api.getProductBrandsByMutation(formData)
    })
}
const usePostProductBrands = () => {
    return useMutation((formData: IProductBrand) => {
        return api.postProductBrands(formData)
    })
}
const useGetProductBrandsByProductId = (productId: string) => {
    return useQuery(['ProductBrands', productId], 
        () => api.getProductBrandsByProductId(productId))
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

const useGetProductPricesByProductType = () => {
    return useMutation((formData: IProductBrandFilter) => {
        return api.getProductPricesByProductType    (formData)
    })
}


export {
    useGetProductBrands,
    useGetProductBrandsByProductId,
    usePostProductBrands,
    useGetProductBrand,
    useUpdateProductBrands,
    useDeleteProductBrands,
    useGetProductBrandsByMutation,
    useGetProductPricesByProductType
}