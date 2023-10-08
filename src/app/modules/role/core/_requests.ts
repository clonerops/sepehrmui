import { http } from "../../../../_cloner/helpers/axiosConfig";
import { IRoleMenu, IUpdateRole } from "./_models";

const getRoles = async () => {
  const { data } = await http.get("/Account/GetAllRoles");
  return data;
};

// Role menu
const getRoleMenus = async () => {
  const { data } = await http.get("/v1/RoleMenu");
  return data;
};

const postRoleMenus = async (formData: IRoleMenu) => {
  try {
    const { data } = await http.post("/v1/RoleMenu", JSON.stringify(formData));
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
  try {
    const { data } = await http.post("/v1/UserRole", JSON.stringify(formData));
    return data;
  } catch (error: any) {
    return error.response;
  }
};

const deleteUserRole = async (formData: IUpdateRole) => {
  try {
    return await http.delete("/v1/UserRole", {
      params: formData,
    });
  } catch (error: any) {
    return error?.response;
  }
};

export {
  getRoles,
  getRoleMenus,
  postRoleMenus,
  getApplicationMenus,
  getUserRole,
  postUserRole,
  deleteRoleMenu,
  deleteUserRole,
};
