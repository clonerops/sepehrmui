import { http } from "../../../_cloner/helpers/axiosConfig"
import { IStandard } from "./_models";

const getStandards = async () => {
    try {

        const { data } = await http.get('/v1/ProductStandard')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postStandards = async (formData: IStandard) => {
    try {

        const { data } = await http.post('/v1/ProductStandard', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getStandard = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/ProductStandard/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateStandards = async (formData: IStandard) => {
    try {

        const { data } = await http.put(`/v1/ProductStandard/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteStandard = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/ProductStandard/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getStandards,
    postStandards,
    getStandard,
    updateStandards,
    deleteStandard
}