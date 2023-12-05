import * as Yup from "yup";

const submitCargoValidation = Yup.object().shape({
    driverName: Yup.string().required("فیلد راننده الزامی می باشد"),
    carPlaque: Yup.string().required("فیلد پلاک خودروبر الزامی می باشد"),

});

export { submitCargoValidation };
