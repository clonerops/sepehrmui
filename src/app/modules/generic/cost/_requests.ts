import { http } from "../../../../_cloner/helpers/axiosConfig"
import { ICost } from "./_models";

const getCosts = async () => {
    try {

        const { data } = await http.get('/v1/Cost')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postCosts = async (formData: ICost) => {
    try {

        const { data } = await http.post('/v1/Cost', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getCost = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/Cost/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateCosts = async (formData: ICost) => {
    try {

        const { data } = await http.put(`/v1/Cost/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteCost = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/Cost/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getCosts,
    postCosts,
    getCost,
    updateCosts,
    deleteCost
}