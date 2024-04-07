import { useMutation, useQuery } from "@tanstack/react-query";
import { IShareholder, IShareholderFilter } from "./_models";
import * as api from './_requests'

const useGetShareholderList = () => {
    return useMutation((formdata: IShareholderFilter) => api.getShareholderList(formdata));
};
const usePostShareHolder = () => {
    return useMutation((formdata: IShareholder) => api.postShareHolder(formdata));
};
const usePutShareHolder = () => {
    return useMutation((formdata: IShareholder) => api.putShareHolder(formdata));
};

const useGetShareHolderById = () => {
    return useMutation((id: string) => api.getShareHolderById(id))
}

const useDeleteShareHolder = () => {
    return useMutation((id: string) => api.deleteShareHolder(id));
};



export {
    useGetShareholderList,
    usePostShareHolder,
    usePutShareHolder,
    useGetShareHolderById,
    useDeleteShareHolder
}