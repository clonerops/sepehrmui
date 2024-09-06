import * as Yup from "yup";

const createProductPriceValidations = Yup.object().shape({
    price: Yup.string()
        .required("قیمت الزامی است"),
    productBrandId: Yup.mixed()
        .required("برند الزامی است"),
});

export {
    createProductPriceValidations
}