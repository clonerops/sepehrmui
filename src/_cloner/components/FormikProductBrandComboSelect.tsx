import FormikComboBox from "./FormikComboBox";
import { useGetProductBrands } from "../../app/modules/productBrands/_hooks";
import { dropdownProductBrand } from "../helpers/dropdowns";


const FormikProductBrand = (props: any) => {
    const { data } = useGetProductBrands()

    return <FormikComboBox
        disabled={props.disabled}
        options={dropdownProductBrand(data?.data)}
        {...props} />;
};

export default FormikProductBrand;
