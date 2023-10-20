import { MutationFunction, useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import { IProductPrice, IProducts, ISuppliers } from "./_models";

const useRetrieveProducts = () => {
    return useQuery(["products"], () => api.retrieveProducts());
};
const useRetrieveProductsByBrand = () => {
    return useQuery(["productsByBrand"], () => api.retrieveProductsByBrand());
};

const useCreateProduct = () => {
    return useMutation((formData: IProducts) => {
        return api.createProducts(formData);
    });
};

const useRetrieveProductById = (id: string) => {
    return useQuery(['products', id], () => api.retrieveProductById(id))
    // return useMutation((id: number) => {
    //     return api.retrieveProductById(id);
    // });
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

// Brands
const useRetrieveBrands = () => {
    return useQuery(["brands"], () => api.retrieveBrands());
};

// Suppliers
const useRetrieveSuppliers = () => {
    return useQuery(["suppliers"], () => api.retrieveSuppliers());
};

const useCreateSupplier = () => {
    return useMutation((formData: ISuppliers) => {
        return api.createSuppliers(formData);
    });
};

const useRetrieveSupplierById = () => {
    return useMutation((id: number) => {
        return api.retrieveSupplierById(id);
    });
};

const useUpdateSupplier = () => {
    return useMutation((formdata: ISuppliers) => {
        return api.updateSupplier(formdata);
    });
};

const useDeleteSupplier = () => {
    return useMutation((id: string) => {
        return api.deleteSupplier(id);
    });
};
// Product Price
const useRetrieveProductPrice = (isActive: boolean | number | null | string) => {
    return useQuery(["productPrice", isActive], () => api.retrieveProductPrice(isActive));
};
// const useRetrieveProductPrice = () => {
//     return useQuery(["productPrice"], () => api.retrieveProductPrice());
// };
// const useRetrieveProductPrice = () => {
//     return useMutation((isActive: boolean | number) => {
//         return api.retrieveProductPrice(isActive)
//     });
// };

const useCreateProductPrice = () => {
    return useMutation((formData: IProductPrice) => {
        return api.createProductPrice(formData);
    });
};

const useRetrieveProductPriceById = () => {
    return useMutation((id: number) => {
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
    useRetrieveProducts,
    useRetrieveProductsByBrand,
    useCreateProduct,
    useRetrieveProductById,
    useUpdateProduct,
    useDisableProduct,
    useEnableProduct,
    useRetrieveBrands,
    useRetrieveSuppliers,
    useCreateSupplier,
    useRetrieveSupplierById,
    useUpdateSupplier,
    useDeleteSupplier,
    useRetrieveProductPrice,
    useCreateProductPrice,
    useRetrieveProductPriceById,
    useUpdateProductPrice,
    useDeleteProductPrice,
    useUploadFileProductPrice,
    useExportProductPrice
};
