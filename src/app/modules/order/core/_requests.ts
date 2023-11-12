import { http } from "../../../../_cloner/helpers/axiosConfig";
import { IApproveInvoice, ICreateOrder } from "./_models";

const createOrder = async (formData: ICreateOrder) => {
    try {
        const { data } = await http.post(`/v1/Order`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const retrieveOrders = async () => {
    try {
        const { data } = await http.get(`/v1/Order`)
        return data
    } catch (error: any) {
        return error.response
    }
}
const retrieveOrdersMutation = async (pageSize: number, pageNumber: number) => {
    try {
        const { data } = await http.get(`/v1/Order?pageSize=${pageSize}&pageNumber=${pageNumber}`)
        return data
    } catch (error: any) {
        return error.response
    }
}
const retrieveOrder = async (id: string | undefined) => {
    try {
        const { data } = await http.get(`/v1/Order/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const confirmOrder = async (id: string) => {
    try {
        const { data } = await http.put(`/v1/Order/ConfirmOrder/${id}`, JSON.stringify({orderId: id}))
        return data
    } catch (error: any) {
        return error.response
    }
}
const approveInvoiceType = async (formData: IApproveInvoice) => {
    try {
        const { data } = await http.put(`/v1/Order/ApproveInvoiceType`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}



export {
    createOrder,
    retrieveOrders,
    retrieveOrder,
    confirmOrder,
    approveInvoiceType,
    retrieveOrdersMutation 
}