import { http } from "../../../../_cloner/helpers/axiosConfig"
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IWarehouseFilter } from "../warehouse/_models";
import { ICustomerWarehouse } from "./_models";

const getCustomerWarehouses = async () => {
    try {

        const { data } = await http.get('/v1/Warehouse')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getCustomerWarehousesByFilter = async (filter: IWarehouseFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/Warehouse', filter)}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}


const postCustomerWarehouses = async (formData: ICustomerWarehouse) => {
    try {

        const { data } = await http.post('/v1/Warehouse', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getCustomerWarehouse = async (id: number) => {
    try {

        const { data } = await http.get(`/v1/Warehouse/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateCustomerWarehouses = async (formData: ICustomerWarehouse) => {
    try {

        const { data } = await http.put(`/v1/Warehouse/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteCustomerWarehouse = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/Warehouse/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getCustomerWarehouses,
    postCustomerWarehouses,
    getCustomerWarehouse,
    updateCustomerWarehouses,
    deleteCustomerWarehouse,
    getCustomerWarehousesByFilter
}