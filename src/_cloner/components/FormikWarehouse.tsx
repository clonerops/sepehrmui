import FormikSelect from './FormikSelect'

import { dropdownWarehouses } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetWarehouses } from '../../app/modules/generic/_hooks';

const FormikWarehouse = (props: any) => {
    const { data: warehouse } = useGetWarehouses();

    return (
        <FormikSelect
        options={dropdownWarehouses(warehouse)}
        {...props} />
    )
}

export default FormikWarehouse