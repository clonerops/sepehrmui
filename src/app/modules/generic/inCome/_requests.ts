import { http } from "../../../../_cloner/helpers/axiosConfig"
import { IIncome } from "./_models";

const getIncomes = async () => {
    try {

        const { data } = await http.get('/v1/Income')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postIncomes = async (formData: IIncome) => {
    try {

        const { data } = await http.post('/v1/Income', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getIncome = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/Income/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateIncomes = async (formData: IIncome) => {
    try {

        const { data } = await http.put(`/v1/Income/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteIncome = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/Income/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getIncomes,
    postIncomes,
    getIncome,
    updateIncomes,
    deleteIncome
}