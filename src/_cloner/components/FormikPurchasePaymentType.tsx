import { useGetPurchasePaymentTypes } from '../../app/modules/generic/_hooks';
import { useAuth } from '../helpers/checkUserPermissions';
import { dropdownPurchaseRentPaymentType } from '../helpers/dropdowns';

import FormikSelect from './FormikSelect'


const FormikPurchasePaymentType = (props: any) => {
    const { hasPermission } = useAuth()
    const { data: payment, isLoading } = useGetPurchasePaymentTypes(hasPermission("GetPurchaseFarePaymentTypes"));

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }
    return (
        <FormikSelect
            options={dropdownPurchaseRentPaymentType(payment)}
            {...props} />
    )
}

export default FormikPurchasePaymentType