import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { ILabel } from "./_models"

const useGetLabels = () => {
    return useQuery(['Labels'], 
        () => api.getLabels(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostLabels = () => {
    return useMutation((formData: ILabel) => {
        return api.postLabels(formData)
    })
}


const useGetLabel = (id: string) => {
    return useQuery(['Labels', id], 
        () => api.getLabel(id))
}

const useUpdateLabels = () => {
    return useMutation((formData: ILabel) => {
        return api.updateLabels(formData)
    })
}

const useDeleteLabels = () => {
    return useMutation((id: number) => {
        return api.deleteLabel(id)
    })
}

export {
    useGetLabels,
    usePostLabels,
    useGetLabel,
    useUpdateLabels,
    useDeleteLabels
}