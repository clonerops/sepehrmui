import { dropdownWarehouses } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetWarehouses } from '../../app/modules/generic/_hooks';
import FormikComboBox from './FormikComboBox';

const FormikWarehouse = (props: any) => {
    const { data: warehouse } = useGetWarehouses();

    return (
        // <FormikSelect
        <FormikComboBox
        options={dropdownWarehouses(warehouse)}
        {...props} />
    )
}

export default FormikWarehouse