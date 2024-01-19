import { FieldType } from "../../../../_cloner/components/globalTypes";

export const customerFields: FieldType[][] = [
    [
        { label: "مشتری", name: "customerId", type: "customer" }
    ],
];
export const sellerFields: FieldType[][] = [
    [
        { label: "فروشنده", name: "sellerId", type: "seller" }
    ],
];

export const orderFieldWhenWarehouseIsMain: FieldType[][] = [
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
export const orderFieldWhenNotWarehouseMain: FieldType[][] = [
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
        {
            label: "قیمت خرید",
            name: "purchasePrice",
            type: "price",
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

export const saleOrderFieldConfirm: FieldType[][] = [
    [

        { label: "کالا", name: "productName", type: "disabled" },
        {
            label: "مقدار",
            name: "proximateAmount",
            type: "disabled",
        },
        {
            label: "قیمت",
            name: "productPrice",
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
            name: "productPriceReplace",
            type: "price",
        },
        {
            label: "",
            name: "",
            type: "add",
        },
    ],
]
