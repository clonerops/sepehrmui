import { useMutation, useQuery } from "@tanstack/react-query";
import { IAddAttachment, IApproveDriveFareAmount, IExitRemittance, IExitRemittanceFilter } from "./_models";
import * as api from "./_requests";

const useGetExitRemittanceList = () => {
    return useQuery(["ExitRemiitance"], () => api.getExitRemittanceList(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useGetExitPermitListByMutation = () => {
    return useMutation((filters: IExitRemittanceFilter) => {
        return api.getExitPermitListByMutation(filters);
    });
};

const useGetLadingExitPermitById = (id: string) => {
    return useQuery(["LadingExitPermitById", id], () => 
        api.getLadingExitPermitById(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};


const usePostExitRemiitance = () => {
    return useMutation((formData: IExitRemittance) => {
        return api.postExitRemittance(formData);
    });
};


const useAddAttachmentsForExit = () => {
    return useMutation((formData: IAddAttachment) => {
        return api.addAttachmentForExit(formData);
    });
};


const useRevokeExitById = () => {
    return useMutation((id: number) => {
        return api.revokeExitById(id);
    });
};


const usePostApproveDriverFareAmount = () => {
    return useMutation((formData: IApproveDriveFareAmount) => {
        return api.postApproveDriverFareAmount(formData);
    });
};



export {
    useGetExitRemittanceList,
    useGetExitPermitListByMutation,
    useGetLadingExitPermitById,
    usePostExitRemiitance,
    useAddAttachmentsForExit,
    useRevokeExitById,
    usePostApproveDriverFareAmount,
};
