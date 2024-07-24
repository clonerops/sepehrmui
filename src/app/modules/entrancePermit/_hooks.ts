import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IEntrancePermit } from "./_models"

const useGetEntrancePermits = () => {
    return useQuery(['EntrancePermits'], () => api.getEntrancePermits(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostEntrancePermits = () => {
    return useMutation((formData: IEntrancePermit) => {
        return api.postEntrancePermits(formData)
    })
}


const useGetEntrancePermit = (id: string) => {
    return useQuery(['EntrancePermits', id], () => api.getEntrancePermit(id))
}

const useUpdateEntrancePermits = () => {
    return useMutation((formData: IEntrancePermit) => {
        return api.updateEntrancePermits(formData)
    })
}

const useDeleteEntrancePermits = () => {
    return useMutation((id: number) => {
        return api.deleteEntrancePermit(id)
    })
}

export {
    useGetEntrancePermits,
    usePostEntrancePermits,
    useGetEntrancePermit,
    useUpdateEntrancePermits,
    useDeleteEntrancePermits
}