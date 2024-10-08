import { http } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IPermission } from "./_models";

const postPermissions = async (formdata: IPermission) => {
    try {
        const { data } = await http.post(
            "/v1/Permission",
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const updatePermissions = async (formdata: IPermission) => {
    try {
        const { data } = await http.put(
            `/v1/Permission/${formdata.id}`,
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const getPermissions = async () => {
    try {
        const { data } = await http.get("/v1/Permission");
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const getPermissionsMutate = async (formData: any) => {
    const filter = {
        PageNumber: formData.PageNumber,
        PageSize: formData.PageSize
    }
    try {
        const { data } = await http.get(`${generateURLQueryParam('/v1/Permission', filter)}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const getPermission = async (id: string) => {
    try {
        const { data } = await http.get(`/v1/Permission/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const deletePermissions = async (id: string) => {
    try {
        const { data } = await http.delete(`/v1/Permission/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const getAllPermissionByMenus = async () => {
    const { data } = await http.get("/v1/Permission/GetAllPermissionsByMenu");
    return data;
};


export {
    postPermissions,
    getPermissions,
    deletePermissions,
    updatePermissions,
    getPermission,
    getPermissionsMutate,
    getAllPermissionByMenus,
}