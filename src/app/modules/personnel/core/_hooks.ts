import { useMutation, useQuery } from "@tanstack/react-query";
import { IPersonnel, IPersonnelFilter } from "./_models";
import * as api from "./_requests";

const useCreatePersonnel = () => {
    return useMutation((formdata: IPersonnel) => {
        return api.createPersonnel(formdata);
    });
};

const useGetPersonnels = () => {
    return useQuery(["Personnels"], () => api.getPersonnels(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useGetPersonnelsByMutation = () => {
    return useMutation((filters: IPersonnelFilter) => {
        return api.getPersonnelsByMutation(filters);
    });
};


const useGetPersonnel = () => {
    return useMutation((id: string) => {
        return api.getPersonnel(id);
    });
};

const useUpdatePersonnel = () => {
    return useMutation((formdata: IPersonnel) => {
        return api.updatePersonnel(formdata);
    });
};

const useDeletePersonnel = () => {
    return useMutation((id: string) => {
        return api.deletePersonnel(id);
    });
};

export {
    useCreatePersonnel,
    useGetPersonnels,
    useGetPersonnelsByMutation,
    useGetPersonnel,
    useUpdatePersonnel,
    useDeletePersonnel,
};
