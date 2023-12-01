import FormikSelect from './FormikSelect'

import { dropdownOrderSendType } from '../../app/modules/order/helpers/dropdowns';

import { useGetSendTypes } from '../../app/modules/generic/_hooks';

const FormikOrderSend = (props: any) => {
    const { data: orderSendType } = useGetSendTypes();

    return (
        <FormikSelect
        options={dropdownOrderSendType(orderSendType)}
        {...props} />
    )
}

export default FormikOrderSend