import { http, httpFormData } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IProductPrice, IProducts, ISuppliers } from "./_models";

const getProductList = async (formdata: {
    productSortBase?: number,
    ByBrand?: boolean,
    WarehouseId?: number,
    PageNumber?: number,
    PageSize?: number
}) => {
    const filter = {
        productSortBase: formdata.productSortBase,
        ByBrand: formdata.ByBrand,
        WarehouseId: formdata.WarehouseId,
        PageNumber: formdata.PageNumber,
        PageSize: formdata.PageSize,
    }

    try {
        const { data } = await http.get(`${generateURLQueryParam('/v1/Product', filter)}`)
        return data
    } catch (error: any) {
        return error.response;
    }

}

const retrieveProducts = async (
    PageNumber: number | null | string = "",
    PageSize: number | null | string = ""
) => {
    // try {
    //     let url: string = ``;

    //     if (PageNumber || PageSize === "") {
    //         url = `/v${1}/Product`;
    //     } else {
    //         url = `/v${1}/Product?PageNumber=${PageNumber}&PageSize=${PageSize}`;
    //     }

    //     const { data } = await http.get(url);
    //     return data;
    // } catch (error: any) {
    //     console.log(error)
    //     return error
    // }
    try {
        const { data } = await http.get('/v1/Product');
        return data;

    } catch (error) {
        return error
    }
};
const retrieveProductsByWarehouse = async (warehouseId: number) => {
    const { data } = await http.get(`/v1/Product?ByBrand=true&WarehouseId=${warehouseId}`);
    return data;
};
const retrieveProductsByBrand = async (
    PageNumber: number | null | string = "",
    PageSize: number | null | string = ""
) => {
    let url: string = ``;

    if (PageNumber || PageSize === "") {
        url = `/v${1}/Product?ByBrand=true`;
    } else {
        url = `/v${1}/Product?PageNumber=${PageNumber}&PageSize=${PageSize}`;
    }

    const { data } = await http.get(url);
    return data;
};
const retrieveProductsByType = async () => {
    const { data } = await http.get("/v1/Product/GetAllProductsByType");
    return data;
};
const retrieveProductsByTypeWarehouseFilter = async (warehouseId: string) => {
    if (warehouseId) {
        const { data } = await http.get(`/v1/Product/GetAllProductsByType?ByBrand=true&WarehouseId=${Number(warehouseId)}`);
        return data;
    } else {
        const { data } = await http.get(`/v1/Product/GetAllProductsByType?ByBrand=true`);
        return data;
    }
};

const createProducts = async (formData: IProducts) => {
    try {
        const { data } = await http.post(
            `/v${1}/Product`,
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const retrieveProductById = async (id: string) => {
    try {
        const { data } = await http.get(`/v${1}/Product/${id}`);
        return data;
    } catch (error: any) {
        return error?.response;
    }
};

const updateProduct = async (formData: IProducts) => {
    try {
        const { data } = await http.put(
            `/v${1}/Product/${formData.id}`,
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error?.response;
    }
};

const disableProduct = async (id: string) => {
    try {
        const { data } = await http.delete(`/v${1}/Product/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const enableProduct = async (formDate: { id: string, active: boolean }) => {
    try {
        const { data } = await http.put(`/v${1}/Product/EnableProduct/${formDate.id}`, JSON.stringify(formDate));
        return data;
    } catch (error: any) {
        return error.response;
    }
};


// Brands 
const retrieveBrands = async () => {
    try {
        const { data } = await http.get('/v1/Product/GetProductBrands')
        return data
    } catch (error: any) {
        return error.response
    }
}

// Suppliers
const retrieveSuppliers = async (PageNumber: number | null | string = "", PageSize: number | null | string = "") => {
    let url: string = ``;

    if (PageNumber || PageSize === "") {
        url = `/v${1}/ProductSupplier`;
    } else {
        url = `/v${1}/ProductSupplier?PageNumber=${PageNumber}&PageSize=${PageSize}`;
    }

    const { data } = await http.get(url);
    return data;
};

const createSuppliers = async (formData: ISuppliers) => {
    try {
        const { data } = await http.post(
            `/v${1}/ProductSupplier`,
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const retrieveSupplierById = async (id: number) => {
    try {
        const { data } = await http.get(`/v${1}/ProductSupplier/${id}`);
        return data;
    } catch (error: any) {
        return error?.response;
    }
};

const updateSupplier = async (formData: ISuppliers) => {
    try {
        const { data } = await http.put(
            `/v${1}/ProductSupplier/${formData.id}`,
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error?.response;
    }
};

const deleteSupplier = async (id: string) => {
    try {
        const { data } = await http.delete(`/v${1}/ProductSupplier/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

// Product Price
const retrieveProductPrice = async (isActive: boolean | number | null | string, PageNumber: number | null | string = "", PageSize: number | null | string = "") => {
    let url: string = `/v${1}/ProductPrice`;

    if (PageNumber || PageSize === "") {
        url = `/v${1}/ProductPrice?isActive=${isActive}`;
    } else {
        url = `/v${1}/ProductPrice?PageNumber=${PageNumber}&PageSize=${PageSize}`;
    }

    const { data } = await http.get(url);
    return data;
};

const createProductPrice = async (formData: IProductPrice) => {
    try {
        const { data } = await http.post(
            `/v${1}/ProductPrice`,
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const retrieveProductPriceById = async (id: string) => {
    try {
        const { data } = await http.get(`/v${1}/ProductPrice/${id}`);
        return data;
    } catch (error: any) {
        return error?.response;
    }
};

const updateProductPrice = async (formData: IProductPrice) => {
    try {
        const { data } = await http.put(
            `/v${1}/ProductPrice/${formData.id}`,
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error?.response;
    }
};

const deleteProductPrice = async (id: string) => {
    try {
        const { data } = await http.delete(`/v${1}/ProductPrice/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const uploadProductPrice = async (formData: any, onUploadProgress: any) => {
    try {
        const { data } = await httpFormData.post(`/v${1}/ProductPrice/UploadFilePost`, formData, {
            onUploadProgress: onUploadProgress
        });
        return data;
    } catch (error: any) {
        return error.response;
    }
};

export const exportProductPrices = async () => {
    try {
        const { data } = await http.get('/v1/ProductPrice/ExportProductPrices')
        return data
    } catch (error: any) {
        return error.response;
    }
}



export {
    getProductList,
    retrieveProducts,
    retrieveProductsByWarehouse,
    retrieveProductsByBrand,
    retrieveProductsByType,
    retrieveProductsByTypeWarehouseFilter,
    createProducts,
    retrieveProductById,
    updateProduct,
    disableProduct,
    enableProduct,
    retrieveBrands,
    // Suppliers
    retrieveSuppliers,
    createSuppliers,
    retrieveSupplierById,
    updateSupplier,
    deleteSupplier,
    // ProductPrice
    retrieveProductPrice,
    createProductPrice,
    retrieveProductPriceById,
    updateProductPrice,
    deleteProductPrice,
    uploadProductPrice
};
