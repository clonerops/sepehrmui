import { http } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IAddAttachment, IApproveDriveFareAmount, IExitRemittance, IExitRemittanceFilter } from "./_models";

const getExitRemittanceList = async () => {
    try {

        const { data } = await http.get("/v1/LadingExitPermit");
        return data;
    
    } catch (error: any) {
        return error.response
    }
};

const getExitPermitListByMutation = async (filters: IExitRemittanceFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/LadingExitPermit', filters)}`);
        return data;
    
    } catch (error: any) {
        return error.response
    }
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

        const { data } = await http.post( `/v1/LadingExitPermit`, JSON.stringify(formdata) );
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

        const { data } = await http.post( `/v1/LadingExitPermit/ApproveDriverFareAmount`, JSON.stringify(formdata) );
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




export {
    getExitRemittanceList,
    getExitPermitListByMutation,
    getLadingExitPermitById,
    postExitRemittance,
    addAttachmentForExit,
    revokeExitById,
    postApproveDriverFareAmount,
};
