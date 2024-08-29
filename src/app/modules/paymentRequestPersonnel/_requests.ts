import { http } from "../../../_cloner/helpers/axiosConfig"
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl"
import {  IArrpoveRequestPayment, IProccedRequestPayment, IRequestPaymentFilter } from "./_models"

const getPaymentRequests = async (filters: IRequestPaymentFilter) => {
    try {
        const { data } = await http.get(`${generateURLQueryParam('v1/PersonnelPaymentRequest', filters)}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const postPaymentRequest = async (formData: any) => {
    try {
        const { data } = await http.post('/v1/PersonnelPaymentRequest', JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}

const getPaymentRequestById = async (id:string) => {
    try {
        const { data } = await http.get(`/v1/PersonnelPaymentRequest/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}
const getPaymentRequestByIdMutation = async (id:string) => {
    try {
        const { data } = await http.get(`/v1/PersonnelPaymentRequest/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}
const updatePaymentRequestById = async (formData: any) => {
    try {
        const { data } = await http.put(`/v1/PersonnelPaymentRequest/${formData.id}`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}


const approvePaymentRequest = async (formData: IArrpoveRequestPayment) => {
    try {
        const { data } = await http.put(`/v1/PersonnelPaymentRequest/ApprovePersonnelPaymentRequest`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const proceedPaymentRequest = async (formData: IProccedRequestPayment) => {
    try {
        const { data } = await http.put(`/v1/PersonnelPaymentRequest/ProceedToPersonnelPaymentRequest`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}
const rejectPaymentRequest = async (formData: {id: string, rejectReasonDesc: string}) => {
    try {
        const { data } = await http.put(`/v1/PersonnelPaymentRequest/RejectPersonnelPaymentRequest`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

export {
    postPaymentRequest,
    getPaymentRequestById,
    updatePaymentRequestById,
    approvePaymentRequest,
    proceedPaymentRequest,
    rejectPaymentRequest,
    getPaymentRequests,
    getPaymentRequestByIdMutation

}