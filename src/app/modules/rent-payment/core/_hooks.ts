import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IRentPayment } from "./_models"

const useGetRentPayments = () => {
    return useQuery(['RentPayments'], () => api.getRentPayments(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostRentPayments = () => {
    return useMutation((formData: IRentPayment) => {
        return api.postRentPayments(formData)
    })
}


const useGetRentPayment = (id: string) => {
    return useQuery(['RentPayments', id], () => api.getRentPayment(id))
}

const useUpdateRentPayments = () => {
    return useMutation((formData: IRentPayment) => {
        return api.updateRentPayments(formData)
    })
}

const useDeleteRentPayments = () => {
    return useMutation((id: number) => {
        return api.deleteRentPayment(id)
    })
}

export {
    useGetRentPayments,
    usePostRentPayments,
    useGetRentPayment,
    useUpdateRentPayments,
    useDeleteRentPayments
}