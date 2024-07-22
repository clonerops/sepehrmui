import { http } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { ICargo, ICargoFilter } from "./_models";

const getCargosList = async (formData: ICargoFilter) => {
    try {
        
        const { data } = await http.get(`${generateURLQueryParam('/v1/CargoAnnouncement', formData)}`);
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};
const retrievesNotSendedOrder = async () => {
    try {
        
        const { data } = await http.get( `/v1/CargoAnnouncement/GetNotSendedOrders`);
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};
const createCargo = async (formData: ICargo) => {
    try {

        const { data } = await http.post(`/v1/CargoAnnouncement`,JSON.stringify(formData));
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};

const getCargoById = async (cargoId: string) => {
    try {

        const {data} = await http.get(`/v1/CargoAnnouncement/${cargoId}`)
        return data
        
    } catch (error: any) {
        return error.response
    }

}

const editCargo = async (formData: ICargo) => {
    try {

        const { data } = await http.put( `/v1/CargoAnnouncement/${formData.id}`, JSON.stringify(formData));
        return data;
    
    } catch (error: any) {
        return error.response;
    }
};

const revokeCargoById = async (id: string) => {
    try {

        const { data } = await http.put(`/v1/CargoAnnouncement/RevokeCargoAnnouncement/${id}`, JSON.stringify({id: id}));
        return data;
    }
     catch (error: any) {
        return error.response;
    }
};



export {
    getCargosList,
    retrievesNotSendedOrder,
    createCargo,
    getCargoById,
    editCargo,
    revokeCargoById,
};
