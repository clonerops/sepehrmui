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
const getProductTypes = async () => {
    const { data } = await http.get('/v1/GenericApi/GetProductTypes')
    return data
}
const getVehicleTypes = async () => {
    const { data } = await http.get('/v1/GenericApi/GetVehicleTypes')
    return data
}
const getTransferRemitanceStatus = async () => {
    const { data } = await http.get('/v1/GenericApi/GetAllTransferRemittanceStatus')
    return data
}
const getOfficialBank = async () => {
    const { data } = await http.get('/v1/GenericApi/GetAllBanks')
    return data
}
const getOrderExitTypes = async () => {
    const { data } = await http.get('/v1/GenericApi/GetOrderExitTypes')
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
    getServices,
    getProductTypes,
    getVehicleTypes,
    getTransferRemitanceStatus,
    getOfficialBank,
    getOrderExitTypes
}