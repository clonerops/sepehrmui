import { useMutation, useQuery } from "@tanstack/react-query";
import { ISlanderer } from "./_models";
import * as api from './_requests'

const useGetSlandererList = () => {
    return useQuery(['slanderer'], () => api.getSlandererList());
};
const usePostSlanderer = () => {
    return useMutation((formdata: ISlanderer) => api.postSlanderer(formdata));
};
const usePutSlanderer = () => {
    return useMutation((formdata: ISlanderer) => api.putSlanderer(formdata));
};

const useGetSlandererById = () => {
    return useMutation((id: number) => api.getSlandererById(id))
}

const useDeleteSlanderer = () => {
    return useMutation((id: string) => api.deleteSlanderer(id));
};



export {
    useGetSlandererList,
    usePostSlanderer,
    usePutSlanderer,
    useGetSlandererById,
    useDeleteSlanderer
}