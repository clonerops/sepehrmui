import { useMutation } from "@tanstack/react-query";
import { IEvacuationPermit } from "./_models";
import * as api from "./_requests";




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
    useEntrancePermission,
    usePostEvacuation
};
