import { http } from "../../../_cloner/helpers/axiosConfig"
import { IState } from "./_models";

const getStates = async () => {
    try {

        const { data } = await http.get('/v1/ProductState')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postState = async (formData: IState) => {
    try {

        const { data } = await http.post('/v1/ProductState', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getState = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/ProductState/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateState = async (formData: IState) => {
    try {

        const { data } = await http.put(`/v1/ProductState/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteState = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/ProductState/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getStates,
    postState,
    getState,
    updateState,
    deleteState
}