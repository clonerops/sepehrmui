import { dropdownWarehouses } from '../helpers/dropdowns'
import FormikSelect from './FormikSelect'

const FormikWarehouseBasedOfType = (props: any) => {

    return (
        <FormikSelect
        options={dropdownWarehouses(props.warehouse)}
        disabeld={props.disabled}
        {...props} />
    )
}

export default FormikWarehouseBasedOfType