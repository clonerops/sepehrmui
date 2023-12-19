import { http } from "../../../../_cloner/helpers/axiosConfig";
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
const getPermissions = async () => {
    try {
        const { data } = await http.get("/v1/Permission");
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


export {
    postPermissions,
    getPermissions,
    deletePermissions
}