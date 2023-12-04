import { useState, useRef } from 'react'

import { Box, Typography, Card } from '@mui/material'
import { Formik, Form, FormikProps } from "formik"

import { saleOrderInitialValues } from "./initialValues"
import { saleOrderValidation } from "./validation"
import { saleBaseOrderInformation } from './informations'

import ReusableCard from '../../../../_cloner/components/ReusableCard'
import CustomerForm from '../../customer/components/CustomerForm'
import TransitionsModal from '../../../../_cloner/components/ReusableModal'
import { customerFields } from './fields'
import { useCreateOrder } from '../core/_hooks'
import { saleOrderParseFields } from './renderFields'
import { useGetCustomer } from '../../customer/core/_hooks'
import { useGetProductList } from '../../product/core/_hooks'

import { IOrderItems, IOrderPayment, IOrderService } from '../core/_models'
import OrderProductDetail from '../components/OrderProductDetail'

const SalesOrder = () => {

    let formikRef = useRef<FormikProps<any>>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false); // OK
    const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
    const [orderService, setOrderService] = useState<IOrderService[]>([]); //OK

    const postSaleOrder = useCreateOrder();
    const detailCustomer = useGetCustomer();
    const products = useGetProductList();

    const changeCustomerFunction = (item: { value: string, label: string, customerValidityColorCode: string }) => {
        if (item?.value) {
            detailCustomer.mutate(item?.value, {
                onSuccess: (result) => {
                    formikRef.current?.setFieldValue("customerID", result.data.id)
                    formikRef.current?.setFieldValue("number", result.data.settlementDay)
                    formikRef.current?.setFieldValue("settlement", result.data.settlement)
                    if (!result?.data) {
                        formikRef.current?.setFieldValue("number", "")
                        formikRef.current?.setFieldValue("settlement", "")
                    }
                }
            })
        } else {
            detailCustomer.data.data = {}
        }
    };

    return (
        <>
            <Formik enableReinitialize innerRef={formikRef} initialValues={saleOrderInitialValues} onSubmit={() => { }} validationSchema={saleOrderValidation}>
                {({ values, setFieldValue }) => {
                    return <Form>
                        {/*The design of the header section of the order module includes order information and customer information */}
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 md:space-y-0 space-y-4 gap-x-4 my-4">
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {saleBaseOrderInformation(12, 125000).map((item: { title: string, icon: React.ReactNode, value: any }, index) => {
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
                                                    saleOrderParseFields(index, postSaleOrder, field, setFieldValue, values, detailCustomer?.data?.data, changeCustomerFunction, setIsOpen, detailCustomer.isLoading)
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                </ReusableCard>
                            </Box>
                        </Box>
                        {/*The design of the main section of the order module order */}
                        <Box component="div" className="md:space-y-0 space-y-4 md:gap-x-4">
                            <ReusableCard cardClassName="col-span-3">
                                <OrderProductDetail
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    postSaleOrder={postSaleOrder}
                                    products={products}
                                    orders={orders}
                                    setOrders={setOrders}
                                    orderPayment={orderPayment}
                                    setOrderPayment={setOrderPayment}
                                    orderService={orderService}
                                    setOrderService={setOrderService}
                                    formikRef={formikRef}
                                />
                            </ReusableCard>
                        </Box>

                    </Form>
                }}
            </Formik>
            {isOpen &&
                <TransitionsModal
                    title="ایجاد مشتری جدید"
                    open={isOpen}
                    isClose={() => setIsOpen(false)}
                    width="80%"
                >
                    <CustomerForm
                        setIsCreateOpen={setIsOpen}
                    />
                </TransitionsModal >
            }
        </>
    )
}

export default SalesOrder