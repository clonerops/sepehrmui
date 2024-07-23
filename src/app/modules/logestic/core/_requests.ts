import { http } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IAddAttachment, IApproveDriveFareAmount, IEvacuationPermit, IExitRemittance, ILadingPermit, ITransferRemittance } from "./_models";


// exit remittance
const getExitRemittanceList = async () => {
    const { data } = await http.get("/v1/LadingExitPermit");
    return data;
};

const getExitPermitListByMutation = async (filters: {
    pageNumber?: number,
    pageSize?: number
}) => {
    const { data } = await http.get(`${generateURLQueryParam('/v1/LadingExitPermit', filters)}`);
    return data;
};

const getLadingExitPermitById = async (id: string) => {
    try {
        const { data } = await http.get(`/v1/LadingExitPermit/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const postExitRemittance = async (formdata: IExitRemittance) => {
    try {
        const { data } = await http.post(
            `/v1/LadingExitPermit`,
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
}


const revokeExitById = async (id: number) => {
    try {
        const { data } = await http.put(`/v1/LadingExitPermit/RevokeLadingExitPermit/${id}`, JSON.stringify({id: id}));
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const postApproveDriverFareAmount = async (formdata: IApproveDriveFareAmount) => {
    try {
        const { data } = await http.post(
            `/v1/LadingExitPermit/ApproveDriverFareAmount`,
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
}

const addAttachmentForExit = async (formData: IAddAttachment) => {
    try {
        const {data} = await http.put(`/v1/LadingExitPermit/AddAttachments`, JSON.stringify(formData));
        return data; 
    } catch (error: any) {
        return error.response
    }
}


// Transfer Remittance
const postTransferRemittance = async (formdata: ITransferRemittance) => {
    try {
        const { data } = await http.post(
            `/v1/PurchaseOrder/TransferRemittance`,
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
}

const getTransferRemitances = async () => {
    const { data } = await http.get("/v1/PurchaseOrder/GetAllTransferRemittances");
    return data;
}

const getTransferRemitancesFilter = async (filter: {
    id?: number, 
    TransferEntransePermitNo?: number, 
    TransferRemittStatusId?: number, 
    IsEntranced?: boolean,
    PageNumber?: number,
    PageSize?: number,
}) => {
    const { data } = await http.get(`${generateURLQueryParam('/v1/PurchaseOrder/GetAllTransferRemittances', filter)}`);
    return data;
}


const getTransferRemitanceById = async (id: string) => {
    try {
        const { data } = await http.get(`/v1/PurchaseOrder/GetTransferRemittanceById/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const editTransferRemitance = async (formdata: ITransferRemittance) => {
    try {
        const { data } = await http.put(
            `/v1/PurchaseOrder/UpdateTransferRemittance/${formdata.id}`,
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};



// Entrance Permission
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
            `/v1/PurchaseOrder/PurchaseOrderTransferRemittanceUnloadingPermit/${formdata.purchaseOrderTransferRemittanceEntrancePermitId}`,
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
}



export {
    getExitRemittanceList,
    getExitPermitListByMutation,
    getLadingExitPermitById,
    postExitRemittance,
    addAttachmentForExit,
    revokeExitById,
    postApproveDriverFareAmount,
    postTransferRemittance,
    getTransferRemitances,
    getTransferRemitancesFilter,
    getTransferRemitanceById,
    editTransferRemitance,
    entrancePermission,
    postEvacuation
};
