import { http } from "../../../_cloner/helpers/axiosConfig"
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IWarehouse, IWarehouseFilter } from "./_models";

const getWarehouses = async () => {
    try {

        const { data } = await http.get('/v1/Warehouse')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getWarehousesByFilter = async (filter: IWarehouseFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/Warehouse', filter)}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}


const postWarehouses = async (formData: IWarehouse) => {
    try {

        const { data } = await http.post('/v1/Warehouse', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getWarehouse = async (id: number) => {
    try {

        const { data } = await http.get(`/v1/Warehouse/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateWarehouses = async (formData: IWarehouse) => {
    try {

        const { data } = await http.put(`/v1/Warehouse/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteWarehouse = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/Warehouse/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getWarehouses,
    postWarehouses,
    getWarehouse,
    updateWarehouses,
    deleteWarehouse,
    getWarehousesByFilter
}