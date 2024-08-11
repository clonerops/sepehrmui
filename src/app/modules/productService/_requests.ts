import { http } from "../../../_cloner/helpers/axiosConfig"
import { IService } from "./_models";

const getServices = async () => {
    try {

        const { data } = await http.get('/v1/Service')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postServices = async (formData: IService) => {
    try {

        const { data } = await http.post('/v1/Service', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getService = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/Service/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateServices = async (formData: IService) => {
    try {

        const { data } = await http.put(`/v1/Service/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteService = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/Service/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getServices,
    postServices,
    getService,
    updateServices,
    deleteService
}