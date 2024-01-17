import FormikSelect from './FormikSelect'
import { dropdownCustomerCompanies } from '../../app/modules/order/helpers/dropdowns';
import { useGetCustomerCompaniesMutate } from '../../app/modules/generic/customerCompany/_hooks';
import { useEffect } from 'react';


const FormikCompany = (props: any) => {

    const { customerid } = props;

    const { mutate, data: customerCompanies } = useGetCustomerCompaniesMutate();

    useEffect(() => {
        if(customerid)
            mutate(customerid)
    }, [customerid])

    return (
        <FormikSelect
            options={dropdownCustomerCompanies(customerCompanies?.data?.length > 0 ? customerCompanies?.data.filter((item: {isActive: boolean}) => item.isActive) : [])}
            {...props} />
    )
}

export default FormikCompany