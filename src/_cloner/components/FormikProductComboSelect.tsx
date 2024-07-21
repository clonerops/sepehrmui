import FormikComboBox from "./FormikComboBox";
import { useRetrieveProducts } from "../../app/modules/products/_hooks";
import { dropdownProduct } from "../helpers/Dropdowns";


const FormikProduct = (props: any) => {
    const { data } = useRetrieveProducts()
    return <FormikComboBox
        disabled={props.disabled}
        options={dropdownProduct(data?.data)}
        {...props} />;
};

export default FormikProduct;
