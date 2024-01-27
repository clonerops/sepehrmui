import {useEffect, useState} from 'react'

import { Form, FormikErrors, FormikProps } from "formik"
import {Box} from '@mui/material'
import OrderProductList from './OrderProductList'
import { ISaleOrderDetail, IOrderItems, IOrderPayment, IOrderService } from '../../core/_models'
import { calculateTotalAmount } from '../../helpers/functions'
import { sliceNumberPriceRial } from '../../../../../_cloner/helpers/sliceNumberPrice'
import { orderField } from '../fields'
import { orderDetailParseFields } from '../renderFields'
import { EnqueueSnackbar } from '../../../../../_cloner/helpers/Snackebar'


type Props = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>
    values: any,
    postSaleOrder: any,
    products: any,
    orders: ISaleOrderDetail[] | any,
    setOrders: React.Dispatch<React.SetStateAction<IOrderItems[]>>,
    orderPayment: IOrderPayment[],
    setOrderPayment: React.Dispatch<React.SetStateAction<IOrderPayment[]>>,
    orderServices: IOrderService[],
    setOrderServices: React.Dispatch<React.SetStateAction<IOrderService[]>>,
    formikRef: React.RefObject<FormikProps<any>>
}

const OrderProductDetail = (props: Props) => {
    const {
        setFieldValue,
        values,
        postSaleOrder,
        products,
        orders,
        setOrders,
        orderPayment,
        setOrderPayment,
        orderServices,
        setOrderServices,
        formikRef
    } = props;

    const [state, setState] = useState<{
        isBuy: boolean,
        orderIndex: number,
        isUpdate: boolean,
        isProductChoose: boolean

    }>({
        isBuy: false,
        orderIndex: 0,
        isUpdate: false,
        isProductChoose: false
    })

    useEffect(() => {
        const filter = {
            ByBrand: true,
        }
        products.mutate(filter)
    }, [])

    const changeProductFunction = (value: any) => { 
        const fieldValue = [
            { title: "productBrandName", value: value?.productBrandName },
            { title: "warehouseName", value: value?.warehouseName },
            { title: "productMainUnitDesc", value: value?.productMainUnitDesc },
            { title: "productSubUnitDesc", value: value?.productSubUnitDesc },
            { title: "productSubUnitId", value: value?.productSubUnitId },
        ]
        fieldValue.forEach((i: { title: string, value: any }) => setFieldValue(i.title, i.value))
    }

    const handleOrder = () => {
        const fields = ["productName", "id", "warehouseId", "warehouseTypeId", "warehouseName", "productDesc", "productBrandDesc", "purchasePrice", "purchaseSettlementDate", "purchaseInvoiceTypeId", "purchaseInvoiceTypeDesc", "sellerCompanyRow", "proximateAmount", "price", "rowId", "proximateSubUnit", "purchaserCustomerId", "purchaserCustomerName", "productMainUnitDesc", "productSubUnitDesc"];


        console.log('formikRef?.current?.values', formikRef?.current?.values)

        const productOrder: IOrderItems = {
            id: formikRef?.current?.values?.productName?.value ? formikRef?.current?.values?.productName?.value : formikRef?.current?.values.id,
            productName: formikRef?.current?.values?.productName?.label ? formikRef?.current?.values?.productName?.label : formikRef?.current?.values?.productName,
            exchangeRate: formikRef?.current?.values?.productName?.exchangeRate ? formikRef?.current?.values?.productName?.exchangeRate : formikRef?.current?.values?.exchangeRate,
            warehouseId: formikRef?.current?.values?.productName?.warehouseId ? formikRef?.current?.values?.productName?.warehouseId : formikRef?.current?.values.warehouseId,
            productBrandName: formikRef?.current?.values?.productName?.productBrandName ? formikRef?.current?.values?.productName?.productBrandName : formikRef?.current?.values.productBrandName,
            productBrandId: formikRef?.current?.values.productName.productBrandId ? formikRef?.current?.values.productName.productBrandId : formikRef?.current?.values.productBrandId,
            warehouseName: formikRef?.current?.values?.productName.warehouseName ? formikRef?.current?.values?.productName.warehouseName : formikRef?.current?.values?.warehouseName,
            productDesc: formikRef?.current?.values?.productDesc,
            purchasePrice: formikRef?.current?.values?.purchasePrice,
            purchaseSettlementDate: formikRef?.current?.values.settlementDate,
            purchaseInvoiceTypeId: formikRef?.current?.values?.purchaseInvoiceTypeId ,
            sellerCompanyRow: formikRef?.current?.values.sellerCompanyRow,
            proximateAmount: formikRef?.current?.values.proximateAmount,
            proximateSubUnit: formikRef?.current?.values.proximateSubUnit,
            purchaserCustomerId: formikRef?.current?.values.purchaserCustomerId?.value ? formikRef?.current?.values.purchaserCustomerId?.value : formikRef?.current?.values.purchaserCustomerId,
            purchaserCustomerName: formikRef?.current?.values.purchaserCustomerId?.label ? formikRef?.current?.values.purchaserCustomerId?.label : formikRef?.current?.values.purchaserCustomerName,
            productMainUnitDesc: formikRef?.current?.values.productMainUnitDesc,
            productSubUnitDesc: formikRef?.current?.values.productSubUnitDesc,
            productSubUnitId: formikRef?.current?.values.productSubUnitId,
            price: formikRef?.current?.values?.price,
            description: formikRef?.current?.values.productDesc,
            rowId: formikRef?.current?.values?.rowId,
        };

        if (!state.isUpdate) {
            const isDuplicate = orders.some(
                (order: any) =>
                    order.id === productOrder.id &&
                    order.warehouseId === productOrder.warehouseId &&
                    order.productName === productOrder.productName &&
                    order.productBrandId === productOrder.productBrandId
            );

            if (formikRef?.current?.values.productName === "" || formikRef?.current?.values.productName.label === "") {
                EnqueueSnackbar("وارد نمودن کالا الزامی می باشد", "error")
            } else if (formikRef?.current?.values?.price === "") {
                EnqueueSnackbar("وارد نمودن قیمت الزامی می باشد", "error")
            } else if (formikRef?.current?.values?.proximateAmount === "") {
                EnqueueSnackbar("وارد نمودن مقدار الزامی می باشد", "error")
            } else if (isDuplicate) {
                EnqueueSnackbar("کالا انتخاب شده در لیست سفارشات موجود و تکراری می باشد", "error")
            } else {
                setOrders([...orders, productOrder]);
                setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount([...orders, productOrder], orderServices)))
            }
            fields.forEach((element) => {
                formikRef?.current?.setFieldValue(element, "");
            });
            setState((prev) => ({...prev, isBuy: false}))
        } else {
            const updatedOrder = {
                ...productOrder,
            };
            const updatedOrders: IOrderItems[] = [...orders];
            updatedOrders[state.orderIndex ? state.orderIndex : 0] = updatedOrder;
            if (formikRef?.current?.values.productName === "" || formikRef?.current?.values.productName.label === "") {
                EnqueueSnackbar("وارد نمودن کالا الزامی می باشد", "error")
            } else if (formikRef?.current?.values?.price === "") {
                EnqueueSnackbar("وارد نمودن قیمت الزامی می باشد", "error")
            } else if (formikRef?.current?.values?.proximateAmount === "") {
                EnqueueSnackbar("وارد نمودن مقدار الزامی می باشد", "error")
            } else {
                setOrders(updatedOrders);
                setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount(updatedOrders, orderServices)))
            }
            setState((prev) => ({...prev, orderIndex: 0}))
            fields.forEach((element) => {
                formikRef?.current?.setFieldValue(element, "");
            });
            setState((prev) => ({...prev,  isUpdate: false}))
        }
    };


    return (
        <>
            <Form>
                <Box component="div" className="">
                    {orderField.map((rowFields, index) => (
                        <Box
                            key={index}
                            component="div"
                            className="md:flex md:justify-between flex-warp md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                        >
                            {rowFields.map((field, index) =>
                                orderDetailParseFields(
                                    index,
                                    field,
                                    setFieldValue,
                                    values,
                                    state.isUpdate ? state.isUpdate : false,
                                    postSaleOrder,
                                    state.isProductChoose ? state.isProductChoose : false,
                                    setState,
                                    products,
                                    changeProductFunction,
                                    handleOrder,
                                    orders,
                                    setOrders,
                                    orderPayment,
                                    setOrderPayment,
                                    orderServices,
                                    setOrderServices,
                                )
                            )}
                        </Box>
                    ))}
                </Box>
                <OrderProductList
                    selectedOrderIndex={state.orderIndex}
                    setFieldValue={setFieldValue}
                    orders={orders}
                    setOrders={setOrders}
                    disabled={postSaleOrder?.data?.succeeded}
                    products={products}
                    orderServices={orderServices}
                    setOrderPayment={setOrderPayment}
                    setState={setState}
                />
            </Form>
        </>
    )
}

export default OrderProductDetail