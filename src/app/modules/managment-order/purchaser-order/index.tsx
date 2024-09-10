import { useState, useRef, useEffect } from 'react'

import { Formik, FormikProps, FormikState } from "formik"

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
import { IOrderItems, IOrderPayment, IOrderService } from '../core/_models'
import { calculateTotalAmount } from '../helpers/functions'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/snackebar'
import { renderAlert } from '../../../../_cloner/helpers/sweetAlert'
import { useGetProductList } from '../../products/_hooks'
import CustomerFeatcure from '../sales-order/components/CustomerFeatcure'
import { useGetCustomer } from '../../customer/core/_hooks'
import { InvoiceType } from '../../../../_cloner/helpers/Enums'


const PurchaserOrder = () => {

    let formikRef = useRef<FormikProps<any>>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false); // OK
    const [isOpenCustomerFeacture, setIsOpenCustomerFeacture] = useState<boolean>(false); //ok
    const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
    const [orderServices, setOrderServices] = useState<IOrderService[]>([]); //OK

    const postSaleOrder = useCreatePurchaserOrder();
    const products = useGetProductList();
    const detailCustomer = useGetCustomer();


    useEffect(() => {
        calculateTotalAmount(orders, orderServices)
        // eslint-disable-next-line
    }, [orders, orderServices]);


    const onSubmit = (values: any) => {
        console.log(values)
        if (orders?.length === 0) {
            EnqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد", "error")
        } else {
            try {
                const formData = {
                    // customerId: values.customerId.value,
                    customerId: values.customerId,
                    totalAmount: calculateTotalAmount(orders, orderServices),
                    description: values.description,
                    orderExitTypeId: +values.exitType,
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
                        // price: item.price ? +item.price?.replace(/,/g, "") : null,
                        price: item.productPrice ? +item.productPrice?.replace(/,/g, "") : null,
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
                            description: item?.orderServiceDescription && item.orderServiceDescription.replace(/,/g, "")
                        }
                    })
                };
                // if(formikRef.current?.values?.invoiceTypeId === InvoiceType.Rasmi && (
                if ([InvoiceType.Mahfam, InvoiceType.Sepehr].includes(formikRef.current?.values?.invoiceTypeId) && (
                    formikRef.current?.values.customerOfficialCompanyId === "" ||
                    formikRef.current?.values.customerOfficialCompanyId === null ||
                    formikRef.current?.values.customerOfficialCompanyId === 0 ||
                    formikRef.current?.values.customerOfficialCompanyId === undefined)) {
                    EnqueueSnackbar("در سفارشات رسمی باید شرکت رسمی مشتری انتخاب گردد", "warning")
                } else {
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
                }

            } catch (error) {
                EnqueueSnackbar("خطای در ثبت، لطفا با پشتیبان تماس بگیرید.", "error")
            }
        }
    }

    const handleReset = (resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void) => {
        window.location.reload();
        // resetForm()
        // setOrderPayment([])
        // setOrderServices([])
        // setOrders([])
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
                initialValues={{
                    ...saleOrderInitialValues,
                    paymentTypeId: 1
                }}
                onSubmit={onSubmit}
                validationSchema={saleOrderValidation}>
                {({ values, setFieldValue, handleSubmit, resetForm }) => {
                    return <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <PurchaserHeaderBase
                                postSaleOrder={postSaleOrder}
                                orders={orders}
                                orderServices={orderServices} />
                            <ReusableCard>
                                <PurchaserChoose
                                    formikRef={formikRef}
                                    openModalState={setIsOpen}
                                    openModalStateCustomerFeatcure={setIsOpenCustomerFeacture}
                                    postSaleOrder={postSaleOrder}
                                    detailCustomer={detailCustomer} />
                            </ReusableCard>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-4 gap-y-4 lg:gap-4  mt-4'>
                            <ReusableCard cardClassName='lg:col-span-4'>
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
                        </div>
                        <div className="lg:grid lg:grid-cols-3 space-y-4 lg:space-y-0 gap-4 mt-4">
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
                                postOrder={postSaleOrder} />
                            <OrderPayment
                                orderPayment={orderPayment}
                                orderService={orderServices}
                                postSaleOrder={postSaleOrder}
                                orders={orders}
                                formikRef={formikRef}
                                setOrderPayment={setOrderPayment} />
                        </div>
                        <div className="flex gap-x-8 my-4 justify-between items-center lg:justify-between lg:items-center">
                            <CustomButton
                                title={"خالی کردن فرم"}
                                onClick={() => handleReset(resetForm)}
                                color="secondary"
                                isLoading={postSaleOrder.isLoading}
                            />

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

                        </div>
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
            {isOpenCustomerFeacture &&
                <TransitionsModal
                    title="نمایش ویژگی های مشتری"
                    open={isOpenCustomerFeacture}
                    isClose={() => setIsOpenCustomerFeacture(false)}
                    width="50%"
                >
                    <CustomerFeatcure detailCustomer={detailCustomer} />
                </TransitionsModal >
            }
        </>
    )
}

export default PurchaserOrder
