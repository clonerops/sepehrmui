import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { ICashDesk } from "./_models"

const useGetCashDesks = () => {
    return useQuery(['CashDesks'], () => api.getCashDesks(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostCashDesks = () => {
    return useMutation((formData: ICashDesk) => {
        return api.postCashDesks(formData)
    })
}


const useGetCashDesk = (id: string) => {
    return useQuery(['CashDesks', id], () => api.getCashDesk(id))
}

const useUpdateCashDesks = () => {
    return useMutation((formData: ICashDesk) => {
        return api.updateCashDesks(formData)
    })
}

const useDeleteCashDesks = () => {
    return useMutation((id: number) => {
        return api.deleteCashDesk(id)
    })
}

export {
    useGetCashDesks,
    usePostCashDesks,
    useGetCashDesk,
    useUpdateCashDesks,
    useDeleteCashDesks
}