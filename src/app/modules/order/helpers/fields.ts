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
        {
            label: "انبار",
            name: "warehouseId",
            type: "warehouse",
        },
        { label: "کالا", name: "productName", type: "product" },
    ],
    [
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
        {
            label: "",
            name: "",
            type: "add",
        },
    ],
];
export const orderFieldsIsBuy: FieldType[][] = [
    [
        {
            label: "انبار",
            name: "warehouseId",
            type: "warehouse",
        },
        { label: "کالا", name: "productName", type: "product" },
        // {
        //     label: "مقدار",
        //     name: "proximateAmount",
        //     type: "proximateAmount",
        // },
        // {
        //     label: "تعداد (واحدفرعی)",
        //     name: "proximateSubUnit",
        //     type: "proximateSubUnit",
        // },
    ],
    [
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
        {
            label: "",
            name: "",
            type: "add",
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
    [
        { label: "توضیحات", name: "description", type: "description" },
    ]
];

