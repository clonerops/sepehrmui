import { http } from "../../../../_cloner/helpers/axiosConfig"
import { ILabel } from "./_models";

const getLabels = async () => {
    try {

        const { data } = await http.get('/v1/ProductStandard')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postLabels = async (formData: ILabel) => {
    try {

        const { data } = await http.post('/v1/ProductStandard', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getLabel = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/ProductStandard/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateLabels = async (formData: ILabel) => {
    try {

        const { data } = await http.put(`/v1/ProductStandard/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteLabel = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/ProductStandard/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getLabels,
    postLabels,
    getLabel,
    updateLabels,
    deleteLabel
}