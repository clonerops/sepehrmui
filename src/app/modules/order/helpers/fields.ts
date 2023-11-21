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
            name: "price",
            // name: "price",
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
            name: "price",
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
        { label: "نوع ثبت", name: "isTemporary", type: "temporary" },
    ],
    [
        { label: "توضیحات", name: "description", type: "description" },
    ]
];

export const orderFieldsConfirm: FieldType[][] = [
    [

        { label: "کالا", name: "productName", type: "disabled" },
        {
            label: "مقدار",
            name: "proximateAmount",
            type: "disabled",
        },
        {
            label: "قیمت",
            name: "price",
            type: "disabled",
        },
        {
            label: "",
            name: "",
            type: "hidden",
        },
    ],
    [
        { label: "کالا رسمی", name: "productNameReplace", type: "product" },
        {
            label: "مقدار",
            name: "proximateAmountReplace",
            type: "input",
        },
        {
            label: "قیمت",
            name: "priceReplace",
            type: "price",
        },
        {
            label: "",
            name: "",
            type: "add",
        },
    ],
];