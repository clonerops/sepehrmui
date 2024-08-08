import { useEffect } from "react";
import { useGetCustomerLabelsByMutation } from "../../app/modules/customerLabel/_hooks";
import { dropdownCustomerLabel } from "../helpers/dropdowns";
import FormikComboBox from "./FormikComboBox";

const FormikCustomerLabel = (props: any) => {
    // const { data: customerLabels } = useGetCustomerLabels();
    const tools = useGetCustomerLabelsByMutation()
    
    useEffect(() => {
        if(props.filter) {
            tools.mutate(props.filter || {})
        } else {
            tools.mutate({})
        }
    }, [])

    return (
        <FormikComboBox
            options={dropdownCustomerLabel(tools?.data?.data)}
            disabled={props.disabeld}
            {...props}
        />
    );
};

export default FormikCustomerLabel;
