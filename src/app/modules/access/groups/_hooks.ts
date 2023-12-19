import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from './_requests'

const useGetApplicationRoles = () => {
    return useQuery(["applicationRoles"], () => api.getApplicationRoles());
};

const usePostApplicationRoles = () => {
    return useMutation((formData: IRoleGroup) => {
        return api.postApplicationRoles(formData);
    });
};

const useDeleteApplicationRoles = () => {
    return useMutation((id: string) => {
        return api.deleteApplicationRoles(id);
    });
};

export {
    useGetApplicationRoles,
    usePostApplicationRoles,
    useDeleteApplicationRoles
}