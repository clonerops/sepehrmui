import { useState, useRef, useEffect } from 'react'

import { Alert, Typography } from '@mui/material'
import { Formik, FormikProps } from "formik"
import Swal from 'sweetalert2'

import { saleOrderEditInitialValues } from "./initialValues"

import ReusableCard from '../../../../_cloner/components/ReusableCard'
import OrderFeature from '../components/OrderFearure'
import OrderService from '../components/OrderService'
import OrderPayment from '../components/OrderPayment'

import { useGetOrderDetailByCode, useUpdateOrder } from '../core/_hooks'
import { IOrderItems, IOrderPayment, IOrderService } from '../core/_models'
import { calculateTotalAmount } from '../helpers/functions'
import Backdrop from '../../../../_cloner/components/Backdrop'
import CustomButton from '../../../../_cloner/components/CustomButton'
import { separateAmountWithCommas } from '../../../../_cloner/helpers/seprateAmount'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/assetsHelper'
import { useGetWarehouses } from '../../generic/_hooks'
import OrderProductDetail from './components/OrderProductDetail'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/snackebar'
import OrderDetailBaseOrderCode from './components/OrderDetailBaseOrderCode'
import { useGetProductList } from '../../products/_hooks'
import { WarehouseType } from '../../../../_cloner/helpers/Enums'

const SalesOrderEdit = () => {

    let formikRef = useRef<FormikProps<any>>(null);

    const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
    const [orderServices, setOrderServices] = useState<IOrderService[]>([]); //OK
    const [orderValid, setOrderValid] = useState<boolean>(false)
    const [categories, setCategories] = useState<any>([])

    const postSaleOrder = useUpdateOrder();

    const products = useGetProductList();
    const detailTools = useGetOrderDetailByCode()
    const { data: warehouse } = useGetWarehouses();

    useEffect(() => {
        calculateTotalAmount(orders, orderServices)
        // eslint-disable-next-line
    }, [orders, orderServices]);


    useEffect(() => {
        if (detailTools?.data?.data) {

            setOrderServices([
                ...detailTools?.data?.data?.orderServices?.map((i: any) => ({
                    orderServiceMainId: i.id,  
                    serviceName: i?.serviceDesc,
                    orderServiceId: i?.serviceId,
                    orderServiceDescription: i?.description
                })) || []
            ]);

            setOrderPayment([
                ...detailTools?.data?.data?.orderPayments?.map((i: any) => ({
                    orderPaymentId: i?.id,
                    orderPaymentAmount: separateAmountWithCommas(+i.amount),
                    orderPaymentDate: i.paymentDate,
                    orderPaymentDaysAfterExit: i.daysAfterExit
                })) || []
            ]);

            setOrders([
                ...detailTools?.data?.data?.details?.map((i: any) => ({
                    ...i,
                    mainUnit: i.product.productMainUnitDesc,
                    productMainUnitDesc: i.product.productMainUnitDesc,
                    subUnit: i.product.productSubUnitDesc,
                    exchangeRate: +i.product.exchangeRate,
                    deliverDate: i.purchaseSettlementDate,
                    purchasePrice: +i.purchasePrice,
                    warehouseId: warehouse.find((item: any) => item.name === i.warehouseName).id,
                    price: ~~i.price,
                    proximateAmount: separateAmountWithCommas(i.proximateAmount),
                    productBrandName: i.brandName,
                    purchaserCustomerId: i.purchaserCustomerId,
                    proximateSubUnit: Math.ceil(+i.proximateAmount / +i.product.exchangeRate)
                })) || []
            ]);

            setCategories([
                { value: 2, title: "پیش فروش", defaultChecked: detailTools?.data?.data.orderTypeId === 2 ? true : false }, 
                { value: 1, title: "فروش فوری", defaultChecked: detailTools?.data?.data.orderTypeId === 1 ? true : false },
            ])
        }
        // eslint-disable-next-line
    }, [detailTools?.data?.data])

    const onSubmit = (values: any) => {
        if (orders?.length === 0) {
            EnqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد.", "error")
        } else {
            const formData = {
                id: detailTools?.data?.data?.id,
                productBrandId: 89,
                customerId: detailTools?.data?.data.customer.id, //ok
                totalAmount: calculateTotalAmount(orders, orderServices), //ok
                description: values.description ? values.description : detailTools?.data?.data.description, //ok
                deliverDate: values.deliverDate ? values.deliverDate : detailTools?.data?.data.deliverDate, //ok
                orderExitTypeId: values.orderExitTypeId ? +values.orderExitTypeId : detailTools?.data?.data.orderExitTypeId, //ok
                orderTypeId: values.orderType ? +values.orderType : detailTools?.data?.data.orderTypeId, //ok
                orderSendTypeId: values.orderSendTypeId ? +values.orderSendTypeId : detailTools?.data?.data.orderSendTypeId,//ok
                paymentTypeId: values.paymentTypeId ? +values.paymentTypeId : detailTools?.data?.data.paymentTypeId, //ok
                customerOfficialName: "string",
                customerOfficialCompanyId: values.customerOfficialCompanyId ? +values.customerOfficialCompanyId : null, //NOTOK
                invoiceTypeId: values.invoiceTypeId ? values.invoiceTypeId : detailTools?.data?.data.invoiceTypeId, //ok
                isTemporary: values.isTemorary && values.isTemporary === 1 ? false : values.isTemporary === 2 ? true : detailTools?.data?.data.isTemporary,
                freightName: "string", //ok
                settlementDate: "1402/02/02", //ok
                dischargePlaceAddress: "string", //ok
                freightDriverName: "string", //ok
                carPlaque: "string", //ok
                details: orders?.map((item: any) => {
                    const orderDetails: any = {
                        rowId: item.rowId ? Number(item.rowId) : 0, //ok
                        productId: item.productId, //ok
                        warehouseId: item.warehouseId ? Number(item.warehouseId) : null, //ok
                        productBrandId: item.productBrandId ? Number(item.productBrandId) : 25, //ok
                        proximateAmount: item.proximateAmount ? Number(item.proximateAmount?.replace(/,/g, "")) : 0, //ok
                        productSubUnitAmount: item.proximateSubUnit ? +item.proximateSubUnit : 0,
                        productSubUnitId: item.productSubUnitId ? +item.productSubUnitId : null,
                        numberInPackage: item.numberInPackage ? Number(item.numberInPackage) : 0,
                        price: item.price ? Number(item.price) : null, //ok
                        cargoSendDate: "1402/01/01",
                        description: item.description,
                        purchasePrice: item.purchasePrice ? Number(item.purchasePrice) : 0,
                        purchaseInvoiceTypeId: item.purchaseInvoiceTypeId ? item.purchaseInvoiceTypeId : null,
                        // purchaserCustomerId: item.purchaserCustomerId ? item.purchaserCustomerId : null,
                        // purchaserCustomerName: item.purchaserCustomerName,
                        purchaseSettlementDate: item.purchaseSettlementDate,
                        sellerCompanyRow: item.sellerCompanyRow ? item.sellerCompanyRow : "string",
                        purchaserCustomerId: item.purchaserCustomerName?.value ? item.purchaserCustomerName?.value : item.purchaserCustomerId ? item.purchaserCustomerId : null,
                        purchaserCustomerName: item.purchaserCustomerName?.label ? item.purchaserCustomerName?.label : item.purchaserCustomerName ? item.purchaserCustomerName : null,
                        warehouseTypeId: item.warehouseTypeId,
                        
                        purchaseOrder: item?.warehouseTypeId == WarehouseType.Karkhaneh || item?.warehouseTypeId == WarehouseType.Vaseteh ? {
                            customerId: item.purchaserCustomerName?.value ? item.purchaserCustomerName?.value : item.purchaserCustomerId ? item.purchaserCustomerId : null,
                            totalAmount: 
                            +(item.purchasePrice ? Number(item.purchasePrice) : 0)
                             * 
                            +(item.proximateAmount ? Number(item.proximateAmount?.replace(/,/g, "")) : 0),
                            description: "string",
                            purchaseOrderSendTypeId: values.orderSendTypeId ? +values.orderSendTypeId : detailTools?.data?.data.orderSendTypeId,
                            invoiceTypeId: values.invoiceTypeId ? values.invoiceTypeId : detailTools?.data?.data.invoiceTypeId,

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
                                    deliverDate: item.deliverDate
                                }
                            ],
                        } : null

                    };

                    // Conditionally include id if it exists
                    if (Number.isInteger(item.id)) {
                        orderDetails.id = item.id;
                    }

                    return orderDetails;
                }),
                orderPayments: orderPayment?.map((item: IOrderPayment) => {
                    return {
                        id: item.orderPaymentId ? item.orderPaymentId : null,
                        amount: item.orderPaymentAmount && +(item.orderPaymentAmount.replace(/,/g, "")),
                        paymentDate: item.orderPaymentDate,
                        daysAfterExit: item.orderPaymentDaysAfterExit && +item.orderPaymentDaysAfterExit,
                        paymentType: item.orderPaymentType
                    }
                }),
                orderServices: orderServices.map((item: IOrderService) => {
                    return {
                        id: item.id ? item.orderServiceMainId : null,
                        serviceId: item.orderServiceId,
                        description: item.orderServiceDescription
                    }
                }) //ok
            };
            try {
                postSaleOrder.mutate(formData, {
                    onSuccess: (response) => {
                        if (response.data.Errors && response.data.Errors.length > 0) {
                            response.data.Errors.forEach((item: any) => {
                                EnqueueSnackbar(item, "error")
                            })
                        } else {
                            if (response.succeeded) {
                                Swal.fire({
                                    title: `سفارش با موفقیت ویرایش گردید`,
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
                                EnqueueSnackbar(response?.data.Message, "error")
                            }
                        }
                    }
                });
            } catch (error) {
                EnqueueSnackbar("خطای در ثبت، لطفا با پشتیبان تماس بگیرید", "error")
            }
        }
    }

    if (detailTools.isLoading) {
        return <Backdrop loading={detailTools.isLoading} />
    }

    return (
        <>
            {postSaleOrder.isLoading && <Backdrop loading={postSaleOrder.isLoading} />}
            {postSaleOrder?.data?.succeeded &&
                <Alert>
                    <Typography>
                        ویرایش سفارش {detailTools?.data?.data.orderCode} با موفقیت انجام گردید
                    </Typography>
                </Alert>
            }
            <Formik enableReinitialize innerRef={formikRef} initialValues={
                {
                    ...saleOrderEditInitialValues,
                    ...detailTools?.data?.data,
                    paymentTypeId: detailTools?.data?.data.farePaymentTypeId,
                    isTemporary: !detailTools?.data?.data.isTemporary ? 1 : 2,
                }
            } onSubmit={onSubmit}>
                {({ values, setFieldValue, handleSubmit }) => {
                    return <>
                        {/*The design of the header section of the order module includes order information and customer information */}
                        <div className="grid grid-cols-1 md:grid-cols-8 md:space-y-0 space-y-4 gap-x-4 my-4">
                            <OrderDetailBaseOrderCode postSaleOrder={postSaleOrder} detailTools={detailTools} formikRef={formikRef} orderCode={values.searchOrderCode} orderServices={orderServices} orders={orders} />
                            <div className='col-span-3'>
                                <OrderFeature categories={categories} postOrder={postSaleOrder} />
                            </div>
                            <ReusableCard cardClassName="col-span-3 flex items-center justify-center">
                                <img alt="sepehriranian" src={toAbsoulteUrl('/media/logos/3610632.jpg')} width={300} />
                            </ReusableCard>
                        </div>
                        {/*The design of the main section of the order module order */}
                        <div className="md:space-y-0 space-y-4 md:gap-x-4">
                            <ReusableCard cardClassName="col-span-3">
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
                                    setOrderValid={setOrderValid}
                                    orderValid={orderValid}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                />
                            </ReusableCard>
                        </div>
                        <div className="lg:grid lg:grid-cols-2 gap-x-4 mt-4">
                            <OrderService
                                orderService={orderServices}
                                setOrderService={setOrderServices}
                                setOrderPayment={setOrderPayment}
                                formikRef={formikRef}
                                postSaleOrder={postSaleOrder}
                                orders={orders} />
                            <OrderPayment
                                orderPayment={orderPayment}
                                orderService={orderServices}
                                postSaleOrder={postSaleOrder}
                                formikRef={formikRef}
                                orders={orders}
                                setOrderPayment={setOrderPayment} />
                        </div>
                        <div
                            className="flex gap-x-8 my-4 justify-center items-center md:justify-end md:items-end"
                        > 
                            <CustomButton
                                title={postSaleOrder.isLoading ? "در حال پردازش ...." : "ویرایش سفارش فروش"}
                                onClick={() => handleSubmit()}
                                disabled={!orderValid || orderPayment.length <= 0 || orders.length <= 0 || postSaleOrder?.data?.succeeded}
                                color="primary"
                                isLoading={postSaleOrder.isLoading}
                            />
                        </div>

                    </>
                }}
            </Formik>
        </>
    )
}

export default SalesOrderEdit