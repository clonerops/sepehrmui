import { http } from "../../../../_cloner/helpers/axiosConfig"
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { ICustomerCompany } from "./_models";

const getCustomerCompanies = async (CustomerId: string) => {
    const filter = {
        CustomerId: CustomerId
    }
    try {

        const { data } = await http.get(`${generateURLQueryParam("/v1/CustomerOfficialCompany", filter)}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const postCustomerCompanies = async (formData: ICustomerCompany) => {
    try {

        const { data } = await http.post('/v1/CustomerOfficialCompany', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getCustomerCompany = async (id: number) => {
    try {

        const { data } = await http.get(`/v1/CustomerOfficialCompany/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateCustomerCompanies = async (formData: ICustomerCompany) => {
    try {

        const { data } = await http.put(`/v1/CustomerOfficialCompany/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteCustomerCompany = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/CustomerOfficialCompany/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getCustomerCompanies,
    postCustomerCompanies,
    getCustomerCompany,
    updateCustomerCompanies,
    deleteCustomerCompany
}