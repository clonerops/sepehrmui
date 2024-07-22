import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import { ILadingLicence, ILadingLicenceFilter } from "./_models";

const useGetLadingLicenceList = () => {
    return useQuery(["LadingLicence"], () => 
        api.getLadingLicenceList(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useGetLadingLicenceListByMutation = () => {
    return useMutation((filters: ILadingLicenceFilter) => {
        return api.getLadingLicenceListByMutation(filters);
    });
};

const usePostLadingLicence = () => {
    return useMutation((formData: ILadingLicence) => {
        return api.postLadingLicence(formData);
    });
};

const useGetLadingLicenceById = (id: string) => {
    return useQuery(["LadingLicenceById", id], () => api.getLadingLicenceById(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useEditLadingLicence = () => {
    return useMutation((formData: ILadingLicence) => {
        return api.editLadingLicence(formData);
    });
};

const useDeleteLadingLicenceById = () => {
    return useMutation((id: string) => {
        return api.deleteLadingLicenceById(id);
    });
};

const useRevokeLadingById = () => {
    return useMutation((id: number) => {
        return api.revokeLadingById(id);
    });
};

export {
    useGetLadingLicenceList,
    useGetLadingLicenceListByMutation,
    usePostLadingLicence,
    useGetLadingLicenceById,
    useRevokeLadingById,
    useEditLadingLicence,
    useDeleteLadingLicenceById,
};
