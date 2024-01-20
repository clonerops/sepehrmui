import React from "react";
import FormikComboBox from "./FormikComboBox";
import { useRetrieveProducts } from "../../app/modules/product/core/_hooks";
import { dropdownProductIntegrated } from "../../app/modules/generic/_functions";


const FormikProduct = (props: any) => {
    const { data } = useRetrieveProducts()
    return <FormikComboBox
        disabled={props.disabled}
        options={dropdownProductIntegrated(data?.data)}
        {...props} />;
};

export default FormikProduct;
