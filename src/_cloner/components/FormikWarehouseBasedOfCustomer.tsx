import FormikSelect from './FormikSelect'

import { useEffect } from 'react';
import { useGetWarehousesByFilter } from '../../app/modules/warehouse/_hooks';
import { dropdownWarehouses } from '../helpers/dropdowns';

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