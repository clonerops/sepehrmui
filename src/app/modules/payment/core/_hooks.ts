import { useMutation, useQuery } from "@tanstack/react-query";
import { IPaymentFilter } from "./_models";
import * as api from "./_requests";

const useGetRecievePaymentByApproved = () => {
    return useMutation((approvied: string) => {
        return api.getRecievePaymentByApproved(approvied);
    });
};
const useGetRecievePayments = () => {
    return useMutation((filters: IPaymentFilter) => {
        return api.getRecievePayments(filters);
    });
};

const usePostRecievePayment = () => {
    return useMutation((formData: any) => {
        return api.postRecievePayment(formData);
    });
};

const useUpdateRecievePaymentById = () => {
    return useMutation((formdata: any) => {
        return api.updateRecievePaymentById(formdata);
    });
};

const useGetRecievePaymentById = (id: string) => {
    return useQuery(['recievePayDetail', id], () => api.getRecievePaymentById(id))
};
const useDeleteRecievePaymentById = () => {
    return useMutation((id: string) => {
        return api.deleteRecievePaymentById(id);
    });
};
const useUpdatePaymentApproved = () => {
    return useMutation((id: string) => {
        return api.updatePaymentApproved(id);
    });
};

const usePutRecievePaymentRegister = () => {
    return useMutation((formData: any) => {
        return api.putRecievePaymentRegister(formData);
    });
};


export {
    useGetRecievePaymentByApproved,
    usePostRecievePayment,
    useUpdateRecievePaymentById,
    useGetRecievePaymentById,
    useDeleteRecievePaymentById,
    useUpdatePaymentApproved,
    useGetRecievePayments,
    usePutRecievePaymentRegister
};
