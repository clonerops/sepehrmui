import * as Yup from "yup";

const createProductValidations = Yup.object().shape({
    mobileNo: Yup.string()
        .required("فیلد الزامی است"),
    slandererDescription: Yup.string()
        .required("فیلد الزامی است"),
});

export {
    createProductValidations
}