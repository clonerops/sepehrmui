import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreateOrder } from "./_models";
import * as api from "./_requests";

const useCreateOrder = () => {
    return useMutation((formData: ICreateOrder) => {
        return api.createOrder(formData);
    });
};

const useRetrieveOrders = () => {
    return useQuery(["orders"], () => api.retrieveOrders());
};
const useRetrieveOrdersByMutation = () => {
    return useMutation((formData: {pageSize: number, pageNumber: number}) => {
        return api.retrieveOrdersMutation(formData.pageSize, formData.pageNumber);
    });
};

const useRetrieveOrder = (id: string | undefined) => {
    return useQuery(["order"], () => api.retrieveOrder(id));
};
const useConfirmOrder = () => {
    return useMutation((id: string) => {
        return api.confirmOrder(id);
    });
};

export { useCreateOrder, useRetrieveOrders, useRetrieveOrder, useConfirmOrder, useRetrieveOrdersByMutation };
