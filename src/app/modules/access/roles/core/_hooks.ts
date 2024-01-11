import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import { IRole, IRoleMenu, IUpdateRole } from "./_models";
import { AxiosError } from "axios";

const useGetRoles = () => {
    return useQuery(["roles"], () => api.getRoles(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

// Role menu
const useGetRoleMenus = () => {
    return useQuery(["roleMenus"], () => api.getRoleMenus(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useGetRoleMenusById = (roleId: string) => {
    return useQuery(["roleMenusById", roleId], () =>
        api.getRoleMenusById(roleId)
    );
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
    return useQuery(["userRole"], () => api.getUserRole(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const usePostUserRole = () => {
    return useMutation(
        (formData: IUpdateRole) => {
            return api.postUserRole(formData);
        }
    );
};

const useDeleteUserRole = () => {
    return useMutation(
        (formData: IUpdateRole) => {
            return api.deleteUserRole(formData);
        }
    );
};

// Application Roles
const useGetApplicationRoles = () => {
    return useQuery(["applicationRoles"], () => api.getApplicationRoles());
};

const usePostApplicationRoles = () => {
    return useMutation((formData: IRole) => {
        return api.postApplicationRoles(formData);
    });
};

const useDeleteApplicationRoles = () => {
    return useMutation((id: number) => {
        return api.deleteApplicationRoles(id);
    });
};

export {
    useGetRoles,
    useGetRoleMenus,
    useGetRoleMenusById,
    usePostRoleMenus,
    useGetApplicationMenus,
    useGetUserRole,
    usePostUserRole,
    useDeleteRoleMenu,
    useDeleteUserRole,
    useGetApplicationRoles,
    usePostApplicationRoles,
    useDeleteApplicationRoles,
};
