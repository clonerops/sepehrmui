import { useState, useRef, useEffect } from 'react'
import { Formik, FormikErrors, FormikProps, FormikState } from "formik"
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
import SaleHeaderBase from './components/SaleHeaderBase'
import CustomerChoose from './components/CustomerChoose'

import { useCreateOrder } from '../core/_hooks'
import { IOrderItems, IOrderPayment, IOrderService } from '../core/_models'
import { calculateTotalAmount } from '../helpers/functions'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/snackebar'
import { renderAlert } from '../../../../_cloner/helpers/sweetAlert'
import { useGetProductList } from '../../products/_hooks'
import { useGetCustomer } from '../../customer/core/_hooks'
import CustomerFeatcure from './components/CustomerFeatcure'
import { WarehouseType } from '../../warehouse/_models'

const categories = [
    { value: 2, title: "پیش فروش", defaultChecked: false },
{ value: 1, title: "فروش فوری", defaultChecked: true }
]

const SalesOrder = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenCustomerFeacture, setIsOpenCustomerFeacture] = useState<boolean>(false);
    const [orders, setOrders] = useState<IOrderItems[]>([]);
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]);
    const [orderServices, setOrderServices] = useState<IOrderService[]>([]);
    const [orderValid, setOrderValid] = useState<boolean>(false)

    const postSaleOrder = useCreateOrder();
    const products = useGetProductList();
    const detailCustomer = useGetCustomer();


    let formikRef = useRef<FormikProps<any>>(null);

    const onSubmit = (values: any) => {
        if (orders?.length === 0) {
            EnqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد", "error")
        } else {
            try {
                const formData = {
                    customerId: values.customerId,
                    totalAmount: calculateTotalAmount(orders, orderServices),
                    description: values.description,
                    orderExitTypeId: values.orderExitTypeId,
                    orderSendTypeId: values.orderSendTypeId,
                    paymentTypeId: values.paymentTypeId,
                    orderTypeId: values.orderType !== undefined ? +values.orderType : 1,
                    customerOfficialName: "string",
                    customerOfficialCompanyId: values.customerOfficialCompanyId && +values.customerOfficialCompanyId ? +values.customerOfficialCompanyId : null,
                    invoiceTypeId: values.invoiceTypeId,
                    freightName: "string",
                    isTemporary: values?.isTemporary && +values?.isTemporary === 1 ? false : true,
                    deliverDate: values.deliverDate,
                    dischargePlaceAddress: "string",
                    freightDriverName: "string",
                    carPlaque: "string",
                    details: orders?.map(({ id, ...item }) => ({
                        ...item,
                        rowId: item.rowId ? Number(item.rowId) : 0,
                        cargoSendDate: "1402/01/01",
                        proximateAmount: item.proximateAmount ? +item.proximateAmount?.replace(/,/g, "") : 0,
                        proximateSubUnit: item.proximateSubUnit ? +item.proximateSubUnit : null,
                        purchasePrice: item.purchasePrice ? +item.purchasePrice : 0,
                        purchaserCustomerId: item.purchaserCustomerName && item.purchaserCustomerName?.value ? item.purchaserCustomerName?.value : null,
                        purchaserCustomerName: item.purchaserCustomerName && item.purchaserCustomerName?.label ? item.purchaserCustomerName?.label : null,
                        purchaseInvoiceTypeId: item.purchaseInvoiceTypeId ? item.purchaseInvoiceTypeId : null,
                        warehouseId: item.warehouseId ? +item.warehouseId : null,
                        warehouseTypeId: item.warehouseTypeId,

                        purchaseOrder:  item?.warehouseTypeId == WarehouseType.Karkhaneh || item?.warehouseTypeId == WarehouseType.Vaseteh ? {
                            customerId: item.purchaserCustomerName && item.purchaserCustomerName?.value ? item.purchaserCustomerName?.value : null,
                            totalAmount: 
                            +(item.purchasePrice ? Number(item.purchasePrice) : 0)
                             * 
                            +(item.proximateAmount ? Number(item.proximateAmount?.replace(/,/g, "")) : 0),
                            description: "string",
                            purchaseOrderSendTypeId: values.orderSendTypeId,
                            invoiceTypeId: values.invoiceTypeId,

                            details: [
                                {
                                    rowId: 0,
                                    proximateAmount: item.proximateAmount ? Number(item.proximateAmount?.replace(/,/g, "")) : 0,
                                    numberInPackage: 0,
                                    price: item.purchasePrice ? Number(item.purchasePrice) : 0,
                                    productBrandId: item.productBrandId ? Number(item.productBrandId) : 25,
                                    productSubUnitId: item.productSubUnitId ? +item.productSubUnitId : null,
                                    productSubUnitAmount: item.proximateSubUnit ? +item.proximateSubUnit : 0,
                                    description: "string",
                                    deliverDate: item.purchaseSettlementDate
                                }
                            ],
                        } : null
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
                }
                postSaleOrder.mutate(formData, {
                    onSuccess: (response) => {
                        if (response.data.Errors&&response.data.Errors.length > 0) {
                            EnqueueSnackbar(response.data.Errors[0], "error")
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

    const handleReset = (resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void, 
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>) => {
        window.location.reload()
        // resetForm()
        // setOrderPayment([])
        // setOrderServices([])
        // setOrders([])
        // detailCustomer.reset()
    }

    useEffect(() => {
        calculateTotalAmount(   orders, orderServices)
         // eslint-disable-next-line
    }, [orders, orderServices]);

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
                {({ values, setFieldValue, handleSubmit, resetForm }) => {
                    return <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <SaleHeaderBase 
                                postSaleOrder={postSaleOrder} 
                                orders={orders} 
                                orderServices={orderServices} />
                            <ReusableCard>
                                <CustomerChoose 
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
                                    postSaleOrder={postSaleOrder}
                                    products={products}
                                    orders={orders}
                                    setOrders={setOrders}
                                    orderPayment={orderPayment}
                                    setOrderPayment={setOrderPayment}
                                    orderServices={orderServices}
                                    setOrderServices={setOrderServices}
                                    formikRef={formikRef}
                                    orderValid={orderValid}
                                    setOrderValid={setOrderValid}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                />
                            </ReusableCard>
                        </div>
                        <div className="lg:grid lg:grid-cols-3 space-y-4 md:space-y-0 gap-4 mt-4">
                            <OrderService
                                orderService={orderServices}
                                setOrderService={setOrderServices}
                                setOrderPayment={setOrderPayment}
                                formikRef={formikRef}
                                postSaleOrder={postSaleOrder}
                                orders={orders} />
                            <OrderFeature
                                categories={categories}
                                postOrder={postSaleOrder}  />
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
                                onClick={() => handleReset(resetForm, setFieldValue)}
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
                                    formikRef.current?.values.deliverDate === "" ||
                                    postSaleOrder?.data?.succeeded ||
                                    !orderValid
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
                    <CustomerFeatcure detailCustomer={detailCustomer}  />
                </TransitionsModal >
            }
        </>
    )
}

export default SalesOrder