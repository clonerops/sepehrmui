import * as Yup from "yup";

const evacuationValidation = Yup.object().shape({
    driverName: Yup.string().required("نام و نام خانوادگی الزامی است"),
    // shippingName: Yup.string().required("باربری الزامی است"),
    // carPlaque: Yup.string().required("پلاک خودرو الزامی است"),
    // vehicleTypeId: Yup.mixed().required("نوع خودرو الزامی است"),
    driverMobile: Yup.number().required("شماره همراه راننده الزامی است"),
    // deliverDate: Yup.string().required("تاریخ تحویل الزامی است"),
    fareAmount: Yup.string().required("مبلغ کرایه الزامی است"),
    // unloadingPlaceAddress: Yup.string().required("آدرس محل تخلیه الزامی است"),
    driverAccountNo: Yup.string().required("شماره حساب راننده الزامی است"),
    // driverCreditCardNo: Yup.string().required("شماره کارت راننده الزامی است"),
    // otherAmount: Yup.string().required("مقدار سایر هزینه ها الزامی است"),
});

export { evacuationValidation };
