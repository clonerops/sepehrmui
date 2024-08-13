import FormikSelect from './FormikSelect'
import { useGetWarehouseTypes } from '../../app/modules/generic/_hooks';
import { IWarehouseTypes } from '../../app/modules/generic/_models';
import { dropdownWarehouseType } from '../helpers/dropdowns';

const FormikWarehouseType = (props: any) => {
    const { data: productWarehouseType } = useGetWarehouseTypes();
    
    return (
        <FormikSelect
            options={dropdownWarehouseType(productWarehouseType)}
            {...props} />
    )
}

export default FormikWarehouseType