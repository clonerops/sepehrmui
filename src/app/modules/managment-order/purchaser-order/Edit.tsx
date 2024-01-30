import { useState, useRef, useEffect } from 'react'

import { Box, Typography, IconButton } from '@mui/material'
import { Formik, FormikProps } from "formik"
import Swal from 'sweetalert2'

import { orderPaymentValues, orderServiceValues, saleOrderEditInitialValues } from "./initialValues"

import ReusableCard from '../../../../_cloner/components/ReusableCard'
import OrderFeature from '../components/OrderFearure'
import OrderService from '../components/OrderService'
import OrderPayment from '../components/OrderPayment'

import { useGetOrderDetailByCode, useGetPurchaserOrderDetailByCode, useUpdateOrder, useUpdatePurchaserOrder } from '../core/_hooks'
import { useGetProductList } from '../../product/core/_hooks'
import { IOrderItems, IOrderPayment, IOrderService } from '../core/_models'
import { calculateTotalAmount } from '../helpers/functions'
import Backdrop from '../../../../_cloner/components/Backdrop'
import CustomButton from '../../../../_cloner/components/CustomButton'
import { separateAmountWithCommas } from '../../../../_cloner/helpers/SeprateAmount'
import { sliceNumberPriceRial } from '../../../../_cloner/helpers/sliceNumberPrice'
import FormikInput from '../../../../_cloner/components/FormikInput'
import { SearchRounded } from '@mui/icons-material'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { useGetWarehouses } from '../../generic/_hooks'
import OrderProductDetail from './components/OrderProductDetail'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'

const PurchaserOrderEdit = () => {

    let formikRef = useRef<FormikProps<any>>(null);

    const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
    const [orderServices, setOrderServices] = useState<IOrderService[]>([]); //OK

    const postSaleOrder = useUpdatePurchaserOrder();

    const products = useGetProductList();
    const detailTools = useGetPurchaserOrderDetailByCode()


    useEffect(() => { calculateTotalAmount(orders, orderServices) }, [orders, orderServices]);
    useEffect(() => {
        if (detailTools?.data?.data) {

            setOrderServices([
                ...detailTools?.data?.data?.orderServices?.map((i: any) => ({
                    id: i.id,
                    serviceName: i?.serviceDesc,
                    serviceId: i?.serviceId,
                    description: i?.description
                })) || []
            ]);

            setOrderPayment([
                ...detailTools?.data?.data?.orderPayments?.map((i: any) => ({
                    id: i?.id,
                    amount: separateAmountWithCommas(+i.amount),
                    // paymentDate: moment(i.paymentDate).format("jYYYY/jMM/jDD"),
                    paymentDate: i.paymentDate,
                    daysAfterExit: i.daysAfterExit
                })) || []
            ]);

            setOrders([
                ...detailTools?.data?.data?.details?.map((i: any) => ({
                    ...i,
                    productId: i.productBrand.productId,
                    productName: i.productBrand.product.productName,
                    mainUnit: i.productBrand.product.productMainUnitDesc,
                    productMainUnitDesc: i.productBrand.product.productMainUnitDesc,
                    subUnit: i.productBrand.product.productSubUnitDesc,
                    exchangeRate: +i.productBrand.product.exchangeRate,
                    purchaseSettlementDate: i.deliverDate,
                    purchasePrice: +i.purchasePrice,
                    price: i.price,
                    proximateAmount: separateAmountWithCommas(i.proximateAmount),
                    productBrandName: i.productBrand.brandName,
                    purchaserCustomerId: i.purchaserCustomerId,
                    proximateSubUnit: Math.ceil(+i.proximateAmount / +i.productBrand.product.exchangeRate)
                })) || []
            ]);

        }
    }, [detailTools?.data?.data])

    const onGetOrderDetailByCode = (orderCode: number) => {
        detailTools.mutate(orderCode, {
            onSuccess: () => {
                formikRef.current?.setFieldValue("searchOrderCode", 545)
            }
        })
    }

    const onSubmit = (values: any) => {
        if (orders?.length === 0) {
            EnqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد.", "error")
        } else {
            const formData = {
                id: detailTools?.data?.data?.id,
                customerId: detailTools?.data?.data.customer.id, //ok
                totalAmount: calculateTotalAmount(orders, orderServices),
                description: values.description ? values.description : detailTools?.data?.data.description, //ok
                exitType: values.exitType ? Number(values.exitType) : detailTools?.data?.data.exitType, //ok
                purchaseOrderSendTypeId: Number(values.orderSendTypeId),
                paymentTypeId: values.paymentTypeId ? Number(values.paymentTypeId) : detailTools?.data?.data.paymentTypeId, //ok
                productBrandId: 40,
                customerOfficialCompanyId: values.customerOfficialCompanyId ? +values.customerOfficialCompanyId : null, //NOTOK
                invoiceTypeId: detailTools?.data?.data.invoiceTypeId, //ok
                isTemporary: values.isTemorary && values.isTemporary === 1 ? false : values.isTemporary === 2 ? true : detailTools?.data?.data.isTemporary,
                details: orders?.map((item: any) => {
                    const orderDetails: any = {
                        rowId: item.rowId ? +item.rowId : 0,
                        productId: item.id,
                        productBrandId: item.productBrandId ? +item.productBrandId : 40,
                        proximateAmount: item.proximateAmount ? +item.proximateAmount?.replace(/,/g, "") : 0,
                        productSubUnitAmount: item.proximateSubUnit ? +item.proximateSubUnit : 0,
                        productSubUnitId: item.productSubUnitId ? +item.productSubUnitId : null,
                        numberInPackage: item.numberInPackage ? +item.numberInPackage : 0,
                        price: typeof item.price === "number" ? item.price : +item.price?.replace(/,/g, ""),
                        description: item.description,
                        deliverDate: item.deliverDate,
                    };

                    // Conditionally include id if it exists
                    if (Number.isInteger(item.id)) {
                        orderDetails.id = item.id;
                    }

                    return orderDetails;
                }),
                orderPayments: orderPayment?.map((item: IOrderPayment) => {
                    return {
                        id: item.id ? item.id : null,
                        amount: +item.amount.replace(/,/g, ""),
                        paymentDate: item.paymentDate,
                        daysAfterExit: Number(item.daysAfterExit),
                        paymentType: item.paymentType
                    }
                }),
                orderServices: orderServices.map((item: IOrderService) => {
                    return {
                        id: item.id ? item.id : null,
                        serviceId: item.serviceId,
                        description: item.description
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

    console.log("orders", orders)

    if (postSaleOrder.isLoading) {
        return <Backdrop loading={postSaleOrder.isLoading} />
    }

    return (
        <>
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
            <Formik enableReinitialize innerRef={formikRef} initialValues={{
                ...saleOrderEditInitialValues,
                ...orderPaymentValues,
                ...orderServiceValues,
                ...detailTools?.data?.data,
                paymentTypeId: detailTools?.data?.data.farePaymentTypeId,
                isTemporary: !detailTools?.data?.data.isTemporary ? 1 : 2
            }} onSubmit={onSubmit}>
                {({ values, setFieldValue, handleSubmit }) => {
                    return <>
                        {/*The design of the header section of the order module includes order information and customer information */}
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-8 md:space-y-0 space-y-4 gap-x-4 my-4">
                            <ReusableCard cardClassName="col-span-2">
                                <Box component="div" className="flex mt-4 gap-4">
                                    <FormikInput label="شماره سفارش" name="searchOrderCode" />
                                    <IconButton onClick={() => onGetOrderDetailByCode(values.searchOrderCode)}>
                                        <SearchRounded color="secondary" />
                                    </IconButton>
                                </Box>
                                <Box component="div" className="mt-8 space-y-8">
                                    <Box component="div" className="flex justify-between">
                                        <Typography variant="h4" className="text-gray-500">شماره سفارش</Typography>
                                        <Typography variant="h3">
                                            {detailTools?.data?.data.orderCode ? detailTools?.data?.data.orderCode : "------------------"}
                                        </Typography>
                                    </Box>
                                    <Box component="div" className="flex justify-between">
                                        <Typography variant="h4" className="text-gray-500">مشتری</Typography>
                                        <Typography variant="h3">
                                            {detailTools?.data?.data.customerName ? detailTools?.data?.data.customerName : "------------------"}
                                        </Typography>
                                    </Box>
                                    <Box component="div" className="flex justify-between">
                                        <Typography variant="h4" className="text-gray-500">تاریخ سفارش</Typography>
                                        <Typography variant="h3">
                                            {detailTools?.data?.data?.registerDate ? detailTools?.data?.data.registerDate : "------------------"}
                                        </Typography>
                                    </Box>
                                    <Box component="div" className="flex justify-between">
                                        <Typography variant="h4" className="text-gray-500">قیمت کل</Typography>
                                        <Typography variant="h3" className="text-green-500">
                                            {sliceNumberPriceRial(calculateTotalAmount(orders, orderServices))} ریال
                                        </Typography>
                                    </Box>
                                </Box>
                            </ReusableCard>
                            <Box component="div" className='col-span-3'>
                                <OrderFeature postOrder={postSaleOrder} />
                            </Box>
                            <ReusableCard cardClassName="col-span-3 flex items-center justify-center">
                                <img src={toAbsoulteUrl('/media/logos/3610632.jpg')} width={300} />
                            </ReusableCard>
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
                        <Box component="div" className="md:grid md:grid-cols-2 gap-x-4 mt-4">
                            <OrderService
                                orderService={orderServices}
                                setOrderService={setOrderServices}
                                formikRef={formikRef}
                                orders={orders} />
                            <OrderPayment
                                orderPayment={orderPayment}
                                orderService={orderServices}
                                postSaleOrder={postSaleOrder}
                                orders={orders}
                                formikRef={formikRef}
                                setOrderPayment={setOrderPayment} />
                        </Box>
                        <Box
                            component="div"
                            className="flex gap-x-8 my-4 justify-center items-center md:justify-end md:items-end"
                        >
                            <CustomButton
                                title={postSaleOrder.isLoading ? "در حال پردازش ...." : "ویرایش سفارش فروش"}
                                onClick={() => handleSubmit()}
                                color="primary"
                                isLoading={postSaleOrder.isLoading}
                            />
                        </Box>

                    </>
                }}
            </Formik>
        </>
    )
}

export default PurchaserOrderEdit