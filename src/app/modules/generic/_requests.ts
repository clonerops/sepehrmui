import { http } from "../../../_cloner/helpers/axiosConfig"

const getSendTypes = async () => {
    const { data } = await http.get('/v1/GenericApi/GetOrderSendTypes')
    return data
}
const getPaymentTypes = async () => {
    const { data } = await http.get('/v1/GenericApi/GetRentPaymentTypes')
    return data
}
const getPurchaseInvoice = async () => {
    const { data } = await http.get('/v1/GenericApi/GetPurchaseInvoices')
    return data
}
const getInvoiceType = async () => {
    const { data } = await http.get('/v1/GenericApi/GetInvoiceTypes')
    return data
}
const getCustomerValidities = async () => {
    const { data } = await http.get('/v1/GenericApi/GetCustomerValidities')
    return data
}
const getWarehouseTypes = async () => {
    const { data } = await http.get('/v1/GenericApi/GetWarehouseTypes')
    return data
}
const getWarehouses = async () => {
    const { data } = await http.get('/v1/GenericApi/GetWarehouses')
    return data
}
const getReceivePaymentSources = async () => {
    const { data } = await http.get('/v1/GenericApi/GetReceivePaymentSources')
    return data
}
const getServices = async () => {
    const { data } = await http.get('/v1/GenericApi/GetServices')
    return data
}

export {
    getSendTypes,
    getPaymentTypes,
    getPurchaseInvoice,
    getInvoiceType,
    getCustomerValidities,
    getWarehouseTypes,
    getWarehouses,
    getReceivePaymentSources,
    getServices
}