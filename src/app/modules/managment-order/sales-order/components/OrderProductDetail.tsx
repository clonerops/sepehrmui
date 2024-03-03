import {FC, memo, useCallback, useState} from 'react'
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

const fields = [
    "warehouseId", 
    "productId", 
    "proximateAmount", 
    "productSubUnitAmount",
    "price", 
    "rowId", 
    "purchaserCustomerId", 
    "purchasePrice", 
    "purchaseInvoiceTypeId", 
    "purchaseSettlementDate",
    "detailDescription", 
];


console.log("OrderProductDetail is rendered")

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

    const changeWarehouseFunction = useCallback((warehouseType: number) => {
        try {
          const filter = {
            ByBrand: true,
            WarehouseId: warehouseType
          };
          products.mutate(filter);
    
          FIELD_VALUE.forEach((field) => formikRef.current?.setFieldValue(field.title, field.value));
    
          setState((prev) => ({
            ...prev,
            isBuy: BUY_WAREHOUSE_TYPES.includes(warehouseType),
            isProductChoose: false,
          }));
        } catch (error) {
          console.error("Error handling warehouse change:", error);
        }
      }, [products, formikRef, setState]);

    
    const changeProductFunction = useCallback((value: any) => {
        const fieldValue = [
          { title: "productBrandName", value: value?.productBrandName },
          { title: "warehouseName", value: value?.warehouseName },
          { title: "productMainUnitDesc", value: value?.productMainUnitDesc },
          { title: "productSubUnitDesc", value: value?.productSubUnitDesc },
          { title: "productSubUnitId", value: value?.productSubUnitId },
        ];
    
        // formikRef.current?.setValues((prevValues: any) => {
        formikRef.current?.setValues((prevValues: any) => {
          const updatedValues = { ...prevValues };
          fieldValue.forEach((i: { title: string; value: any }) => {
            updatedValues[i.title] = i.value;
          });
    
          return updatedValues;
        });
    
        setState((prev) => ({
          ...prev,
          isBuy: BUY_WAREHOUSE_TYPES.includes(value?.warehouseId),
        }));
      }, [formikRef, setState]);
    
    const handleOrder = () => {
        const productOrder: IOrderItems = {
            id: formikRef?.current?.values?.productId?.value ? formikRef?.current?.values?.productId?.value : formikRef?.current?.values.id,
            rowId: formikRef?.current?.values?.rowId,
            productId: formikRef?.current?.values?.productId?.value ? formikRef?.current?.values?.productId?.value : formikRef?.current?.values.id,
            warehouseId: formikRef?.current?.values?.productId?.warehouseId ? formikRef?.current?.values?.productId?.warehouseId : formikRef?.current?.values.warehouseId,
            proximateAmount: formikRef?.current?.values.proximateAmount,
            price: formikRef?.current?.values?.price,
            productName: formikRef?.current?.values?.productId?.label ? formikRef?.current?.values?.productId?.label : formikRef?.current?.values?.productId.label,
            purchasePrice: formikRef?.current?.values?.purchasePrice,
            productBrandId: formikRef?.current?.values.productId.productBrandId ? formikRef?.current?.values.productId.productBrandId : formikRef?.current?.values.productBrandId,
            productSubUnitId: formikRef?.current?.values.productSubUnitId,
            proximateSubUnit: formikRef?.current?.values.productSubUnitAmount,
            purchaseInvoiceTypeId: formikRef?.current?.values?.purchaseInvoiceTypeId ,
            purchaserCustomerId: formikRef?.current?.values.purchaserCustomerId?.value ? formikRef?.current?.values.purchaserCustomerId?.value : formikRef?.current?.values.purchaserCustomerId,
            sellerCompanyRow: formikRef?.current?.values.sellerCompanyRow,
            purchaseSettlementDate: formikRef?.current?.values.purchaseSettlementDate,
            description: formikRef?.current?.values.detailDescription,
            
            exchangeRate: formikRef?.current?.values?.productId?.exchangeRate ? formikRef?.current?.values?.productId?.exchangeRate : formikRef?.current?.values?.exchangeRate,
            productBrandName: formikRef?.current?.values?.productId?.productBrandName ? formikRef?.current?.values?.productId?.productBrandName : formikRef?.current?.values.productBrandName,
            warehouseName: formikRef?.current?.values?.productId.warehouseName ? formikRef?.current?.values?.productId.warehouseName : formikRef?.current?.values?.warehouseName,
            purchaserCustomerName: formikRef?.current?.values.purchaserCustomerId?.label ? formikRef?.current?.values.purchaserCustomerId?.label : formikRef?.current?.values.purchaserCustomerName,
            productMainUnitDesc: formikRef?.current?.values.productMainUnitDesc,
            productSubUnitDesc: formikRef?.current?.values.productSubUnitDesc,
        };
        console.log(formikRef?.current?.values?.productId)
        formikRef?.current?.setValues((prevValues: any) => {
            return {
              ...prevValues,
              productId: null,
            };
          });
                  formikRef?.current?.setFieldValue("warehouseId", "")

        // if (!state.isUpdate) {
        //     const isDuplicate = orders.some(
        //         (order: any) =>
        //             order.id === productOrder.id &&
        //             order.warehouseId === productOrder.warehouseId &&
        //             order.productId === productOrder.productId &&
        //             order.productBrandId === productOrder.productBrandId
        //     );

        //     if (formikRef?.current?.values.productId === "" || formikRef?.current?.values.productId.label === "") {
        //         EnqueueSnackbar("وارد نمودن کالا الزامی می باشد", "error")
        //     } else if (formikRef?.current?.values?.price === "") {
        //         EnqueueSnackbar("وارد نمودن قیمت الزامی می باشد", "error")
        //     } else if (formikRef?.current?.values?.proximateAmount === "") {
        //         EnqueueSnackbar("وارد نمودن مقدار الزامی می باشد", "error")
        //     } else if (isDuplicate) {
        //         EnqueueSnackbar("کالا انتخاب شده در لیست سفارشات موجود و تکراری می باشد", "error")
        //     } else {
        //         setOrders([...orders, productOrder]);
        //         formikRef.current?.setFieldValue("orderPaymentAmount", sliceNumberPriceRial( calculateTotalAmount([...orders, productOrder], orderServices)))
        //     }
        //     formikRef?.current?.setFieldValue("proximateAmount", "0");
        //     formikRef?.current?.setFieldValue("price", "0");
        //     fields.forEach((element) => {
        //         formikRef?.current?.setFieldValue(element, "");
        //     });
        //     setState((prev) => ({...prev, isBuy: false}))
        // } else {
        //     const updatedOrder = {
        //         ...productOrder,
        //     };
        //     const updatedOrders: IOrderItems[] = [...orders];
        //     updatedOrders[state.orderIndex ? state.orderIndex : 0] = updatedOrder;
        //     if (formikRef?.current?.values.productId === "" || formikRef?.current?.values.productId.label === "") {
        //         EnqueueSnackbar("وارد نمودن کالا الزامی می باشد", "error")
        //     } else if (formikRef?.current?.values?.price === "") {
        //         EnqueueSnackbar("وارد نمودن قیمت الزامی می باشد", "error")
        //     } else if (formikRef?.current?.values?.proximateAmount === "") {
        //         EnqueueSnackbar("وارد نمودن مقدار الزامی می باشد", "error")
        //     } else {
        //         setOrders(updatedOrders);
        //         formikRef.current?.setFieldValue("orderPaymentAmount", sliceNumberPriceRial(calculateTotalAmount(updatedOrders, orderServices)))
        //     }
        //     setState((prev) => ({...prev, orderIndex: 0}))
        //     formikRef?.current?.setFieldValue("proximateAmount", "0");
        //     formikRef?.current?.setFieldValue("price", "0");
        //     fields.forEach((element) => {
        //         formikRef?.current?.setFieldValue(element, "");
        //     });
        //     setState((prev) => ({...prev, isBuy: false, isUpdate: false}))
        // }
    };

    const fieldsToMap = state.isBuy ? orderFieldWhenNotWarehouseMain : orderFieldWhenWarehouseIsMain;

    return (
        <>
            {products.isLoading && <Backdrop loading={products.isLoading} />}
            <form>
                <div className="">
                    {fieldsToMap.map((rowFields, index) => (
                        <div
                            key={index}
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
                        </div>
                    ))}
                </div>
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
            </form>
        </>
    )
}

export default memo(OrderProductDetail)