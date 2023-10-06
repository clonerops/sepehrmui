import * as Yup from "yup";

const createProductValidations = Yup.object().shape({
    productName: Yup.string()
        .required("نام کالا الزامی است"),
    productSize: Yup.string()
        .required("سایز کالا الزامی است"),
    approximateWeight: Yup.number().typeError("مقدار باید عددی باشد")
        .required("افزودن وزن الزامی است"),
    productTypeId: Yup.mixed()
        .required("نوع کالا الزامی است"),
});

export {
    createProductValidations
}