import { useMutation, useQuery } from "@tanstack/react-query";
import { ICargo, IEvacuationPermit, IExitRemittance, ILadingPermit, ITransferRemittance } from "./_models";
import * as api from "./_requests";

const useRetrievesNotSendedOrder = () => {
    return useQuery(["ordersNotSend"], () => api.retrievesNotSendedOrder(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useGetCargosList = () => {
    // return useQuery(["cargosList"], () => api.getCargosList());
    return useMutation((formData: {
        PageNumber?: number,
        PageSize?: number,
        OrderCode?: number
        CustomerId?: string
    }) => {
        return api.getCargosList(formData);
    });

};



const useCreateCargo = () => {
    return useMutation((formData: ICargo) => {
        return api.createCargo(formData);
    });
};

const useRetrieveCargos = (orderId?: string) => {
    return useQuery(["cargos", orderId], () => api.retrievesCargos(orderId), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useCargoById = (cargoId: string) => {
    return useQuery(["cargosById", cargoId], () => api.getCargoById(cargoId), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useEditCargo = () => {
    return useMutation((formData: ICargo) => {
        return api.editCargo(formData);
    });
};

const useRevokeCargoById = () => {
    return useMutation((id: string) => {
        return api.revokeCargoById(id);
    });
};

// Lading Licence

const useGetLadingPermitList = () => {
    return useQuery(["LadingPermit"], () => api.getLadingPermitList(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useGetLadingPermitListByMutation = () => {
    return useMutation((filters: {
        pageNumber?: number,
        pageSize?: number
    }) => {
        return api.getLadingPermitListByMutation(filters);
    });
};

const usePostLadingPermit = () => {
    return useMutation((formData: ILadingPermit) => {
        return api.postLadingPermit(formData);
    });
};

const useGetLadingPermitById = (id: string) => {
    return useQuery(["LadingPermitById", id], () => api.getLadingPermitById(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useEditLadingPermit = () => {
    return useMutation((formData: ILadingPermit) => {
        return api.editLadingPermit(formData);
    });
};

const useDeleteLadingPermitById = () => {
    return useMutation((id: string) => {
        return api.deleteLadingPermitById(id);
    });
};

const useRevokeLadingById = () => {
    return useMutation((id: number) => {
        return api.revokeLadingById(id);
    });
};


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

const useRevokeExitById = () => {
    return useMutation((id: number) => {
        return api.revokeExitById(id);
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
    useGetCargosList,
    useRetrievesNotSendedOrder,
    useCreateCargo,
    useCargoById,
    useEditCargo,
    useRetrieveCargos,
    useRevokeCargoById,
    useGetLadingPermitList,
    useGetLadingPermitListByMutation,
    usePostLadingPermit,
    useGetLadingPermitById,
    useRevokeLadingById,
    useEditLadingPermit,
    useDeleteLadingPermitById,
    useGetExitRemittanceList,
    useGetExitPermitListByMutation,
    useGetLadingExitPermitById,
    usePostExitRemiitance,
    useRevokeExitById,
    usePostTransferRemittance,
    useGetTransferRemitances,
    useGetTransferRemitancesByMutation,
    useGetTransferRemitanceById,
    useGetTransferRemitanceByIdByMutation,
    useUpdateTransferRemitance,
    useEntrancePermission,
    usePostEvacuation
};
