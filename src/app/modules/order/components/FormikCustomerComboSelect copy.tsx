import FormikComboBox from "../../../../_cloner/components/FormikComboBox";
import { dropdownProductIntegrated } from "../../generic/_functions";
import { useRetrieveProducts } from "../../product/core/_hooks";


const FormikCustomerComboSelect = (props: any) => {
    const { data } = useRetrieveProducts()
    return <FormikComboBox options={dropdownProductIntegrated(data?.data)} {...props} />;
};

export default FormikCustomerComboSelect;
