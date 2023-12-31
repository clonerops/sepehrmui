import * as Yup from "yup";

const orderValidation = Yup.object().shape({
    customerId: Yup.mixed().required("نام مشتری الزامی است"),
    // warehouseId: Yup.string().required("انبار الزامی است"),
    // productIntegratedName: Yup.mixed().required("کالا الزامی است"),
    // productName: Yup.mixed().required("کالا الزامی است"),
    // settlementDate: Yup.string().required("تاریخ تسویه الزامی است"),
    exitType: Yup.string().required("نوع خروج الزامی است"),
    orderSendTypeId: Yup.string().required("نوع ارسال الزامی است"),
    paymentTypeId: Yup.string().required("نوع پرداخت الزامی است"),
    invoiceTypeId: Yup.string().required("نوع فاکتور الزامی است"),
    // rowId: Yup.number().typeError("مقدار باید عددی باشد").required("ردیف فروش الزامی است"),
    rowId: Yup.number().typeError("مقدار باید عددی باشد"),
    // price: Yup.number().typeError("مقدار باید عددی باشد").required("قیمت الزامی است"),
    // price: Yup.number().typeError("مقدار باید عددی باشد"),
    // proximateAmount: Yup.number().typeError("مقدار باید عددی باشد").required("مقدار الزامی است"),
    proximateAmount: Yup.mixed(),

});

export { orderValidation };
