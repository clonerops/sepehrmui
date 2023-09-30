import { useEffect } from 'react'
import FormikComboBox from "../../../../_cloner/components/FormikComboBox";
import { dropdownProductIntegrated } from "../../generic/_functions";
import { useRetrieveProducts } from "../../product/core/_hooks";


const FormikProductComboSelect = (props: any) => {
    const { data } = useRetrieveProducts()

    useEffect(() => {
        props.setSearchQuery(props.productIntegratedName)
    }, [props.productIntegratedName])
    return <FormikComboBox options={dropdownProductIntegrated(data?.data)} {...props} />;
};

export default FormikProductComboSelect;
