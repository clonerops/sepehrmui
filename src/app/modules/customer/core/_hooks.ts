import { useMutation, useQuery } from "@tanstack/react-query";
import { ICustomer, ICustomerAccountFilter, ICustomerFilter } from "./_models";
import * as api from "./_requests";

const useCreateCustomer = () => {
    return useMutation((formdata: ICustomer) => {
        return api.createCustomer(formdata);
    });
};

const useGetCustomers = () => {
    return useQuery(["customers"], () => api.getCustomers(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useGetCustomersByMutation = () => {
    return useMutation((filters: ICustomerFilter) => {
        return api.getCustomersByMutation(filters);
    });
};


const useGetCustomer = () => {
    return useMutation((id: string) => {
        return api.getCustomer(id);
    });
};

const useUpdateCustomer = () => {
    return useMutation((formdata: ICustomer) => {
        return api.updateCustomer(formdata);
    });
};

const useDeleteCustomer = () => {
    return useMutation((id: string) => {
        return api.deleteCustomer(id);
    });
};

const useGetCustomersAccountReport = () => {
    return useMutation((filters: ICustomerAccountFilter) => {
        return api.getCustomerAccountReport(filters);
    });
};


export {
    useCreateCustomer,
    useGetCustomers,
    useGetCustomersByMutation,
    useGetCustomer,
    useUpdateCustomer,
    useDeleteCustomer,
    useGetCustomersAccountReport
};
