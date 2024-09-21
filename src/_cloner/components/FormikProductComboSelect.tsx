import FormikComboBox from "./FormikComboBox";
import { useGetProductList } from "../../app/modules/products/_hooks";
import { dropdownProduct } from "../helpers/dropdowns";
import { useEffect } from "react";
import { useAuth } from "../helpers/checkUserPermissions";


const FormikProduct = (props: any) => {
    // const { data } = useRetrieveProducts()
    const productTools = useGetProductList()
    useEffect(() => {
        const filter = {}
        productTools.mutate(filter)
    }, [])
    return <FormikComboBox
        disabled={props.disabled}
        options={dropdownProduct(productTools?.data?.data)}
        {...props} />;
};

export default FormikProduct;
