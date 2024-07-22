import { http, httpFormData } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IProductFilters } from "../products/_models";
import { IIncreaseInventory } from "./_models";

const uploadProductInventories = async (formData: any) => {
    try {
        const { data } = await httpFormData.post(`/v${1}/ProductInventory/UploadFilePost`, formData);
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

const increaseInventory = async (formData: IIncreaseInventory) => {
    try {
        const { data } = await http.post(`/v${1}/ProductInventory`, formData);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const exportProductInventoriesHistory = async (filter: IProductFilters) => {
    try {
        const {data} = await http.get(`${generateURLQueryParam('/v1/ProductInventory/GetInventoryUploadInstanceByHistory', filter)}`)
        return data
    } catch (error: any) {
        return error.response;
    }
}


export {
    uploadProductInventories,
    exportProductInventories,
    increaseInventory,
    exportProductInventoriesHistory
}