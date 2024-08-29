import { useGetWarehouses } from '../../app/modules/generic/_hooks';
import { dropdownWarehouses } from '../helpers/dropdowns';
import FormikComboBox from './FormikComboBox';

const FormikWarehouse = (props: any) => {
    const { data: warehouse } = useGetWarehouses();

    return (
        // <FormikSelect
        <FormikComboBox
        options={dropdownWarehouses(warehouse)}
        disabled={props.disabled}
        {...props} />
    )
}

export default FormikWarehouse