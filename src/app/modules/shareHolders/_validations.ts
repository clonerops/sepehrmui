import * as Yup from "yup";

const createShareHolderValidations = Yup.object().shape({
    firstName: Yup.string()
        .required("نام سهامدار الزامی است"),
    lastName: Yup.string()
        .required("نام خانوادگی سهامدار الزامی است"),
    fatherName: Yup.string()
        .required("نام پدر الزامی است"),
    mobileNo: Yup.string()
        .required("شماره موبایل الزامی است"),
});

export {
    createShareHolderValidations
}