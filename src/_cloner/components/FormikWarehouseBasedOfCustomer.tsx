import FormikSelect from './FormikSelect'

import { dropdownWarehouses } from '../../app/modules/managment-order/helpers/dropdowns';

import { useEffect } from 'react';
import { useGetWarehousesByFilter } from '../../app/modules/generic/warehouse/_hooks';

const FormikWarehouseBasedOfCustomer = (props: any) => {
    const data = useGetWarehousesByFilter();
    useEffect(() => {
        data.mutate({customerId: props.customerId})
         // eslint-disable-next-line        
    }, [props.customerId])
    return (
        <FormikSelect
        options={dropdownWarehouses(data?.data?.data)}
        {...props} />
    )
}

export default FormikWarehouseBasedOfCustomer