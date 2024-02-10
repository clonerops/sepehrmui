import { MutationFunction, useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import { IProductFilters, IProducts, ISuppliers } from "./_models";

const useGetProductList = () => {
    return useMutation((formdata: IProductFilters) => api.getProductList(formdata));
};

const useRetrieveProducts = () => {
    return useQuery(["products"], () => api.retrieveProducts(), {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false
    });
};
const useRetrieveProductsByWarehouse = () => {
    return useMutation((warehouseId: number) => {
        return api.retrieveProductsByWarehouse(warehouseId)
    });
};
const useRetrieveProductsByType = () => {
    return useQuery(["productsByType"], () => api.retrieveProductsByType(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useRetrieveProductsByTypeAndWarehouseFilter = () => {
    return useMutation((warehouseId: string) => {
        return api.retrieveProductsByTypeWarehouseFilter(warehouseId)
    })
};
const useRetrieveProductsByBrand = (isProductChoose?: boolean) => {
    return useQuery(["productsByBrand"], () => api.retrieveProductsByBrand(), {
        enabled: isProductChoose,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useCreateProduct = () => {
    return useMutation((formData: IProducts) => {
        return api.createProducts(formData);
    });
};

const useRetrieveProductById = (id: string) => {
    return useQuery(['products', id], () => api.retrieveProductById(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
    // return useMutation((id: number) => {
    //     return api.retrieveProductById(id);
    // });
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

// Brands
const useRetrieveBrands = () => {
    return useQuery(["brands"], () => api.retrieveBrands()), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    };
};

// Suppliers
const useRetrieveSuppliers = () => {
    return useQuery(["suppliers"], () => api.retrieveSuppliers(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
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


export {
    useGetProductList,
    useRetrieveProducts,
    useRetrieveProductsByWarehouse,
    useRetrieveProductsByType,
    useRetrieveProductsByTypeAndWarehouseFilter,
    useRetrieveProductsByBrand,
    useCreateProduct,
    useRetrieveProductById,
    useRetrieveProduct,
    useUpdateProduct,
    useDisableProduct,
    useEnableProduct,
    useRetrieveBrands,
    useRetrieveSuppliers,
    useCreateSupplier,
    useRetrieveSupplierById,
    useUpdateSupplier,
    useDeleteSupplier,
};
