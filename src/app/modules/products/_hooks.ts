import { useMutation, useQuery } from "@tanstack/react-query";
import { IProductFilters, IProducts } from "./_models";
import * as api from './_requests'


const useGetProducts = () => {
    return useQuery(['Product'], () =>
        api.getProducts(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
};

const useGetProductList = () => {
    return useMutation((formdata: IProductFilters) => {
            return api.getProductList(formdata);
    });
};

const useGetProductsByType = () => {
    return useMutation((formdata: IProductFilters) =>
        api.getProductsByType(formdata));
};


const useCreateProduct = () => {
    return useMutation((formData: IProducts) => {
        return api.createProducts(formData);
    });
};

const useRetrieveProductById = (id: string) => {
    return useQuery(['Product', id], () =>
        api.retrieveProductById(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
};
const useRetrieveProduct = () => {
    return useMutation((id: string) => {
        return api.retrieveProductById(id);
    });
};

const useUpdateProduct = () => {
    return useMutation((formdata: IProducts) => {
        return api.updateProduct(formdata);
    });
};

const useDisableProduct = () => {
    return useMutation((id: string) => {
        return api.disableProduct(id);
    });
};
const useEnableProduct = () => {
    return useMutation((formData: { id: string, active: boolean }) => {
        return api.enableProduct(formData);
    });
};


export {
    useGetProducts,
    useGetProductList,
    useGetProductsByType,
    useCreateProduct,
    useRetrieveProductById,
    useRetrieveProduct,
    useUpdateProduct,
    useDisableProduct,
    useEnableProduct,
}