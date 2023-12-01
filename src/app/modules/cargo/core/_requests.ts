import { http } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { ICargo, ILadingLicence } from "./_models";

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

// Lading Licence
const getLadingLicenceList = async () => {
    const { data } = await http.get("/v1/LadingLicence");
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
        const { data } = await http.get(`/v1/LadingLicence/${id}`);
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
        const { data } = await http.delete(`/v1/LadingLicence/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

export {
    getCargosList,
    retrievesNotSendedOrder,
    createCargo,
    getCargoById,
    retrievesCargos,
    getLadingLicenceList,
    postLadingLicence,
    getLadingLicenceById,
    editLadingLicence,
    deleteLadingLicenceById,
};
