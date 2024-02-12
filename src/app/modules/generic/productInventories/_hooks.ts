import { useMutation } from "@tanstack/react-query";
import * as api from './_requests'

const uploadProductInventories: any = (formData: any) => {
    return api.uploadProductInventories(formData);
};

const useUploadFileProductInventories = () => {
    return useMutation(uploadProductInventories);
};

export {
    useUploadFileProductInventories
}