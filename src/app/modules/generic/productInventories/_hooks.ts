import { useMutation } from "@tanstack/react-query";
import * as api from './_requests'

const uploadProductInventories: any = (formData: any, onUploadProgress: any) => {
    return api.uploadProductInventories(formData, onUploadProgress);
};

const useUploadFileProductInventories = () => {
    return useMutation(uploadProductInventories);
};

export {
    useUploadFileProductInventories
}