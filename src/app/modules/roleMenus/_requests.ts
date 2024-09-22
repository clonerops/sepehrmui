import { http } from "../../../_cloner/helpers/axiosConfig";
import { IRoleMenu } from "./_models";

const getRoleMenus = async () => {
    const { data } = await http.get("/v1/RoleMenu");
    return data;
};
const getRoleMenusById = async (roleId: string) => {
    const { data } = await http.get(`/v1/RoleMenu?roleId=${roleId}`);
    return data;
};

const postRoleMenus = async (formData: IRoleMenu) => {
    try {
        const { data } = await http.post(
            "/v1/RoleMenu",
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const getApplicationMenus = async () => {
    const { data } = await http.get("/v1/RoleMenu/GetApplicationMenus");
    return data;
};
const getAllApplicationMenus = async () => {
    const { data } = await http.get("/v1/RoleMenu/GetALlApplicationMenus");
    return data;
};

const deleteRoleMenu = async (roleIds: string[]) => {
    try {
        const { data } = await http.delete(`/v1/RoleMenu`, {
            data: roleIds
        });
        return data
        // return await http.delete(`/v1/RoleMenu/${id}`).then((res) => res?.data);
    } catch (error: any) {
        return error.response;
    }
};





export {
    getRoleMenus,
    getRoleMenusById,
    postRoleMenus,
    getApplicationMenus,
    deleteRoleMenu,
    getAllApplicationMenus
}