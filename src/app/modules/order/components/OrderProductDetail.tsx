import {useState} from 'react'

import { Form, FormikErrors, FormikProps } from "formik"
import {Box} from '@mui/material'

import ProductSelectedList from "./ProductSelectedList"
import { orderFieldWhenNotWarehouseMain, orderFieldWhenWarehouseIsMain } from "../sales-order/fields";
import { orderDetailParseFields } from "../sales-order/renderFields";
import { BUY_WAREHOUSE_TYPES, FIELD_VALUE } from "../helpers/constants";

import { IOrderDetail, IOrderItems, IOrderPayment, IOrderService } from "../core/_models";
import { validateAndEnqueueSnackbar } from '../sales-order/functions';
import OrderProductList from './OrderProductList';

type Props = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>
    values: any,
    postSaleOrder: any,
    products: any,
    orders: IOrderDetail[] | any,
    setOrders: React.Dispatch<React.SetStateAction<IOrderItems[]>>,
    orderPayment: IOrderPayment[],
    setOrderPayment: React.Dispatch<React.SetStateAction<IOrderPayment[]>>,
    orderService: IOrderService[],
    setOrderService: React.Dispatch<React.SetStateAction<IOrderService[]>>,
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
        orderService,
        setOrderService,
        formikRef
    } = props;

    const [isBuy, setIsBuy] = useState<boolean>(false); // OK
    const [orderIndex, setOrderIndex] = useState<number>(0); // OK
    const [isUpdate, setIsUpdate] = useState<boolean>(false); // OK
    const [isProductChoose, setIsProductChoose] = useState<boolean>(false); // OK

    const changeWarehouseFunction = (warehouseType: number, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>) => {
        try {
            const filter = {
                ByBrand: true,
                WarehouseId: warehouseType
            }
            products.mutate(filter)

            FIELD_VALUE.forEach((field) => setFieldValue(field.title, field.value));

            if (BUY_WAREHOUSE_TYPES.includes(warehouseType)) setIsBuy(true);
            else setIsBuy(false);
        } catch (error) {
            console.error("Error handling warehouse change:", error);
        }

    }

    const changeProductFunction = (value: any) => { 
        const fieldValue = [
            { title: "productBrandName", value: value?.productBrandName },
            { title: "warehouseName", value: value?.warehouseName },
            { title: "mainUnit", value: value?.productMainUnitDesc },
            { title: "subUnit", value: value?.productSubUnitDesc },
            { title: "productSubUnitId", value: value?.productSubUnitId },
        ]
        fieldValue.forEach((i: { title: string, value: any }) => setFieldValue(i.title, i.value))
        if (BUY_WAREHOUSE_TYPES.includes(value?.warehouseId)) setIsBuy(true)
        else setIsBuy(false)
    }

    const handleOrder = () => {
        const fields = ["productName", "id", "warehouseId", "warehouseTypeId", "warehouseName", "productDesc", "productBrandDesc", "purchasePrice", "purchaseSettlementDate", "purchaseInvoiceTypeId", "purchaseInvoiceTypeDesc", "sellerCompanyRow", "proximateAmount", "price", "rowId", "proximateSubUnit", "purchaserCustomerId", "purchaserCustomerName", "mainUnit", "subUnit"];

        const productOrder: IOrderItems = {
            id: formikRef?.current?.values?.productName?.value ? formikRef?.current?.values?.productName?.value : formikRef?.current?.values.id,
            productName: formikRef?.current?.values?.productName?.productName ? formikRef?.current?.values?.productName?.productName : formikRef?.current?.values?.productName,
            exchangeRate: formikRef?.current?.values?.productName?.exchangeRate ? formikRef?.current?.values?.productName?.exchangeRate : formikRef?.current?.values?.exchangeRate,
            warehouseId: formikRef?.current?.values?.productName?.warehouseId ? formikRef?.current?.values?.productName?.warehouseId : formikRef?.current?.values.warehouseId,
            productBrandName: formikRef?.current?.values?.productName?.productBrandName ? formikRef?.current?.values?.productName?.productBrandName : formikRef?.current?.values.productBrandName,
            productBrandId: formikRef?.current?.values.productName.productBrandId ? formikRef?.current?.values.productName.productBrandId : formikRef?.current?.values.productBrandId,
            // warehouseTypeId: warehouseTypeId?.warehouseTypeId,
            warehouseName: formikRef?.current?.values?.productName.warehouseName ? formikRef?.current?.values?.productName.warehouseName : formikRef?.current?.values?.warehouseName,
            productDesc: formikRef?.current?.values?.productDesc,
            purchasePrice: formikRef?.current?.values?.purchasePrice,
            purchaseSettlementDate: formikRef?.current?.values.purchaseSettlementDate,
            purchaseInvoiceTypeId: formikRef?.current?.values?.purchaseInvoiceTypeId ,
            // purchaseInvoiceTypeDesc: purchaseInvoiceTypeDesc?.desc,
            sellerCompanyRow: formikRef?.current?.values.sellerCompanyRow,
            proximateAmount: formikRef?.current?.values.proximateAmount,
            proximateSubUnit: formikRef?.current?.values.proximateSubUnit,
            purchaserCustomerId: formikRef?.current?.values.purchaserCustomerId?.value ? formikRef?.current?.values.purchaserCustomerId?.value : formikRef?.current?.values.purchaserCustomerId,
            purchaserCustomerName: formikRef?.current?.values.purchaserCustomerId?.label ? formikRef?.current?.values.purchaserCustomerId?.label : formikRef?.current?.values.purchaserCustomerName,
            mainUnit: formikRef?.current?.values.mainUnit,
            subUnit: formikRef?.current?.values.subUnit,
            productSubUnitId: formikRef?.current?.values.productSubUnitId,
            price: formikRef?.current?.values?.price,
            description: formikRef?.current?.values.productDesc,
            rowId: formikRef?.current?.values?.rowId,
        };


        if (!isUpdate) {
            const isDuplicate = orders.some(
                (order: any) =>
                    order.id === productOrder.id &&
                    order.warehouseId === productOrder.warehouseId &&
                    order.productName === productOrder.productName &&
                    order.productBrandId === productOrder.productBrandId
            );

            if (formikRef?.current?.values.productName === "" || formikRef?.current?.values.productName.label === "") {
                validateAndEnqueueSnackbar("وارد نمودن کالا الزامی می باشد", "error")
            } else if (formikRef?.current?.values?.price === "") {
                validateAndEnqueueSnackbar("وارد نمودن قیمت الزامی می باشد", "error")
            } else if (formikRef?.current?.values?.proximateAmount === "") {
                validateAndEnqueueSnackbar("وارد نمودن مقدار الزامی می باشد", "error")
            } else if (isDuplicate) {
                validateAndEnqueueSnackbar("کالا انتخاب شده در لیست سفارشات موجود و تکراری می باشد", "error")
            } else {
                setOrders([...orders, productOrder]);
                // setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount([...orders, productOrder], orderService)))
            }
            fields.forEach((element) => {
                formikRef?.current?.setFieldValue(element, "");
            });
            setIsBuy(false);
        } else {
            const updatedOrder = {
                ...productOrder,
            };
            const updatedOrders: IOrderItems[] = [...orders];
            updatedOrders[orderIndex] = updatedOrder;
            if (formikRef?.current?.values.productName === "" || formikRef?.current?.values.productName.label === "") {
                validateAndEnqueueSnackbar("وارد نمودن کالا الزامی می باشد", "error")
            } else if (formikRef?.current?.values?.price === "") {
                validateAndEnqueueSnackbar("وارد نمودن قیمت الزامی می باشد", "error")
            } else if (formikRef?.current?.values?.proximateAmount === "") {
                validateAndEnqueueSnackbar("وارد نمودن مقدار الزامی می باشد", "error")
            } else {
                setOrders(updatedOrders);
                // setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount(updatedOrders, orderService)))
            }
            setOrderIndex(0);
            fields.forEach((element) => {
                formikRef?.current?.setFieldValue(element, "");
            });
            setIsBuy(false);
            setIsUpdate(false);
        }
    };

    const fieldsToMap = isBuy ? orderFieldWhenNotWarehouseMain : orderFieldWhenWarehouseIsMain;

    return (
        <>
            <Form>
                <Box component="div" className="">
                    {fieldsToMap.map((rowFields) => (
                        <Box
                            component="div"
                            className="md:flex md:justify-between flex-warp md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                        >
                            {rowFields.map((field) =>
                                orderDetailParseFields(
                                    field,
                                    setFieldValue,
                                    values,
                                    isUpdate,
                                    postSaleOrder,
                                    isProductChoose,
                                    setIsProductChoose,
                                    products,
                                    changeWarehouseFunction,
                                    changeProductFunction,
                                    handleOrder,
                                    orders,
                                    setOrders,
                                    orderPayment,
                                    setOrderPayment,
                                    orderService,
                                    setOrderService,
                                )
                            )}
                        </Box>
                    ))}
                </Box>
                <OrderProductList
                    setSelectedOrderIndex={setOrderIndex}
                    selectedOrderIndex={orderIndex}
                    setIsUpdate={setIsUpdate}
                    setFieldValue={setFieldValue}
                    orders={orders}
                    setIsBuy={setIsBuy}
                    setOrders={setOrders}
                    disabled={postSaleOrder?.data?.succeeded}
                    products={products}
                    orderService={orderService}
                />
            </Form>
        </>
    )
}

export default OrderProductDetail