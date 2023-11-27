import * as Yup from "yup";

interface ConfirmValidation {
    driverName: string;
    shippingName: string;
}

export const confirmValidation = Yup.object<ConfirmValidation>({
    // driverName: Yup.string().when("shippingName", {
    //     is: (shippingName: any) => !!shippingName && shippingName.length > 0,
    //     then: Yup.string().required("فیلد الزامی می باشد"),
    //     otherwise: Yup.string(),
    // }),
    // shippingName: Yup.string().when("driverName", {
    //     test: function (driverName: string | undefined) {
    //         return !!driverName && driverName.length > 0;
    //     },
    //     then: Yup.string().required("فیلد الزامی می باشد"),
    //     otherwise: Yup.string(),
    // }),
});
