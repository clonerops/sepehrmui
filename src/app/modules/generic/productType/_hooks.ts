import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IType } from "./_models"

const useGetTypes = () => {
    return useQuery(['types'], () => api.getTypes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostTypes = () => {
    return useMutation((formData: IType) => {
        return api.postTypes(formData)
    })
}


const useGetType = (id: string) => {
    return useQuery(['types', id], () => api.getType(id))
}

const useUpdateTypes = () => {
    return useMutation((formData: IType) => {
        return api.updateTypes(formData)
    })
}

const useDeleteTypes = () => {
    return useMutation((id: number) => {
        return api.deleteType(id)
    })
}

export {
    useGetTypes,
    usePostTypes,
    useGetType,
    useUpdateTypes,
    useDeleteTypes
}