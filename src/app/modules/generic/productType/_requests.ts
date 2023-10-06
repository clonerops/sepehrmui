import { http } from "../../../../_cloner/helpers/axiosConfig"
import { IType } from "./_models";

const getTypes = async () => {
    try {

        const { data } = await http.get('/v1/ProductType')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postTypes = async (formData: IType) => {
    try {

        const { data } = await http.post('/v1/ProductType', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getType = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/ProductType/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateTypes = async (formData: IType) => {
    try {

        const { data } = await http.put(`/v1/ProductType/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteType = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/ProductType/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getTypes,
    postTypes,
    getType,
    updateTypes,
    deleteType
}