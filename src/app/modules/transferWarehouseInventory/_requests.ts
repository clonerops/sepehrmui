import { http } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";

const getTransferWarehouseInventoryLists = async () => {
    try {

        const { data } = await http.get('/v1/TransferWarehouseInventory')
        return data

    } catch (error: any) {
        return error.response;
    }
}

const getTransferWarehouseInventoryListsFiltered = async (filter: any) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/TransferWarehouseInventory', filter)}`)
        return data

    } catch (error: any) {
        return error.response;
    }
}


const postTransferWarehouseInventory = async (formData: any) => {
    try {

        const { data } = await http.post('/v1/TransferWarehouseInventory', JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response;
    }
}

const getTransferWarehouseInventoryById = async (id: any) => {
    try {

        const { data } = await http.get(`/v1/TransferWarehouseInventory/${id}`)
        return data

    } catch (error: any) {
        return error.response;
    }
}

const updateTransferWarehouseInventory = async (formData: any) => {
    try {

        const { data } = await http.post(`/v1/TransferWarehouseInventory/${formData.id}`, JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response;
    }
}

export {
    getTransferWarehouseInventoryLists,
    getTransferWarehouseInventoryListsFiltered,
    postTransferWarehouseInventory,
    getTransferWarehouseInventoryById,
    updateTransferWarehouseInventory
}