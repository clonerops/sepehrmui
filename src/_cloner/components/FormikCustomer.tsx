import { Box, Typography } from '@mui/material';

import FormikComboBox from './FormikComboBox';
import { useGetCustomers } from '../../app/modules/customer/core/_hooks';
import { dropdownCustomer } from '../../app/modules/managment-order/helpers/dropdowns';

const FormikCustomer = (props: any) => {
    const { data: customers } = useGetCustomers();

    return (
        <FormikComboBox
            options={dropdownCustomer(customers?.data)}
            // isLabelSetValue={props.isLabelSetValue ? props.isLabelSetValue : false}
            isLabelSetValue={props.isLabelSetValue}
            renderOption={(props: any, option: any) => {
                return <li {...props} key={option.value}>
                    <Box component="div" style={{
                        backgroundColor: `#${option.customerValidityColorCode}`,
                        width: 20,
                        height: 20,
                        borderRadius: 40
                    }}>

                    </Box> <Typography className="pr-4" style={{
                        width: "100%"
                    }}>{option?.label}</Typography>
                </li>

            }
            }
            {...props} />
    )
}

export default FormikCustomer