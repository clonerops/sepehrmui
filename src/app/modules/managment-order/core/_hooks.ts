import { useMutation, useQuery } from "@tanstack/react-query";
import { IApproveInvoice, IPurchaserOrder, ISaleOrderFilter } from "./_models";
import * as api from "./_requests";

// Sales Order
const useCreateOrder = () => useMutation((formData: any) => api.createOrder(formData))

const useUpdateOrder = () => useMutation((formData: any) => api.updateOrder(formData))

const useRetrieveOrders = (formData: { pageNumber?: number; pageSize?: number; InvoiceTypeId?: number[]; OrderStatusId?: number }) => {
    return useQuery(["orders", formData], () => api.retrieveOrders(formData), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useRetrieveOrdersByMutation = () => useMutation((formData: ISaleOrderFilter) => api.retrieveOrdersMutation(formData));

const useRetrieveOrder = (id: string | undefined, hasPermission: boolean) => {
    return useQuery(["order", id], () => api.retrieveOrder(id), {
        enabled: hasPermission,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useConfirmOrder = () => useMutation((id: string) => api.confirmOrder(id))
const useConvertPreSaleOrder = () => useMutation((id: string) => api.convertPreSaleOrder(id))

const useApproveInvoiceType = () => useMutation((formData: IApproveInvoice) => api.approveInvoiceType(formData))

const useGetOrderDetailByCode = () => useMutation((orderCode: number) => api.getOrderDetailByCode(orderCode))

// Purchase Order
const useCreatePurchaserOrder = () => useMutation((formData: any) => api.createPurchaserOrder(formData))
const useRetrievePurchaserOrders = (formData: { pageNumber?: number; pageSize?: number; InvoiceTypeId?: number[]; OrderStatusId?: number, IsNotTransferedToWarehouse?: boolean }) => {
    return useQuery(["purchaserOrders", formData], () => api.retrievePurchaserOrders(formData), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};
const useRetrievePurchaserOrder = (id: string | undefined) => {
    return useQuery(["purchaserOrder", id], () => api.retrievePurchaserOrder(id), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useRetrievePurchaserOrdersByMutation = (hasPermission: boolean) => {
    return useMutation((formData: {
        pageNumber?: number;
        pageSize?: number;
        InvoiceTypeId?: number[];
        PurchaseOrderStatusId?: number | null;
        IsNotTransferedToWarehouse?: boolean | null,
        OrderCode?: number | null;
    }) => {
        if(hasPermission) {
            return api.retrievePurchaserOrdersMutation(formData)
        } else {
            return Promise.resolve(null);
        }
    })
}

const useApprovePurchaserInvoiceType = () => useMutation((formData: IApproveInvoice) => api.approvePurchaserInvoiceType(formData))
const useGetPurchaserOrderDetailByCode = () => useMutation((orderCode: number) => api.getPurchaserOrderDetailByCode(orderCode))
const useUpdatePurchaserOrder = () => useMutation((formData: IPurchaserOrder) => api.updatePurchaserOrder(formData))
const usePurchaseOrderTransfer = () => useMutation((formData: any) => api.purchaseOrderTransfer(formData))



export {
    useCreateOrder,
    useUpdateOrder,
    useRetrieveOrders,
    useRetrieveOrder,
    useConfirmOrder,
    useConvertPreSaleOrder,
    useApproveInvoiceType,
    useRetrieveOrdersByMutation,
    useGetOrderDetailByCode,
    // purchaser order
    useCreatePurchaserOrder,
    useRetrievePurchaserOrders,
    useRetrievePurchaserOrder,
    useRetrievePurchaserOrdersByMutation,
    useApprovePurchaserInvoiceType,
    useGetPurchaserOrderDetailByCode,
    useUpdatePurchaserOrder,
    usePurchaseOrderTransfer
};
