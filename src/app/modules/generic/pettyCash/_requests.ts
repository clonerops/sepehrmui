import { http } from "../../../../_cloner/helpers/axiosConfig";
import { IPettyCash } from "./_models";

const getPettyCashList = async () => {
    try {
        const { data } = await http.get(`/v1/PettyCash`)
        return data
    } catch (error: any) {
        return error.response;
    }

}


const postPettyCash = async (formData: IPettyCash) => {
    try {
        const { data } = await http.post('/v1/PettyCash', JSON.stringify(formData))
        return data 
    } catch (error: any) {
        return error.response;
    }
}

const putPettyCash = async (formData: IPettyCash) => {
    try {
        const { data } = await http.put(`/v1/PettyCash/${formData.id}`, JSON.stringify(formData))
        return data 
    } catch (error: any) {
        return error.response;
    }
}

const getPettyCashById = async (id: number | undefined) => {
    const { data } = await http.get(`/v1/PettyCash/${id}`)
    return data 

}

const deletePettyCash = async (id: string ) => {
    try {
        const { data } = await http.delete(`/v1/PettyCash/${id}`)
        return data 
    } catch (error: any) {
        return error.response;
    }
}


export {
    getPettyCashList,
    postPettyCash,
    putPettyCash,
    getPettyCashById,
    deletePettyCash
}