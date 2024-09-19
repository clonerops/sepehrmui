import FormikSelect from './FormikSelect'

import { useGetPurchaseSendTypes } from '../../app/modules/generic/_hooks';
import { dropdownPurchaseOrderSendType } from '../helpers/dropdowns';
import { useAuth } from '../helpers/checkUserPermissions';

const FormikPurchaseOrderSend = (props: any) => {
    const { hasPermission } = useAuth()

    const { data: orderSendType, isLoading } = useGetPurchaseSendTypes(hasPermission("GetPurchaseOrderSendTypes"));

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }

    return (
        <FormikSelect
        options={dropdownPurchaseOrderSendType(orderSendType)}
        {...props} />
    )
}

export default FormikPurchaseOrderSend