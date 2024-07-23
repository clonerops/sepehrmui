import { useMutation } from "@tanstack/react-query";
import * as api from "./_requests";
import { IEvacuationPermit } from "./_models";

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
    useEntrancePermission,
    usePostEvacuation
};
