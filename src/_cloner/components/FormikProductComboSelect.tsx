import FormikComboBox from "./FormikComboBox";
import { dropdownProduct } from "../../app/modules/generic/_functions";
import { useRetrieveProducts } from "../../app/modules/generic/products/_hooks";


const FormikProduct = (props: any) => {
    const { data } = useRetrieveProducts()
    return <FormikComboBox
        disabled={props.disabled}
        options={dropdownProduct(data?.data)}
        {...props} />;
};

export default FormikProduct;
