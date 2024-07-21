import { http } from "../../../_cloner/helpers/axiosConfig"
import { ICustomerWarehouse } from "./_models";

const getCustomerWarehouses = async () => {
    try {

        const { data } = await http.get('/v1/CustomerWarehouse')
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getCustomerWarehousesByProductId = async (productId: string) => {
    try {

        const { data } = await http.get(`/v1/CustomerWarehouse?ProductId=${productId}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}


const postCustomerWarehouses = async (formData: ICustomerWarehouse) => {
    try {

        const { data } = await http.post('/v1/Customer/AllocateCustomerWarehouses', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const getCustomerWarehouse = async (id: string) => {
    try {

        const { data } = await http.get(`/v1/CustomerWarehouse/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

const updateCustomerWarehouses = async (formData: ICustomerWarehouse) => {
    try {

        const { data } = await http.put(`/v1/CustomerWarehouse/${formData.id}`, JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}

const deleteCustomerWarehouse = async (id: number) => {
    try {

        const { data } = await http.delete(`/v1/CustomerWarehouse/${id}`)
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getCustomerWarehouses,
    getCustomerWarehousesByProductId,
    postCustomerWarehouses,
    getCustomerWarehouse,
    updateCustomerWarehouses,
    deleteCustomerWarehouse
}
