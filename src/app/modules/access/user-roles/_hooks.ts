import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IUserRole } from "./_models"

const useGetUserRoles = (id: string) => {
    return useQuery(['userRoles', id], () => api.getUserRoles(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostUserRoles= () => {
    return useMutation((formData: IUserRole) => {
        return api.postUserRoles(formData)
    })
}

const useDeleteUserRoles = () => {
    return useMutation((formData: IUserRole) => {
        return api.deleteUserRoles(formData)
    })
}

export {
    useGetUserRoles,
    usePostUserRoles,
    useDeleteUserRoles
}