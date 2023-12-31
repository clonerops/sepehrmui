import { http } from "../../../../../_cloner/helpers/axiosConfig";
import { IRole, IRoleMenu, IUpdateRole } from "./_models";

const getRoles = async () => {
    const { data } = await http.get("/Account/GetAllRoles");
    return data;
};

// Role menu
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

const deleteRoleMenu = async (id: string) => {
    try {
        return await http.delete(`/v1/RoleMenu/${id}`).then((res) => res?.data);
    } catch (error: any) {
        return error.response;
    }
};

// User Role
const getUserRole = async () => {
    const { data } = await http.get("/v1/UserRole");
    return data;
};

const postUserRole = async (formData: IUpdateRole) => {
    return await http
        .post("/v1/UserRole", JSON.stringify(formData))
        .then((res) => res?.data)
        .catch((er) => {
            throw new Error(
                er?.response?.data?.message ||
                    er?.response?.data?.Message ||
                    er?.response?.data?.errors?.join("/")
            );
        });
};

const deleteUserRole = async (formData: IUpdateRole) => {
    return await http
        .delete("/v1/UserRole", {
            params: formData,
        })
        .then((res) => res?.data)
        .catch((er) => {
            throw new Error(
                er?.response?.data?.message ||
                    er?.response?.data?.Message ||
                    er?.response?.data?.errors?.join("/")
            );
        });
};

// Roles Defination

const postApplicationRoles = async (formdata: IRole) => {
    try {
        const { data } = await http.post(
            "/v1/ApplicationRole",
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const getApplicationRoles = async () => {
    try {
        const { data } = await http.get("/v1/ApplicationRole");
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const deleteApplicationRoles = async (id: number) => {
    try {
        const { data } = await http.delete(`/v1/ApplicationRole/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

export {
    getRoles,
    getRoleMenus,
    getRoleMenusById,
    postRoleMenus,
    getApplicationMenus,
    getUserRole,
    postUserRole,
    deleteRoleMenu,
    deleteUserRole,
    postApplicationRoles,
    getApplicationRoles,
    deleteApplicationRoles,
};
