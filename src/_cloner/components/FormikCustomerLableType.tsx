
import { useGetCustomerLabelTypes } from '../../app/modules/generic/_hooks';
import { dropdownCustomerLabelType } from '../helpers/dropdowns';

import FormikSelect from './FormikSelect'


const FormikCustomerLabelType = (props: any) => {
    const { data: labelTypes, isLoading } = useGetCustomerLabelTypes();

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }

    return (
        <FormikSelect
            options={dropdownCustomerLabelType(labelTypes)}
            {...props} />
    )
}

export default FormikCustomerLabelType