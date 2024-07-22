import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from './_requests'

const useGetApplicationRoles = () => {
    return useQuery(["applicationRoles"], () =>
        api.getApplicationRoles(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const usePostApplicationRoles = () => {
    return useMutation((formData: IRoleGroup) => {
        return api.postApplicationRoles(formData);
    });
};
const usePutApplicationRoles = () => {
    return useMutation((formData: IRoleGroup) => {
        return api.putApplicationRoles(formData);
    });
};
const useGetApplicationRole = () => {
    return useMutation((id: string) => {
        return api.getApplicationRole(id);
    });
};

const useDeleteApplicationRoles = () => {
    return useMutation((id: string) => {
        return api.deleteApplicationRoles(id);
    });
};

export {
    useGetApplicationRoles,
    useGetApplicationRole,
    usePostApplicationRoles,
    useDeleteApplicationRoles,
    usePutApplicationRoles
}