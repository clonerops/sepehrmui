import { http } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IUnloadingPermit } from "./_models";

const entrancePermission = async (formData: { purchaseOrderTransferRemittanceId: number }) => {
    try {
        const { data } = await http.put(`/v1/PurchaseOrder/TransferRemittanceEntrancePermission/${formData.purchaseOrderTransferRemittanceId}`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const postUnloadingPermit = async (formdata: IUnloadingPermit) => {
    try {
        const { data } = await http.post( `/v1/UnloadingPermit`, JSON.stringify(formdata));
        return data;
    } catch (error: any) {
        return error.response;
    }
}


const getUnloadingPermitList = async () => {
    try {

        const { data } = await http.get("/v1/UnloadingPermit");
        return data;
    
    } catch (error: any) {
        return error.response
    }
};

const getUnloadingPermitListByMutation = async (filters: any) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/UnloadingPermit', filters)}`);
        return data;
    
    } catch (error: any) {
        return error.response
    }
};

const getUnloadingPermitById = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/UnloadingPermit/${id}`);
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};


const revokeUnloadingById = async (id: number) => {
    try {
        const { data } = await http.put(`/v1/UnloadingPermit/RevokeUnloadingPermit/${id}`, JSON.stringify({id: id}));
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const postApproveDriverFareAmount = async (formdata: any) => {
    try {

        const { data } = await http.post(`/v1/PurchaseOrder/ApprovePurOrderTransRemittFareAmount`, JSON.stringify(formdata) );
        return data;
    
    } catch (error: any) {
        return error.response;
    }
}

const addAttachmentForUnloading = async (formData: any) => {
    try {
        const {data} = await http.put(`/v1/UnloadingPermit/AddAttachments`, JSON.stringify(formData));
        return data; 
    } catch (error: any) {
        return error.response
    }
}




export {
    entrancePermission,
    getUnloadingPermitList,
    getUnloadingPermitListByMutation,
    getUnloadingPermitById,
    postUnloadingPermit,
    addAttachmentForUnloading,
    revokeUnloadingById,
    postApproveDriverFareAmount,
};
