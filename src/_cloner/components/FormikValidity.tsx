import FormikSelect from './FormikSelect'
import { convertValueLabelCustomerValidaty } from '../../app/modules/customer/helpers/convertValueLabel';
import { useGetCustomerValidities } from '../../app/modules/generic/_hooks';

const FormikValidity = (props: any) => {
    const validityTools = useGetCustomerValidities();
    return (
        <FormikSelect
        options={convertValueLabelCustomerValidaty(validityTools?.data)}
            {...props} />
    )
}

export default FormikValidity