import { useMutation, useQuery } from "@tanstack/react-query";
import { IAddAttachment, IApproveDriveFareAmount, IEvacuationPermit, IExitRemittance, ILadingPermit, ITransferRemittance } from "./_models";
import * as api from "./_requests";



// Exit Remittance
const useGetExitRemittanceList = () => {
    return useQuery(["ExitRemiitance"], () => api.getExitRemittanceList(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useGetExitPermitListByMutation = () => {
    return useMutation((filters: {
        pageNumber?: number,
        pageSize?: number
    }) => {
        return api.getExitPermitListByMutation(filters);
    });
};

const useGetLadingExitPermitById = (id: string) => {
    return useQuery(["LadingExitPermitById", id], () => api.getLadingExitPermitById(id), {
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


//Transfer Remittance 
const usePostTransferRemittance = () => {
    return useMutation((formData: ITransferRemittance) => {
        return api.postTransferRemittance(formData);
    });
};

const useGetTransferRemitances = () => {
    return useQuery(["transferRemittance"], () => api.getTransferRemitances(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useGetTransferRemitancesByMutation = () => {
    return useMutation((filter: {
        id?: number,
        TransferEntransePermitNo?: number,
        TransferRemittStatusId?: number,
        IsEntranced?: boolean,
        PageNumber?: number,
        PageSize?: number,
    }) => {
        return api.getTransferRemitancesFilter(filter)
    });
};
const useGetTransferRemitanceById = (id: string) => {
    return useQuery(["transferRemittance", id], () => api.getTransferRemitanceById(id), {
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

// Entrance Permissions 
const useEntrancePermission = () => {
    return useMutation((formData: {purchaseOrderTransferRemittanceId: number}) => {
        return api.entrancePermission(formData);
    });
};

const usePostEvacuation = () => {
    return useMutation((formData: IEvacuationPermit) => {
        return api.postEvacuation(formData);
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
    usePostTransferRemittance,
    useGetTransferRemitances,
    useGetTransferRemitancesByMutation,
    useGetTransferRemitanceById,
    useGetTransferRemitanceByIdByMutation,
    useUpdateTransferRemitance,
    useEntrancePermission,
    usePostEvacuation
};
