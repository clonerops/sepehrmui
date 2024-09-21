import { useMutation, useQuery } from "@tanstack/react-query";
import { IRoleMenu } from "./_models";
import * as api from './_requests'

const useGetRoleMenus = () => {
    return useQuery(["roleMenus"], () =>
        api.getRoleMenus(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useGetRoleMenusById = (roleId: string) => {
    return useQuery(["roleMenusById", roleId], () =>
        api.getRoleMenusById(roleId),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            retry: false    
        }
    );
};

const usePostRoleMenus = () => {
    return useMutation((formData: IRoleMenu) => {
        return api.postRoleMenus(formData);
    });
};

const useGetApplicationMenus = () => {
    return useQuery(["roleAppMenu"], () => api.getApplicationMenus(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useGetAllApplicationMenus = () => {
    return useQuery(["roleAllAppMenu"], () => api.getAllApplicationMenus(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useDeleteRoleMenu = () => {
    return useMutation((formData: {id: string, roleIds: string[]}) => {
        return api.deleteRoleMenu(formData.id, formData.roleIds);
    });
};

export {
    useGetRoleMenus,
    useGetRoleMenusById,
    usePostRoleMenus,
    useGetApplicationMenus,
    useDeleteRoleMenu,
    useGetAllApplicationMenus
}