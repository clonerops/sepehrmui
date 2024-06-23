import * as Yup from "yup";

const submitCargoValidation = Yup.object().shape({
    vehicleTypeId: Yup.string().required("فیلد الزامی می باشد"),
    // driverMobile: Yup.string().required("فیلد الزامی می باشد"),
    deliveryDate: Yup.string().required("فیلد الزامی می باشد"),
    // fareAmount: Yup.string().required("فیلد الزامی می باشد"),

});

export { submitCargoValidation };
