import * as Yup from "yup";

const createSupplierValidations = Yup.object().shape({
    customerId: Yup.string().required("فیلد مشتری الزامی می باشد"),
    productId: Yup.string().required("فیلد کالا الزامی می باشد"),
    price: Yup.number()
        .typeError("قیمت باید مقدار عددی باشد")
        .required("نام کالا الزامی است"),
});

export {
    createSupplierValidations
}