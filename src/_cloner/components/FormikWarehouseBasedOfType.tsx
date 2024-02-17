import FormikSelect from './FormikSelect'

import { dropdownWarehouses } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetWarehouses } from '../../app/modules/generic/_hooks';

const FormikWarehouseBasedOfType = (props: any) => {

    return (
        <FormikSelect
        options={dropdownWarehouses(props.warehouse)}
        {...props} />
    )
}

export default FormikWarehouseBasedOfType