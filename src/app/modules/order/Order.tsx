import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ProductSelectedList from "./components/ProductSelectedList";
import ProductSelectedListInModal from "./components/ProductSelectedListInModal";
import { useRetrieveProducts, useRetrieveProductsByBrand, useRetrieveProductsByWarehouse } from "../product/core/_hooks";
import { Form, Formik, FormikErrors } from "formik";
import { useCreateOrder } from "./core/_hooks";
import moment from "moment-jalaali";
import { useGetCustomers } from "../customer/core/_hooks";
import { dropdownCustomer, dropdownPurchaseInvoice } from "./helpers/dropdowns";
import Swal from 'sweetalert2'
import { orderValidation } from "./validations/orderValidation";
import { useGetPurchaseInvoice, useGetServices, useGetWarehouses } from "../generic/_hooks";
import { Box, Button, Typography, IconButton, InputAdornment, Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import { sliceNumberPriceRial } from "../../../_cloner/helpers/sliceNumberPrice";
import { convertToPersianWord } from "../../../_cloner/helpers/convertPersian";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import FormikInput from "../../../_cloner/components/FormikInput";
import CustomButton from "../../../_cloner/components/CustomButton";
import { AddCircle, Add, Grading, Delete, MonetizationOn, AttachMoney, DateRange, ProductionQuantityLimits, Edit } from "@mui/icons-material";
import { ICustomer } from "../customer/core/_models";
import { dropdownProductByBrandName } from "../generic/_functions";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { customerFields, orderFields, orderFieldsIsBuy, orderTypesFields } from "./helpers/fields";
import { IOrderItems, IOrderPayment, IOrderService } from "./core/_models";
import { IProducts } from "../product/core/_models";
import FormikPrice from "../product/components/FormikPrice";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";
import FormikProximateAmount from "../product/components/FormikProximateAmount";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { calculateProximateAmount, calculateTotalAmount } from "./helpers/functions";
import { orderPaymentValues, orderInitialValues, orderServiceValues } from './helpers/initialValues'
import { useSnackbar } from 'notistack';
import BottomDrawer from "../../../_cloner/components/BottomSheetDrawer";
import CustomerForm from "../customer/components/CustomerForm";
import FormikService from "../../../_cloner/components/FormikService";
import CardTitleValue from "../../../_cloner/components/CardTitleValue";
import FormikCustomer from "../../../_cloner/components/FormikCustomer";
import FormikCompany from "../../../_cloner/components/FormikCompany";
import FormikOrderSend from "../../../_cloner/components/FormikOrderSend";
import FormikInvoiceType from "../../../_cloner/components/FormikInvoiceType";
import FormikPaymentType from "../../../_cloner/components/FormikPaymentType";
import FormikExitType from "../../../_cloner/components/FormikExitType";
import FormikTemporary from "../../../_cloner/components/FormikTemporary";
import FormikDescription from "../../../_cloner/components/FormikDescription";
import FormikWarehouse from "../../../_cloner/components/FormikWarehouse";
import FormikProduct from "./components/FormikProductComboSelect";
import FormikPurchaserInvoiceType from "../../../_cloner/components/FormikPurchaserInvoiceType";
import FormikAmount from "../product/components/FormikAmount";

const BUY_WAREHOUSE_TYPES = [1, 3, 4, 5, 7];
const fieldValue = [
    { title: "productName", value: "" },
    { title: "id", value: "" },
    { title: "price", value: "" },
    { title: "productBrandId", value: "" },
    { title: "productBrandName", value: "" },
    { title: "warehouseId", value: "" },
    { title: "proximateAmount", value: "" },
    { title: "warehouseName", value: "" },
    { title: "proximateSubUnit", value: "" },
    { title: "purchasePrice", value: "" },
    { title: "purchaseInvoiceTypeDesc", value: "" },
    { title: "purchaseInvoiceTypeId", value: "" },
    { title: "purchaseSettlementDate", value: "" },
    { title: "purchaserCustomerId", value: "" },
    { title: "purchaserCustomerName", value: "" },
    { title: "rowId", value: "" },
    { title: "productDesc", value: "" },
    { title: "mainUnit", value: "" },
    { title: "subUnit", value: "" },
];

const Order = () => {
    const { enqueueSnackbar } = useSnackbar();

    // Fetching Data
    const { data: customers, refetch: refetchCustomers } = useGetCustomers();
    const { data: products } = useRetrieveProducts();
    const productsTools = useRetrieveProductsByWarehouse();
    const { data: productsByBrand, isLoading: productByBrandLoading, isError: productByBrandError, } = useRetrieveProductsByBrand();
    const { data: purchaseInvoiceType } = useGetPurchaseInvoice();
    const { data: warehouse } = useGetWarehouses();
    const { data: services } = useGetServices();
    const { mutate, data, isLoading } = useCreateOrder();

    // States
    const [isOpen, setIsOpen] = useState<boolean>(false); // OK
    const [selectedProductOpen, setSelectedProductOpen] = useState<boolean>(false); // OK
    const [isUpdate, setIsUpdate] = useState<boolean>(false); // OK
    const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0); // OK
    const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
    const [isBuy, setIsBuy] = useState<boolean>(false); // OK
    const [orderCode, setOrderCode] = useState<number>(0); //OK
    const [orderId, setOrderId] = useState<string>(""); //OK
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
    const [orderService, setOrderService] = useState<IOrderService[]>([]); //OK
    const [findCustomer, setFindCustomer] = useState<ICustomer>(); //OK

    const validateAndEnqueueSnackbar = (message: string) => {
        enqueueSnackbar(message, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" }
        });
    };

    useEffect(() => { calculateTotalAmount(orders, orderService) }, [orders, orderService]);

    const mainParseFields = (fields: FieldType, setFieldValue: any, values: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "customer":
                return (
                    <Box component="div" className="flex flex-col w-full">
                        <Box component="div" className="flex gap-x-2 w-full md:col-span-4">
                            <FormikCustomer disabled={data?.succeeded} onChange={(value: any) => handleChangeCustomer(value, setFieldValue)} {...rest} />
                            <IconButton onClick={() => setIsOpen(true)} className="flex justify-center items-center cursor-pointer text-xl">
                                <AddCircle color="secondary" />
                            </IconButton>
                            <FormikCompany customerID={values.customerID} name="customerOfficialCompanyId" label="اسم رسمی شرکت مشتری" />
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0 mt-4">
                            <Box component="div" className="flex flex-row pt-2">
                                <Typography variant="h4" className="text-gray-500">معرف: </Typography>
                                <Typography variant="h3" className="px-4">{findCustomer?.representative} </Typography>
                            </Box>
                            <Box component="div" className="flex flex-row pt-2">
                                <Typography sx={{ backgroundColor: `#${findCustomer?.customerValidityColorCode}` }} variant="h3" className={`text-white px-4 rounded-md py-1`}>{findCustomer?.customerValidityDesc}</Typography>
                            </Box>
                            <Box component="div" className="flex flex-row pt-8">
                                <Typography variant="h4" className="text-gray-500">بدهی جاری: </Typography>
                                <Typography variant="h3" className="px-4 text-red-500">{findCustomer?.customerCurrentDept ? separateAmountWithCommas(Number(findCustomer?.customerCurrentDept)) : 0} ریال</Typography>
                            </Box>
                            <Box component="div" className="flex flex-row pt-8">
                                <Typography variant="h4" className="text-gray-500">بدهی کل: </Typography>
                                <Typography variant="h3" className="px-4 text-red-500">{findCustomer?.customerDept ? separateAmountWithCommas(Number(findCustomer?.customerDept)) : 0} ریال</Typography>
                            </Box>
                        </Box>
                    </Box>
                );
            case "settlementDate":
                return <FormikDatepicker {...rest} />;
            case "orderSendTypeId":
                return <FormikOrderSend disabled={data?.succeeded} {...rest} />
            case "invoiceTypeId":
                return <FormikInvoiceType disabled={data?.succeeded} {...rest} />
            case "paymentTypeId":
                return <FormikPaymentType disabled={data?.succeeded} {...rest} />
            case "exitType":
                return <FormikExitType disabled={data?.succeeded} {...rest} />
            case "temporary":
                return <FormikTemporary disabled={data?.succeeded} {...rest} />
            case "description":
                return <FormikDescription disabled={data?.succeeded} {...rest} />
            default:
                return <FormikInput {...rest} />;
        }
    };

    const orderParseFields = (fields: FieldType, values: any, setFieldValue: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "warehouse":
                return <FormikWarehouse disabled={isUpdate || data?.succeeded} onChange={(value: any) => handleChangeWarehouse(value, setFieldValue)} {...rest} />
            case "product":
                return (
                    <Box component="div" className="flex gap-x-2 w-full">
                        <FormikProduct disabled={isUpdate || data?.succeeded} onChange={(value: any) => handleChangeProduct(value, setFieldValue)} options={dropdownProductByBrandName(productsTools?.data?.data)} {...rest} />
                        <Button onClick={() => setSelectedProductOpen(true)} variant="contained" color="primary" disabled={data?.succeeded}>
                            <Grading />
                        </Button>
                        {selectedProductOpen &&
                            <BottomDrawer title="انتخاب محصول" open={selectedProductOpen} onClose={() => setSelectedProductOpen(false)}>
                                <ProductSelectedListInModal
                                    products={productsByBrand?.data}
                                    productLoading={productByBrandLoading}
                                    productError={productByBrandError}
                                    setSelectedProductOpen={setSelectedProductOpen}
                                    setFieldValue={setFieldValue}
                                    orders={orders}
                                    setOrders={setOrders}
                                    setOrderPayment={setOrderPayment}
                                    orderService={orderService}
                                />
                            </BottomDrawer>
                        }
                    </Box>
                );
            case "purchaserCustomer":
                return <FormikCustomer disabled={data?.succeeded} {...rest} />
            case "purchaseInvoiceType":
                return <FormikPurchaserInvoiceType {...rest} />
            case "date":
                return <FormikDatepicker disabled={data?.succeeded} {...rest} />;
            case "proximateAmount":
                return (
                    <FormikProximateAmount
                        disabled={data?.succeeded}
                        exchangeRate={
                            values.id
                                ? products?.data?.find(
                                    (i: IProducts) => i.id === values?.id
                                )?.exchangeRate
                                : products?.data?.find(
                                    (i: IProducts) =>
                                        i.id === values?.productName?.value
                                )?.exchangeRate
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    {values.mainUnit}
                                </InputAdornment>
                            ),
                        }}
                        {...rest}
                    />
                );
            case "proximateSubUnit":
                return (
                    <FormikPrice
                        disabled={data?.succeeded}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    {values.subUnit}
                                </InputAdornment>
                            ),
                        }}
                        {...rest}
                    />
                );
            case "price":
                return <FormikAmount disabled={data?.succeeded}  {...rest} />
                // return <FormikPrice disabled={data?.succeeded}  {...rest} />;
            case "input":
                return <FormikInput disabled={data?.succeeded}  {...rest} />;
            case "add":
                return isUpdate ? (
                    <Button onClick={() => handleOrder(values, setFieldValue)} className="!bg-yellow-500">
                        <Edit />
                    </Button>
                ) : (
                    <Button onClick={() => handleOrder(values, setFieldValue)} className="!bg-green-500">
                        <Add />
                    </Button>
                );
            default:
                return <FormikInput disabled={data?.succeeded} {...rest} />;
        }
    };

    const handleChangeWarehouse = (warehouseType: number, setFieldValue: (field: string, value: any) => void) => {
        try {
            productsTools.mutate(warehouseType);

            fieldValue.forEach((field) => setFieldValue(field.title, field.value));

            if (BUY_WAREHOUSE_TYPES.includes(warehouseType)) setIsBuy(true);
            else setIsBuy(false);
        } catch (error) {
            console.error("Error handling warehouse change:", error);
        }
    };

    const handleChangeProduct = (value: any, setFieldValue: any) => {
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

    const handleOrder = (values: any, setFieldValue: any) => {
        const fields = ["productName", "id", "warehouseId", "warehouseTypeId", "warehouseName", "productDesc", "productBrandDesc", "purchasePrice", "purchaseSettlementDate", "purchaseInvoiceTypeId", "purchaseInvoiceTypeDesc", "sellerCompanyRow", "proximateAmount", "price", "rowId", "proximateSubUnit", "purchaserCustomerId", "purchaserCustomerName", "mainUnit", "subUnit"];

        const warehouseTypeId = warehouse?.find((i: any) => i.id === values.warehouseId);
        const warehouseName = warehouse?.find((i: any) => i.id === values.warehouseId);
        const purchaseInvoiceTypeDesc = purchaseInvoiceType?.find((i: any) => i.id === Number(values?.purchaseInvoiceTypeId));

        const productOrder: IOrderItems = {
            id: values?.productName?.value ? values?.productName?.value : values.id,
            productName: values?.productName?.productName ? values?.productName?.productName : values?.productName,
            warehouseId: values?.productName?.warehouseId ? values?.productName?.warehouseId : values.warehouseId,
            productBrandName: values?.productName?.productBrandName ? values?.productName?.productBrandName : values.productBrandName,
            productBrandId: values.productName.productBrandId ? values.productName.productBrandId : values.productBrandId,
            warehouseTypeId: warehouseTypeId?.warehouseTypeId,
            warehouseName: values.warehouseName ? values.warehouseName : warehouseName?.name,
            productDesc: values?.productDesc,
            purchasePrice: values?.purchasePrice,
            purchaseSettlementDate: values.purchaseSettlementDate,
            purchaseInvoiceTypeId: Number(values?.purchaseInvoiceTypeId),
            purchaseInvoiceTypeDesc: purchaseInvoiceTypeDesc?.desc,
            sellerCompanyRow: values.sellerCompanyRow,
            proximateAmount: values.proximateAmount,
            proximateSubUnit: values.proximateSubUnit,
            purchaserCustomerId: values.purchaserCustomerId?.value ? values.purchaserCustomerId?.value : values.purchaserCustomerId,
            purchaserCustomerName: values.purchaserCustomerId?.label ? values.purchaserCustomerId?.label : values.purchaserCustomerName,
            mainUnit: values.mainUnit,
            subUnit: values.subUnit,
            productSubUnitId: values.productSubUnitId,
            price: values?.price,
            description: values.productDesc,
            rowId: values?.rowId,
        };

        console.log("productOrder", productOrder)

        if (!isUpdate) {
            const isDuplicate = orders.some(
                (order: any) =>
                    order.id === productOrder.id &&
                    order.warehouseId === productOrder.warehouseId &&
                    order.productName === productOrder.productName &&
                    order.productBrandId === productOrder.productBrandId
            );

            if (values.productName === "" || values.productName.label === "") {
                validateAndEnqueueSnackbar("وارد نمودن کالا الزامی می باشد")
            } else if (values?.price === "") {
                validateAndEnqueueSnackbar("وارد نمودن قیمت الزامی می باشد")
            } else if (values?.proximateAmount === "") {
                validateAndEnqueueSnackbar("وارد نمودن مقدار الزامی می باشد")
            } else if (isDuplicate) {
                validateAndEnqueueSnackbar("کالا انتخاب شده در لیست سفارشات موجود و تکراری می باشد")
            } else {
                setOrders([...orders, productOrder]);
                setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount([...orders, productOrder], orderService)))
            }
            fields.forEach((element) => {
                setFieldValue(element, "");
            });
            setIsBuy(false);
        } else {
            const updatedOrder = {
                ...productOrder,
            };
            const updatedOrders = [...orders];
            updatedOrders[selectedOrderIndex] = updatedOrder;
            if (values.productName === "" || values.productName.label === "") {
                validateAndEnqueueSnackbar("وارد نمودن کالا الزامی می باشد")
            } else if (values?.price === "") {
                validateAndEnqueueSnackbar("وارد نمودن قیمت الزامی می باشد")
            } else if (values?.proximateAmount === "") {
                validateAndEnqueueSnackbar("وارد نمودن مقدار الزامی می باشد")
            } else {
                setOrders(updatedOrders);
                setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount(updatedOrders, orderService)))
            }
            setSelectedOrderIndex(0);
            fields.forEach((element) => {
                setFieldValue(element, "");
            });
            setIsBuy(false);
            setIsUpdate(false);
        }
    };

    const handleChangeCustomer = (value: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>) => {
        const findCustomer = customers?.data?.find((i: any) => i.id === value?.value);
        setFieldValue("customerID", findCustomer?.id)
        setFindCustomer(findCustomer);
        setFieldValue("number", findCustomer?.settlementDay)
        setFieldValue("settlement", moment(new Date()).add(+findCustomer?.settlementDay, "days").format("jYYYY/jMM/jDD"))

        if (findCustomer === undefined || findCustomer === null) {
            setFieldValue("number", "")
            setFieldValue("settlement", "");
        }
    };

    const fieldsToMap = isBuy ? orderFieldsIsBuy : orderFields;

    const orderAndAmountInfo = [
        { title: "شماره سفارش", icon: <ProductionQuantityLimits color="secondary" />, value: orderCode },
        { title: "تاریخ سفارش", icon: <DateRange color="secondary" />, value: moment(new Date()).format("jYYYY-jMM-jDD") },
        { title: "قیمت کل", icon: <MonetizationOn color="secondary" />, value: `${sliceNumberPriceRial(calculateTotalAmount(orders, orderService))} ریال` },
        { title: "قیمت به حروف", icon: <AttachMoney color="secondary" />, value: `${convertToPersianWord(calculateTotalAmount(orders, orderService))} تومان` }
    ]

    const onSubmit = (values: any) => {
        if (orders?.length === 0) {
            enqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد", {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" }
            })
        } else {
            try {
                const formData = {
                    customerId: values.customerId.value,
                    totalAmount: calculateTotalAmount(orders, orderService),
                    description: values.description,
                    exitType: Number(values.exitType),
                    orderSendTypeId: Number(values.orderSendTypeId),
                    paymentTypeId: Number(values.paymentTypeId),
                    customerOfficialName: "string",
                    customerOfficialCompanyId: +values.customerOfficialCompanyId ? +values.customerOfficialCompanyId : null,
                    invoiceTypeId: Number(values.invoiceTypeId),
                    isTemporary: +values.isTemporary === 0 ? false : true,
                    freightName: "string",
                    settlementDate: "1402/02/02",
                    dischargePlaceAddress: "string",
                    freightDriverName: "string",
                    carPlaque: "string",
                    details: orders?.map((item: any) => {
                        return {
                            rowId: item.rowId ? +item.rowId : 0,
                            productId: item.id,
                            warehouseId: item.warehouseId ? +item.warehouseId : null,
                            productBrandId: item.productBrandId ? +item.productBrandId : 25,
                            proximateAmount: item.proximateAmount ? +item.proximateAmount?.replace(/,/g, "") : 0,
                            productSubUnitAmount: item.proximateSubUnit ? +item.proximateSubUnit : 0,
                            productSubUnitId: item.productSubUnitId ? +item.productSubUnitId : null,
                            numberInPackage: item.numberInPackage ? +item.numberInPackage : 0,
                            price: item.price ? +item.price?.replace(/,/g, "") : null,
                            cargoSendDate: "1402/01/01",
                            description: item.description,
                            purchasePrice: item.purchasePrice ? +item.purchasePrice : 0,
                            purchaseInvoiceTypeId: item.purchaseInvoiceTypeId ? item.purchaseInvoiceTypeId : null,
                            purchaserCustomerId: item.purchaserCustomerName.value ? item.purchaserCustomerName.value : null,
                            purchaseSettlementDate: item.purchaseSettlementDate,
                            sellerCompanyRow: item.sellerCompanyRow ? item.sellerCompanyRow : "string",
                        };
                    }),
                    orderPayments: orderPayment?.map((item: IOrderPayment) => {
                        return {
                            amount: Number(item.amount?.replace(/,/g, "")),
                            paymentDate: item.paymentDate,
                            daysAfterExit: Number(item.daysAfterExit),
                            paymentType: item.paymentType
                        }
                    }),
                    orderServices: orderService.map((item: IOrderService) => {
                        return {
                            serviceId: item.serviceId,
                            description: item.description
                        }
                    })
                };
                mutate(formData, {
                    onSuccess: (response) => {

                        if (response.data.Errors && response.data.Errors.length > 0) {
                            response.data.Errors.forEach((item: any) => {
                                enqueueSnackbar(item, {
                                    variant: "error",
                                    anchorOrigin: { vertical: "top", horizontal: "center" }
                                })
                            })
                        } else {
                            if (response.succeeded) {
                                Swal.fire({
                                    title: `سفارش شما با شماره ${response?.data[0].orderCode} ثبت گردید`,
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
                                setOrderCode(response?.data[0].orderCode);
                                setOrderId(response?.data[0].id);
                            } else {
                                enqueueSnackbar(response?.data.Message, {
                                    variant: "error",
                                    anchorOrigin: { vertical: "top", horizontal: "center" }
                                })
                            }
                        }
                    }
                });
            } catch (error) {
                enqueueSnackbar("خطای در ثبت، لطفا با پشتیبان تماس بگیرید", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                })
            }
        }
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{ ...orderInitialValues, ...orderPaymentValues, ...orderServiceValues }}
                validationSchema={orderValidation}
                onSubmit={onSubmit}
            >
                {({ handleSubmit, values, setFieldValue }) => {
                    return <Form>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 md:space-y-0 space-y-4 gap-x-4 my-4">
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {orderAndAmountInfo.map((item: {
                                    title: string,
                                    icon: React.ReactNode,
                                    value: any
                                }) => {
                                    return <CardTitleValue title={item.title} value={item.value} icon={item.icon} />
                                })}
                            </Box>
                            <Box component="div" className="grid grid-cols-2 gap-4">
                                <ReusableCard cardClassName="col-span-2">
                                    <Box component="div" className="">
                                        {customerFields.map((rowFields) => (
                                            <Box
                                                component="div"
                                                className="md:flex md:justify-between md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                                            >
                                                {rowFields.map((field) =>
                                                    mainParseFields(
                                                        field,
                                                        setFieldValue,
                                                        values
                                                    )
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                </ReusableCard>
                            </Box>
                        </Box>
                        <Box component="div" className="md:space-y-0 space-y-4 md:gap-x-4">
                            <ReusableCard cardClassName="col-span-3">
                                <Form>
                                    <Box component="div" className="">
                                        {fieldsToMap.map((rowFields) => (
                                            <Box
                                                component="div"
                                                className="md:flex md:justify-between flex-warp md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                                            >
                                                {rowFields.map((field) =>
                                                    orderParseFields(
                                                        field,
                                                        values,
                                                        setFieldValue
                                                    )
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                    <ProductSelectedList
                                        setSelectedOrderIndex={
                                            setSelectedOrderIndex
                                        }
                                        selectedOrderIndex={selectedOrderIndex}
                                        setIsUpdate={setIsUpdate}
                                        setFieldValue={setFieldValue}
                                        orders={orders}
                                        setIsBuy={setIsBuy}
                                        setOrders={setOrders}
                                        disabled={data?.succeeded}
                                        products={productsByBrand?.data}
                                        orderService={orderService}
                                    />
                                </Form>
                            </ReusableCard>
                        </Box>

                        <Box component="div" className="md:grid md:grid-cols-3 gap-x-4 mt-4">
                            <ReusableCard>
                                <Box component="div" className="">
                                    <Typography variant="h2" color="primary">خصوصیات سفارش</Typography>
                                    {orderTypesFields.map((rowFields) => (
                                        <Box
                                            component="div"
                                            className="md:flex md:justify-between md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                                        >
                                            {rowFields.map((field) =>
                                                mainParseFields(
                                                    field,
                                                    setFieldValue,
                                                    values
                                                )
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </ReusableCard>
                            <ReusableCard cardClassName="mt-4 md:mt-0">
                                <Typography variant="h2" color="primary">بسته خدمت</Typography>
                                <Box component="div" className="flex flex-wrap md:flex-nowrap  gap-4 mt-4">
                                    <FormikService label="نوع خدمت" name="serviceId" />
                                    <FormikPrice name="serviceAmount" label="هزینه" />
                                    <Button color="secondary" onClick={
                                        () => {
                                            const orderServices = [...orderService]
                                            const orderServicetData: IOrderService = {
                                                id: uuidv4(),
                                                description: values.serviceAmount,
                                                serviceId: values.serviceId,
                                                serviceName: services?.find((i: IOrderService) => i.id === values.serviceId)?.description
                                            }
                                            if (orderServices.some(item => item.serviceId === values.serviceId)) {
                                                enqueueSnackbar("نوع خدمت قبلا به لیست اضافه شده است.", {
                                                    variant: "error",
                                                    anchorOrigin: { vertical: "top", horizontal: "center" }
                                                })
                                            } else if (values.serviceId === "") {
                                                enqueueSnackbar("نوع خدمت نمی تواند خالی باشد", {
                                                    variant: "error",
                                                    anchorOrigin: { vertical: "top", horizontal: "center" }
                                                })
                                            } else if (values.serviceAmount === "") {
                                                enqueueSnackbar("هزینه نوع خدمت نمی تواند خالی باشد", {
                                                    variant: "error",
                                                    anchorOrigin: { vertical: "top", horizontal: "center" }
                                                })
                                            }
                                            else {
                                                setOrderService([...orderServices, orderServicetData])
                                                setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount(orders, [...orderServices, orderServicetData])))
                                                setFieldValue('serviceId', "")
                                                setFieldValue('serviceAmount', "")
                                            }
                                        }
                                    }>
                                        <AddCircle />
                                    </Button>
                                </Box>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="!font-bold">نوع خدمت</TableCell>
                                            <TableCell className="!font-bold">هزینه</TableCell>
                                            <TableCell className="!font-bold">حذف</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderService?.map((i) => (
                                            <TableRow>
                                                <TableCell>{i?.serviceName}</TableCell>
                                                <TableCell>{i?.description} ریال</TableCell>
                                                <TableCell>
                                                    <Box component="div" onClick={
                                                        () => {
                                                            const filterServices = orderService.filter((item: IOrderService) => item.id !== i.id)
                                                            setOrderService(filterServices)
                                                            setFieldValue("amount", sliceNumberPriceRial(calculateProximateAmount(orders, filterServices, filterServices)))
                                                            setOrderPayment([])
                                                        }
                                                    }>
                                                        <Delete className="text-red-500 cursor-pointer" />
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ReusableCard>
                            <ReusableCard cardClassName="mt-4 md:mt-0">
                                <Typography variant="h2" color="primary">
                                    تسویه حساب
                                </Typography>
                                <Form className="mt-4">
                                    <Box component="div" className="md:flex space-y-4 md:space-y-0 gap-x-2">
                                        <FormikPrice disabled={data?.succeeded} name="amount" label="مبلغ" InputProps={{
                                            inputProps: {
                                                style: {
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                },
                                            },
                                        }} />
                                        <FormikInput disabled={data?.succeeded} name="number" label="روز" boxClassName="md:w-[50%]" InputProps={{
                                            inputProps: {
                                                style: {
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                },
                                            },
                                        }} />
                                        <Box component="div" className="flex w-full">
                                            <FormikDatepicker disabled={data?.succeeded} name="settlement" label="تاریخ" />
                                        </Box>
                                        <Box component="div" className="" onClick={() => {
                                            const orderPaymentCP = [...orderPayment]
                                            const orderPaymentData: IOrderPayment = {
                                                id: uuidv4(),
                                                amount: values.amount,
                                                daysAfterExit: +values.number,
                                                paymentDate: values.settlement,
                                                paymentType: 0
                                            }

                                            const currentTotalPayment = orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.amount.replace(/,/g, ""), 10), 0);

                                            if (Number(values.amount.replace(/,/g, "")) > calculateTotalAmount(orders, orderService)) {
                                                enqueueSnackbar("مبلغ تسویه از مبلغ کل نمی تواند بیشتر باشد", {
                                                    variant: "error",
                                                    anchorOrigin: { vertical: "top", horizontal: "center" }
                                                })
                                            } else if (new Date(moment(new Date()).format("jYYYY/jMM/jDD")) > new Date(values.settlement)) {
                                                enqueueSnackbar("تاریخ تسویه نمی تواند از تاریخ سفارش کمتر باشد", {
                                                    variant: "error",
                                                    anchorOrigin: { vertical: "top", horizontal: "center" }
                                                })
                                            } else if (currentTotalPayment + Number(values.amount.replace(/,/g, "")) > calculateTotalAmount(orders, orderService)) {
                                                enqueueSnackbar("مجموع مبالغ تسویه نمی تواند از مبلغ کل بیشتر باشد", {
                                                    variant: "error",
                                                    anchorOrigin: { vertical: "top", horizontal: "center" }
                                                })
                                            } else if (values.amount === "0" || values.amount === "") {
                                                enqueueSnackbar("مقدار صفر یا مقدار خالی برای مبلغ نامعتبر می باشد", {
                                                    variant: "error",
                                                    anchorOrigin: { vertical: "top", horizontal: "center" }
                                                })
                                            }
                                            else {
                                                setOrderPayment([...orderPaymentCP, orderPaymentData])
                                                setFieldValue("amount", sliceNumberPriceRial(calculateProximateAmount(orders, [...orderPaymentCP, orderPaymentData], orderService)))
                                                setFieldValue("number", "")
                                                setFieldValue("settlement", "")
                                            }
                                        }}>
                                            <Button color="secondary">
                                                <AddCircle />
                                            </Button>
                                        </Box>
                                    </Box>
                                    {orderPayment.map((i: IOrderPayment) =>
                                        <ReusableCard cardClassName="flex justify-between items-center my-4">
                                            <Box>
                                                <Typography variant="h4" color="primary"> مبلغ: {i.amount} ریال</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h4" color="primary"> تاریخ تسویه: {i.paymentDate ? i.paymentDate : i.daysAfterExit + " " + "روز بعد از وزن"} </Typography>
                                            </Box>
                                            {!data?.succeeded &&
                                                <Box>
                                                    <Delete className="text-red-500 cursor-pointer" onClick={() => {
                                                        const orderPaymentFilter = orderPayment.filter((item: IOrderPayment) => item.id !== i.id)
                                                        setOrderPayment(orderPaymentFilter)
                                                        setFieldValue("amount", sliceNumberPriceRial(calculateProximateAmount(orders, orderPaymentFilter, orderService)))
                                                    }} />
                                                </Box>
                                            }
                                        </ReusableCard>
                                    )}
                                    <Box component="div" className="flex flex-col justify-between mt-8">
                                        <Box component="div" className="flex mt-8">
                                            <Typography variant="h4" className="flex items-center text-gray-500">
                                                جمع کل مبالغ تسویه:
                                            </Typography>
                                            <Typography variant="h4" className="flex items-center px-4">
                                                {sliceNumberPriceRial(orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.amount.replace(/,/g, ""), 10), 0))} ریال
                                            </Typography>
                                        </Box>
                                        <Box component="div" className="flex mt-8">
                                            <Typography variant="h4" className="flex items-center text-gray-500">
                                                قیمت کل:
                                            </Typography>
                                            <Typography variant="h4" className="flex items-center px-4">
                                                {sliceNumberPriceRial(calculateTotalAmount(orders, orderService))} ریال
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Form>
                            </ReusableCard>
                        </Box>
                        <Box
                            component="div"
                            className="flex gap-x-8 my-4 justify-center items-center md:justify-end md:items-end"
                        >
                            <CustomButton
                                title={isLoading ? "در حال پردازش ...." : "ثبت سفارش"}
                                onClick={() => handleSubmit()}
                                disabled={orderPayment?.length <= 0 || isUpdate || orderCode !== 0}
                                color="primary"
                                isLoading={isLoading}
                            />
                            {orderCode !== 0 &&
                                <CustomButton
                                    title="پاک کردن فرم"
                                    onClick={() => window.location.reload()}
                                    disabled={orderCode === 0}
                                    color="secondary"
                                />
                            }
                        </Box>
                    </Form >
                }}

            </Formik >
            {/* Ok */}
            {isOpen &&
                <BottomDrawer
                    title="ایجاد مشتری جدید"
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <CustomerForm
                        refetch={refetchCustomers}
                        setIsCreateOpen={setIsOpen}
                    />
                </BottomDrawer >
            }
        </>
    );
};

export default Order;
