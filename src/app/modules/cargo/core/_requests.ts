import { http } from "../../../../_cloner/helpers/axiosConfig"
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl"
import { ICargo } from "./_models"

const retrievesNotSendedOrder = async () => {
    try {
        const { data } = await http.get(`/v1/CargoAnnouncement/GetNotSendedOrders`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const createCargo = async (formData: ICargo) => {
    try {
        const { data } = await http.post(`/v1/CargoAnnouncement`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const retrievesCargos = async (orderId?: string) => {
    const filter = {
        orderId: orderId
    }
    try {
        const { data } = await http.get(`${generateURLQueryParam('/v1/CargoAnnouncement', filter)}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

export {
    retrievesNotSendedOrder,
    createCargo,
    retrievesCargos
}