import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IProductBrand } from "./_models"

const useGetProductBrands = () => {
    return useQuery(['productBrand'], () => api.getProductBrands(), {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false
    })
}

const usePostProductBrands = () => {
    return useMutation((formData: IProductBrand) => {
        return api.postProductBrands(formData)
    })
}
const useGetProductBrandsByProductId = (productId: string) => {
    return useQuery(['productBrand', productId], () => api.getProductBrandsByProductId(productId))
    // return useMutation((productId: string) => {
    //     return api.getProductBrandsByProductId(productId)
    // })
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
    useGetProductBrandsByProductId,
    usePostProductBrands,
    useGetProductBrand,
    useUpdateProductBrands,
    useDeleteProductBrands
}