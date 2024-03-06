import {useEffect, useState} from 'react'

import { Form, FormikErrors, FormikProps } from "formik"
import {Box, Button, InputAdornment, Typography} from '@mui/material'
import OrderProductList from './OrderProductList'
import { ISaleOrderDetail, IOrderItems, IOrderPayment, IOrderService } from '../../core/_models'
import { calculateTotalAmount } from '../../helpers/functions'
import { sliceNumberPriceRial } from '../../../../../_cloner/helpers/sliceNumberPrice'
import { orderField } from '../fields'
import { orderDetailParseFields } from '../renderFields'
import { EnqueueSnackbar } from '../../../../../_cloner/helpers/Snackebar'
import FormikProductBrand from '../../../../../_cloner/components/FormikProductBrandComboSelect'
import FormikProximateAmount from '../../../../../_cloner/components/FormikProximateAmount'
import FormikInput from '../../../../../_cloner/components/FormikInput'
import FormikPrice from '../../../../../_cloner/components/FormikPrice'
import FormikDatepicker from '../../../../../_cloner/components/FormikDatepicker'
import { Add, Edit } from '@mui/icons-material'

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
    "deliverDate",
];


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

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [orderIndex, setOrderIndex] = useState<number>(0);

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
        const productOrder: any = {
            id: values?.productId?.value ? values?.productId?.value : values.id,
            rowId: values?.rowId,
            productId: values?.productId?.value ? values?.productId?.value : values.productId,
            warehouseId: values?.productId?.warehouseId ? values?.productId?.warehouseId : values.warehouseId,
            warehouseTypeId: values?.productId?.warehouseTypeId ? values?.productId?.warehouseTypeId : values.warehouseTypeId,
            proximateAmount: values.proximateAmount,
            price: values?.price.replace(/,/g, ""),
            productName: values?.productId?.label ? values?.productId?.label : values?.productName,
            purchasePrice: values?.purchasePrice.replace(/,/g, ""),
            productBrandId: values.productId.productBrandId ? values.productId.productBrandId : values.productBrandId,
            productSubUnitId: values?.productId?.productSubUnitId ? values?.productId?.productSubUnitId : values.productSubUnitId,
            proximateSubUnit: values.productSubUnitAmount ? values.productSubUnitAmount : values.proximateSubUnit,
            purchaseInvoiceTypeId: values?.purchaseInvoiceTypeId,
            purchaserCustomerId: values.purchaserCustomerId?.value ? values.purchaserCustomerId?.value : values.purchaserCustomerId,
            sellerCompanyRow: values.sellerCompanyRow,
            purchaseSettlementDate: values.purchaseSettlementDate,
            description: values.detailDescription ? values.detailDescription : values.productDesc,
            deliverDate: values.deliverDate ? values.deliverDate : values.deliverDate,

            exchangeRate: values?.productId?.exchangeRate ? values?.productId?.exchangeRate : values?.exchangeRate,
            productBrandName: values?.productId?.productBrandName ? values?.productId?.productBrandName : values.productBrandName,
            warehouseName: values?.productId.warehouseName ? values?.productId.warehouseName : values?.warehouseName,
            purchaserCustomerName: values.purchaserCustomerId?.label ? values.purchaserCustomerId?.label : values.purchaserCustomerName,
            productMainUnitDesc: values.productId.productMainUnitDesc ? values.productId.productMainUnitDesc : values.productMainUnitDesc,
            productSubUnitDesc: values.productId.productSubUnitDesc ? values.productId.productSubUnitDesc : values.productSubUnitDesc,



            // id: formikRef?.current?.values?.productName?.value ? formikRef?.current?.values?.productName?.value : formikRef?.current?.values.id,
            // productName: formikRef?.current?.values?.productName?.label ? formikRef?.current?.values?.productName?.label : formikRef?.current?.values?.productName,
            // exchangeRate: formikRef?.current?.values?.productName?.exchangeRate ? formikRef?.current?.values?.productName?.exchangeRate : formikRef?.current?.values?.exchangeRate,
            // warehouseId: formikRef?.current?.values?.productName?.warehouseId ? formikRef?.current?.values?.productName?.warehouseId : formikRef?.current?.values.warehouseId,
            // productBrandName: formikRef?.current?.values?.productName?.productBrandName ? formikRef?.current?.values?.productName?.productBrandName : formikRef?.current?.values.productBrandName,
            // productBrandId: formikRef?.current?.values.productName.productBrandId ? formikRef?.current?.values.productName.productBrandId : formikRef?.current?.values.productBrandId,
            // warehouseName: formikRef?.current?.values?.productName.warehouseName ? formikRef?.current?.values?.productName.warehouseName : formikRef?.current?.values?.warehouseName,
            // productDesc: formikRef?.current?.values?.productDesc,
            // purchasePrice: formikRef?.current?.values?.purchasePrice,
            // purchaseSettlementDate: formikRef?.current?.values.settlementDate,
            // purchaseInvoiceTypeId: formikRef?.current?.values?.purchaseInvoiceTypeId ,
            // sellerCompanyRow: formikRef?.current?.values.sellerCompanyRow,
            // proximateAmount: formikRef?.current?.values.proximateAmount,
            // proximateSubUnit: formikRef?.current?.values.proximateSubUnit,
            // purchaserCustomerId: formikRef?.current?.values.purchaserCustomerId?.value ? formikRef?.current?.values.purchaserCustomerId?.value : formikRef?.current?.values.purchaserCustomerId,
            // purchaserCustomerName: formikRef?.current?.values.purchaserCustomerId?.label ? formikRef?.current?.values.purchaserCustomerId?.label : formikRef?.current?.values.purchaserCustomerName,
            // productMainUnitDesc: formikRef?.current?.values.productMainUnitDesc,
            // productSubUnitDesc: formikRef?.current?.values.productSubUnitDesc,
            // productSubUnitId: formikRef?.current?.values.productSubUnitId,
            // price: formikRef?.current?.values?.price,
            // description: formikRef?.current?.values.productDesc,
            // rowId: formikRef?.current?.values?.rowId,
        };

        if (!isUpdate) {
            const isDuplicate = orders.some(
                (order: any) =>
                    order.id === productOrder.id &&
                    order.warehouseId === productOrder.warehouseId &&
                    order.productName === productOrder.productName &&
                    order.productBrandId === productOrder.productBrandId
            );

            if (values.productId === "" || values.productId.label === "") {
                EnqueueSnackbar("وارد نمودن کالا الزامی می باشد", "error");
                return;
            }

            if (values?.price === "") {
                EnqueueSnackbar("وارد نمودن قیمت الزامی می باشد", "error");
                return;
            }

            if (values?.proximateAmount === "") {
                EnqueueSnackbar("وارد نمودن مقدار الزامی می باشد", "error");
                return;
            }

            if (isDuplicate) {
                EnqueueSnackbar("کالا انتخاب شده در لیست سفارشات موجود و تکراری می باشد", "error");
                return;
            }

            setOrders([...orders, productOrder]);
            setFieldValue("orderPaymentAmount", sliceNumberPriceRial(calculateTotalAmount([...orders, productOrder], orderServices)));

            fields.forEach((element) => setFieldValue(element, ""));
        } else {
            const updatedOrder = {
                ...productOrder,
            };
            const updatedOrders: any = [...orders];
            updatedOrders[orderIndex ? orderIndex : 0] = updatedOrder;

            if (values.productId === "" || values.productId.label === "") {
                EnqueueSnackbar("وارد نمودن کالا الزامی می باشد", "error")
                return;
            }
            if (values?.price === "") {
                EnqueueSnackbar("وارد نمودن قیمت الزامی می باشد", "error")
                return;
            }
            if (values?.proximateAmount === "") {
                EnqueueSnackbar("وارد نمودن مقدار الزامی می باشد", "error")
                return;
            }

            setOrders(updatedOrders);
            setFieldValue("orderPaymentAmount", sliceNumberPriceRial(calculateTotalAmount(updatedOrders, orderServices)))

            setOrderIndex(0)
            setIsUpdate(false)
            fields.forEach((element) => setFieldValue(element, ""));
        }
    };


    return (
        <>
            <form>
                <div className="lg:grid lg:grid-cols-3 lg:gap-4 my-4 space-y-4 lg:space-y-0">
                    <FormikProductBrand
                        name="productId"
                        label="کالا/محصول"
                        disabled={isUpdate || postSaleOrder.data?.succeeded || orderPayment.length > 0} 
                        onChange={changeProductFunction} 
                    />
                    <FormikProximateAmount
                        name="proximateAmount"
                        label="مقدار"
                        disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    {values?.productId?.productMainUnitDesc || ""}
                                </InputAdornment>
                            ),
                    }} />
                    <FormikInput
                        name="productSubUnitAmount"
                        label="مقدار واحد فرعی"
                        disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    {values?.productId?.productSubUnitDesc || ""}
                                </InputAdornment>
                            ),
                        }} />
                    <FormikPrice
                        name="price"
                        label="قیمت (ریال)"
                        disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0} />
                    <FormikInput
                        name="detailDescription"
                        label="توضیحات"
                        disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0} />
                    <FormikDatepicker
                        name="deliverDate"
                        label="تاریخ تحویل" 
                        disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0} 
                     />

                </div>
                <div className='flex justify-end items-end mb-4'>
                    {isUpdate ? (
                            <Button
                                onClick={handleOrder} className="!bg-yellow-500">
                                <Edit />
                                <Typography>ویرایش سفارش انتخاب شده</Typography>
                            </Button>
                        ) : (
                            <Button
                                onClick={handleOrder}
                                disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0}
                                className={postSaleOrder.data?.succeeded || orderPayment.length > 0 ? "!bg-gray-200" : "!bg-green-500"} >
                                <Add />
                                <Typography>افزودن به لیست سفارشات</Typography>
                            </Button>
                    )}
                </div>
                <OrderProductList
                    selectedOrderIndex={orderIndex}
                    setFieldValue={setFieldValue}
                    orders={orders}
                    setOrders={setOrders}
                    disabled={postSaleOrder?.data?.succeeded}
                    products={products}
                    orderServices={orderServices}
                    setOrderPayment={setOrderPayment}
                    values={values}
                    setIsUpdate={setIsUpdate}
                    setOrderIndex={setOrderIndex}
                />
            </form>
        </>
    )
}

export default OrderProductDetail