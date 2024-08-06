import { http } from "../../../_cloner/helpers/axiosConfig"
import { ICustomerLabel } from "./_models";

const getCustomerLabels = async () => {
    try {

        const { data } = await http.get('/v1/CustomerLabel')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postCustomerLabels = async (formData: ICustomerLabel) => {
    try {

        const { data } = await http.post('/v1/CustomerLabel', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getCustomerLabel = async (id: number) => {
    try {

        const { data } = await http.get(`/v1/CustomerLabel/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateCustomerLabels = async (formData: ICustomerLabel) => {
    try {

        const { data } = await http.put(`/v1/CustomerLabel/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteCustomerLabel = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/CustomerLabel/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getCustomerLabels,
    postCustomerLabels,
    getCustomerLabel,
    updateCustomerLabels,
    deleteCustomerLabel
}