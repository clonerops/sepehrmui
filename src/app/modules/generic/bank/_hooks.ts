import { useMutation, useQuery } from "@tanstack/react-query";
import { IBank } from "./_models";
import * as api from './_requests'

const useGetProductList = () => {
    return useMutation((formdata: IBank) => api.getProductList(formdata));
};


export {
    useGetProductList,
}