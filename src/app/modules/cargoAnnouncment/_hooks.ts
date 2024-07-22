import { useMutation, useQuery } from "@tanstack/react-query";
import { ICargo, ICargoFilter } from "./_models";
import * as api from "./_requests";

const useRetrievesNotSendedOrder = () => {
    return useQuery(["ordersNotSend"], () => 
        api.retrievesNotSendedOrder(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useGetCargosList = () => {
    return useMutation((formData: ICargoFilter) => {
        return api.getCargosList(formData);
    });

};

const useCreateCargo = () => {
    return useMutation((formData: ICargo) => {
        return api.createCargo(formData);
    });
};

const useCargoById = (cargoId: string) => {
    return useQuery(["CargosById", cargoId], () => 
        api.getCargoById(cargoId), {
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

const useRevokeCargoById = () => {
    return useMutation((id: string) => {
        return api.revokeCargoById(id);
    });
};



export {
    useGetCargosList,
    useRetrievesNotSendedOrder,
    useCreateCargo,
    useCargoById,
    useEditCargo,
    useRevokeCargoById,
};
