import { useGetPaymentTypes } from '../../app/modules/generic/_hooks';

import { dropdownRentPaymentType } from '../../app/modules/order/helpers/dropdowns';

import FormikSelect from './FormikSelect'


const FormikPaymentType = (props: any) => {
    const { data: payment, isLoading } = useGetPaymentTypes();

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }

    return (
        <FormikSelect
            options={dropdownRentPaymentType(payment)}
            {...props} />
    )
}

export default FormikPaymentType