import { useMutation, useQuery } from "@tanstack/react-query";
import { ITransferRemittance, ITransferRemittanceFilter } from "./_models";
import * as api from "./_requests";




//Transfer Remittance 
const usePostTransferRemittance = () => {
    return useMutation((formData: ITransferRemittance) => {
        return api.postTransferRemittance(formData);
    });
};

const useGetTransferRemitances = () => {
    return useQuery(["transferRemittance"], () => 
        api.getTransferRemitances(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useGetTransferRemitancesByMutation = () => {
    return useMutation((filter: ITransferRemittanceFilter) => {
        return api.getTransferRemitancesFilter(filter)
    });
};
const useGetTransferRemitanceById = (id: string) => {
    return useQuery(["transferRemittance", id], () => 
        api.getTransferRemitanceById(id), {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: false
    });
};
const useGetTransferRemitanceByIdByMutation = () => {
    return useMutation((id: string) => {
        return api.getTransferRemitanceById(id)
    });
};
const useUpdateTransferRemitance = () => {
    return useMutation((formdata: ITransferRemittance) => {
        return api.editTransferRemitance(formdata)
    });
};



export {
    usePostTransferRemittance,
    useGetTransferRemitances,
    useGetTransferRemitancesByMutation,
    useGetTransferRemitanceById,
    useGetTransferRemitanceByIdByMutation,
    useUpdateTransferRemitance,
};
