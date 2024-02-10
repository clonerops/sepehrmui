import { http, httpFormData } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IProductFilters } from "../../product/core/_models";

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

const exportProductInventories = async (filter: IProductFilters) => {
    try {
        const {data} = await http.get(`${generateURLQueryParam('/v1/ProductInventory/GetProductInventoriesExcelReport', filter)}`)
        return data
    } catch (error: any) {
        return error.response;
    }
}

export {
    uploadProductInventories,
    exportProductInventories
}