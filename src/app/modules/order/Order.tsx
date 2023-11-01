import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ProductSelectedList from "./components/ProductSelectedList";
import ProductSelectedListInModal from "./components/ProductSelectedListInModal";
import { useRetrieveProducts, useRetrieveProductsByBrand, useRetrieveProductsByWarehouse } from "../product/core/_hooks";
import { Form, Formik, FormikErrors } from "formik";
import { useCreateOrder } from "./core/_hooks";
import moment from "moment-jalaali";
import CreateCustomer from "../customer/components/CreateCustomer";
import { useGetCustomers } from "../customer/core/_hooks";
import { dropdownCustomer, dropdownExitType, dropdownInvoiceType, dropdownOrderSendType, dropdownPurchaseInvoice, dropdownRentPaymentType, dropdownWarehouses } from "./helpers/dropdowns";
import { exit } from "./helpers/fakeData";
import Swal from 'sweetalert2'
import { orderValidation } from "./validations/orderValidation";
import { useGetInvoiceType, useGetPaymentTypes, useGetPurchaseInvoice, useGetSendTypes, useGetWarehouses,
} from "../generic/_hooks";
import { Box, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { sliceNumberPriceRial } from "../../../_cloner/helpers/sliceNumberPrice";
import { convertToPersianWord } from "../../../_cloner/helpers/convertPersian";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import FormikInput from "../../../_cloner/components/FormikInput";
import CustomButton from "../../../_cloner/components/CustomButton";
import { AddCircle, Add, Grading, Delete } from "@mui/icons-material";
import { ICustomer } from "../customer/core/_models";
import { dropdownProductByBrandName } from "../generic/_functions";
import FormikProductComboSelect from "./components/FormikProductComboSelect";
import FormikComboBox from "../../../_cloner/components/FormikComboBox";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { customerFields, orderFields, orderFieldsIsBuy, orderTypesFields } from "./helpers/fields";
import { IOrderItems, IOrderPayment } from "./core/_models";
import { IProducts } from "../product/core/_models";
import FormikPrice from "../product/components/FormikPrice";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";
import FormikProximateAmount from "../product/components/FormikProximateAmount";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { calculateTotalAmount } from "./helpers/functions";
import { orderPaymentValues, orderInitialValues } from './helpers/initialValues'
import { useSnackbar } from 'notistack';
import BottomDrawer from "../../../_cloner/components/BottomSheetDrawer";
import CustomerForm from "../customer/components/CustomerForm";

const Order = () => {
    const { enqueueSnackbar } = useSnackbar();

    // Fetching Data
    const { data: customers, refetch: refetchCustomers } = useGetCustomers();
    const { data: products } = useRetrieveProducts();
    const productsTools = useRetrieveProductsByWarehouse();
    const { data: productsByBrand, isLoading: productByBrandLoading, isError: productByBrandError, } = useRetrieveProductsByBrand();
    const { data: orderSendType } = useGetSendTypes();
    const { data: rent } = useGetPaymentTypes();
    const { data: purchaseInvoiceType } = useGetPurchaseInvoice();
    const { data: factor } = useGetInvoiceType();
    const { data: warehouse } = useGetWarehouses();
    const { mutate, data } = useCreateOrder();
    // States
    const [isOpen, setIsOpen] = useState<boolean>(false); // OK
    const [selectedProductOpen, setSelectedProductOpen] = useState<boolean>(false); // OK
    const [isUpdate, setIsUpdate] = useState<boolean>(false); // OK
    const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0); // OK
    const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
    const [isBuy, setIsBuy] = useState<boolean>(false); // OK
    const [orderCode, setOrderCode] = useState<number>(0); //OK
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
    const [findCustomer, setFindCustomer] = useState<ICustomer>(); //OK

    useEffect(() => {calculateTotalAmount(orders)}, [orders]);

    const mainParseFields = (fields: FieldType, setFieldValue: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "customer":
                return (
                    <Box component="div" className="flex flex-col w-full">
                        <Box component="div" className="grid grid-col-1 md:grid-cols-6 gap-x-8">
                            <Box component="div" className="flex gap-x-2 w-full md:col-span-4">
                                <FormikComboBox
                                    disabled={data?.succeeded}
                                    onChange={(value: any) => handleChangeCustomer(value, setFieldValue)}
                                    options={dropdownCustomer(customers?.data)}
                                    renderOption={(props: any, option: any) => {
                                        return <li {...props}>
                                            <Typography style={{
                                                backgroundColor: `#${option.customerValidityColorCode}`,
                                                width: "100%"
                                            }}>{option.label}</Typography>
                                        </li>

                                    }
                                    }
                                    {...rest}
                                />
                                <IconButton
                                    onClick={() => setIsOpen(true)}
                                    className="flex justify-center items-center cursor-pointer text-xl"
                                >
                                    <AddCircle color="secondary" />
                                </IconButton>
                            </Box>
                            <Box component="div" className="flex flex-row pt-4 md:col-span-2">
                                <Typography variant="h4" className="text-gray-500">معرف: </Typography>
                                <Typography variant="h3" className="px-4">{findCustomer?.representative} </Typography>
                            </Box>
                        </Box>
                        <Box component="div" className="flex flex-wrap justify-between space-y-4 md:space-y-0 mt-4">
                            <Box component="div" className="flex flex-row">
                                <Typography variant="h4" className="text-gray-500">بدهی جاری: </Typography>
                                <Typography variant="h3" className="px-4 text-red-500">{findCustomer?.customerCurrentDept ? separateAmountWithCommas(Number(findCustomer?.customerCurrentDept)) : 0} ریال</Typography>
                            </Box>
                            <Box component="div" className="flex flex-row">
                                <Typography variant="h4" className="text-gray-500">بدهی کل: </Typography>
                                <Typography variant="h3" className="px-4 text-red-500">{findCustomer?.customerDept ? separateAmountWithCommas(Number(findCustomer?.customerDept)) : 0} ریال</Typography>
                            </Box>
                            <Box component="div" className="flex flex-row">
                                <Typography style={{
                                    backgroundColor: `#${findCustomer?.customerValidityColorCode}`
                                }} variant="h3" className="px-4 rounded-md py-1">{findCustomer?.customerValidityDesc}</Typography>
                            </Box>
                        </Box>
                    </Box>
                );
            case "settlementDate":
                return <FormikDatepicker {...rest} />;
            case "orderSendTypeId":
                return (
                    <FormikSelect
                        disabled={data?.succeeded}
                        options={dropdownOrderSendType(orderSendType)}
                        {...rest}
                    />
                );
            case "invoiceTypeId":
                return (
                    <FormikSelect
                        disabled={data?.succeeded}
                        options={dropdownInvoiceType(factor)}
                        {...rest}
                    />
                );
            case "paymentTypeId":
                return (
                    <FormikSelect
                        disabled={data?.succeeded}
                        options={dropdownRentPaymentType(rent)}
                        {...rest}
                    />
                );
            case "exitType":
                return (
                    <FormikSelect
                        disabled={data?.succeeded} options={dropdownExitType(exit)} {...rest} />
                );
            case "description":
                return (
                    <FormikInput
                        disabled={data?.succeeded} multiline rows={3} {...rest} />
                );
            default:
                <FormikInput {...rest} />;
                break;
        }
    };

    const orderParseFields = (fields: FieldType, values: any, setFieldValue: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "warehouse": 
                return <FormikSelect disabled={isUpdate || data?.succeeded} options={dropdownWarehouses(warehouse)} onChange={(value: any) => handleChangeWarehouse(value, setFieldValue)} {...rest} />
            case "product":
                return (
                    <Box component="div" className="flex gap-x-2 w-full">
                        <FormikProductComboSelect
                            disabled={isUpdate || data?.succeeded}
                            onChange={(value: any) => handleChangeProduct(value, setFieldValue)}
                            options={dropdownProductByBrandName(productsTools?.data?.data)}
                            {...rest}
                        />
                        <Button
                            onClick={() => setSelectedProductOpen(true)}
                            variant="contained"
                            color="primary"
                            disabled={data?.succeeded}
                        >
                            <Grading />
                        </Button>
                        <BottomDrawer
                            title="انتخاب محصول"
                            open={selectedProductOpen}
                            onClose={() => setSelectedProductOpen(false)}
                            // description="می توانید از طریق لیست محصولات ذیل نیست به انتخاب کالا و ثبت در لیست سفارشات اقدام نمایید"
                        >
                            <ProductSelectedListInModal
                                products={productsByBrand?.data}
                                productLoading={productByBrandLoading}
                                productError={productByBrandError}
                                setSelectedProductOpen={setSelectedProductOpen}
                                setFieldValue={setFieldValue}
                                orders={orders}
                                setOrders={setOrders}
                            />
                        </BottomDrawer>
                    </Box>
                );
            case "purchaserCustomer":
                return (
                    <FormikComboBox
                        disabled={data?.succeeded}
                        options={dropdownCustomer(customers?.data)}
                        {...rest}
                    />
                );
            case "purchaseInvoiceType":
                return (
                    <FormikSelect
                        options={dropdownPurchaseInvoice(purchaseInvoiceType)}
                        {...rest}
                    />
                );
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
                return <FormikPrice disabled={data?.succeeded}  {...rest} />;
            case "input":
                return <FormikInput disabled={data?.succeeded}  {...rest} />;
            default:
                <FormikInput disabled={data?.succeeded} {...rest} />;
                break;
        }
    };

    const handleChangeWarehouse = (value: any, setFieldValue: any) => {
        productsTools.mutate(value)
        const fieldValue = [
            {id: uuidv4(), title: "productName", value: ""},
            {id: uuidv4(), title: "id", value: ""},
            {id: uuidv4(), title: "productPrice", value: ""},
            {id: uuidv4(), title: "productBrandId", value: ""},
            {id: uuidv4(), title: "productBrandName", value: ""},
            {id: uuidv4(), title: "warehouseId", value: ""},
            {id: uuidv4(), title: "proximateAmount", value: ""},
            {id: uuidv4(), title: "warehouseName", value: ""},
            {id: uuidv4(), title: "proximateSubUnit", value: ""},
            {id: uuidv4(), title: "buyPrice", value: ""},
            {id: uuidv4(), title: "purchaseInvoiceTypeName", value: ""},
            {id: uuidv4(), title: "purchaseInvoiceTypeId", value: ""},
            {id: uuidv4(), title: "purchaseSettlementDate", value: ""},
            {id: uuidv4(), title: "purchaserCustomerId", value: ""},
            {id: uuidv4(), title: "purchaserCustomerName", value: ""},
            {id: uuidv4(), title: "rowId", value: ""},
            {id: uuidv4(), title: "productDesc", value: ""},
            {id: uuidv4(), title: "mainUnit", value: ""},
            {id: uuidv4(), title: "subUnit", value: ""},
        ];
        fieldValue?.forEach((i: {title: string , value: any}) => setFieldValue(i.title, i.value))
        if (value === 1) setIsBuy(true)
        else setIsBuy(false)
    }

    const handleChangeProduct = (value: any, setFieldValue: any) => {
        const fieldValue = [
            { id: uuidv4, title: "productBrandName", value: value?.productBrandName },
            { id: uuidv4, title: "warehouseName", value: value?.warehouseName },
            { id: uuidv4, title: "mainUnit", value: value?.productMainUnitDesc },
            { id: uuidv4, title: "subUnit", value: value?.productSubUnitDesc },
        ]
        fieldValue.forEach((i: { title: string, value: any }) => setFieldValue(i.title, i.value))
        if (value?.warehouseId === 1) setIsBuy(true)
        else setIsBuy(false)
    }

    const handleOrder = (values: any, setFieldValue: any) => {
        const fields = ["productName", "id", "warehouseId", "warehouseTypeId", "warehouseName", "productDesc", "productBrandDesc", "buyPrice", "purchaseSettlementDate", "purchaseInvoiceTypeId", "purchaseInvoiceTypeName", "sellerCompanyRow", "proximateAmount", "productPrice", "rowId", "proximateSubUnit", "purchaserCustomerId", "purchaserCustomerName", "mainUnit", "subUnit"];

        const warehouseTypeId = warehouse?.find((i: any) => i.id === values.warehouseId);
        const warehouseName = warehouse?.find((i: any) => i.id === values.warehouseId);
        const purchaseInvoiceTypeName = purchaseInvoiceType?.find((i: any) => i.id === Number(values?.purchaseInvoiceTypeId));

        const productOrder: IOrderItems = {
            id: values?.productName?.value ? values?.productName?.value : values.id,
            productName: values?.productName?.productName ? values?.productName?.productName : values?.productName,
            warehouseId: values?.productName?.warehouseId ? values?.productName?.warehouseId : values.warehouseId,
            productBrandName: values?.productName?.productBrandName ? values?.productName?.productBrandName : values.productBrandName,
            productBrandId: values.productName.productBrandId ? values.productName.productBrandId : values.productBrandId,
            warehouseTypeId: warehouseTypeId?.warehouseTypeId,
            warehouseName: values.warehouseName ? values.warehouseName : warehouseName?.name,
            productDesc: values?.productDesc,
            buyPrice: values?.buyPrice,
            purchaseSettlementDate: values.purchaseSettlementDate,
            purchaseInvoiceTypeId: Number(values?.purchaseInvoiceTypeId),
            purchaseInvoiceTypeName: purchaseInvoiceTypeName?.desc,
            sellerCompanyRow: values.sellerCompanyRow,
            proximateAmount: values.proximateAmount,
            proximateSubUnit: values.proximateSubUnit,
            purchaserCustomerId: values.purchaserCustomerId?.value ? values.purchaserCustomerId?.value : values.purchaserCustomerId,
            purchaserCustomerName: values.purchaserCustomerId?.label ? values.purchaserCustomerId?.label : values.purchaserCustomerName,
            mainUnit: values.mainUnit,
            subUnit: values.subUnit,
            productPrice: values?.productPrice,
            rowId: values?.rowId,
        };

        if (!isUpdate) {
            const isDuplicate = orders.some(
                (order: any) =>
                    order.id === productOrder.id &&
                    order.warehouseId === productOrder.warehouseId &&
                    order.productName === productOrder.productName &&
                    order.productBrandId === productOrder.productBrandId
            );

            if (values.productName === "" || values.productName.label === "") {
                enqueueSnackbar("وارد نمودن کالا الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: {vertical: "top", horizontal: "center"}
                  })
                } else if (values?.productPrice === "") {
                enqueueSnackbar("وارد نمودن قیمت الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: {vertical: "top", horizontal: "center"}
                    })
                } else if (values?.proximateAmount === "") {
                enqueueSnackbar("وارد نمودن مقدار الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: {vertical: "top", horizontal: "center"}
                    })
                }
            else if (isDuplicate) {
                enqueueSnackbar("کالا انتخاب شده در لیست سفارشات موجود و تکراری می باشد", {
                    variant: "error",
                    anchorOrigin: {vertical: "top", horizontal: "center"}
                    })
            } else {
                setOrders([...orders, productOrder]);
                setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount([...orders, productOrder])))
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
                enqueueSnackbar("وارد نمودن کالا الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: {vertical: "top", horizontal: "center"}
                  })
            } else if (values?.productPrice === "") {
                enqueueSnackbar("وارد نمودن قیمت الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: {vertical: "top", horizontal: "center"}
                  })
            } else if (values?.proximateAmount === "") {
                enqueueSnackbar("وارد نمودن مقدار الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: {vertical: "top", horizontal: "center"}
                  })
            } else {
                setOrders(updatedOrders);
                setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount(updatedOrders)))
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
        const findCustomer = customers?.data.find((i: any) => i.id === value?.value);
        setFindCustomer(findCustomer);
        setFieldValue("number", findCustomer?.settlementDay)
        if (findCustomer?.settlementType !== 1) setFieldValue("settlement", moment(new Date()).format("jYYYY/jMM/jDD"));
        else setFieldValue("settlement", "");

        if (findCustomer === undefined || findCustomer === null) {
            setFieldValue("number", "")
            setFieldValue("settlement", "");
        }
    };

    const fieldsToMap = isBuy ? orderFieldsIsBuy : orderFields;

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{ ...orderInitialValues, ...orderPaymentValues }}
                validationSchema={orderValidation}
                onSubmit={async (values: any) => {
                    if (orders?.length === 0) {
                        enqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد", {
                            variant: "error",
                            anchorOrigin: {vertical: "top", horizontal: "center"}
                          })
                    } else {
                        try {
                            const formData = {
                                customerId: values.customerId.value,
                                totalAmount: calculateTotalAmount(orders),
                                description: values.description,
                                exitType: Number(values.exitType),
                                orderSendTypeId: Number(values.orderSendTypeId),
                                paymentTypeId: Number(values.paymentTypeId),
                                customerOfficialName: "string",
                                invoiceTypeId: Number(values.invoiceTypeId),
                                freightName: "string",
                                settlementDate: "1402/02/02",
                                dischargePlaceAddress: "string",
                                freightDriverName: "string",
                                carPlaque: "string",
                                details: orders?.map((item: any) => {
                                    return {
                                        rowId: item.rowId ? Number(item.rowId) : 0,
                                        productId: item.id,
                                        warehouseId: item.warehouseId ? Number(item.warehouseId) : null,
                                        productBrandId: item.productBrandId ? Number(item.productBrandId) : 25,
                                        proximateAmount: item.proximateAmount ? Number(item.proximateAmount?.replace(/,/g, "")) : 0,
                                        numberInPackage: item.numberInPackage ? Number(item.numberInPackage) : 0,
                                        price: item.productPrice ? Number(item.productPrice?.replace(/,/g, "")) : null,
                                        cargoSendDate: "1402/01/01",
                                        buyPrice: item.buyPrice ? Number(item.buyPrice) : 0,
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
                                })
                            };

                            mutate(formData, {
                                onSuccess: (response) => {
                                    if(response.succeeded) {
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
                                    } else {
                                        enqueueSnackbar(response?.data.Message, {
                                            variant: "error",
                                            anchorOrigin: {vertical: "top", horizontal: "center"}
                                          })            
                                    }
                                }
                            });
                        } catch (error) {
                            enqueueSnackbar("خطای در ثبت، لطفا با پشتیبان تماس بگیرید", {
                                variant: "error",
                                anchorOrigin: {vertical: "top", horizontal: "center"}
                              })
                        }
                    }
                }}
            >
                {({ handleSubmit, values, setFieldValue }) => {
                    return <Form>
                        <Box
                            component="div"
                            className="md:grid md:grid-cols-3 gap-x-4 space-y-4 md:space-y-0 my-4"
                        >
                            <ReusableCard>
                                <Box component="div" className="md:space-y-8 space-y-4">
                                    <Box component="div" className="flex flex-wrap justify-between space-y-4 md:space-y-0">
                                        <Box component="div" className="flex">
                                            <Typography variant="h4" className="text-gray-500">
                                                شماره سفارش:
                                            </Typography>
                                            <Typography variant="h2" className="text-green-600 px-4">
                                                {orderCode}
                                            </Typography>
                                        </Box>
                                        <Box component="div" className="flex">
                                            <Typography variant="h4" className="text-gray-500">
                                                تاریخ سفارش:
                                            </Typography>
                                            <Typography variant="h3" className="px-4">
                                                {moment(new Date()).format("jYYYY/jMM/jDD")}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box component="div" className="flex">
                                        <Typography variant="h4" className="text-gray-500">
                                            قیمت کل:
                                        </Typography>
                                        <Typography variant="h2" className="px-4">
                                            {sliceNumberPriceRial(calculateTotalAmount(orders))} ریال
                                        </Typography>
                                        <Typography className="px-2"> ({convertToPersianWord(calculateTotalAmount(orders))} تومان)</Typography>
                                    </Box>
                                </Box>
                            </ReusableCard>
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
                                                    setFieldValue
                                                )
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </ReusableCard>

                        </Box>
                        <ReusableCard cardClassName="my-4">
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
                                    <Box
                                        component="div"
                                        className="flex flex-col md:flex-row items-start justify-between "
                                    >
                                        <Box
                                            component="div"
                                            className="order-1 md:order-0"
                                        >
                                            <Typography
                                                variant="h2"
                                                color="primary"
                                            >
                                                لیست سفارشات
                                            </Typography>
                                        </Box>
                                        <Box
                                            component="div"
                                            // className="md:w-1/4 w-full order-0 md:order-1 mb-2"
                                            className="order-0 md:order-1 mb-2"
                                        >
                                            {isUpdate ? (
                                                <Box
                                                    component="div"
                                                    onClick={() =>
                                                        handleOrder(
                                                            values,
                                                            setFieldValue
                                                        )
                                                    }
                                                    className="w-full flex p-2 rounded-md bg-yellow-500 cursor-pointer"
                                                >
                                                    <Add />
                                                    <Typography>
                                                        ویرایش
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Box
                                                    component="div"
                                                    onClick={() =>
                                                        handleOrder(
                                                            values,
                                                            setFieldValue
                                                        )
                                                    }
                                                    // className="w-full flex p-2 rounded-md bg-green-500 cursor-pointer"
                                                    className="p-2 rounded-md bg-green-500 cursor-pointer"
                                                >
                                                    <Add />
                                                    {/* <Typography>
                                                        افزودن به لیست سفارشات
                                                    </Typography> */}
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
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
                                />
                            </Form>
                        </ReusableCard>
                        <Box component="div" className="md:grid md:grid-cols-2 gap-x-4">
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
                                                    setFieldValue
                                                )
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </ReusableCard>
                            <ReusableCard>
                                <Typography variant="h2" color="primary">
                                    تسویه حساب
                                </Typography>
                                <Form className="mt-4">
                                    <Box component="div" className="md:flex gap-x-2">
                                        <FormikPrice disabled={data?.succeeded} name="amount" label="مبلغ" InputProps={{
                                            inputProps: {
                                                style: {
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                },
                                            },
                                        }} />
                                        <FormikInput disabled={values.settlement !== "" || data?.succeeded} name="number" label="روز" boxClassName="md:w-[50%]" InputProps={{
                                            inputProps: {
                                                style: {
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                },
                                            },
                                        }} />
                                        <Box component="div" className="flex w-full">
                                            <FormikDatepicker disabled={values.number && values.number != 0 || data?.succeeded} name="settlement" label="تاریخ" />
                                        </Box>
                                        <Box component="div" className="" onClick={() => {
                                            const orderPaymentCP = [...orderPayment]
                                            const orderPaymentData: IOrderPayment = {
                                                id: uuidv4(),
                                                amount: values.amount,
                                                daysAfterExit: values.number,
                                                paymentDate: values.settlement,
                                                paymentType: 0
                                            }

                                            const currentTotalPayment = orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.amount.replace(/,/g, ""), 10), 0);

                                            if (Number(values.amount.replace(/,/g, "")) > calculateTotalAmount(orders)) {
                                                enqueueSnackbar("مبلغ تسویه از مبلغ کل نمی تواند بیشتر باشد", {
                                                    variant: "error",
                                                    anchorOrigin: {vertical: "top", horizontal: "center"}
                                                  })
                                            } else if (new Date(moment(new Date()).format("jYYYY/jMM/jDD")) > new Date(values.settlement)) {
                                                enqueueSnackbar("تاریخ تسویه نمی تواند از تاریخ سفارش کمتر باشد", {
                                                    variant: "error",
                                                    anchorOrigin: {vertical: "top", horizontal: "center"}
                                                  })
                                            } else if (currentTotalPayment + Number(values.amount.replace(/,/g, "")) > calculateTotalAmount(orders)) {
                                                enqueueSnackbar("مجموع مبالغ تسویه نمی تواند از مبلغ کل بیشتر باشد", {
                                                    variant: "error",
                                                    anchorOrigin: {vertical: "top", horizontal: "center"}
                                                  })
                                            } else if (values.amount === "0" || values.amount === "") {
                                                enqueueSnackbar("مقدار صفر یا مقدار خالی برای مبلغ نامعتبر می باشد", {
                                                    variant: "error",
                                                    anchorOrigin: {vertical: "top", horizontal: "center"}
                                                  })
                                            }
                                            else {
                                                setOrderPayment([...orderPaymentCP, orderPaymentData])
                                                setFieldValue("amount", "")
                                                setFieldValue("number", "")
                                                setFieldValue("settlement", "")
                                            }
                                        }}>
                                            <Button>
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
                                                    }} />
                                                </Box>
                                            }
                                        </ReusableCard>
                                    )}
                                    <Box component="div" className="flex justify-between mt-8">
                                        <Box component="div" className="flex mt-8">
                                            <Typography variant="h4" className="flex items-center text-gray-500">
                                                جمع کل مبالغ تسویه:
                                            </Typography>
                                            <Typography variant="h4" className="flex items-center px-4">
                                                {sliceNumberPriceRial(orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.amount.replace(/,/g, ""), 10), 0))} ریال
                                                {/* {sliceNumberPriceRial(calculateTotalAmount(orders))} ریال */}
                                                {/* {sliceNumberPriceRial(Number(values.amount.replace(/,/g, "")) + Number(orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + Number(currentValue.amount.replace(/,/g, "")), 0)))} ریال */}
                                            </Typography>
                                        </Box>
                                        <Box component="div" className="flex mt-8">
                                            <Typography variant="h4" className="flex items-center text-gray-500">
                                                قیمت کل:
                                            </Typography>
                                            <Typography variant="h4" className="flex items-center px-4">
                                                {sliceNumberPriceRial(calculateTotalAmount(orders))} ریال
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
                                title="ثبت سفارش"
                                onClick={() => handleSubmit()}
                                disabled={orderPayment?.length <= 0 || isUpdate || orderCode !== 0}
                                color="primary"
                            />
                            <CustomButton
                                title="پاک کردن فرم"
                                onClick={() => window.location.reload()}
                                disabled={orderCode === 0}
                                color="secondary"
                            />
                        </Box>
                    </Form>
                }}

            </Formik>
            {/* Ok */}
            <BottomDrawer
                title="ایجاد مشتری جدید"
                open    ={isOpen}
                onClose={() => setIsOpen(false)}
                // width="max-w-6xl"
                // description="برای ایجاد مشتری جدید، لطفاً مشخصات مشتری خود را با دقت وارد کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <CustomerForm
                    refetch={refetchCustomers}
                    setIsCreateOpen={setIsOpen}
                />
            </BottomDrawer>
        </>
    );
};

export default Order;
