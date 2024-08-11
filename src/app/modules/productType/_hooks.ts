import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IType } from "./_models"

const useGetTypes = () => {
    return useQuery(['Types'], () => 
        api.getTypes(), {
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

const useGetType = () => {
    return useMutation((id: string) => {
        return api.getType(id)
    })
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