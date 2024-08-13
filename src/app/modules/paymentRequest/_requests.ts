import { http, httpFormData } from "../../../_cloner/helpers/axiosConfig"
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl"
import {  IRequestPaymentFilter } from "./_models"

const getPaymentRequestByApproved = async (approvied:string = "0") => {
    try {
        const { data } = await http.get(`/v1/PaymentRequest?IsApproved=${approvied}`)
        return data
    } catch (error: any) {
        return error.response
    }
}
const getPaymentRequests = async (filters: IRequestPaymentFilter) => {
    try {
        const { data } = await http.get(`${generateURLQueryParam('v1/PaymentRequest', filters)}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const postPaymentRequest = async (formData: any) => {
    try {
        const { data } = await http.post('/v1/PaymentRequest', JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}

const getPaymentRequestById = async (id:string) => {
    try {
        const { data } = await http.get(`/v1/PaymentRequest/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}
const getPaymentRequestByIdMutation = async (id:string) => {
    try {
        const { data } = await http.get(`/v1/PaymentRequest/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}
const updatePaymentRequestById = async (formData: any) => {
    try {
        const { data } = await http.put(`/v1/PaymentRequest/${formData.get("Id")}`, formData)
        return data
    } catch (error: any) {
        return error.response
    }
}

const deletePaymentRequestById = async (id:string) => {
    try {
        const { data } = await http.delete(`/v1/PaymentRequest/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const updatePaymentApproved = async (formData: {ids: string[]}) => {
    try {
        const { data } = await http.put(`/v1/PaymentRequest/PaymentRequestApprove`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}
const disApprovePaymentApproved = async (formData: {id: string, accountingDescription: string}) => {
    try {
        const { data } = await http.put(`/v1/PaymentRequest/PaymentRequestAccReject`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const putPaymentRequestRegister = async (formData: any) => {
    try {
        const { data } = await http.put(`/v1/PaymentRequest/PaymentRequestAccRegister`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}


export {
    getPaymentRequestByApproved,
    postPaymentRequest,
    getPaymentRequestById,
    updatePaymentRequestById,
    deletePaymentRequestById,
    updatePaymentApproved,
    getPaymentRequests,
    putPaymentRequestRegister,
    disApprovePaymentApproved,
    getPaymentRequestByIdMutation

}