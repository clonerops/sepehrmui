import { http } from "../../../_cloner/helpers/axiosConfig";
import { IEvacuationPermit } from "./_models";

const entrancePermission = async (formData: {purchaseOrderTransferRemittanceId: number}) => {
    try {
        const { data } = await http.put(`/v1/PurchaseOrder/TransferRemittanceEntrancePermission/${formData.purchaseOrderTransferRemittanceId}`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const postEvacuation = async (formdata: IEvacuationPermit) => {
    try {
        const { data } = await http.post(
            `/v1/PurchaseOrder/TransferRemittanceUnloadingPermit/${formdata.transferRemittanceEntrancePermitId}`,
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
}



export {
    entrancePermission,
    postEvacuation
};
