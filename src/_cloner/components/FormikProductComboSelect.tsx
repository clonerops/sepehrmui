import FormikComboBox from "./FormikComboBox";
import { useGetProductList } from "../../app/modules/products/_hooks";
import { dropdownProduct } from "../helpers/dropdowns";
import { useEffect } from "react";
import { useAuth } from "../helpers/checkUserPermissions";


const FormikProduct = (props: any) => {
    const {hasPermission} = useAuth()
    // const { data } = useRetrieveProducts()
    const productTools = useGetProductList(hasPermission("GetAllProducts"))
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
