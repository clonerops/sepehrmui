import FormikSelect from './FormikSelect'

import { useGetInvoiceType } from '../../app/modules/generic/_hooks';
import { dropdownInvoiceType } from '../helpers/dropdowns';
import { useAuth } from '../helpers/checkUserPermissions';

const FormikInvoiceType = (props: any) => {
    const { data: factor } = useGetInvoiceType();

    return (
        <FormikSelect
            options={dropdownInvoiceType(factor)}
            {...props} />
    )
}

export default FormikInvoiceType