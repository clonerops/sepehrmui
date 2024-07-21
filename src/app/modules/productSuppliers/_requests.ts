import { http } from "../../../_cloner/helpers/axiosConfig";
import { ISuppliers } from "./_models";

const retrieveSuppliers = async (PageNumber: number | null | string = "", PageSize: number | null | string = "") => {
    let url: string = ``;

    if (PageNumber || PageSize === "") {
        url = `/v${1}/ProductSupplier`;
    } else {
        url = `/v${1}/ProductSupplier?PageNumber=${PageNumber}&PageSize=${PageSize}`;
    }

    const { data } = await http.get(url);
    return data;
};

const createSuppliers = async (formData: ISuppliers) => {
    try {
        const { data } = await http.post(
            `/v${1}/ProductSupplier`,
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const retrieveSupplierById = async (id: string) => {
    try {
        const { data } = await http.get(`/v${1}/ProductSupplier/${id}`);
        return data;
    } catch (error: any) {
        return error?.response;
    }
};

const updateSupplier = async (formData: ISuppliers) => {
    try {
        const { data } = await http.put(
            `/v${1}/ProductSupplier/${formData.id}`,
            JSON.stringify(formData)
        );
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