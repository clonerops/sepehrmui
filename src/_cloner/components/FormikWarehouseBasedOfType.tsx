import FormikSelect from './FormikSelect'

import { dropdownWarehouses } from '../../app/modules/managment-order/helpers/dropdowns';


const FormikWarehouseBasedOfType = (props: any) => {

    return (
        <FormikSelect
        options={dropdownWarehouses(props.warehouse)}
        {...props} />
    )
}

export default FormikWarehouseBasedOfType