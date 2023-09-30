import * as Yup from "yup";

const createSupplierValidations = Yup.object().shape({
    customerId: Yup.string().required("فیلد مشتری الزامی می باشد"),
    productId: Yup.string().required("فیلد محصول الزامی می باشد"),
    price: Yup.number()
        .typeError("قیمت باید مقدار عددی باشد")
        .required("نام محصول الزامی است"),
});

export {
    createSupplierValidations
}