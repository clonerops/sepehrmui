import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { ICost } from "./_models"

const useGetCosts = () => {
    return useQuery(['Costs'], () => api.getCosts(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostCosts = () => {
    return useMutation((formData: ICost) => {
        return api.postCosts(formData)
    })
}


const useGetCost = (id: string) => {
    return useQuery(['costs', id], () => api.getCost(id))
}

const useUpdateCosts = () => {
    return useMutation((formData: ICost) => {
        return api.updateCosts(formData)
    })
}

const useDeleteCosts = () => {
    return useMutation((id: number) => {
        return api.deleteCost(id)
    })
}

export {
    useGetCosts,
    usePostCosts,
    useGetCost,
    useUpdateCosts,
    useDeleteCosts
}