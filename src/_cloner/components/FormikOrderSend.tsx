import FormikSelect from './FormikSelect'

import { useGetSendTypes } from '../../app/modules/generic/_hooks';
import { dropdownOrderSendType } from '../helpers/dropdowns';

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