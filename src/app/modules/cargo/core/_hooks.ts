import { useMutation, useQuery } from "@tanstack/react-query";
import { ICargo, ILadingLicence } from "./_models";
import * as api from "./_requests";

const useRetrievesNotSendedOrder = () => {
    return useQuery(["ordersNotSend"], () => api.retrievesNotSendedOrder());
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
    return useQuery(["cargos", orderId], () => api.retrievesCargos(orderId));
};

const useCargoById = (cargoId: string) => {
    return useQuery(["cargos", cargoId], () => api.getCargoById(cargoId));
};


// Lading Licence

const useGetLadingLicenceList = () => {
    return useQuery(["ladingLicence"], () => api.getLadingLicenceList());
};

const usePostLadingLicence = () => {
    return useMutation((formData: ILadingLicence) => {
        return api.postLadingLicence(formData);
    });
};

const useGetLadingLicenceById = (id: string) => {
    return useQuery(["cargos", id], () => api.getLadingLicenceById(id));
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

export {
    useGetCargosList,
    useRetrievesNotSendedOrder,
    useCreateCargo,
    useCargoById,
    useRetrieveCargos,
    useGetLadingLicenceList,
    usePostLadingLicence,
    useGetLadingLicenceById,
    useEditLadingLicence,
    useDeleteLadingLicenceById,
};
