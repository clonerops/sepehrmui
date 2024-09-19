import FormikSelect from './FormikSelect'
import { useGetServices } from '../../app/modules/productService/_hooks';
import { IService } from '../../app/modules/productService/_models';
import { dropdownServices } from '../helpers/dropdowns';
import { useAuth } from '../helpers/checkUserPermissions';

const FormikService = (props: any) => {
    const { hasPermission } = useAuth()
    const { data: productService } = useGetServices(hasPermission("GetAllServices"));
    

    return (
        <FormikSelect
            options={dropdownServices(productService?.data.filter((i: IService) => i.isActive))}
            {...props} />
    )
}

export default FormikService