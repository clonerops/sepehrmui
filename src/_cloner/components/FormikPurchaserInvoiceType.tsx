import FormikSelect from './FormikSelect'

import { dropdownPurchaseInvoice } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetPurchaseInvoice } from '../../app/modules/generic/_hooks';

const FormikPurchaserInvoiceType = (props: any) => {
    const { data: purchaseInvoiceType } = useGetPurchaseInvoice();

    return (
        <FormikSelect
            options={dropdownPurchaseInvoice(purchaseInvoiceType)}
            {...props} />
    )
}

export default FormikPurchaserInvoiceType