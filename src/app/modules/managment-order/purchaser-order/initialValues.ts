export const saleOrderInitialValues = {

    customerId: "",
    description: "",
    exitType: 1,
    orderSendTypeId: 1,
    purchaseOrderSendTypeId: 1,
    paymentTypeId: 2,
    purchasePaymentTypeId: 2,
    customerOfficialName: "",
    customerOfficialCompanyId: 0,
    invoiceTypeId: "",
    freightName: "",
    isTemporary: 1,
    dischargePlaceAddress: "",
    freightDriverName: "",
    carPlaque: "",
    originWarehouseId: "",
    destinationWarehouseId: "",

    // order detail
    rowId: "",
    id: 0,
    productId: "",
    warehouseId: "",
    warehouseTypeId: "",
    proximateAmount: "",
    numberInPackage: "",
    price: "",
    purchasePrice: "",
    productSubUnitId: "",
    productSubUnitAmount: "",
    purchaseInvoiceTypeId: "",
    purchaserCustomerId: "",
    sellerCompanyRow: "",
    detailDescription: "",
    purchaseSettlementDate: "",
    cargoSendDate: "",
    orderTypeId: 1,

    // order payment
    orderPaymentId: "",
    orderPaymentAmount: 0,
    orderPaymentDate: "",
    orderPaymentDaysAfterExit: 0,
    orderPaymentType: 1,


    //order services
    orderServiceMainId: "",
    orderServiceId: "",
    orderServiceDescription: "",



    // searchOrderCode: "",

    // customerId: "",
    // customerID: "",
    
    // settlementDate: "",
    // // exitType: 1,
    // // orderSendTypeId: 1,
    // // paymentTypeId: 2,
    // exitType: 1,
    // orderSendTypeId: 1,
    // paymentTypeId: 2,
    // // isTemporary: "0",
    // isTemporary: 1,
    // invoiceTypeId: "",
    // customerOfficialName: "",
    // customerOfficialCompanyId: "",
    // // Order
    // rowId: "",
    // id: "",
    // warehouseId: "",
    // warehouseTypeId: "",
    // proximateAmount: "",
    // numberInPackage: "",
    // productDesc: "",
    // price: "",
    // cargoSendDate: "",
    // purchasePrice: "",
    // purchaseInvoiceTypeId: "",
    // purchaserCustomerId: "",
    // purchaseSettlementDate: "",
    // sellerCompanyRow: "",
    // // not Main
    // productName: "",
    // warehouseName: "",
    // proximateSubUnit: "",
    // mainUnit: "",
    // subUnit: "",
    // productSubUnitId: "",
    // productBrandId: "",
    // productBrandName: "",
    // purchaserCustomerName: ""
};

export const saleOrderEditInitialValues = {
    searchOrderCode: "",

    
    customerId: "",
    settlementDate: "",
    exitType: "",
    orderSendTypeId: "",
    paymentTypeId: "",
    isTemporary: "",
    invoiceTypeId: "",
    customerOfficialName: "",
    customerOfficialCompanyId: "",
    // Order
    rowId: "",
    id: "",
    warehouseId: "",
    warehouseTypeId: "",
    proximateAmount: "",
    numberInPackage: "",
    productDesc: "",
    price: "",
    cargoSendDate: "",
    purchasePrice: "",
    purchaseInvoiceTypeId: "",
    purchaserCustomerId: "",
    purchaseSettlementDate: "",
    sellerCompanyRow: "",
    // not Main
    productName: "",
    warehouseName: "",
    proximateSubUnit: "",
    mainUnit: "",
    subUnit: "",
    productSubUnitId: "",
    productBrandId: "",
    productBrandName: "",
    purchaserCustomerName: ""
};
export const orderPaymentValues = {
    amount: "0",
    number: "",
    settlement: ""
}
export const orderServiceValues = {
    orderId: "",
    serviceId: "",
    // description: "",
    serviceAmount: ""
}