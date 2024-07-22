import { http } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IProductFilters, IProducts } from "./_models";

const getProductList = async (formdata: IProductFilters) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/Product', formdata)}`)
        return data

    } catch (error: any) {
        return error.response;
    }

}

const getProductsByType = async (formdata: IProductFilters) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/Product/GetAllProductsByType', formdata)}`)
        return data;
        
    } catch (error: any) {
        return error.response
    }
};


const createProducts = async (formData: IProducts) => {
    try {

        const { data } = await http.post(`/v${1}/Product`, JSON.stringify(formData));
        return data;

    } catch (error: any) {
        return error.response;
    }
};

const retrieveProductById = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/Product/${id}`);
        return data;

    } catch (error: any) {
        return error?.response;
    }
};

const updateProduct = async (formData: IProducts) => {
    try {
        
        const { data } = await http.put(`/v1/Product/${formData.id}`,JSON.stringify(formData));
        return data;
    
    } catch (error: any) {
        return error?.response;
    }
};

const disableProduct = async (id: string) => {
    try {

        const { data } = await http.delete(`/v1/Product/${id}`);
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
    getProductsByType,
    createProducts,
    retrieveProductById,
    updateProduct,
    disableProduct,
    enableProduct,
}