import React from "react";
import FormikComboBox from "./FormikComboBox";
import { dropdownProductIntegrated } from "../../app/modules/generic/_functions";
import { useRetrieveProducts } from "../../app/modules/generic/products/_hooks";


const FormikProduct = (props: any) => {
    const { data } = useRetrieveProducts()
    return <FormikComboBox
        disabled={props.disabled}
        options={dropdownProductIntegrated(data?.data)}
        {...props} />;
};

export default FormikProduct;
