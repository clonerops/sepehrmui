import { http } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IShareholder, IShareholderFilter } from "./_models";

const getShareholderList = async (formdata: IShareholderFilter) => {
    try {
        const { data } = await http.get(`${generateURLQueryParam('/v1/ShareHolder', formdata)}`)
        return data
    } catch (error: any) {
        return error.response;
    }

}


const postShareHolder = async (formData: IShareholder) => {
    try {
        const { data } = await http.post('/v1/ShareHolder', JSON.stringify(formData))
        return data 
    } catch (error: any) {
        return error.response;
    }
}

const putShareHolder = async (formData: IShareholder) => {
    try {
        const { data } = await http.put(`/v1/ShareHolder/${formData.id}`, JSON.stringify(formData))
        return data 
    } catch (error: any) {
        return error.response;
    }
}

const getShareHolderById = async (id: string | undefined) => {
    const { data } = await http.get(`/v1/ShareHolder/${id}`)
    return data 

}

const deleteShareHolder = async (id: string ) => {
    try {
        const { data } = await http.delete(`/v1/ShareHolder/${id}`)
        return data 
    } catch (error: any) {
        return error.response;
    }
}


export {
    getShareholderList,
    postShareHolder,
    putShareHolder,
    getShareHolderById,
    deleteShareHolder
}