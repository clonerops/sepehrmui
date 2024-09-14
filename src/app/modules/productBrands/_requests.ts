import { http } from "../../../_cloner/helpers/axiosConfig"
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IProductBrand, IProductBrandFilter } from "./_models";

const getProductBrands = async () => {
    try {

        const { data } = await http.get('/v1/ProductBrand')
        return data;

    } catch (error: any) {
        return error.response
    }
}
const getProductBrandsByMutation = async (formData: IProductBrandFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/ProductBrand', formData)}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getProductBrandsByProductId = async (productId: string) => {
    try {

        const { data } = await http.get(`/v1/ProductBrand?ProductId=${productId}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}


const postProductBrands = async (formData: IProductBrand) => {
    try {

        const { data } = await http.post('/v1/ProductBrand', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getProductBrand = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/ProductBrand/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateProductBrands = async (formData: IProductBrand) => {
    try {

        const { data } = await http.put(`/v1/ProductBrand/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteProductBrand = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/ProductBrand/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getProductPricesByProductType = async (formData: IProductBrandFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/ProductBrand/GetProductPricesByProductType', formData)}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}


export {
    getProductBrands,
    getProductBrandsByMutation,
    getProductBrandsByProductId,
    postProductBrands,
    getProductBrand,
    updateProductBrands,
    deleteProductBrand,
    getProductPricesByProductType
}