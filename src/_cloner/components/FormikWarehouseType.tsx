import FormikSelect from './FormikSelect'
import { useGetWarehouseTypes } from '../../app/modules/generic/_hooks';
import { dropdownWarehouseType } from '../helpers/dropdowns';
import { useAuth } from '../helpers/checkUserPermissions';

const FormikWarehouseType = (props: any) => {
    const { hasPermission } = useAuth()

    const { data: productWarehouseType } = useGetWarehouseTypes(hasPermission("GetWarehouseTypes"));
    
    return (
        <FormikSelect
            options={dropdownWarehouseType(productWarehouseType)}
            {...props} />
    )
}

export default FormikWarehouseType