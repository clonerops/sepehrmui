import { http } from "../../../../_cloner/helpers/axiosConfig"
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IRentFilter, IRentPayment } from "./_models";

const getRentPayments = async () => {
    try {

        const { data } = await http.get('/v1/RentPayment')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getRentPaymentsByMutation = async (filters: IRentFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/RentPayment', filters)}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getAllRents = async (formData: IRentFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/RentPayment/GetAllRents', formData)}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postRentPayments = async (formData: IRentPayment) => {
    try {

        const { data } = await http.post('/v1/RentPayment', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getRentPayment = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/RentPayment/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateRentPayments = async (formData: IRentPayment) => {
    try {

        const { data } = await http.put(`/v1/RentPayment/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteRentPayment = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/RentPayment/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getRentPayments,
    getRentPaymentsByMutation,
    getAllRents,
    postRentPayments,
    getRentPayment,
    updateRentPayments,
    deleteRentPayment,
}