import * as Yup from "yup";

const billlandingValidation = Yup.object().shape({
    originWarehouseId: Yup.mixed().required("انبار مبدا الزامی است"),
    destinationWarehouseId: Yup.mixed().required("انبار مقصد الزامی است"),
    driverName: Yup.string().required("راننده الزامی است"),
    shippingName: Yup.string().required("باربری الزامی است"),
    carPlaque: Yup.string().required("پلاک خودرو الزامی است"),
    vehicleTypeId: Yup.string().required("نوع خودرو الزامی است"),
    driverMobile: Yup.string().required("موبایل الزامی است"),
    deliverDate: Yup.string().required("تاریخ تحویل الزامی است"),
    fareAmount: Yup.string().required("کرایه الزامی است"),
});

export { billlandingValidation };
