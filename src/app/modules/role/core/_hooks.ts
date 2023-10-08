import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import { IRoleMenu, IUpdateRole } from "./_models";

const useGetRoles = () => {
  return useQuery(["roles"], () => api.getRoles());
};

// Role menu
const useGetRoleMenus = () => {
  return useQuery(["roleMenus"], () => api.getRoleMenus());
};

const usePostRoleMenus = () => {
  return useMutation((formData: IRoleMenu) => {
    return api.postRoleMenus(formData);
  });
};

const useGetApplicationMenus = () => {
  return useQuery(["roleAppMenu"], () => api.getApplicationMenus());
};

const useDeleteRoleMenu = () => {
  return useMutation((id: string) => {
    return api.deleteRoleMenu(id);
  });
};

// User Role
const useGetUserRole = () => {
  return useQuery(["userRole"], () => api.getUserRole());
};

const usePostUserRole = () => {
  return useMutation((formData: IUpdateRole) => {
    return api.postUserRole(formData);
  });
};

const useDeleteUserRole = () => {
  return useMutation((formData: IUpdateRole) => {
    return api.deleteUserRole(formData);
  });
};

export {
  useGetRoles,
  useGetRoleMenus,
  usePostRoleMenus,
  useGetApplicationMenus,
  useGetUserRole,
  usePostUserRole,
  useDeleteRoleMenu,
  useDeleteUserRole,
};
