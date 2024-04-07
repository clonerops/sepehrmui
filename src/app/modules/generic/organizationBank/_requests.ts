import { http } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IOrganizationBank } from "./_models";

const getOrganizationBankList = async () => {
    try {
        const { data } = await http.get(`/v1/OrganizationBank`)
        return data
    } catch (error: any) {
        return error.response;
    }

}


const postOrganizationBank = async (formData: IOrganizationBank) => {
    try {
        const { data } = await http.post('/v1/OrganizationBank', JSON.stringify(formData))
        return data 
    } catch (error: any) {
        return error.response;
    }
}

const putOrganizationBank = async (formData: IOrganizationBank) => {
    try {
        const { data } = await http.put(`/v1/OrganizationBank/${formData.id}`, JSON.stringify(formData))
        return data 
    } catch (error: any) {
        return error.response;
    }
}

const getOrganizationBankById = async (id: number | undefined) => {
    const { data } = await http.get(`/v1/OrganizationBank/${id}`)
    return data 

}

const deleteOrganizationBank = async (id: string ) => {
    try {
        const { data } = await http.delete(`/v1/OrganizationBank/${id}`)
        return data 
    } catch (error: any) {
        return error.response;
    }
}


export {
    getOrganizationBankList,
    postOrganizationBank,
    putOrganizationBank,
    getOrganizationBankById,
    deleteOrganizationBank
}