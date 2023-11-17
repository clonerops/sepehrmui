import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { ICustomerCompany } from "./_models"

const useGetCustomerCompanies = () => {
    return useQuery(['CustomerCompanies'], () => api.getCustomerCompanies())
}

const usePostCustomerCompanies = () => {
    return useMutation((formData: ICustomerCompany) => {
        return api.postCustomerCompanies(formData)
    })
}


const useGetCustomerCompany = (id: string) => {
    return useQuery(['CustomerCompanies', id], () => api.getCustomerCompany(id))
}

const useUpdateCustomerCompanies = () => {
    return useMutation((formData: ICustomerCompany) => {
        return api.updateCustomerCompanies(formData)
    })
}

const useDeleteCustomerCompanies = () => {
    return useMutation((id: number) => {
        return api.deleteCustomerCompany(id)
    })
}

export {
    useGetCustomerCompanies,
    usePostCustomerCompanies,
    useGetCustomerCompany,
    useUpdateCustomerCompanies,
    useDeleteCustomerCompanies
}