import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { ICustomerLabel } from "./_models"

const useGetCustomerLabels = () => {
    return useQuery(['CustomerLabels'], 
        () => api.getCustomerLabels(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostCustomerLabels = () => {
    return useMutation((formData: ICustomerLabel) => {
        return api.postCustomerLabels(formData)
    })
}


const useGetCustomerLabel = (id: number) => {
    return useQuery(['CustomerLabels', id], 
        () => api.getCustomerLabel(id))
}
const useGetCustomerLabelByMutation = () => {
    return useMutation((id: number) => {
        return api.getCustomerLabel(id)
    })
}

const useUpdateCustomerLabels = () => {
    return useMutation((formData: ICustomerLabel) => {
        return api.updateCustomerLabels(formData)
    })
}

const useDeleteCustomerLabels = () => {
    return useMutation((id: number) => {
        return api.deleteCustomerLabel(id)
    })
}

export {
    useGetCustomerLabels,
    usePostCustomerLabels,
    useGetCustomerLabel,
    useGetCustomerLabelByMutation,
    useUpdateCustomerLabels,
    useDeleteCustomerLabels
}