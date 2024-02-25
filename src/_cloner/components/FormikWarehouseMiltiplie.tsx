
import { dropdownWarehouses } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetWarehouses } from '../../app/modules/generic/_hooks';
import FormikSelectCheckbox from './FormikSelectCheckbox';

const FormikWarehouseMultiplie = (props: any) => {
    const { data: warehouse } = useGetWarehouses();

    return (
        <FormikSelectCheckbox
        options={dropdownWarehouses(warehouse)}
        {...props} />
    )
}

export default FormikWarehouseMultiplie