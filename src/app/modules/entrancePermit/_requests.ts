import { http } from "../../../_cloner/helpers/axiosConfig"
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IEntrancePermit, IEntrancePermitFilter } from "./_models";

const getEntrancePermits = async () => {
    try {

        const { data } = await http.get('/v1/EntrancePermit')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getEntrancePermitsByMutation = async (filter: IEntrancePermitFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/EntrancePermit', filter)}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}
const postEntrancePermits = async (formData: IEntrancePermit) => {
    try {

        const { data } = await http.post('/v1/EntrancePermit', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getEntrancePermit = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/EntrancePermit/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateEntrancePermits = async (formData: IEntrancePermit) => {
    try {

        const { data } = await http.put(`/v1/EntrancePermit/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteEntrancePermit = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/EntrancePermit/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getEntrancePermits,
    getEntrancePermitsByMutation,
    postEntrancePermits,
    getEntrancePermit,
    updateEntrancePermits,
    deleteEntrancePermit
}