import { useState, useRef, useEffect } from 'react'

import { Box, Typography, IconButton } from '@mui/material'
import { Formik, FormikProps } from "formik"
import Swal from 'sweetalert2'

import { saleOrderInitialValues, orderPaymentValues, orderServiceValues, saleOrderEditInitialValues } from "./initialValues"
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
import { useCreateOrder, useGetOrderDetailByCode, useUpdateOrder } from '../core/_hooks'
import { saleOrderParseFields } from './renderFields'
import { useGetCustomer } from '../../customer/core/_hooks'
import { useGetProductList } from '../../product/core/_hooks'
import { IOrderItems, IOrderPayment, IOrderService } from '../core/_models'
import { calculateTotalAmount } from '../helpers/functions'
import Backdrop from '../../../../_cloner/components/Backdrop'
import CustomButton from '../../../../_cloner/components/CustomButton'
import { validateAndEnqueueSnackbar } from './functions'
import { separateAmountWithCommas } from '../../../../_cloner/helpers/SeprateAmount'
import { sliceNumberPriceRial } from '../../../../_cloner/helpers/sliceNumberPrice'
import FormikInput from '../../../../_cloner/components/FormikInput'
import { SearchRounded } from '@mui/icons-material'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { useGetWarehouses } from '../../generic/_hooks'

const SalesOrderEdit = () => {

    let formikRef = useRef<FormikProps<any>>(null);

    const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
    const [orderServices, setOrderServices] = useState<IOrderService[]>([]); //OK

    const postSaleOrder = useUpdateOrder();

    const products = useGetProductList();
    const detailTools = useGetOrderDetailByCode()
    const { data: warehouse } = useGetWarehouses();


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
                    mainUnit: i.product.productMainUnitDesc,
                    productMainUnitDesc: i.product.productMainUnitDesc,
                    subUnit: i.product.productSubUnitDesc,
                    exchangeRate: +i.product.exchangeRate,
                    purchasePrice: +i.purchasePrice,
                    warehouseId: warehouse.find((item: any) => item.name === i.warehouseName).id,
                    price: separateAmountWithCommas(i.price),
                    proximateAmount: separateAmountWithCommas(i.proximateAmount),
                    productBrandName: i.brandName,
                    purchaserCustomerId: i.purchaserCustomerId,
                    // purchaserCustomerName: customers.data.find((item: any) => item.id === i.purchaserCustomerId)?.firstName+" "+customers.data.find((item: any) => item.id === i.purchaserCustomerId)?.lastName,
                    proximateSubUnit: Math.ceil(+i.proximateAmount / +i.product.exchangeRate)
                })) || []
            ]);

        }
    }, [detailTools?.data?.data])

    console.log(detailTools?.data?.data?.orderPayments)

    const onGetOrderDetailByCode = (orderCode: number) => {
        detailTools.mutate(orderCode, {
            onSuccess: () => {
                formikRef.current?.setFieldValue("searchOrderCode", 545)
            }
        })
    }

    console.log(orderPayment)


    const onSubmit = (values: any) => {
        if (orders?.length === 0) {
            validateAndEnqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد.", "error")
        } else {
            const formData = {
                id: detailTools?.data?.data?.id,
                productBrandId: 25,
                customerId: detailTools?.data?.data.customer.id, //ok
                totalAmount: calculateTotalAmount(orders, orderServices), //ok
                description: values.description ? values.description : detailTools?.data?.data.description, //ok
                exitType: values.exitType ? Number(values.exitType) : detailTools?.data?.data.exitType, //ok
                orderSendTypeId: values.orderSendTypeId ? Number(values.orderSendTypeId) : detailTools?.data?.data.orderSendTypeId,//ok
                paymentTypeId: values.paymentTypeId ? Number(values.paymentTypeId) : detailTools?.data?.data.paymentTypeId, //ok
                customerOfficialName: "string",
                customerOfficialCompanyId: values.customerOfficialCompanyId ? +values.customerOfficialCompanyId : null, //NOTOK
                invoiceTypeId: detailTools?.data?.data.invoiceTypeId, //ok
                // isTemporary: values.isTemporary === ? values.isTemporary : detailTools?.data?.data.isTemporary, //ok
                isTemporary: values.isTemorary && values.isTemporary === 1 ? false : values.isTemporary === 2 ? true : detailTools?.data?.data.isTemporary ,
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
                        numberInPackage: item.numberInPackage ? Number(item.numberInPackage) : 0,
                        price: item.price ? Number(item.price?.replace(/,/g, "")) : null, //ok
                        cargoSendDate: "1402/01/01",
                        description: item.description,
                        purchasePrice: item.purchasePrice ? Number(item.purchasePrice) : 0,
                        purchaseInvoiceTypeId: item.purchaseInvoiceTypeId ? item.purchaseInvoiceTypeId : null,
                        purchaserCustomerId: item.purchaserCustomerName?.value ? item.purchaserCustomerName?.value : null,
                        purchaseSettlementDate: item.purchaseSettlementDate,
                        sellerCompanyRow: item.sellerCompanyRow ? item.sellerCompanyRow : "string",
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
                        if(response.data.Errors && response.data.Errors.length >0) {
                            response.data.Errors.forEach((item: any) => {
                                validateAndEnqueueSnackbar(item, "error")
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
                                validateAndEnqueueSnackbar(response?.data.Message, "error")
                            }
                        }
                    }
                });
            } catch (error) {
                validateAndEnqueueSnackbar("خطای در ثبت، لطفا با پشتیبان تماس بگیرید", "error")
            }
        }
    }

    if (postSaleOrder.isLoading) {
        return <Backdrop loading={postSaleOrder.isLoading} />
    }

    return (
        <>
            <Formik enableReinitialize innerRef={formikRef} initialValues={{ 
                ...saleOrderEditInitialValues, 
                ...orderPaymentValues, 
                ...orderServiceValues, 
                ...detailTools?.data?.data,
                isTemporary: !detailTools?.data?.data.isTemporary ? 1 : 2  }} onSubmit={onSubmit}>
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
                                <OrderFeature postSaleOrder={postSaleOrder} />
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
                            <OrderService orderService={orderServices} setOrderService={setOrderServices} values={values} setFieldValue={setFieldValue} orders={orders} />
                            <OrderPayment orderPayment={orderPayment} orderService={orderServices} postSaleOrder={postSaleOrder} orders={orders} setFieldValue={setFieldValue} values={values} setOrderPayment={setOrderPayment} />
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

export default SalesOrderEdit