import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IEntrancePermit, IEntrancePermitFilter } from "./_models"

const useGetEntrancePermits = () => {
    return useQuery(['EntrancePermits'], () => 
        api.getEntrancePermits(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const useGetEntrancePermitsByMutation = () => {
    return useMutation((formData: IEntrancePermitFilter) => {
        return api.getEntrancePermitsByMutation(formData)
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
    useGetEntrancePermitsByMutation,
    usePostEntrancePermits,
    useGetEntrancePermit,
    useUpdateEntrancePermits,
    useDeleteEntrancePermits
}