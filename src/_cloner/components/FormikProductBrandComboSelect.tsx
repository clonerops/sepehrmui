import React from "react";
import FormikComboBox from "./FormikComboBox";
import { useRetrieveProducts } from "../../app/modules/product/core/_hooks";
import { dropdownProductBrand } from "../../app/modules/generic/_functions";
import { useGetProductBrands } from "../../app/modules/generic/productBrands/_hooks";


const FormikProductBrand = (props: any) => {
    const { data } = useGetProductBrands()

    return <FormikComboBox
        disabled={props.disabled}
        options={dropdownProductBrand(data?.data)}
        {...props} />;
};

export default FormikProductBrand;
