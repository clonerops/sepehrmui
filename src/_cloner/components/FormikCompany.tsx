import FormikSelect from './FormikSelect'
import { dropdownCustomerCompanies } from '../../app/modules/order/helpers/dropdowns';
import { useGetCustomerCompaniesMutate } from '../../app/modules/generic/customerCompany/_hooks';
import { useEffect } from 'react';

const FormikCompany = (props: any) => {
    const { mutate, data: customerCompanies } = useGetCustomerCompaniesMutate();

    useEffect(() => {
        mutate(props.customerID)
    }, [props.customerID])

    return (
        <FormikSelect
            options={dropdownCustomerCompanies(customerCompanies?.data?.length > 0 ? customerCompanies?.data : [])}
            {...props} />
    )
}

export default FormikCompany