import * as Yup from "yup";

const createProductValidations = Yup.object().shape({
    productName: Yup.string()
        .required("نام محصول الزامی است"),
    productSize: Yup.number().typeError("مقدار باید عددی باشد")
        .required("سایز محصول الزامی است"),
    approximateWeight: Yup.number().typeError("مقدار باید عددی باشد")
        .required("افزودن وزن تقریبی الزامی است"),
    numberInPackage: Yup.number().typeError("مقدار باید عددی باشد")
        .required("افزودن تعداد در بسته الزامی است"),
});

export {
    createProductValidations
}