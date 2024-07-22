import { useMutation } from "@tanstack/react-query";
import * as api from './_requests'
import { IIncreaseInventory } from "./_models";

const uploadProductInventories: any = (formData: any) => {
    return api.uploadProductInventories(formData);
};

const useUploadFileProductInventories = () => {
    return useMutation(uploadProductInventories);
};

const useIncraseInventory = () => {
    return useMutation((formData: IIncreaseInventory) => {
        return api.increaseInventory(formData)
    })
}

export {
    useUploadFileProductInventories,useIncraseInventory
}