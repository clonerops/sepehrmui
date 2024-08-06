
import { useGetCustomerLabels } from '../../app/modules/customerLabel/_hooks';
import { dropdownCustomerLabel } from '../helpers/dropdowns';
import FormikSelectCheckbox from './FormikSelectCheckbox';

const FormikCustomerLabelMultiplie = (props: any) => {
    const { data: customerLabel } = useGetCustomerLabels();
    
    return (
        <FormikSelectCheckbox
        options={dropdownCustomerLabel(customerLabel?.data)}
        {...props} />
    )
}

export default FormikCustomerLabelMultiplie