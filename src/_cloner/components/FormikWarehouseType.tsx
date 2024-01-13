import FormikSelect from './FormikSelect'
import { dropdownWarehouseType } from '../../app/modules/order/helpers/dropdowns';
import { useGetWarehouseTypes } from '../../app/modules/generic/_hooks';
import { IWarehouseTypes } from '../../app/modules/generic/_models';

const FormikWarehouseType = (props: any) => {
    const { data: productWarehouseType } = useGetWarehouseTypes();
    

    return (
        <FormikSelect
            options={dropdownWarehouseType(productWarehouseType?.data.filter((i: IWarehouseTypes) => i.isActive))}
            {...props} />
    )
}

export default FormikWarehouseType