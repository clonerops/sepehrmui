import { http } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { ILadingLicence, ILadingLicenceFilter } from "./_models";


// Lading Licence
const getLadingLicenceList = async () => {
    try {

        const { data } = await http.get("/v1/LadingPermit");
        return data;
    
    } catch (error: any) {
        return error.response
    }
};
const getLadingLicenceListByMutation = async (filters: ILadingLicenceFilter) => {
    try {
        
        const { data } = await http.get(`${generateURLQueryParam('/v1/LadingPermit', filters)}`);
        return data;    

    } catch (error: any) {
        return error.response
    }
};

const postLadingLicence = async (formdata: ILadingLicence) => {
    try {

        const { data } = await http.post("/v1/LadingPermit", JSON.stringify(formdata) );
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};
const getLadingLicenceById = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/LadingPermit/${id}`);
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};

const editLadingLicence = async (formdata: ILadingLicence) => {
    try {

        const { data } = await http.put(`/v1/LadingPermit/${formdata.id}`, JSON.stringify(formdata) );
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};

const deleteLadingLicenceById = async (id: string) => {
    try {

        const { data } = await http.delete(`/v1/LadingPermit/${id}`);
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};

const revokeLadingById = async (id: number) => {
    try {
        const { data } = await http.put(`/v1/LadingPermit/RevokeLadingPermit/${id}`, JSON.stringify({id: id}));
        return data;
    } catch (error: any) {
        return error.response;
    }
};



export {
    getLadingLicenceList,
    getLadingLicenceListByMutation,
    postLadingLicence,
    getLadingLicenceById,
    editLadingLicence,
    deleteLadingLicenceById,
    revokeLadingById,
};
