import * as Yup from "yup";

const roleCreateValidation = Yup.object().shape({
    name: Yup.string().required("نام نقش الزامی است"),

});

export { roleCreateValidation };
