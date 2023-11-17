import { http } from "../../../../_cloner/helpers/axiosConfig"
import { ICustomerCompany } from "./_models";

const getCustomerCompanies = async () => {
    try {

        const { data } = await http.get('/v1/CustomerOfficialCompany')
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

const getCustomerCompany = async (id: string) => {
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