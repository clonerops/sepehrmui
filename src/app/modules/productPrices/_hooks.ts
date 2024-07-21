import { useMutation, useQuery } from "@tanstack/react-query";
import { IProductPrice } from "./_models";
import * as api from './_requests'

const useRetrieveProductPrice = (isActive: boolean | number | null | string) => {
    return useQuery(["productPrice", isActive], () => 
        api.retrieveProductPrice(isActive), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useCreateProductPrice = () => {
    return useMutation((formData: IProductPrice) => {
        return api.createProductPrice(formData);
    });
};

const useRetrieveProductPriceById = () => {
    return useMutation((id: string) => {
        return api.retrieveProductPriceById(id);
    });
};

const useUpdateProductPrice = () => {
    return useMutation((formdata: IProductPrice) => {
        return api.updateProductPrice(formdata);
    });
};

const useDeleteProductPrice = () => {
    return useMutation((id: string) => {
        return api.deleteProductPrice(id);
    });
};

const uploadProductPrice: any = (formData: any, onUploadProgress: any) => {
    return api.uploadProductPrice(formData, onUploadProgress);
};
const useUploadFileProductPrice = () => {
    return useMutation(uploadProductPrice);
};
const useExportProductPrice = () => {
    return useMutation(() => {
        return api.exportProductPrices()
    })
}


export {
    useRetrieveProductPrice,
    useCreateProductPrice,
    useRetrieveProductPriceById,
    useUpdateProductPrice,
    useDeleteProductPrice,
    useUploadFileProductPrice,
    useExportProductPrice,
}