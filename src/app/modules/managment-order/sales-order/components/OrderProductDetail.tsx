import {FC, useState} from 'react'
import { Form, FormikProps } from "formik"
import {Box} from '@mui/material'

import OrderProductList from './OrderProductList'
import Backdrop from '../../../../../_cloner/components/Backdrop'

import { ISaleOrderDetail, IOrderItems, IOrderPayment, IOrderService } from '../../core/_models'
import { BUY_WAREHOUSE_TYPES, FIELD_VALUE } from '../../helpers/constants'
import { calculateTotalAmount } from '../../helpers/functions'
import { sliceNumberPriceRial } from '../../../../../_cloner/helpers/sliceNumberPrice'
import { orderFieldWhenNotWarehouseMain, orderFieldWhenWarehouseIsMain } from '../../sales-order/fields'
import { orderDetailParseFields } from '../../sales-order/renderFields'
import { EnqueueSnackbar } from '../../../../../_cloner/helpers/Snackebar'


interface IProps {
    postSaleOrder: any,
    products: any,
    orders: ISaleOrderDetail[] | any,
    setOrders: React.Dispatch<React.SetStateAction<IOrderItems[]>>,
    orderPayment: IOrderPayment[],
    setOrderPayment: React.Dispatch<React.SetStateAction<IOrderPayment[]>>,
    orderServices: IOrderService[],
    setOrderServices: React.Dispatch<React.SetStateAction<IOrderService[]>>,
    formikRef: React.RefObject<FormikProps<any>>,
    setOrderValid: React.Dispatch<React.SetStateAction<boolean>>
}

interface IState {
    isBuy: boolean,
    orderIndex: number,
    isUpdate: boolean,
    isProductChoose: boolean
}

const OrderProductDetail:FC<IProps> = ({ postSaleOrder, products, orders, setOrders, orderPayment, setOrderPayment, orderServices, setOrderServices, formikRef, setOrderValid }) => {

    const [state, setState] = useState<IState>({
        isBuy: false,
        orderIndex: 0,
        isUpdate: false,
        isProductChoose: false
    })

    const changeWarehouseFunction = (warehouseType: number) => {
        try {
            const filter = {
                ByBrand: true,
                WarehouseId: warehouseType
            }
            products.mutate(filter)

            FIELD_VALUE.forEach((field) => formikRef.current?.setFieldValue(field.title, field.value));

            if (BUY_WAREHOUSE_TYPES.includes(warehouseType)) setState((prev) => ({...prev, isBuy: true}));
            else setState((prev) => ({...prev, isProductChoose: false, isBuy: false}))
        } catch (error) {
            console.error("Error handling warehouse change:", error);
        }

    }

    const changeProductFunction = (value: any) => { 
        const fieldValue = [
            { title: "productBrandName", value: value?.productBrandName },
            { title: "warehouseName", value: value?.warehouseName },
            { title: "productMainUnitDesc", value: value?.productMainUnitDesc },
            { title: "productSubUnitDesc", value: value?.productSubUnitDesc },
            { title: "productSubUnitId", value: value?.productSubUnitId },
        ]
        fieldValue.forEach((i: { title: string, value: any }) => formikRef.current?.setFieldValue(i.title, i.value))
        if (BUY_WAREHOUSE_TYPES.includes(value?.warehouseId)) setState((prev) => ({...prev, isBuy: true}))
        else setState((prev) => ({...prev, isBuy: false}))
    }

    const handleOrder = () => {
        const fields = ["productName", "id", "warehouseId", "warehouseTypeId", "warehouseName", "productDesc", "productBrandDesc", "purchasePrice", "purchaseSettlementDate", "purchaseInvoiceTypeId", "purchaseInvoiceTypeDesc", "sellerCompanyRow", "rowId", "proximateSubUnit", "purchaserCustomerId", "purchaserCustomerName", "productMainUnitDesc", "productSubUnitDesc"];

        const productOrder: IOrderItems = {
            id: formikRef?.current?.values?.productName?.value ? formikRef?.current?.values?.productName?.value : formikRef?.current?.values.id,
            productId: formikRef?.current?.values?.productName?.value ? formikRef?.current?.values?.productName?.value : formikRef?.current?.values.id,
            productName: formikRef?.current?.values?.productName?.productName ? formikRef?.current?.values?.productName?.productName : formikRef?.current?.values?.productName,
            exchangeRate: formikRef?.current?.values?.productName?.exchangeRate ? formikRef?.current?.values?.productName?.exchangeRate : formikRef?.current?.values?.exchangeRate,
            warehouseId: formikRef?.current?.values?.productName?.warehouseId ? formikRef?.current?.values?.productName?.warehouseId : formikRef?.current?.values.warehouseId,
            productBrandName: formikRef?.current?.values?.productName?.productBrandName ? formikRef?.current?.values?.productName?.productBrandName : formikRef?.current?.values.productBrandName,
            productBrandId: formikRef?.current?.values.productName.productBrandId ? formikRef?.current?.values.productName.productBrandId : formikRef?.current?.values.productBrandId,
            warehouseName: formikRef?.current?.values?.productName.warehouseName ? formikRef?.current?.values?.productName.warehouseName : formikRef?.current?.values?.warehouseName,
            productDesc: formikRef?.current?.values?.productDesc,
            purchasePrice: formikRef?.current?.values?.purchasePrice,
            purchaseSettlementDate: formikRef?.current?.values.purchaseSettlementDate,
            purchaseInvoiceTypeId: formikRef?.current?.values?.purchaseInvoiceTypeId ,
            sellerCompanyRow: formikRef?.current?.values.sellerCompanyRow,
            proximateAmount: formikRef?.current?.values.proximateAmount,
            proximateSubUnit: formikRef?.current?.values.proximateSubUnit,
            purchaserCustomerId: formikRef?.current?.values.purchaserCustomerName?.value ? formikRef?.current?.values.purchaserCustomerName?.value : formikRef?.current?.values.purchaserCustomerId,
            purchaserCustomerName: formikRef?.current?.values.purchaserCustomerName?.label ? formikRef?.current?.values.purchaserCustomerName?.label : formikRef?.current?.values.purchaserCustomerName,
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
                formikRef.current?.setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount([...orders, productOrder], orderServices)))
            }
            formikRef?.current?.setFieldValue("proximateAmount", "0");
            formikRef?.current?.setFieldValue("price", "0");
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
                formikRef.current?.setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount(updatedOrders, orderServices)))
            }
            setState((prev) => ({...prev, orderIndex: 0}))
            formikRef?.current?.setFieldValue("proximateAmount", "0");
            formikRef?.current?.setFieldValue("price", "0");
            fields.forEach((element) => {
                formikRef?.current?.setFieldValue(element, "");
            });
            setState((prev) => ({...prev, isBuy: false, isUpdate: false}))
        }
    };

    const fieldsToMap = state.isBuy ? orderFieldWhenNotWarehouseMain : orderFieldWhenWarehouseIsMain;

    return (
        <>
            {products.isLoading && <Backdrop loading={products.isLoading} />}
            <Form>
                <Box component="div" className="">
                    {fieldsToMap.map((rowFields, index) => (
                        <Box
                            key={index}
                            component="div"
                            className="md:flex md:justify-between flex-warp md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                        >
                            {rowFields.map((field, index) =>
                                orderDetailParseFields(
                                    index,
                                    field,
                                    state.isUpdate ? state.isUpdate : false,
                                    postSaleOrder,
                                    formikRef,
                                    state.isProductChoose ? state.isProductChoose : false,
                                    setState,
                                    products,
                                    changeWarehouseFunction,
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
                    orders={orders}
                    setOrders={setOrders}
                    disabled={postSaleOrder?.data?.succeeded}
                    products={products}
                    orderServices={orderServices}
                    setOrderPayment={setOrderPayment}
                    setState={setState}
                    formikRef={formikRef}
                    setOrderValid={setOrderValid}
                />
            </Form>
        </>
    )
}

export default OrderProductDetail