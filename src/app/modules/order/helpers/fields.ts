import { FieldType } from "../../../../_cloner/components/globalTypes";

export const customerFields: FieldType[][] = [
    [{ label: "مشتری", name: "customerId", type: "customer" }],
];
export const settlementFields: FieldType[][] = [
    [
        {
            label: "تاریخ تسویه",
            name: "settlementDate",
            type: "settlementDate",
        },
    ],
];
export const orderFields: FieldType[][] = [
    [
        { label: "کالا", name: "productName", type: "product" },
        {
            label: "انبار",
            name: "warehouseId",
            type: "warehouses",
        },
        {
            label: "مقدار",
            name: "proximateAmount",
            type: "proximateAmount",
        },
        {
            label: "تعداد (واحدفرعی)",
            name: "proximateSubUnit",
            type: "proximateSubUnit",
        },
    ],
    [
        {
            label: "قیمت",
            // name: "price",
            name: "productPrice",
            type: "price",
        },
        {
            label: "توضیحات کالا",
            name: "productDesc",
            type: "input",
        },
        {
            label: "ردیف فروش",
            name: "rowId",
            type: "input",
        },
    ],
];
export const orderFieldsIsBuy: FieldType[][] = [
    [
        { label: "کالا", name: "productName", type: "product" },
        {
            label: "انبار",
            name: "warehouseId",
            type: "warehouses",
        },
        {
            label: "مقدار",
            name: "proximateAmount",
            type: "proximateAmount",
        },
        {
            label: "تعداد (واحدفرعی)",
            name: "proximateSubUnit",
            type: "proximateSubUnit",
        },
    ],
    [
        {
            label: "قیمت",
            // name: "price",
            name: "productPrice",
            type: "price",
        },
        {
            label: "توضیحات کالا",
            name: "productDesc",
            type: "input",
        },
        {
            label: "ردیف فروش",
            name: "rowId",
            type: "input",
        },
    ],
    [
        {
            label: "خرید از",
            name: "purchaserCustomerName",
            type: "purchaserCustomer",
        },
        // {
        //     label: "خرید از",
        //     name: "purchaserCustomerId",
        //     type: "purchaserCustomer",
        // },
        {
            label: "قیمت خرید",
            name: "buyPrice",
            type: "input",
        },
        {
            label: "نوع فاکتور خرید",
            name: "purchaseInvoiceTypeId",
            type: "purchaseInvoiceType",
        },
        {
            label: "تاریخ تسویه خرید",
            name: "purchaseSettlementDate",
            type: "date",
        },
    ],
];
export const orderTypesFields: FieldType[][] = [
    [
        {
            label: "نوع ارسال",
            name: "orderSendTypeId",
            type: "orderSendTypeId",
        },
        {
            label: "نوع فاکتور",
            name: "invoiceTypeId",
            type: "invoiceTypeId",
        },
    ],
    [
        {
            label: "نوع کرایه",
            name: "paymentTypeId",
            type: "paymentTypeId",
        },
        { label: "نوع خروج", name: "exitType", type: "exitType" },
    ],
];

