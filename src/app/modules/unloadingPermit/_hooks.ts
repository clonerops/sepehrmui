import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import { IUnloadingPermit } from "./_models";

const useEntrancePermission = () => {
    return useMutation((formData: { purchaseOrderTransferRemittanceId: number }) => {
        return api.entrancePermission(formData);
    });
};

const usePostUnloadingPermit = () => {
    return useMutation((formData: IUnloadingPermit) => {
        return api.postUnloadingPermit(formData);
    });
};

const useGetUnloadingPermitList = () => {
    return useQuery(["UnloadingPermit"], () => api.getUnloadingPermitList(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useGetUnloadingPermitById = (id: string) => {
    return useQuery(["LadingExitPermitById", id], () => 
        api.getUnloadingPermitById(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};


const useGetUnloadingPermitListByMutation = () => {
    return useMutation((filters: any) => {
        return api.getUnloadingPermitListByMutation(filters);
    });
};



const useAddAttachmentsForUnloading = () => {
    return useMutation((formData: any) => {
        return api.addAttachmentForUnloading(formData);
    });
};


const useRevokeUnloadingById = () => {
    return useMutation((id: number) => {
        return api.revokeUnloadingById(id);
    });
};


const usePostApproveDriverFareAmount = () => {
    return useMutation((formData: any) => {
        return api.postApproveDriverFareAmount(formData);
    });
};



export {
    useEntrancePermission,
    useGetUnloadingPermitById,
    usePostUnloadingPermit,
    useGetUnloadingPermitList,
    useGetUnloadingPermitListByMutation,
    useAddAttachmentsForUnloading,
    useRevokeUnloadingById,
    usePostApproveDriverFareAmount
};
