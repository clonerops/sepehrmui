import React from 'react'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import { Form, Formik } from 'formik'
import FormikInput from '../../../_cloner/components/FormikInput'
import FormikSelect from '../../../_cloner/components/FormikSelect'
import { dropdownCustomer } from '../generic/_functions'
import { useGetCustomers } from '../customer/core/_hooks'
import { Box, Button, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import OrderDetail from '../order/OrderDetail'


const LadingLicence = () => {
    // const { data: customers } = useGetCustomers();
    
  return (
    <>
        <ReusableCard>
            {/* <Formik initialValues={{}} onSubmit={() => {}}>
                {({}) => {
                    return <Form>
                        <Box component="div" className='flex gap-4 w-[50%]'>
                            <FormikInput name="orderCode" label="شماره سفارش" />
                            <FormikSelect options={dropdownCustomer(customers?.data)} label="مشتری" name="customerId" />
                            <Button><Typography><Search /></Typography></Button>
                        </Box>
                        
                    </Form>
                }}
            </Formik> */}
            <OrderDetail />
        </ReusableCard>
    </>
  )
}

export default LadingLicence