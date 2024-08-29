import * as Yup from "yup";

export const createValiadtion = Yup.object({
    firstName: Yup.string().required("فیلد اجباری می باشد"),
    lastName: Yup.string().required("فیلد اجباری می باشد"),
    nationalId: Yup.string()
    .max(10, "کد ملی باید 10 رقمی باشد")
    .min(10, "کد ملی باید 10 رقمی باشد")
    .required("فیلد اجباری می باشد"),
});

