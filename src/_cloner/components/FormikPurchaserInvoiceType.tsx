import FormikSelect from './FormikSelect'

import { useGetPurchaseInvoice } from '../../app/modules/generic/_hooks';
import { dropdownPurchaseInvoice } from '../helpers/dropdowns';

const FormikPurchaserInvoiceType = (props: any) => {
    const { data: purchaseInvoiceType } = useGetPurchaseInvoice();

    return (
        <FormikSelect
            options={dropdownPurchaseInvoice(purchaseInvoiceType)}
            {...props} />
    )
}

export default FormikPurchaserInvoiceType