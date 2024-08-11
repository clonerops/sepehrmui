import { useMutation, useQuery } from "@tanstack/react-query";
import { IPettyCash } from "./_models";
import * as api from './_requests'

const useGetPettyCashList = () => {
    return useQuery(['PettyCash'], () => api.getPettyCashList());
};
const usePostPettyCash = () => {
    return useMutation((formdata: IPettyCash) => api.postPettyCash(formdata));
};
const usePutPettyCash = () => {
    return useMutation((formdata: IPettyCash) => api.putPettyCash(formdata));
};

const useGetPettyCashById = () => {
    return useMutation((id: number) => api.getPettyCashById(id))
}

const useDeletePettyCash = () => {
    return useMutation((id: string) => api.deletePettyCash(id));
};



export {
    useGetPettyCashList,
    usePostPettyCash,
    usePutPettyCash,
    useGetPettyCashById,
    useDeletePettyCash
}