import {useState, useRef, useEffect} from 'react'

import { Box, IconButton, Typography, Card } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { Formik, Form, FormikErrors, FormikProps } from "formik"

import { saleOrderInitialValues } from "./initialValues"
import { saleOrderValidation } from "./validation"
import { saleBaseOrderInformation } from './informations'

import CardTitleValue from '../../../../_cloner/components/CardTitleValue'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import { customerFields } from './fields'
import FormikCustomer from '../../../../_cloner/components/FormikCustomer'
import { FieldType } from '../../../../_cloner/components/globalTypes'
import FormikCompany from '../../../../_cloner/components/FormikCompany'
import FormikDatepicker from '../../../../_cloner/components/FormikDatepicker'
import FormikOrderSend from '../../../../_cloner/components/FormikOrderSend'
import FormikInvoiceType from '../../../../_cloner/components/FormikInvoiceType'
import FormikPaymentType from '../../../../_cloner/components/FormikPaymentType'
import FormikExitType from '../../../../_cloner/components/FormikExitType'
import FormikTemporary from '../../../../_cloner/components/FormikTemporary'
import FormikDescription from '../../../../_cloner/components/FormikDescription'
import FormikInput from '../../../../_cloner/components/FormikInput'
import { useCreateOrder } from '../core/_hooks'
import { saleOrderParseFields } from './renderFields'
import { ICustomer } from '../../customer/core/_models'
import { useQueryClient } from '@tanstack/react-query'
import TransitionsModal from '../../../../_cloner/components/ReusableModal'
import CustomerForm from '../../customer/components/CustomerForm'
import { useGetCustomer, useGetCustomers } from '../../customer/core/_hooks'

const SalesOrder = () => {
    
    let formikRef = useRef<FormikProps<any>>(null);
    
    const [customerInformation, setCustomerInformation] = useState<ICustomer>(); //OK
    const [isOpen, setIsOpen] = useState<boolean>(false); // OK
    
    const postSaleOrder = useCreateOrder();
    const detailCustomer = useGetCustomer()
    
    const changeCustomerFunction = (item: {value: string, label: string, customerValidityColorCode: string}) => {
        if(item.value) {
            detailCustomer.mutate(item.value, {
                onSuccess: (result) => {
                    console.log(result)
                }
            })
        }
        // const findCustomer = queryData?.data?.find((i: any) => i.id === value?.value);
        // console.log("findCustomer", findCustomer)
        // setFieldValue("customerID", findCustomer?.id)
        // setFindCustomer(findCustomer);
        // setFieldValue("number", findCustomer?.settlementDay)
        // setFieldValue("settlement", moment(new Date()).add(+findCustomer?.settlementDay, "days").format("jYYYY/jMM/jDD"))
    
        // if (findCustomer === undefined || findCustomer === null) {
        //     setFieldValue("number", "")
        //     setFieldValue("settlement", "");
        // }
    };
    

  return (
    <>
        <Formik enableReinitialize innerRef={formikRef} initialValues={saleOrderInitialValues} onSubmit={() => {}} validationSchema={saleOrderValidation}>
            {({values, setFieldValue}) => {
                return <Form>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 md:space-y-0 space-y-4 gap-x-4 my-4">
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {saleBaseOrderInformation(12, 125000).map((item: { title: string, icon: React.ReactNode, value: any}, index) => {
                                    return <Card key={index} className={`px-4 py-4 shadow-md !rounded-xl`}>
                                    <Box key={index} component="div" className="flex justify-between items-center space-y-4">
                                        <Typography variant="body1">{item.title}</Typography>
                                        {item.icon}
                                    </Box>
                                    <Typography variant="h2">{item.value}</Typography>
                                </Card>
                                })}
                            </Box>
                            <Box component="div" className="grid grid-cols-2 gap-4">
                                <ReusableCard cardClassName="col-span-2">
                                    <Box component="div" className="">
                                        {customerFields.map((rowFields, rowIndex) => (
                                            <Box
                                                key={rowIndex}
                                                component="div"
                                                className="md:flex md:justify-between md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                                            >
                                                {rowFields.map((field, index) =>
                                                    saleOrderParseFields(index, postSaleOrder, field, setFieldValue, values, customerInformation, changeCustomerFunction, setIsOpen)
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                </ReusableCard>
                            </Box>
                        </Box>

                </Form>
            }}
        </Formik>
            {isOpen &&
                <TransitionsModal
                    title="ایجاد مشتری جدید"
                    open={isOpen}
                    isClose={() => setIsOpen(false)}
                >
                    {/* <CustomerForm
                        refetch={refetchCustomers}
                        setIsCreateOpen={setIsOpen}
                    /> */}
                </TransitionsModal >
            }
    </>
  )
}

export default SalesOrder