import FormikSelect from './FormikSelect'

import { dropdownOrderSendType } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetSendTypes } from '../../app/modules/generic/_hooks';

const FormikOrderSend = (props: any) => {
    const { data: orderSendType, isLoading } = useGetSendTypes();

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