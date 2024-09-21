import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IService } from "./_models"

const useGetServices = () => {
    return useQuery(['Services'], () =>
        api.getServices(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostServices = () => {
    return useMutation((formData: IService) => {
        return api.postServices(formData)
    })
}


const useGetService = (id: string) => {
    return useQuery(['Services', id], () =>
        api.getService(id))
}

const useUpdateServices = () => {
    return useMutation((formData: IService) => {
        return api.updateServices(formData)
    })
}

const useDeleteServices = () => {
    return useMutation((id: number) => {
        return api.deleteService(id)
    })
}

export {
    useGetServices,
    usePostServices,
    useGetService,
    useUpdateServices,
    useDeleteServices
}