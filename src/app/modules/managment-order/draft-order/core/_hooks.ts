import { useMutation, useQuery } from '@tanstack/react-query'
import * as api from './_requests'
import { IDraftOrderFilter, IPostDraftOrder } from './_models'

const usePostDraftOrder = () => {
    return useMutation((formData: IPostDraftOrder) => {
        return api.postDraftOrder(formData)
    })
}

const useGetAllDraftOrder = () => {
    return useMutation((formData: IDraftOrderFilter) => {
        return api.getAllDraftOrder(formData)
    })
}

const useGetDraftOrderDetail = () => {
    return useMutation((id: string) => {
        return api.getDraftOrderDetail(id)
    })
}

export {
    usePostDraftOrder,
    useGetAllDraftOrder,
    useGetDraftOrderDetail
}