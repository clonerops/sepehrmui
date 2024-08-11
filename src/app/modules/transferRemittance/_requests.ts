import { http } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { ITransferRemittance, ITransferRemittanceFilter } from "./_models";

const postTransferRemittance = async (formdata: ITransferRemittance) => {
    try {

        const { data } = await http.post( `/v1/PurchaseOrder/TransferRemittance`, JSON.stringify(formdata));
        return data;
    
    } catch (error: any) {
        return error.response;
    }
}

const getTransferRemitances = async () => {
    try {

        const { data } = await http.get("/v1/PurchaseOrder/GetAllTransferRemittances");
        return data;
        
    } catch (error: any) {
        return error.response
    }
}

const getTransferRemitancesFilter = async (filter: ITransferRemittanceFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/PurchaseOrder/GetAllTransferRemittances', filter)}`);
        return data;
        
    } catch (error: any) {
        return error.response
    }
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

        const { data } = await http.put( `/v1/PurchaseOrder/UpdateTransferRemittance/${formdata.id}`, JSON.stringify(formdata));
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};

export {
    postTransferRemittance,
    getTransferRemitances,
    getTransferRemitancesFilter,
    getTransferRemitanceById,
    editTransferRemitance,
};
