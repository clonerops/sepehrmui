import FormikSelect from './FormikSelect'

import { dropdownInvoiceType } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetInvoiceType } from '../../app/modules/generic/_hooks';

const FormikInvoiceType = (props: any) => {
    const { data: factor } = useGetInvoiceType();

    return (
        <FormikSelect
            options={dropdownInvoiceType(factor)}
            {...props} />
    )
}

export default FormikInvoiceType