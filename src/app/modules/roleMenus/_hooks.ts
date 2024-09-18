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
    return useMutation((id: string) => {
        return api.deleteRoleMenu(id);
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