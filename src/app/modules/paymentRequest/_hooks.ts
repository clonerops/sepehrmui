import { useMutation, useQuery } from "@tanstack/react-query";
import { IRequestPaymentFilter } from "./_models";
import * as api from "./_requests";

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

const useApprovePaymentRequest = () => {
    return useMutation((id: string) => {
        return api.approvePaymentRequest(id);
    });
};
const useProceedPaymentRequest = () => {
    return useMutation((formData: {id: string, attachments: any}) => {
        return api.proceedPaymentRequest(formData);
    });
};

const useRejectPaymentRequest = () => {
    return useMutation((formData: {id: string, rejectReasonDesc: string}) => {
        return api.rejectPaymentRequest(formData);
    });
};


export {
    usePostPaymentRequest,
    useUpdatePaymentRequestById,
    useGetPaymentRequestById,
    useApprovePaymentRequest,
    useProceedPaymentRequest,
    useRejectPaymentRequest,
    useGetPaymentRequests,
    useGetPaymentRequestByIdMutation
};
