import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IIncome } from "./_models"

const useGetIncomes = () => {
    return useQuery(['Incomes'], () => 
        api.getIncomes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostIncomes = () => {
    return useMutation((formData: IIncome) => {
        return api.postIncomes(formData)
    })
}


const useGetIncome = (id: string) => {
    return useQuery(['incomes', id], () => api.getIncome(id))
}

const useUpdateIncomes = () => {
    return useMutation((formData: IIncome) => {
        return api.updateIncomes(formData)
    })
}

const useDeleteIncomes = () => {
    return useMutation((id: number) => {
        return api.deleteIncome(id)
    })
}

export {
    useGetIncomes,
    usePostIncomes,
    useGetIncome,
    useUpdateIncomes,
    useDeleteIncomes
}