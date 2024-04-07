import { http } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { ISlanderer } from "./_models";

const getSlandererList = async () => {
    try {
        const { data } = await http.get(`/v1/Slanderer`)
        return data
    } catch (error: any) {
        return error.response;
    }

}


const postSlanderer = async (formData: ISlanderer) => {
    try {
        const { data } = await http.post('/v1/Slanderer', JSON.stringify(formData))
        return data 
    } catch (error: any) {
        return error.response;
    }
}

const putSlanderer = async (formData: ISlanderer) => {
    try {
        const { data } = await http.put(`/v1/Slanderer/${formData.id}`, JSON.stringify(formData))
        return data 
    } catch (error: any) {
        return error.response;
    }
}

const getSlandererById = async (id: number | undefined) => {
    const { data } = await http.get(`/v1/Slanderer/${id}`)
    return data 

}

const deleteSlanderer = async (id: string ) => {
    try {
        const { data } = await http.delete(`/v1/Slanderer/${id}`)
        return data 
    } catch (error: any) {
        return error.response;
    }
}


export {
    getSlandererList,
    postSlanderer,
    putSlanderer,
    getSlandererById,
    deleteSlanderer
}