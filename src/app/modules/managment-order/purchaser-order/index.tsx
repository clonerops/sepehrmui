import { useState, useRef, useEffect } from 'react'

import { Box } from '@mui/material'
import { Formik, FormikProps } from "formik"

import { saleOrderInitialValues } from "./initialValues"
import { saleOrderValidation } from "./validation"

import ReusableCard from '../../../../_cloner/components/ReusableCard'
import CustomerForm from '../../customer/components/CustomerForm'
import TransitionsModal from '../../../../_cloner/components/ReusableModal'
import OrderProductDetail from './components/OrderProductDetail'
import OrderFeature from '../components/OrderFearure'
import OrderService from '../components/OrderService'
import OrderPayment from '../components/OrderPayment'
import Backdrop from '../../../../_cloner/components/Backdrop'
import CustomButton from '../../../../_cloner/components/CustomButton'
import PurchaserHeaderBase from './components/PurchaserHeaderBase'
import PurchaserChoose from './components/PurchaserChoose'

import { useCreatePurchaserOrder } from '../core/_hooks'
import { useGetCustomer } from '../../customer/core/_hooks'
import { IOrderItems, IOrderPayment, IOrderService } from '../core/_models'
import { calculateTotalAmount } from '../helpers/functions'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'
import { renderAlert } from '../../../../_cloner/helpers/SweetAlert'
import { useGetProductList } from '../../generic/products/_hooks'
import { useGetWarehouses } from '../../generic/_hooks'


const PurchaserOrder = () => {

    let formikRef = useRef<FormikProps<any>>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false); // OK
    const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
    const [orderServices, setOrderServices] = useState<IOrderService[]>([]); //OK

    const postSaleOrder = useCreatePurchaserOrder();
    const products = useGetProductList();


    useEffect(() => { calculateTotalAmount(orders, orderServices) }, [orders, orderServices]);


    const onSubmit = (values: any) => {
        if (orders?.length === 0) {
            EnqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد", "error")
        } else {
            try {
                const formData = {
                    customerId: values.customerId.value,
                    totalAmount: calculateTotalAmount(orders, orderServices),
                    description: values.description,
                    exitType: +values.exitType,
                    purchaseOrderSendTypeId: +values.orderSendTypeId,
                    paymentTypeId: +values.paymentTypeId,
                    originWarehouseId: +values.originWarehouseId,
                    destinationWarehouseId: +values.destinationWarehouseId.value,
                    customerOfficialCompanyId: +values.customerOfficialCompanyId ? +values.customerOfficialCompanyId : null,
                    invoiceTypeId: +values.invoiceTypeId,
                    isTemporary: +values.isTemporary === 1 ? false : true,
                    details: orders?.map(({ id, ...item }) => ({
                      rowId: item.rowId ? +item.rowId : 0,
                      productBrandId: item.productBrandId ? +item.productBrandId : 25,
                      numberInPackage: 1,
                      productSubUnitAmount: item.proximateSubUnit ? +item.proximateSubUnit : 0,
                      productSubUnitId: item.productSubUnitId ? +item.productSubUnitId : null,
                      proximateAmount: item.proximateAmount ? +item.proximateAmount?.replace(/,/g, "") : 0,
                      price: item.price ? +item.price?.replace(/,/g, "") : null,
                      description: item.description,
                      deliverDate: item.deliverDate,

                  })),
                    orderPayments: orderPayment?.map((item: IOrderPayment) => {
                      return {
                          amount: item.orderPaymentAmount && +(item.orderPaymentAmount.replace(/,/g, "")),
                          paymentDate: item.orderPaymentDate,
                          daysAfterExit: item.orderPaymentDaysAfterExit,
                          paymentType: item.orderPaymentType
                    
                      }
                  }),
                  orderServices: orderServices?.map((item: IOrderService) => {
                      return {
                          id: item.orderServiceMainId,
                          serviceId: item.orderServiceId,
                          description: item?.orderServiceDescription &&  item.orderServiceDescription.replace(/,/g, "")
                      } 
                  })
              };
                postSaleOrder.mutate(formData, {
                    onSuccess: (response) => {

                        if (response.data.Errors && response.data.Errors.length > 0) {
                            response.data.Errors.forEach((item: any) => {
                                EnqueueSnackbar(item, "error")
                            })
                        } else {
                            if (response.succeeded) {
                                renderAlert(response.message)
                            } else {
                                EnqueueSnackbar(response?.data.Message, "error")
                            }
                        }
                    }
                });
            } catch (error) {
                EnqueueSnackbar("خطای در ثبت، لطفا با پشتیبان تماس بگیرید.", "error")
            }
        }
    }
    return (
        <>
            {postSaleOrder.isLoading && <Backdrop loading={postSaleOrder.isLoading} />}
            <Formik 
                enableReinitialize 
                validateOnChange={false}
                validateOnBlur={true}
                validateOnMount={true}
                innerRef={formikRef} 
                initialValues={saleOrderInitialValues} 
                onSubmit={onSubmit} 
                validationSchema={saleOrderValidation}>
                {({ values, setFieldValue, handleSubmit }) => {
                    return <>
                        <div className="">
                        <PurchaserHeaderBase 
                            postSaleOrder={postSaleOrder} 
                            orders={orders} 
                            orderServices={orderServices} />
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-4 gap-y-4 lg:gap-4  mt-4'>
                            <ReusableCard cardClassName='lg:col-span-3'>
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
                            <ReusableCard>
                              <PurchaserChoose 
                                formikRef={formikRef}
                                openModalState={setIsOpen} 
                                postSaleOrder={postSaleOrder} />
                            </ReusableCard>
                        </div>
                        <Box component="div" className="md:grid md:grid-cols-3 space-y-4 md:space-y-0 gap-4 mt-4">
                            <OrderService
                                orderService={orderServices}
                                setOrderService={setOrderServices}
                                setOrderPayment={setOrderPayment}
                                formikRef={formikRef}
                                postSaleOrder={postSaleOrder}
                                orders={orders} />
                            <OrderFeature
                                categories={[]}
                                isPurchaser={true}
                                postOrder={postSaleOrder}  />
                            <OrderPayment
                                orderPayment={orderPayment}
                                orderService={orderServices}
                                postSaleOrder={postSaleOrder}
                                orders={orders}
                                formikRef={formikRef}
                                setOrderPayment={setOrderPayment} />
                        </Box>
                        <Box  component="div" className="flex gap-x-8 my-4 justify-center items-center md:justify-end md:items-end">
                            <CustomButton
                                title={postSaleOrder.isLoading ? "در حال پردازش ...." : "ثبت سفارش"}
                                onClick={() => handleSubmit()}
                                disabled={
                                    orders.length <= 0 ||
                                    postSaleOrder.isLoading ||
                                    orderPayment.length <= 0 ||
                                    formikRef.current?.values.customerId === "" ||
                                    formikRef.current?.values.invoiceTypeId === "" ||
                                    postSaleOrder?.data?.succeeded === ""
                                }
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

export default PurchaserOrder
