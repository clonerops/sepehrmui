
import { useGetWarehouses } from '../../app/modules/generic/_hooks';
import { dropdownWarehouses } from '../helpers/dropdowns';
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