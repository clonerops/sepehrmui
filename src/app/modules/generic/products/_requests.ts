import { http } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IProductFilters, IProducts } from "./_models";

const getProductList = async (formdata: IProductFilters) => {
    try {
        const { data } = await http.get(`${generateURLQueryParam('/v1/Product', formdata)}`)
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
}