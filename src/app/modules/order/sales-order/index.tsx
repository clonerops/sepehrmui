import { useState, useRef, useEffect } from 'react'

import { Box, Typography, Card } from '@mui/material'
import { Formik, FormikProps } from "formik"
import Swal from 'sweetalert2'

import { saleOrderInitialValues } from "./initialValues"
import { saleOrderValidation } from "./validation"
import { saleBaseOrderInformation } from './informations'

import ReusableCard from '../../../../_cloner/components/ReusableCard'
import CustomerForm from '../../customer/components/CustomerForm'
import TransitionsModal from '../../../../_cloner/components/ReusableModal'
import OrderProductDetail from '../components/OrderProductDetail'
import OrderFeature from '../components/OrderFearure'
import OrderService from '../components/OrderService'
import OrderPayment from '../components/OrderPayment'

import { customerFields } from './fields'
import { useCreateOrder } from '../core/_hooks'
import { saleOrderParseFields } from './renderFields'
import { useGetCustomer } from '../../customer/core/_hooks'
import { useGetProductList } from '../../product/core/_hooks'
import { IOrderItems, IOrderPayment, IOrderService } from '../core/_models'
import { calculateTotalAmount } from '../helpers/functions'
import Backdrop from '../../../../_cloner/components/Backdrop'
import CustomButton from '../../../../_cloner/components/CustomButton'
import { validateAndEnqueueSnackbar } from './functions'


const SalesOrder = () => {

    let formikRef = useRef<FormikProps<any>>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false); // OK
    const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
    const [orderServices, setOrderServices] = useState<IOrderService[]>([]); //OK

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

    useEffect(() => { calculateTotalAmount(orders, orderServices) }, [orders, orderServices]);


    const onSubmit = (values: any) => {
        if (orders?.length === 0) {
            validateAndEnqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد", "error")
        } else {
            try {
                const formData = {
                    customerId: values.customerId.value,
                    totalAmount: calculateTotalAmount(orders, orderServices),
                    description: values.description,
                    exitType: Number(values.exitType),
                    orderSendTypeId: Number(values.orderSendTypeId),
                    paymentTypeId: Number(values.paymentTypeId),
                    customerOfficialName: "string",
                    customerOfficialCompanyId: +values.customerOfficialCompanyId ? +values.customerOfficialCompanyId : null,
                    invoiceTypeId: Number(values.invoiceTypeId),
                    isTemporary: +values.isTemporary === 1 ? false : true,
                    freightName: "string",
                    settlementDate: "1402/02/02",
                    dischargePlaceAddress: "string",
                    freightDriverName: "string",
                    carPlaque: "string",
                    details: orders?.map((item: any) => {
                        return {
                            rowId: item.rowId ? +item.rowId : 0,
                            productId: item.id,
                            warehouseId: item.warehouseId ? +item.warehouseId : null,
                            productBrandId: item.productBrandId ? +item.productBrandId : 25,
                            proximateAmount: item.proximateAmount ? +item.proximateAmount?.replace(/,/g, "") : 0,
                            productSubUnitAmount: item.proximateSubUnit ? +item.proximateSubUnit : 0,
                            productSubUnitId: item.productSubUnitId ? +item.productSubUnitId : null,
                            numberInPackage: item.numberInPackage ? +item.numberInPackage : 0,
                            price: item.price ? +item.price?.replace(/,/g, "") : null,
                            cargoSendDate: "1402/01/01",
                            description: item.description,
                            purchasePrice: item.purchasePrice ? +item.purchasePrice : 0,
                            purchaseInvoiceTypeId: item.purchaseInvoiceTypeId ? item.purchaseInvoiceTypeId : null,
                            purchaserCustomerId: item.purchaserCustomerName.value ? item.purchaserCustomerName.value : null,
                            purchaseSettlementDate: item.purchaseSettlementDate,
                            sellerCompanyRow: item.sellerCompanyRow ? item.sellerCompanyRow : "string",
                        };
                    }),
                    orderPayments: orderPayment?.map((item: IOrderPayment) => {
                        return {
                            amount: Number(item.amount?.replace(/,/g, "")),
                            paymentDate: item.paymentDate,
                            daysAfterExit: Number(item.daysAfterExit),
                            paymentType: item.paymentType
                        }
                    }),
                    orderServices: orderServices.map((item: IOrderService) => {
                        return {
                            serviceId: item.serviceId,
                            description: item.description
                        }
                    })
                };
                console.log("formData", formData)
                postSaleOrder.mutate(formData, {
                    onSuccess: (response) => {
                        
                        if (response.data.Errors && response.data.Errors.length > 0) {
                            response.data.Errors.forEach((item: any) => {
                                validateAndEnqueueSnackbar(item, "error")
                            })
                        } else {
                            if (response.succeeded) {
                                Swal.fire({
                                    title: `سفارش شما با شماره ${response?.data[0].orderCode} ثبت گردید`,
                                    confirmButtonColor: "#fcc615",
                                    showClass: {
                                        popup: 'animate__animated animate__fadeInDown'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__fadeOutUp'
                                    },
                                    confirmButtonText: "بستن",
                                    icon: "success",
                                    customClass: {
                                        title: "text-lg"
                                    }
                                })
                            } else {
                                validateAndEnqueueSnackbar(response?.data.Message, "error")
                            }
                        }
                    }
                });
            } catch (error) {
                validateAndEnqueueSnackbar("خطای در ثبت، لطفا با پشتیبان تماس بگیرید.", "error")
            }
        }
    }

    if(postSaleOrder.isLoading) {
        return<Backdrop loading={postSaleOrder.isLoading} />
    }

    return (
        <>
            <Formik enableReinitialize innerRef={formikRef} initialValues={saleOrderInitialValues} onSubmit={onSubmit} validationSchema={saleOrderValidation}>
                {({ values, setFieldValue, handleSubmit }) => {
                    return <>
                        {/*The design of the header section of the order module includes order information and customer information */}
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 md:space-y-0 space-y-4 gap-x-4 my-4">
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {saleBaseOrderInformation(postSaleOrder?.data?.data[0]?.orderCode, calculateTotalAmount(orders, orderServices)).map((item: { title: string, icon: React.ReactNode, value: any }, index) => {
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
                                    orderServices={orderServices}
                                    setOrderServices={setOrderServices}
                                    formikRef={formikRef}
                                />
                            </ReusableCard>
                        </Box>
                        <Box component="div" className="md:grid md:grid-cols-3 gap-x-4 mt-4">
                            <OrderService orderService={orderServices} setOrderService={setOrderServices} values={values} setFieldValue={setFieldValue} orders={orders} />
                            <OrderFeature postSaleOrder={postSaleOrder} />
                            <OrderPayment orderPayment={orderPayment} orderService={orderServices} postSaleOrder={postSaleOrder} orders={orders} setFieldValue={setFieldValue} values={values} setOrderPayment={setOrderPayment}  />
                        </Box>
                        <Box
                            component="div"
                            className="flex gap-x-8 my-4 justify-center items-center md:justify-end md:items-end"
                        >
                            <CustomButton
                                title={postSaleOrder.isLoading ? "در حال پردازش ...." : "ثبت سفارش"}
                                onClick={() => handleSubmit()}
                                color="primary"
                                isLoading={postSaleOrder.isLoading}
                            />
                        </Box>

                    </>
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