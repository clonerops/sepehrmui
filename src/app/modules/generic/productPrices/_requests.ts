import { http, httpFormData } from "../../../../_cloner/helpers/axiosConfig";
import { IProductPrice } from "./_models";

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

const exportProductPrices = async () => {
    try {
        const { data } = await http.get('/v1/ProductPrice/ExportProductPrices')
        return data
    } catch (error: any) {
        return error.response;
    }
}


export {
    retrieveProductPrice,
    createProductPrice,
    retrieveProductPriceById,
    updateProductPrice,
    deleteProductPrice,
    uploadProductPrice,
    exportProductPrices
}