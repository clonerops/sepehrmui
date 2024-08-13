import { http } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IPersonnel, IPersonnelFilter } from "./_models";

const createPersonnel = async (formData: IPersonnel) => {
    try {

        const { data } = await http.post("/v1/Personnel", JSON.stringify(formData));
        return data;    
    
    } catch (error: any) {
        return error.response
    }
};

const getPersonnels = async () => {
    try {

        const { data } = await http.get("/v1/Personnel");
        return data;
    
    } catch (error: any) {
        return error.response
    }
};
const getPersonnelsByMutation = async (filter: IPersonnelFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/Personnel', filter)}`);
        return data;
    
    } catch (error: any) {
        return error.response
    }
};

const getPersonnel = async (id: string) => {
    try {
        const { data } = await http.get(`/v1/Personnel/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }

};

const updatePersonnel = async (formData: IPersonnel) => {
    try {
        const { data } = await http.put(`/v1/Personnel/${formData.id}`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
} 

const deletePersonnel = async (id: string) => {
    try {
        const { data } = await http.delete(`/v1/Personnel/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

export { 
    createPersonnel, 
    getPersonnels, 
    getPersonnelsByMutation,
    getPersonnel,
    updatePersonnel,
    deletePersonnel 
};
