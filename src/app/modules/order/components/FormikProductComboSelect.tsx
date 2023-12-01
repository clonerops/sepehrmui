import React from "react";
import FormikComboBox from "../../../../_cloner/components/FormikComboBox";
import { dropdownProductIntegrated } from "../../generic/_functions";
import { useRetrieveProducts } from "../../product/core/_hooks";


const FormikProduct = (props: any) => {
    const { data } = useRetrieveProducts()
    return <FormikComboBox
        disabled={props.disabled}
        options={dropdownProductIntegrated(data?.data)}
        {...props} />;
};

export default FormikProduct;
