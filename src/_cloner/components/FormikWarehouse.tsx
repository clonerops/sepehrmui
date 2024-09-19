import { useGetWarehouses } from '../../app/modules/generic/_hooks';
import { useAuth } from '../helpers/checkUserPermissions';
import { dropdownWarehouses } from '../helpers/dropdowns';
import FormikComboBox from './FormikComboBox';

const FormikWarehouse = (props: any) => {
    const { hasPermission } = useAuth()
    const { data: warehouse } = useGetWarehouses(hasPermission("GetWarehouses"));

    return (
        // <FormikSelect
        <FormikComboBox
        options={dropdownWarehouses(warehouse)}
        disabled={props.disabled}
        {...props} />
    )
}

export default FormikWarehouse