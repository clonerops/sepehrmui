import FormikSelect from './FormikSelect'

import { dropdownPaymentRequestReason } from '../helpers/dropdowns';
import { useGetRequestPaymentReason } from '../../app/modules/generic/_hooks';
import { IRequestPaymentReason } from '../../app/modules/generic/_models';

const FormikPaymentRequestReason = (props: any) => {
    const { data: requestPayment } = useGetRequestPaymentReason();

    return (
        <FormikSelect
            options={dropdownPaymentRequestReason(requestPayment?.filter((i: IRequestPaymentReason) => i.isActive))}
            {...props} />
    )
}

export default FormikPaymentRequestReason