import { FC, memo, useCallback, useState } from 'react'
import { Form, FormikErrors, FormikProps } from "formik"
import { Box, Button, InputAdornment, Typography } from '@mui/material'

import OrderProductList from './OrderProductList'
import Backdrop from '../../../../../_cloner/components/Backdrop'

import { ISaleOrderDetail, IOrderItems, IOrderPayment, IOrderService } from '../../core/_models'
import { BUY_WAREHOUSE_TYPES, FIELD_VALUE } from '../../helpers/constants'
import { calculateTotalAmount } from '../../helpers/functions'
import { sliceNumberPriceRial } from '../../../../../_cloner/helpers/sliceNumberPrice'
import { orderFieldWhenNotWarehouseMain, orderFieldWhenWarehouseIsMain } from '../../sales-order/fields'
import { EnqueueSnackbar } from '../../../../../_cloner/helpers/Snackebar'
import FormikWarehouse from '../../../../../_cloner/components/FormikWarehouse'
import FormikProduct from '../../../../../_cloner/components/FormikProductComboSelect'
import TransitionsModal from '../../../../../_cloner/components/ReusableModal'
import ProductsList from './ProductsList'
import { dropdownProductByBrandName } from '../../../generic/_functions'
import FormikInput from '../../../../../_cloner/components/FormikInput'
import FormikProximateAmount from '../../../../../_cloner/components/FormikProximateAmount'
import FormikPrice from '../../../../../_cloner/components/FormikPrice'
import FormikCustomer from '../../../../../_cloner/components/FormikCustomer'
import FormikPurchaserInvoiceType from '../../../../../_cloner/components/FormikPurchaserInvoiceType'
import FormikDatepicker from '../../../../../_cloner/components/FormikDatepicker'
import { Add, Edit } from '@mui/icons-material'

const fields = [
    "warehouseId",
    "productId",
    "proximateAmount",
    "productSubUnitAmount",
    "warehouseTypeId",
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
    values: any,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>
}

const OrderProductDetail: FC<IProps> = ({ postSaleOrder, products, orders, setOrders, orderPayment, setOrderPayment, orderServices, setOrderServices, formikRef, setOrderValid, values, setFieldValue }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [orderIndex, setOrderIndex] = useState<number>(0);

    const changeWarehouseFunction = (value: any) => {
        try {
            const filter = {
                ByBrand: true,
                WarehouseId: value.value
            };
            products.mutate(filter);
            fields.forEach((element) => {
                setFieldValue(element, "");
            });
        } catch (error) {
            console.error("Error handling warehouse change:", error);
        }
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

            exchangeRate: values?.productId?.exchangeRate ? values?.productId?.exchangeRate : values?.exchangeRate,
            productBrandName: values?.productId?.productBrandName ? values?.productId?.productBrandName : values.productBrandName,
            warehouseName: values?.productId.warehouseName ? values?.productId.warehouseName : values?.warehouseName,
            purchaserCustomerName: values.purchaserCustomerId?.label ? values.purchaserCustomerId?.label : values.purchaserCustomerName,
            productMainUnitDesc: values.productId.productMainUnitDesc ? values.productId.productMainUnitDesc : values.productMainUnitDesc,
            productSubUnitDesc: values.productId.productSubUnitDesc ? values.productId.productSubUnitDesc : values.productSubUnitDesc,
        };

        if (!isUpdate) {
            const isDuplicate = orders.some(
                (order: any) =>
                    order.id === productOrder.id &&
                    order.warehouseId === productOrder.warehouseId &&
                    order.warehouseTypeId === productOrder.warehouseTypeId &&
                    order.productId === productOrder.productId &&
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
        console.log("values", values)

    };

    console.log("orders", orders)


    return (
        <>
            {products.isLoading && <Backdrop loading={products.isLoading} />}
            <form>
                <div className='flex justify-end items-end'>
                    <Button
                        className="!w-[160px] !h-[36px]"
                        onClick={() => setIsOpen(true)}
                        variant="contained"
                        color="primary"
                        disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0}>
                        <Typography >انتخاب کالا</Typography>
                    </Button>
                </div>
                <div className="lg:grid lg:grid-cols-3 lg:gap-4 my-4 space-y-4 lg:space-y-0">
                    <FormikWarehouse
                        name={!isUpdate ? "warehouseId" : "warehouseName"}
                        label="انبار"
                        disabled={isUpdate || postSaleOrder.data?.succeeded || orderPayment.length > 0}
                        onChange={changeWarehouseFunction} />
                    <FormikProduct
                        name={!isUpdate ? "productId" : "productName"}
                        label="کالا/محصول"
                        disabled={isUpdate || postSaleOrder.data?.succeeded || orderPayment.length > 0}
                        options={dropdownProductByBrandName(products?.data?.data)} />

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
                    <FormikInput
                        name="rowId"
                        label="ردیف فروش"
                        disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0} />
                    <FormikCustomer
                        name={!isUpdate ? "purchaserCustomerId" : "purchaserCustomerName"}
                        label="خرید از"
                        disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0 || values.warehouseId?.warehouseTypeId === 5 || values.warehouseTypeId === 5 || values.warehouseTypeId === 1} />
                    <FormikPrice
                        name="purchasePrice"
                        label="قیمت خرید (ریال)"
                        disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0 || values.warehouseId?.warehouseTypeId === 5 || values.warehouseTypeId === 5 || values.warehouseTypeId === 1} />
                    <FormikPurchaserInvoiceType
                        name="purchaseInvoiceTypeId"
                        label="نوع فاکتور خرید"
                        disabeld={postSaleOrder.data?.succeeded || orderPayment.length > 0 || values.warehouseId?.warehouseTypeId === 5 || values.warehouseTypeId === 5 || values.warehouseTypeId === 1} />
                    <FormikDatepicker
                        name="purchaseSettlementDate"
                        label="تاریخ تسویه خرید"
                        disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0 || values.warehouseId?.warehouseTypeId === 5 || values.warehouseTypeId === 5 || values.warehouseTypeId === 1} />
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
                    setOrderIndex={setOrderIndex}
                    orders={orders}
                    setOrders={setOrders}
                    disabled={postSaleOrder?.data?.succeeded}
                    products={products}
                    orderServices={orderServices}
                    setOrderPayment={setOrderPayment}
                    setIsUpdate={setIsUpdate}
                    setOrderValid={setOrderValid}
                    setFieldValue={setFieldValue}
                    values={values}

                />
            </form>
            {isOpen &&
                <TransitionsModal
                    title="انتخاب محصول"
                    open={isOpen}
                    width='99%'
                    isClose={() => setIsOpen(false)}>
                    <ProductsList
                        setIsOpen={setIsOpen}
                        setFieldValue={setFieldValue}
                        orders={orders}
                        setOrders={setOrders}
                        setOrderPayment={setOrderPayment}
                        orderService={orderServices}
                    />
                </TransitionsModal>
            }
        </>
    )
}

export default memo(OrderProductDetail)