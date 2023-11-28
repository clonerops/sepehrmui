import * as Yup from "yup";

interface ConfirmValidation {
    driverName: string;
    shippingName: string;
}

export const confirmValidation = Yup.object<ConfirmValidation>({
    driverName: Yup.string().required("فیلد الزامی می باشد"),
    carPlaque: Yup.string().required("فیلد الزامی می باشد")
});
