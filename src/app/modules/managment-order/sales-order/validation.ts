import * as Yup from "yup";

const saleOrderValidation = Yup.object().shape({
    customerId: Yup.mixed().required("نام مشتری الزامی است"),
    orderExitTypeId: Yup.string().required("نوع خروج الزامی است"),
    orderSendTypeId: Yup.string().required("نوع ارسال الزامی است"),
    paymentTypeId: Yup.string().required("نوع پرداخت الزامی است"),
    invoiceTypeId: Yup.string().required("نوع فاکتور الزامی است"),
    deliverDate: Yup.string().required("تاریخ تحویل الزامی است"),
    rowId: Yup.number().typeError("مقدار باید عددی باشد"),
    proximateAmount: Yup.mixed(),

});

export { saleOrderValidation };
