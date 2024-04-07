import { http, httpFormData } from "../../../../_cloner/helpers/axiosConfig"
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl"
import {  IPaymentFilter } from "./_models"

const getRecievePaymentByApproved = async (approvied:string = "0") => {
    try {
        const { data } = await http.get(`/v1/ReceivePay?IsApproved=${approvied}`)
        return data
    } catch (error: any) {
        return error.response
    }
}
const getRecievePayments = async (filters: IPaymentFilter) => {
    try {
        const { data } = await http.get(`${generateURLQueryParam('v1/ReceivePay', filters)}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const postRecievePayment = async (formData: any) => {
    try {
        const { data } = await httpFormData.post('/v1/ReceivePay', formData)
        return data

    } catch (error: any) {
        return error.response
    }
}

const getRecievePaymentById = async (id:string) => {
    try {
        const { data } = await http.get(`/v1/ReceivePay/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}
const updateRecievePaymentById = async (formData: any) => {
    try {
        const { data } = await httpFormData.put(`/v1/ReceivePay/${formData.get("Id")}`, formData)
        return data
    } catch (error: any) {
        return error.response
    }
}

const deleteRecievePaymentById = async (id:string) => {
    try {
        const { data } = await http.delete(`/v1/ReceivePay/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const updatePaymentApproved = async (id:string) => {
    try {
        const { data } = await http.put(`/v1/ReceivePay/ReceivePayApprove`, JSON.stringify({ids: [id]}))
        return data
    } catch (error: any) {
        return error.response
    }
}
const disApprovePaymentApproved = async (formData: {id: string, accountingDescription: string}) => {
    try {
        const { data } = await http.put(`/v1/ReceivePay/ReceivePayAccReject`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const putRecievePaymentRegister = async (formData: any) => {
    try {
        const { data } = await http.put(`/v1/ReceivePay/ReceivePayAccRegister`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}


export {
    getRecievePaymentByApproved,
    postRecievePayment,
    getRecievePaymentById,
    updateRecievePaymentById,
    deleteRecievePaymentById,
    updatePaymentApproved,
    getRecievePayments,
    putRecievePaymentRegister,
    disApprovePaymentApproved

}