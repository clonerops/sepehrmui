import { useMutation, useQuery } from "@tanstack/react-query";
import { IApproveInvoice, IPurchaserOrder, ISalesOrder } from "./_models";
import * as api from "./_requests";

// Sales Order
const useCreateOrder = () => useMutation((formData: ISalesOrder) => api.createOrder(formData))

const useUpdateOrder = () => useMutation((formData: ISalesOrder) =>  api.updateOrder(formData))

const useRetrieveOrders = (formData: { pageNumber?: number; pageSize?: number; InvoiceTypeId?: number[]; OrderStatusId?: number}) => {
    return useQuery(["orders", formData], () => api.retrieveOrders(formData), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useRetrieveOrdersByMutation = () => useMutation((formData: { pageNumber?: number; pageSize?: number; InvoiceTypeId?: number[]; OrderStatusId?: number;}) => api.retrieveOrdersMutation(formData));

const useRetrieveOrder = (id: string | undefined) => {
    return useQuery(["order", id], () => api.retrieveOrder(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useConfirmOrder = () =>  useMutation((id: string) => api.confirmOrder(id))

const useApproveInvoiceType = () =>  useMutation((formData: IApproveInvoice) => api.approveInvoiceType(formData))

const useGetOrderDetailByCode = () => useMutation((orderCode: number) => api.getOrderDetailByCode(orderCode))

// Purchase Order
const useCreatePurchaserOrder = () => useMutation((formData: IPurchaserOrder) => api.createPurchaserOrder(formData))


export {
    useCreateOrder,
    useUpdateOrder,
    useRetrieveOrders,
    useRetrieveOrder,
    useConfirmOrder,
    useApproveInvoiceType,
    useRetrieveOrdersByMutation,
    useGetOrderDetailByCode,
    // purchaser order
    useCreatePurchaserOrder
};
