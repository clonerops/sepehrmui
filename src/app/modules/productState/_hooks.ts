import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IState } from "./_models"

const useGetStates = () => {
    return useQuery(['States'], () => 
        api.getStates(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

const usePostState = () => {
    return useMutation((formData: IState) => {
        return api.postState(formData)
    })
}


const useGetState = (id: string) => {
    return useQuery(['State', id], () => 
        api.getState(id))
}

const useUpdateState = () => {
    return useMutation((formData: IState) => {
        return api.updateState(formData)
    })
}

const useDeleteState = () => {
    return useMutation((id: number) => {
        return api.deleteState(id)
    })
}

export {
    useGetStates,
    usePostState,
    useGetState,
    useUpdateState,
    useDeleteState
}