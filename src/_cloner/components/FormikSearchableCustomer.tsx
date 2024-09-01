import { Typography } from '@mui/material';

import FormikComboBox from './FormikComboBox';
import { useGetCustomersByMutation } from '../../app/modules/customer/core/_hooks';
import { dropdownCustomer } from '../helpers/dropdowns';
import { useEffect, useState } from 'react';

const FormikSearchableCustomer = (props: any) => {
    const customerTools = useGetCustomersByMutation()

    const [keyword, setKeyword] = useState<string>("")

    useEffect(() => {
        if(keyword !== "" && keyword !== null && keyword !== ' ' && keyword !== undefined && keyword != "0") {
            const delayDebounceFn = setTimeout(() => {
                const filter = {
                    keyword: keyword && keyword?.trim()
                }
                customerTools.mutate(filter);
            }, 1000)
    
            return () => clearTimeout(delayDebounceFn)
        } 
        // eslint-disable-next-line
    }, [keyword])

    // if(customerTools.isLoading) {
    //     return <Typography>درحال بارگزاری لیست مشتریان</Typography>
    // }
    
    return (
        <FormikComboBox
            options={dropdownCustomer(customerTools?.data?.data || [])}
            isLabelSetValue={props.isLabelSetValue}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e?.target.value)}
            renderOption={(props: any, option: any) => {
                return <li {...props} key={option.value}>
                    <div style={{
                        backgroundColor: `#${option.customerValidityColorCode}`,
                        width: 20,
                        height: 20,
                        borderRadius: 40
                    }}>
                    
                    </div> <Typography className="pr-4" style={{
                        width: "100%"
                    }}>{option?.label}</Typography>
                </li>

            }
            }
            {...props} />
    )
}

export default FormikSearchableCustomer