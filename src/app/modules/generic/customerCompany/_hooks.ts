import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { ICustomerCompany } from "./_models"

const useGetCustomerCompanies = (CustomerId: string) => {
    return useQuery(['CustomerCompanies', CustomerId], () => api.getCustomerCompanies(CustomerId))
}

const useGetCustomerCompaniesMutate = () => {
    return useMutation((CustomerId: string) => {
        return api.getCustomerCompanies(CustomerId)
    })
}

const usePostCustomerCompanies = () => {
    return useMutation((formData: ICustomerCompany) => {
        return api.postCustomerCompanies(formData)
    })
}


const useGetCustomerCompany = (id: number) => {
    return useQuery(['CustomerCompanies', id], () => api.getCustomerCompany(id))
}
const useGetCustomerCompanyMutate = () => {
    // return useQuery(['CustomerCompanies', id], () => api.getCustomerCompany(id))
    return useMutation((id: number) => {
        return api.getCustomerCompany(id)
    })
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
    useDeleteCustomerCompanies,
    useGetCustomerCompaniesMutate,
    useGetCustomerCompanyMutate
}