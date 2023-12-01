import { useGetPaymentTypes } from '../../app/modules/generic/_hooks';

import { dropdownRentPaymentType } from '../../app/modules/order/helpers/dropdowns';

import FormikSelect from './FormikSelect'


const FormikPaymentType = (props: any) => {
    const { data: payment } = useGetPaymentTypes();

    return (
        <FormikSelect
            options={dropdownRentPaymentType(payment)}
            {...props} />
    )
}

export default FormikPaymentType