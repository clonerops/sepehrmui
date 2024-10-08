import { useGetCustomerLabels } from "../../app/modules/customerLabel/_hooks";
import { dropdownCustomerLabel } from "../helpers/dropdowns";
import FormikComboBox from "./FormikComboBox";

const FormikCustomerLabel = (props: any) => {
    const { data: customerLabels } = useGetCustomerLabels();

    return (
        <FormikComboBox
            options={dropdownCustomerLabel(props.data ? props.data : customerLabels?.data)}
            disabled={props.disabeld}
            {...props}
        />
    );
};

export default FormikCustomerLabel;
