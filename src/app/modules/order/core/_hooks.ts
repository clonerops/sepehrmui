import { useMutation, useQuery } from "@tanstack/react-query";
import { IApproveInvoice, ICreateOrder } from "./_models";
import * as api from "./_requests";

const useCreateOrder = () => {
    return useMutation((formData: ICreateOrder) => {
        return api.createOrder(formData);
    });
};

const useRetrieveOrders = (formData: {
    pageNumber?: number;
    pageSize?: number;
    InvoiceTypeId?: number[];
    OrderStatusId?: number;
}) => {
    // return useQuery(["orders"], () => api.retrieveOrders());
    return useQuery(["orders", formData], () => api.retrieveOrders(formData));
};
const useRetrieveOrdersByMutation = () => {
    return useMutation((formData: { pageSize: number, pageNumber: number }) => {
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
const useApproveInvoiceType = () => {
    return useMutation((formData: IApproveInvoice) => {
        return api.approveInvoiceType(formData);
    });
};

export { useCreateOrder, useRetrieveOrders, useRetrieveOrder, useConfirmOrder, useApproveInvoiceType, useRetrieveOrdersByMutation };
