import { useQuery } from "@tanstack/react-query";
import * as api from "./_requests";

const useGetSendTypes = (hasPermission: boolean) => {
    return useQuery(["sendTypes"], () => api.getSendTypes(), {
        enabled: hasPermission,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetPurchaseSendTypes = (hasPermission: boolean) => {
    return useQuery(["purchaseSendTypes"], () => api.getPurchaseSendTypes(), {
        enabled: hasPermission,
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
const useGetPurchasePaymentTypes = (hasPermission: boolean) => {
    return useQuery(["purchasePaymentTypes"], () => api.getPurchasePaymentTypes(), {
        enabled: hasPermission,
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
const useGetInvoiceType = (hasPermission: boolean) => {
    return useQuery(["invoiceType"], () => api.getInvoiceType(), {
        enabled: hasPermission,
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
const useGetWarehouseTypes = (hasPermission: boolean) => {
    return useQuery(["warehouseTypes"], () => api.getWarehouseTypes(), {
        enabled: hasPermission,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetWarehouses = (hasPermission: boolean) => {
    return useQuery(["warehouses"], () => api.getWarehouses(), {
        enabled: hasPermission,
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
const useGetServices = (hasPermission: boolean) => {
    return useQuery(["services"], () => api.getServices(), {
        enabled: hasPermission,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetProductTypes = (hasPermission: boolean) => {

    return useQuery(["productTypes"], () => api.getProductTypes(), {
        enabled: hasPermission, 
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
const useGetOrderExitTypes = (hasPermission: boolean) => {
    return useQuery(["orderExitTypes"], () => api.getOrderExitTypes(), {
        enabled: hasPermission,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};

const useGetUnits = (hasPermission: boolean) => {
    return useQuery(['units'], () => api.getUnits(), {
        enabled: hasPermission,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}
const useGetPhoneBookTypes = () => {
    return useQuery(['phoneBookTypes'], () => api.getPhoneBookTypes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}
const useGetCustomerLabelTypes = () => {
    return useQuery(['customerLabelTypes'], () => api.getCustomerLabelTypes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}
const useGetRequestPaymentReason = () => {
    return useQuery(['requestPaymentReason'], () => api.getRequestPaymentReason(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}


export {
    useGetSendTypes,
    useGetPurchaseSendTypes,
    useGetPaymentTypes,
    useGetPurchasePaymentTypes,
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
    useGetOfficialBank,
    useGetOrderExitTypes,
    useGetUnits,
    useGetPhoneBookTypes,
    useGetCustomerLabelTypes,
    useGetRequestPaymentReason
};
