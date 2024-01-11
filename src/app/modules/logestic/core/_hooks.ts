import { useMutation, useQuery } from "@tanstack/react-query";
import { ICargo, IExitRemittance, ILadingLicence } from "./_models";
import * as api from "./_requests";

const useRetrievesNotSendedOrder = () => {
    return useQuery(["ordersNotSend"], () => api.retrievesNotSendedOrder(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useGetCargosList = () => {
    // return useQuery(["cargosList"], () => api.getCargosList());
    return useMutation((formData: {
        PageNumber?: number,
        PageSize?: number,
        OrderCode?: number
        CustomerId?: string
    }) => {
        return api.getCargosList(formData);
    });

};



const useCreateCargo = () => {
    return useMutation((formData: ICargo) => {
        return api.createCargo(formData);
    });
};

const useRetrieveCargos = (orderId?: string) => {
    return useQuery(["cargos", orderId], () => api.retrievesCargos(orderId), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useCargoById = (cargoId: string) => {
    return useQuery(["cargosById", cargoId], () => api.getCargoById(cargoId), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useEditCargo = () => {
    return useMutation((formData: ICargo) => {
        return api.editCargo(formData);
    });
};


// Lading Licence

const useGetLadingLicenceList = () => {
    return useQuery(["ladingLicence"], () => api.getLadingLicenceList(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const usePostLadingLicence = () => {
    return useMutation((formData: ILadingLicence) => {
        return api.postLadingLicence(formData);
    });
};

const useGetLadingLicenceById = (id: string) => {
    return useQuery(["ladingLicenceById", id], () => api.getLadingLicenceById(id), {
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

const usePostExitRemiitance = () => {
    return useMutation((formData: IExitRemittance) => {
        return api.postExitRemittance(formData);
    });
};



export {
    useGetCargosList,
    useRetrievesNotSendedOrder,
    useCreateCargo,
    useCargoById,
    useEditCargo,
    useRetrieveCargos,
    useGetLadingLicenceList,
    usePostLadingLicence,
    useGetLadingLicenceById,
    useEditLadingLicence,
    useDeleteLadingLicenceById,
    usePostExitRemiitance
};
