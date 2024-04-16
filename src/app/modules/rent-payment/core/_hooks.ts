import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IRentFilter, IRentPayment } from "./_models"

const useGetRentPayments = () => {
    return useQuery(['RentPayments'], () => api.getRentPayments(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}
const useGetRentPaymentsByMutation = () => {
    return useMutation((filters: IRentFilter) => {
        return api.getRentPaymentsByMutation(filters)
    })
}

const useGetAllRents = () => {
    return useMutation((formData: IRentFilter) => {
        return api.getAllRents(formData)
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
    useGetRentPaymentsByMutation,
    useGetAllRents,
    usePostRentPayments,
    useGetRentPayment,
    useUpdateRentPayments,
    useDeleteRentPayments
}