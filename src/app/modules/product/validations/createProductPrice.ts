import * as Yup from "yup";

const createProductPriceValidations = Yup.object().shape({
    price: Yup.string()
        .required("قیمت الزامی است"),
    productId: Yup.mixed()
        .required(" کالا الزامی است"),
    productBrandId: Yup.string()
        .required("برند الزامی است"),
});

export {
    createProductPriceValidations
}