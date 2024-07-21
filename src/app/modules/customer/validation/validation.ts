import * as Yup from "yup";

export const createValiadtion = Yup.object({
    firstName: Yup.string().required("فیلد اجباری می باشد"),
    lastName: Yup.string().required("فیلد اجباری می باشد"),
    nationalId: Yup.number()
    .typeError("مقدار باید عددی باشد")
    .max(10, "کد ملی باید 10 رقمی باشد")
    .min(10, "کد ملی باید 10 رقمی باشد")
    .required("فیلد اجباری می باشد"),
    mobile: Yup.string()
    .max(11, "موبایل باید 11 رقمی باشد")
    .min(11, "موبایل باید 11 رقمی باشد")
    .matches(/^09\d{9}$/, "موبایل باید 11 رقمی و با 09 شروع شود")
    .required("فیلد اجباری می باشد"),
    tel1: Yup.string().required("فیلد اجباری می باشد"),
    representative: Yup.string().required("فیلد اجباری می باشد"),
});

