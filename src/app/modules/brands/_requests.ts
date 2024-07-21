import { http } from "../../../_cloner/helpers/axiosConfig"
import { IBrand } from "./_models";

const getBrands = async () => {
    try {

        const { data } = await http.get('/v1/Brand')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postBrands = async (formData: IBrand) => {
    try {

        const { data } = await http.post('/v1/Brand', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getBrand = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/Brand/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateBrands = async (formData: IBrand) => {
    try {

        const { data } = await http.put(`/v1/Brand/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteBrand = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/Brand/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getBrands,
    postBrands,
    getBrand,
    updateBrands,

    deleteBrand
}