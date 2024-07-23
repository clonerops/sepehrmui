import { http } from "../../../_cloner/helpers/axiosConfig";
import { ISupplierFilter, ISuppliers } from "./_models";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";

const retrieveSuppliers = async () => {
    try {

        // const { data } = await http.get(`${generateURLQueryParam('/v1/ProductSupplier', filter)}`);
        const { data } = await http.get(`/v1/ProductSupplier`);
        return data;
    
    } catch (error: any) {
        return error.response
    }
};

const createSuppliers = async (formData: ISuppliers) => {
    try {

        const { data } = await http.post(`/v1/ProductSupplier`, JSON.stringify(formData));
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};

const retrieveSupplierById = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/ProductSupplier/${id}`);
        return data;
    
    } catch (error: any) {
        return error?.response;
    }
};

const updateSupplier = async (formData: ISuppliers) => {
    try {

        const { data } = await http.put( `/v1/ProductSupplier/${formData.id}`, JSON.stringify(formData));
        return data;
    
    } catch (error: any) {
        return error?.response;
    }
};

const deleteSupplier = async (id: string) => {
    try {

        const { data } = await http.delete(`/v${1}/ProductSupplier/${id}`);
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};


export {
    retrieveSuppliers,
    createSuppliers,
    retrieveSupplierById,
    updateSupplier,
    deleteSupplier,
}