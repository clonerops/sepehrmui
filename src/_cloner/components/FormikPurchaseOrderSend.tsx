import FormikSelect from './FormikSelect'

import { dropdownPurchaseOrderSendType } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetPurchaseSendTypes } from '../../app/modules/generic/_hooks';

const FormikPurchaseOrderSend = (props: any) => {
    const { data: orderSendType, isLoading } = useGetPurchaseSendTypes();

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