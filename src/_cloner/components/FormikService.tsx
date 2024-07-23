import FormikSelect from './FormikSelect'
import { useGetServices } from '../../app/modules/productService/_hooks';
import { IService } from '../../app/modules/productService/_models';
import { dropdownServices } from '../helpers/dropdowns';

const FormikService = (props: any) => {
    const { data: productService } = useGetServices();
    

    return (
        <FormikSelect
            options={dropdownServices(productService?.data.filter((i: IService) => i.isActive))}
            {...props} />
    )
}

export default FormikService