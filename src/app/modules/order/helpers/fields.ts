import { FieldType } from "../../../../_cloner/components/globalTypes";

export const mainFields: FieldType[][] = [
    [
        { label: "مشتری", name: "customerId", type: "customer" },
        {
            label: "تاریخ تسویه",
            name: "settlementDate",
            type: "settlementDate",
        },
    ],
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
        {
            label: "نوع پرداخت",
            name: "paymentTypeId",
            type: "paymentTypeId",
        },
        { label: "نوع خروج", name: "exitType", type: "exitType" },
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
            type: "input",
        },
    ],
    [
        {
            label: "قیمت",
            name: "price",
            type: "input",
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
            type: "input",
        },
    ],
    [
        {
            label: "قیمت",
            name: "price",
            type: "input",
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
            name: "purchaserCustomerId",
            type: "purchaserCustomer",
        },
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
    ]
];
