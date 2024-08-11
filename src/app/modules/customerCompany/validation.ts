import * as Yup from "yup";

export const customerCompanyValidation = Yup.object({
    companyName: Yup.string().required("فیلد اجباری می باشد"),
    customerId: Yup.mixed().required("فیلد اجباری می باشد"),
    economicId: Yup.string().required("فیلد اجباری می باشد"),
    postalCode: Yup.string().required("فیلد اجباری می باشد"),
    nationalId: Yup.string().required("فیلد اجباری می باشد"),
    tel1: Yup.string().required("فیلد اجباری می باشد"),
    tel2: Yup.string().required("فیلد اجباری می باشد"),
    address: Yup.string().required("فیلد اجباری می باشد"),
});

