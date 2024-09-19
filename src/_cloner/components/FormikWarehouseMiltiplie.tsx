
import { useGetWarehouses } from '../../app/modules/generic/_hooks';
import { useAuth } from '../helpers/checkUserPermissions';
import { dropdownWarehouses } from '../helpers/dropdowns';
import FormikSelectCheckbox from './FormikSelectCheckbox';

const FormikWarehouseMultiplie = (props: any) => {
    const { hasPermission } = useAuth()

    const { data: warehouse } = useGetWarehouses(hasPermission("GetWarehouses"));

    return (
        <FormikSelectCheckbox
        options={dropdownWarehouses(warehouse)}
        {...props} />
    )
}

export default FormikWarehouseMultiplie