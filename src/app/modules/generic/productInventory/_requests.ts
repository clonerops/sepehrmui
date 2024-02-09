import { http, httpFormData } from "../../../../_cloner/helpers/axiosConfig";

const uploadProductInventories = async (formData: any, onUploadProgress: any) => {
    try {
        const { data } = await httpFormData.post(`/v${1}/ProductInventory/UploadFilePost`, formData, {
            onUploadProgress: onUploadProgress
        });
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const exportProductInventories = async (WarehouseTypeId: number) => {
    try {
        const { data } = await http.get(`/v1/ProductInventory/GetProductInventoriesExcelReport?WarehouseTypeId=${WarehouseTypeId}`)
        return data
    } catch (error: any) {
        return error.response;
    }
}

export {
    uploadProductInventories,
    exportProductInventories
}