import { http } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IApproveInvoice, IApprovePurchaserInvoice, IPurchaserOrder, IPurchaserTransferBetweenWarehouse, ISalesOrder } from "./_models";

// Sales Order
const createOrder = async (formData: ISalesOrder) => {
    try {
        const { data } = await http.post(`/v1/Order`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}
const updateOrder = async (formData: ISalesOrder) => {
    try {
        const { data } = await http.put(`/v1/Order/${formData.id}`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const retrieveOrders = async (formData: { pageNumber?: number; pageSize?: number; InvoiceTypeId?: number[] }) => {
    const filter = {
        pageNumber: formData.pageNumber,
        pageSize: formData.pageSize,
        InvoiceTypeId: formData.InvoiceTypeId
      };
    
    try {
        const { data } = await http.get(`${generateURLQueryParam("/v1/Order", filter)}`)
        return data
    } catch (error: any) {
        return error.response
    }
}


const retrieveOrdersMutation = async (formData: { pageNumber?: number; pageSize?: number; InvoiceTypeId?: number[]; OrderStatusId?: number }) => {
    const filter = {
        pageNumber: formData.pageNumber,
        pageSize: formData.pageSize,
        InvoiceTypeId: formData.InvoiceTypeId,
        OrderStatusId: formData.OrderStatusId,
      };

    try {
        const { data } = await http.get(`${generateURLQueryParam("/v1/Order", filter)}`)
        return data
    } catch (error: any) {
        return error.response
    }
}
const retrieveOrder = async (id: string | undefined) => {
    try {
        const { data } = await http.get(`/v1/Order/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const confirmOrder = async (id: string) => {
    try {
        const { data } = await http.put(`/v1/Order/ConfirmOrder/${id}`, JSON.stringify({orderId: id}))
        return data
    } catch (error: any) {
        return error.response
    }
}
const approveInvoiceType = async (formData: IApproveInvoice) => {
    try {
        const { data } = await http.put(`/v1/Order/ApproveInvoiceType`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const getOrderDetailByCode = async(orderCode: number) => {
    try {
        const { data } = await http.get(`/v1/Order/GetOrderInfo/${orderCode}`)
        return data
    } catch (error: any) {
        return error.response
    }

}

// Purchaser Order
const createPurchaserOrder = async (formData: IPurchaserOrder) => {
    try {
        const { data } = await http.post(`/v1/PurchaseOrder`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const retrievePurchaserOrders = async (formData: { pageNumber?: number; pageSize?: number; InvoiceTypeId?: number[] }) => {
    const filter = {
        pageNumber: formData.pageNumber,
        pageSize: formData.pageSize,
        InvoiceTypeId: formData.InvoiceTypeId
      };
    
    try {
        const { data } = await http.get(`${generateURLQueryParam("/v1/PurchaseOrder", filter)}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const retrievePurchaserOrder = async (id: string | undefined) => {
    try {
        const { data } = await http.get(`/v1/PurchaseOrder/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const retrievePurchaserOrdersMutation = async (formData: { pageNumber?: number; pageSize?: number; InvoiceTypeId?: number[]; OrderStatusId?: number }) => {
    const filter = {
        pageNumber: formData.pageNumber,
        pageSize: formData.pageSize,
        InvoiceTypeId: formData.InvoiceTypeId,
        OrderStatusId: formData.OrderStatusId,
      };

    try {
        const { data } = await http.get(`${generateURLQueryParam("/v1/PurchaseOrder", filter)}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const approvePurchaserInvoiceType = async (formData: IApprovePurchaserInvoice) => {
    try {
        const { data } = await http.post(`/v1/PurchaseOrder/ApprovePurchaseOrder`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const getPurchaserOrderDetailByCode = async(orderCode: number) => {
    try {
        const { data } = await http.get(`/v1/PurchaseOrder/GetPurchaseOrderInfo/${orderCode}`)
        return data
    } catch (error: any) {
        return error.response
    }

}

const updatePurchaserOrder = async (formData: IPurchaserOrder) => {
    try {
        const { data } = await http.put(`/v1/PurchaseOrder/${formData.id}`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}


const purchaseOrderTransfer = async (formData: IPurchaserTransferBetweenWarehouse) => {
    try {

        const { data } = await http.post('/v1/PurchaseOrder/PurchaseOrderTransfer', JSON.stringify(formData))
        return data;

    } catch (error: any) {
        return error.response
    }
}



export {
    // Sales Order
    createOrder,
    updateOrder,
    retrieveOrders,
    retrieveOrder,
    confirmOrder,
    approveInvoiceType,
    retrieveOrdersMutation,
    getOrderDetailByCode,
    // Purchaser Order
    createPurchaserOrder,
    retrievePurchaserOrders,
    retrievePurchaserOrder,
    retrievePurchaserOrdersMutation,
    approvePurchaserInvoiceType,
    getPurchaserOrderDetailByCode,
    updatePurchaserOrder,
    purchaseOrderTransfer
}