import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IStandard } from "./_models"

const useGetStandards = () => {
    return useQuery(['Standards'], () => 
        api.getStandards(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostStandards = () => {
    return useMutation((formData: IStandard) => {
        return api.postStandards(formData)
    })
}

const useGetStandard = (id: string) => {
    return useQuery(['Standards', id], () => 
        api.getStandard(id))
}

const useUpdateStandards = () => {
    return useMutation((formData: IStandard) => {
        return api.updateStandards(formData)
    })
}

const useDeleteStandards = () => {
    return useMutation((id: number) => {
        return api.deleteStandard(id)
    })
}

export {
    useGetStandards,
    usePostStandards,
    useGetStandard,
    useUpdateStandards,
    useDeleteStandards
}