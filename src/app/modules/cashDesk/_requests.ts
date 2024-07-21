import { http } from "../../../_cloner/helpers/axiosConfig"
import { ICashDesk } from "./_models";

const getCashDesks = async () => {
    try {

        const { data } = await http.get('/v1/CashDesk')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postCashDesks = async (formData: ICashDesk) => {
    try {

        const { data } = await http.post('/v1/CashDesk', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getCashDesk = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/CashDesk/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateCashDesks = async (formData: ICashDesk) => {
    try {

        const { data } = await http.put(`/v1/CashDesk/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteCashDesk = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/CashDesk/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getCashDesks,
    postCashDesks,
    getCashDesk,
    updateCashDesks,
    deleteCashDesk
}