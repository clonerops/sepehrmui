import { useEffect, useState } from "react";
import ProductSelectedList from "./components/ProductSelectedList";
import ProductSelectedListInModal from "./components/ProductSelectedListInModal";
import { useRetrieveProducts } from "../product/core/_hooks";
import { Form, Formik } from "formik";
import { useCreateOrder } from "./core/_hooks";
import moment from "moment-jalaali";
import CreateCustomer from "../customer/components/CreateCustomer";
import { useGetCustomers } from "../customer/core/_hooks";
import {
    dropdownCustomer,
    dropdownExitType,
    dropdownInvoiceType,
    dropdownOrderSendType,
    dropdownPurchaseInvoice,
    dropdownRentPaymentType,
    dropdownWarehouses,
} from "./helpers/dropdowns";
import { exit } from "./helpers/fakeData";
import { orderValidation } from "./validations/orderValidation";
import {
    useGetInvoiceType,
    useGetPaymentTypes,
    useGetPurchaseInvoice,
    useGetSendTypes,
    useGetWarehouses,
} from "../generic/_hooks";
import { Box, Button, Card, Typography } from "@mui/material";
import { sliceNumberPrice } from "../../../_cloner/helpers/sliceNumberPrice";
import { convertToPersianWord } from "../../../_cloner/helpers/convertPersian";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import FormikInput from "../../../_cloner/components/FormikInput";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import TextValue from "./components/TextValue";
import CustomButton from "../../../_cloner/components/CustomButton";
import { AddCircle, Add, Grading } from '@mui/icons-material'
import { ICustomer } from "../customer/core/_models";
import { dropdownProductIntegrated } from "../generic/_functions";
import FormikProductComboSelect from "./components/FormikProductComboSelect";
import FormikComboBox from "../../../_cloner/components/FormikComboBox";

const initialValues = {
    customerId: "",
    totalAmount: 0,
    description: "",
    exitType: "",
    orderSendTypeId: "",
    paymentTypeId: "",
    customerOfficialName: "",
    invoiceTypeId: "",
    freightName: "",
    settlementDate: "",
    dischargePlaceAddress: "",
    freightDriverName: "",
    carPlaque: "",
    rowId: "",
    productId: "",
    warehouseId: "",
    warehouseTypeId: "",
    proximateAmount: "",
    numberInPackage: "",
    price: "",
    cargoSendDate: "",
    buyPrice: "",
    purchaseInvoiceTypeId: "",
    purchaserCustomerId: "",
    purchaseSettlementDate: "",
    sellerCompanyRow: "",
    productIntegratedName: ""
};



const Order = () => {
    // Fetching Data
    const { data: customers, refetch: refetchCustomers } = useGetCustomers();
    const { data: products, isLoading: productLoading, isError: productError } = useRetrieveProducts();
    const { data: orderSendType } = useGetSendTypes();
    const { data: rent } = useGetPaymentTypes();
    const { data: purchaseInvoiceType } = useGetPurchaseInvoice();
    const { data: factor } = useGetInvoiceType();
    const { data: warehouse } = useGetWarehouses();
    const { mutate } = useCreateOrder();

    // States
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);
    const [selectedProductOpen, setSelectedProductOpen] = useState<boolean>(false);
    const [selectProductFromModal, setSelectProductFromModal] = useState<any>();
    const [orders, setOrders] = useState<any>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [purchaseInvoiceTypeSelected, setPurchaseInvoiceTypeSelected] = useState<{ value: number | null; label: string | null; }>();
    const [isBuy, setIsBuy] = useState<boolean>(false);
    const [orderCode, setOrderCode] = useState<number>(0);
    const [warehouseNameSelect, setWarehouseSelected] = useState<string>("");
    const [orderData, setOrderData] = useState<any>()

    useEffect(() => {
        const prices = orders?.map((obj: any) => Number(obj.price));
        const newPrices = [...prices];
        const newTotal = newPrices.reduce((acc: any, item) => acc + item, 0);
        setTotalAmount(newTotal);
    }, [orders]);

    const handleWarehouseSelect = (values: any) => {
        const warehouseName = warehouse.find((i: any) => i.id === values);
        if (values === 2) {
            setIsBuy(true);
        } else {
            setIsBuy(false);
        }
        setWarehouseSelected(warehouseName.name);
    };

    const handleOrder = (values: any, setFieldValue: any) => {
        const warehouseTypeId = warehouse.find((i: any) => i.id === values.warehouseId)
        const purchaseInvoiceTypeName = purchaseInvoiceType.find((i: any) => i.id === Number(values?.purchaseInvoiceTypeId))
        console.log("purchaseInvoiceTypeName", selectProductFromModal)
        const productOrder = {
            productId: values.productIntegratedName.value ? values.productIntegratedName.value : selectProductFromModal?.row.id,
            productName: values.productIntegratedName.label ? values.productIntegratedName.label : selectProductFromModal?.row.productIntegratedName,
            warehouseId: values.warehouseId,
            warehouseTypeId: warehouseTypeId?.warehouseTypeId,
            warehouseName: warehouseNameSelect,
            productDesc: values?.productDesc,
            buyPrice: values?.buyPrice,
            purchaseSettlementDate: values.purchaseSettlementDate,
            purchaseInvoiceTypeId: Number(values?.purchaseInvoiceTypeId),
            purchaseInvoiceTypeName: purchaseInvoiceTypeName?.desc,
            sellerCompanyRow: values.sellerCompanyRow,
            proximateAmount: values.proximateAmount,
            price: values?.price,
            rowId: values?.rowId,
        };
        setOrders([...orders, productOrder]);
        // setFieldValue("proximateAmount", "")
        // setFieldValue("price", "")
        // setFieldValue("productDesc", "")
        // setFieldValue("rowId", "")

    };

    const [findCustomer, setFindCustomer] = useState<ICustomer>()

    const handleChangeCustomer = (value: any) => {
        const findCustomer = customers?.data.find((i: any) => i.id === value.value)
        setFindCustomer(findCustomer)
    }
    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        orderData?.data?.Message ||
                        orderData?.Message ||
                        orderData?.message
                    }
                />
            )}
            <Card className="px-8 py-4">
                <Formik
                    initialValues={initialValues}
                    validationSchema={orderValidation}
                    onSubmit={
                        async (values: any, { setStatus, setSubmitting, setFieldValue, resetForm }) => {
                            if (orders?.length === 0) {
                                alert("لیست سفارشات خالی می باشد")
                            } else {
                                try {
                                    const formData = {
                                        customerId: values.customerId.value,
                                        totalAmount: totalAmount,
                                        description: values.description,
                                        exitType: Number(values.exitType),
                                        orderSendTypeId: Number(values.orderSendTypeId),
                                        paymentTypeId: Number(values.paymentTypeId),
                                        customerOfficialName: "string",
                                        invoiceTypeId: Number(values.invoiceTypeId),
                                        freightName: "string",
                                        settlementDate: values.settlementDate,
                                        dischargePlaceAddress: "string",
                                        freightDriverName: "string",
                                        carPlaque: "string",
                                        details: orders?.map(
                                            (item: any) => {
                                                return {
                                                    rowId: Number(item.rowId),
                                                    productId: item.productId,
                                                    warehouseTypeId: item.warehouseTypeId,
                                                    warehouseId: item.warehouseId
                                                        ? Number(item.warehouseId)
                                                        : null,
                                                    proximateAmount:
                                                        item.proximateAmount
                                                            ? Number(
                                                                item.proximateAmount
                                                            )
                                                            : null,
                                                    numberInPackage:
                                                        item.proximateAmount
                                                            ? Number(
                                                                item.proximateAmount
                                                            )
                                                            : null,
                                                    price: item.price
                                                        ? Number(item.price)
                                                        : null,
                                                    cargoSendDate: "1402/01/01",
                                                    buyPrice: item.buyPrice
                                                        ? Number(item.buyPrice)
                                                        : 0,
                                                    purchaseInvoiceTypeId:
                                                        item.purchaseInvoiceTypeId ? item.purchaseInvoiceTypeId : null,
                                                    purchaserCustomerId:
                                                        item.purchaserCustomerId
                                                            ? item.purchaserCustomerId.value
                                                            : null,
                                                    purchaseSettlementDate:
                                                        "1402/01/01",
                                                    sellerCompanyRow:
                                                        item.sellerCompanyRow
                                                            ? item.sellerCompanyRow
                                                            : null,
                                                };
                                            }
                                        ),
                                    };
                                    mutate(formData, {
                                        onSuccess: (orderData) => {
                                            setOrderData(orderData)
                                            setSnackeOpen(true);
                                            setOrderCode(orderData?.data[0].orderCode);
                                            resetForm()

                                        },
                                    });
                                } catch (error) {
                                    setStatus("اطلاعات ثبت مشتری نادرست می باشد");
                                    setSubmitting(false);
                                }
                            }
                        }}
                >
                    {({ handleSubmit, values, setFieldValue }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                {/* Order Code, Order Date, Order Submit */}
                                <Card>
                                    <Box component="div" className="md:flex md:justify-between my-1 p-2 rounded-md gap-x-10">
                                        <TextValue title="شماره سفارش" value={orderCode} valueClassName="px-8 text-[#405189]" titleClassName="text-[#2E4374]" />
                                        <TextValue title="تاریخ سفارش" value={moment(new Date()).format("jYYYY/jMM/jDD")} valueClassName="text-[#405189]" titleClassName="text-[#2E4374]" />
                                    </Box>
                                    <Box component="div" className="md:flex my-1 p-2 rounded-md">
                                        <TextValue title="قیمت کل" value={sliceNumberPrice(totalAmount)} valueClassName="!text-lg" insideValue={"ریال"} titleClassName="text-gray-500 !text-lg" />
                                        <TextValue title="قیمت به حروف" value={convertToPersianWord(totalAmount)} valueClassName="!text-lg" insideValue={"تومان"} titleClassName="text-gray-500 !text-lg" />
                                    </Box>
                                </Card>
                                <Box component="div" className="flex my-2 justify-center items-center md:justify-end md:items-end">
                                    <CustomButton title="ثبت سفارش" onClick={() => handleSubmit()} />
                                </Box>
                                {/* Customer, Settlement Date*/}
                                <Box component="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                                    <Card className="p-2">
                                        <Box component="div" className="md:flex md:flex-row md:items-center gap-4">
                                            {/* <FormikSelect onChange={(value) => handleChangeCustomer(value)} name="customerId" label="مشتری" options={dropdownCustomer(customers?.data)} /> */}
                                            <FormikComboBox onChange={() => handleChangeCustomer(values.customerId)} name="customerId" label="مشتری" options={dropdownCustomer(customers?.data)} />
                                            <Box component="span" onClick={() => setIsOpen(true)} className="flex w-full md:w-10 md:my-0 bg-green-600 p-2 rounded-md text-white cursor-pointer my-1">
                                                <AddCircle />
                                            </Box>
                                            <FormikDatepicker name="settlementDate" label="تاریخ تسویه" />
                                        </Box>
                                        {findCustomer &&
                                            <Box component="div" className="pt-2 flex flex-col">
                                                <Typography variant="h4">شماره همراه مشتری: {findCustomer?.mobile}</Typography>
                                                <Typography variant="h4">نوع اعتبار: {findCustomer?.customerValidityId === 1 ? "عادی" : findCustomer?.customerValidityId === 2 ? "VIP" : "سیاه"}</Typography>
                                            </Box>
                                        }
                                    </Card>
                                    {/* orderSendTypeId, invoiceTypeId, paymentTypeId, exitType */}
                                    <Card className="p-2">
                                        <Box component="div" className="grid md:grid-cols-2 !gap-2" >
                                            <FormikSelect name="orderSendTypeId" label="نوع ارسال" options={dropdownOrderSendType(orderSendType)} />
                                            <FormikSelect name="invoiceTypeId" label="نوع فاکتور" options={dropdownInvoiceType(factor)} />
                                            <FormikSelect name="paymentTypeId" label="نوع پرداخت" options={dropdownRentPaymentType(rent)} />
                                            <FormikSelect name="exitType" label="نوع خروج" options={dropdownExitType(exit)} />
                                        </Box>
                                    </Card>
                                </Box>

                                <Box component="div" className="mt-2">
                                    <Card className="p-2">
                                        {/* <Box component="div" className="md:flex md:items-center md:flex-warp md:justify-center gap-2"> */}
                                        <Box component="div" className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                            <Box component="div" className="">
                                                <Box component="div" className="flex mx-2">
                                                    <FormikProductComboSelect productIntegratedName={values.productIntegratedName} label="کالا" name="productIntegratedName" options={dropdownProductIntegrated(products?.data)} />
                                                    <Box component="div" className="mx-1">
                                                        <Button onClick={() => setSelectedProductOpen(true)} variant="contained" color="primary" >
                                                            <Grading />
                                                        </Button>
                                                    </Box>
                                                </Box>
                                                <TransitionsModal title="انتخاب محصول" open={selectedProductOpen} isClose={() => setSelectedProductOpen(false)}>
                                                    <ProductSelectedListInModal
                                                        products={products?.data}
                                                        productLoading={productLoading}
                                                        productError={productError}
                                                        setSelectedProductOpen={setSelectedProductOpen}
                                                        setSelectProductFromModal={setSelectProductFromModal}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                </TransitionsModal>
                                            </Box>
                                            <FormikSelect name="warehouseId" label="انبار" options={dropdownWarehouses(warehouse)} onChange={(values) => handleWarehouseSelect(values)} />
                                            <FormikInput name="proximateAmount" label="مقدار (کیلوگرم)" type="text" />
                                            <FormikInput name="price" label="قیمت" type="text" />
                                            <FormikInput name="productDesc" label="توضیحات کالا" type="text" />
                                            <FormikInput name="rowId" label="ردیف فروش" type="text" />
                                            {isBuy && (
                                                <>
                                                    <FormikComboBox name="purchaserCustomerId" label="خرید از" options={dropdownCustomer(customers?.data)} />
                                                    {/* <FormikInput name="sellerCompanyRow" label="خرید از" type="text" /> */}
                                                    <FormikInput name="buyPrice" label="قیمت خرید" type="text" />
                                                    <FormikSelect value={purchaseInvoiceTypeSelected} onSelect={(value: any) => setPurchaseInvoiceTypeSelected(value)} name="purchaseInvoiceTypeId" label="نوع فاکتور خرید" options={dropdownPurchaseInvoice(purchaseInvoiceType)} />
                                                    <FormikDatepicker name="purchaseSettlementDate" label="تاریخ تسویه خرید" />
                                                </>
                                            )}
                                            <Box component="div" onClick={() => handleOrder(values, setFieldValue)} className="flex bg-green-500 text-white text-center py-2 rounded-md cursor-pointer mb-2 md:mt-0" >
                                                <Add />
                                                <Typography>افزودن به لیست سفارشات</Typography>
                                            </Box>
                                        </Box>
                                        <ProductSelectedList orders={orders} setOrders={setOrders} />
                                    </Card>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>
            </Card>
            <TransitionsModal title="ایجاد مشتری جدید" open={isOpen} isClose={() => setIsOpen(false)}>
                <CreateCustomer refetch={refetchCustomers} setIsCreateOpen={setIsOpen} />
            </TransitionsModal>
        </>
    );
};

export default Order;
