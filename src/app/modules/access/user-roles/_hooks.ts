import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IUserRole } from "./_models"

const useGetUserRoles = () => {
    return useQuery(['userRoles'], () => api.getUserRoles())
}

const usePostUserRoles= () => {
    return useMutation((formData: IUserRole) => {
        return api.postUserRoles(formData)
    })
}

const useDeleteUserRoles = () => {
    return useMutation((id: string) => {
        return api.deleteUserRoles(id)
    })
}

export {
    useGetUserRoles,
    usePostUserRoles,
    useDeleteUserRoles
}