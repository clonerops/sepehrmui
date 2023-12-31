import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from './_requests'
import { IPermission } from "./_models";

const useGetPermissions = () => {
    return useQuery(["Permissions"], () => api.getPermissions());
};

const usePostPermissions = () => {
    return useMutation((formData: IPermission) => {
        return api.postPermissions(formData);
    });
};
const useUpdatePermissions = () => {
    return useMutation((formData: IPermission) => {
        return api.updatePermissions(formData);
    });
};

const useDeletePermissions = () => {
    return useMutation((id: string) => {
        return api.deletePermissions(id);
    });
};
const useGetPermission = () => {
    return useMutation((id: string) => {
        return api.getPermission(id);
    });
};

export {
    useGetPermissions,
    usePostPermissions,
    useDeletePermissions,
    useUpdatePermissions,
    useGetPermission
}