import { useGetPurchasePaymentTypes } from '../../app/modules/generic/_hooks';

import { dropdownPurchaseRentPaymentType } from '../../app/modules/managment-order/helpers/dropdowns';

import FormikSelect from './FormikSelect'


const FormikPurchasePaymentType = (props: any) => {
    const { data: payment, isLoading } = useGetPurchasePaymentTypes();

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }
console.log("dropdownPurchaseRentPaymentType(payment)", dropdownPurchaseRentPaymentType(payment))
    return (
        <FormikSelect
            options={dropdownPurchaseRentPaymentType(payment)}
            {...props} />
    )
}

export default FormikPurchasePaymentType