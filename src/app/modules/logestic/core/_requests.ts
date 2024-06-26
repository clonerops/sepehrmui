import { http } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { ICargo, IEvacuationPermit, IExitRemittance, ILadingLicence, ITransferRemittance } from "./_models";

const getCargosList = async (formData: {
    PageNumber?: number,
    PageSize?: number,
    OrderCode?: number
    CustomerId?: string
}) => {

    const filter = {
        PageNumber: formData?.PageNumber,
        PageSize: formData?.PageSize,
        OrderCode: formData?.OrderCode,
        CustomerId: formData?.CustomerId
    
    }
    try {
        const { data } = await http.get(`${generateURLQueryParam('/v1/CargoAnnouncement', filter)}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const retrievesNotSendedOrder = async () => {
    try {
        const { data } = await http.get(
            `/v1/CargoAnnouncement/GetNotSendedOrders`
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const createCargo = async (formData: ICargo) => {
    try {
        const { data } = await http.post(
            `/v1/CargoAnnouncement`,
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const retrievesCargos = async (orderId?: string) => {
    const filter = {
        orderId: orderId,
    };
    try {
        const { data } = await http.get(
            `${generateURLQueryParam("/v1/CargoAnnouncement", filter)}`
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const getCargoById = async (cargoId: string) => {
    const {data} = await http.get(`/v1/CargoAnnouncement/${cargoId}`)
    return data
}

const editCargo = async (formData: ICargo) => {
    try {
        const { data } = await http.put(
            `/v1/CargoAnnouncement/${formData.id}`,
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};


// Lading Licence
const getLadingLicenceList = async () => {
    const { data } = await http.get("/v1/LadingLicense");
    return data;
};

const postLadingLicence = async (formdata: ILadingLicence) => {
    try {
        const { data } = await http.post(
            "/v1/LadingLicense",
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const getLadingLicenceById = async (id: string) => {
    try {
        const { data } = await http.get(`/v1/LadingLicense/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const editLadingLicence = async (formdata: ILadingLicence) => {
    try {
        const { data } = await http.put(
            `/v1/LadingLicence/${formdata.id}`,
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const deleteLadingLicenceById = async (id: string) => {
    try {
        const { data } = await http.delete(`/v1/LadingLicense/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

// exit remittance
const postExitRemittance = async (formdata: IExitRemittance) => {
    try {
        const { data } = await http.put(
            `/v1/LadingLicense/LadingExitPermit/${formdata.ladingLicenseId}`,
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
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
    getCargosList,
    retrievesNotSendedOrder,
    createCargo,
    getCargoById,
    retrievesCargos,
    editCargo,
    getLadingLicenceList,
    postLadingLicence,
    getLadingLicenceById,
    editLadingLicence,
    deleteLadingLicenceById,
    postExitRemittance,
    postTransferRemittance,
    getTransferRemitances,
    getTransferRemitancesFilter,
    getTransferRemitanceById,
    editTransferRemitance,
    entrancePermission,
    postEvacuation
};
