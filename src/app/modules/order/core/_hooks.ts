import { useMutation, useQuery } from "@tanstack/react-query";
import { IApproveInvoice, ICreateOrder } from "./_models";
import * as api from "./_requests";

const useCreateOrder = () => {
    return useMutation((formData: ICreateOrder) => {
        return api.createOrder(formData);
    });
};
const useUpdateOrder = () => {
    return useMutation((formData: ICreateOrder) => {
        return api.updateOrder(formData);
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
    // return useMutation((formData: {
    //     pageNumber?: number;
    //     pageSize?: number;
    //     InvoiceTypeId?: number[];
    //     OrderStatusId?: number;
    // }) => {
    //     return api.retrieveOrders(formData)
    // })
};
const useRetrieveOrdersByMutation = () => {
    return useMutation(
        (formData: {
            pageNumber?: number;
            pageSize?: number;
            InvoiceTypeId?: number[];
            OrderStatusId?: number;
        }) => {
            return api.retrieveOrdersMutation(formData);
        }
    );
};

const useRetrieveOrder = (id: string | undefined) => {
    return useQuery(["order", id], () => api.retrieveOrder(id));
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
const useGetOrderDetailByCode = () => {
    return useMutation((orderCode: number) => {
        return api.getOrderDetailByCode(orderCode);
    });
};

export {
    useCreateOrder,
    useUpdateOrder,
    useRetrieveOrders,
    useRetrieveOrder,
    useConfirmOrder,
    useApproveInvoiceType,
    useRetrieveOrdersByMutation,
    useGetOrderDetailByCode,
};
