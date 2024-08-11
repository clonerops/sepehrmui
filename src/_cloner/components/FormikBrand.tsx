import { useGetBrands } from "../../app/modules/brands/_hooks";
import { IBrand } from "../../app/modules/brands/_models";
import { dropdownBrand } from "../helpers/dropdowns";
import FormikComboBox from "./FormikComboBox";

const FormikBrand = (props: any) => {
    const { data: brands } = useGetBrands();
    return (
        <FormikComboBox
            options={dropdownBrand(brands?.data.filter((i: IBrand) => i.isActive))}
            {...props}
        />
    );
};

export default FormikBrand;
