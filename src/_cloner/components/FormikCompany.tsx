import FormikSelect from './FormikSelect'
import { dropdownCustomerCompanies } from '../../app/modules/managment-order/helpers/dropdowns';
import { useGetCustomerCompaniesMutate } from '../../app/modules/generic/customerCompany/_hooks';
import { useEffect } from 'react';


const FormikCompany = (props: any) => {

    const { customerid } = props;

    const { mutate, data: customerCompanies } = useGetCustomerCompaniesMutate();

    useEffect(() => {
        if(customerid)
            mutate(customerid)
         // eslint-disable-next-line
    }, [customerid])

    return (
        <>
            {customerCompanies?.data?.length > 0 &&
                <FormikSelect
                    options={dropdownCustomerCompanies(customerCompanies?.data?.length > 0 ? customerCompanies?.data.filter((item: {isActive: boolean}) => item.isActive) : [])}
                    {...props} />
            }
        </>
    )
}

export default FormikCompany