import { useMutation, useQuery } from "@tanstack/react-query";
import { IRequestPaymentFilter } from "./_models";
import * as api from "./_requests";

const useGetPaymentRequestByApproved = () => {
    return useMutation((approvied: string) => {
        return api.getPaymentRequestByApproved(approvied);
    });
};

const useGetPaymentRequests = () => {
    return useMutation((filters: IRequestPaymentFilter) => {
        return api.getPaymentRequests(filters);
    });
};

const usePostPaymentRequest = () => {
    return useMutation((formData: any) => {
        return api.postPaymentRequest(formData);
    });
};

const useUpdatePaymentRequestById = () => {
    return useMutation((formdata: any) => {
        return api.updatePaymentRequestById(formdata);
    });
};

const useGetPaymentRequestById = (id: string) => {
    return useQuery(['RecievePayDetail', id], () => api.getPaymentRequestById(id))
};
const useGetPaymentRequestByIdMutation = () => {
    return useMutation((id: any) => {
        return api.getPaymentRequestByIdMutation(id);
    });
};
const useDeletePaymentRequestById = () => {
    return useMutation((id: string) => {
        return api.deletePaymentRequestById(id);
    });
};
const useUpdatePaymentApproved = () => {
    return useMutation((formData: {ids: string[]}) => {
        return api.updatePaymentApproved(formData);
    });
};
const useDisApprovePaymentApproved = () => {
    return useMutation((formData: {id: string, accountingDescription: string}) => {
        return api.disApprovePaymentApproved(formData);
    });
};

const usePutPaymentRequestRegister = () => {
    return useMutation((formData: any) => {
        return api.putPaymentRequestRegister(formData);
    });
};


export {
    useGetPaymentRequestByApproved,
    usePostPaymentRequest,
    useUpdatePaymentRequestById,
    useGetPaymentRequestById,
    useDeletePaymentRequestById,
    useUpdatePaymentApproved,
    useGetPaymentRequests,
    usePutPaymentRequestRegister,
    useDisApprovePaymentApproved,
    useGetPaymentRequestByIdMutation
};
