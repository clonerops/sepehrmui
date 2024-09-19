import FormikSelect from './FormikSelect'

import { useGetSendTypes } from '../../app/modules/generic/_hooks';
import { dropdownOrderSendType } from '../helpers/dropdowns';
import { useAuth } from '../helpers/checkUserPermissions';

const FormikOrderSend = (props: any) => {
    const { hasPermission } = useAuth()
    const { data: orderSendType, isLoading } = useGetSendTypes(hasPermission("GetOrderSendTypes"));

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }
    
    return (
        <FormikSelect
        options={dropdownOrderSendType(orderSendType)}
        {...props} />
    )
}

export default FormikOrderSend