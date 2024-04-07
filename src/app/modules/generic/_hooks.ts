import { useQuery } from "@tanstack/react-query";
import * as api from "./_requests";

const useGetSendTypes = () => {
    return useQuery(["sendTypes"], () => api.getSendTypes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetPaymentTypes = () => {
    return useQuery(["paymentTypes"], () => api.getPaymentTypes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetPurchaseInvoice = () => {
    return useQuery(["purchaseInvoice"], () => api.getPurchaseInvoice(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetInvoiceType = () => {
    return useQuery(["invoiceType"], () => api.getInvoiceType(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetCustomerValidities = () => {
    return useQuery(["customerValidities"], () => api.getCustomerValidities(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetWarehouseTypes = () => {
    return useQuery(["warehouseTypes"], () => api.getWarehouseTypes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetWarehouses = () => {
    return useQuery(["warehouses"], () => api.getWarehouses(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetReceivePaymentSources = () => {
    return useQuery(
        ["receivePaymentSources"],
        () => api.getReceivePaymentSources(),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
        }
    );
};
const useGetServices = () => {
    return useQuery(["services"], () => api.getServices(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetProductTypes = () => {
    return useQuery(["productTypes"], () => api.getProductTypes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetVehicleTypes = () => {
    return useQuery(["vehicleTypes"], () => api.getVehicleTypes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetTransferRemittanceStatus = () => {
    return useQuery(["transferRemittanceStatus"], () => api.getTransferRemitanceStatus(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetOfficialBank = () => {
    return useQuery(["officialBank"], () => api.getOfficialBank(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};

export {
    useGetSendTypes,
    useGetPaymentTypes,
    useGetPurchaseInvoice,
    useGetInvoiceType,
    useGetCustomerValidities,
    useGetWarehouseTypes,
    useGetWarehouses,
    useGetReceivePaymentSources,
    useGetServices,
    useGetProductTypes,
    useGetVehicleTypes,
    useGetTransferRemittanceStatus,
    useGetOfficialBank
};
