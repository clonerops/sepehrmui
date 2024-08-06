import { useQuery } from "@tanstack/react-query";
import * as api from "./_requests";

const useGetSendTypes = () => {
    return useQuery(["sendTypes"], () => api.getSendTypes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
const useGetPurchaseSendTypes = () => {
    return useQuery(["purchaseSendTypes"], () => api.getPurchaseSendTypes(), {
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
const useGetPurchasePaymentTypes = () => {
    return useQuery(["purchasePaymentTypes"], () => api.getPurchasePaymentTypes(), {
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
const useGetOrderExitTypes = () => {
    return useQuery(["orderExitTypes"], () => api.getOrderExitTypes(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};

const useGetUnits = () => {
    return useQuery(['units'], () => api.getUnits(), {
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
    useGetCustomerLabelTypes
};
