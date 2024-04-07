import { useMutation, useQuery } from "@tanstack/react-query";
import { IOrganizationBank } from "./_models";
import * as api from './_requests'

const useGetOrganizationBankList = () => {
    return useQuery(['organizationBank'], () => api.getOrganizationBankList());
};
const usePostOrganizationBank = () => {
    return useMutation((formdata: IOrganizationBank) => api.postOrganizationBank(formdata));
};
const usePutOrganizationBank = () => {
    return useMutation((formdata: IOrganizationBank) => api.putOrganizationBank(formdata));
};

const useGetOrganizationBankById = () => {
    return useMutation((id: number) => api.getOrganizationBankById(id))
}

const useDeleteOrganizationBank = () => {
    return useMutation((id: string) => api.deleteOrganizationBank(id));
};



export {
    useGetOrganizationBankList,
    usePostOrganizationBank,
    usePutOrganizationBank,
    useGetOrganizationBankById,
    useDeleteOrganizationBank
}