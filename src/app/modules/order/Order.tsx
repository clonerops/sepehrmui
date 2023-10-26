import { useEffect, useId, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ProductSelectedList from "./components/ProductSelectedList";
import ProductSelectedListInModal from "./components/ProductSelectedListInModal";
import {
    useRetrieveProducts,
    useRetrieveProductsByBrand,
} from "../product/core/_hooks";
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
import {
    Box,
    Button,
    Card,
    Typography,
    IconButton,
    InputAdornment,
    Badge,
    Snackbar,
    Alert,
} from "@mui/material";
import { sliceNumberPrice, sliceNumberPriceRial } from "../../../_cloner/helpers/sliceNumberPrice";
import { convertToPersianWord } from "../../../_cloner/helpers/convertPersian";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import FormikInput from "../../../_cloner/components/FormikInput";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import CustomButton from "../../../_cloner/components/CustomButton";
import { AddCircle, Add, Grading, Delete } from "@mui/icons-material";
import { ICustomer } from "../customer/core/_models";
import {
    dropdownProductIntegrated,
    dropdownProductName,
} from "../generic/_functions";
import FormikProductComboSelect from "./components/FormikProductComboSelect";
import FormikComboBox from "../../../_cloner/components/FormikComboBox";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { customerFields, orderFields, orderFieldsIsBuy, orderTypesFields, settlementFields } from "./helpers/fields";
import { IOrderPayment, IProduct } from "./core/_models";
import { IProducts } from "../product/core/_models";
import FormikPrice from "../product/components/FormikPrice";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";
import FormikProximateAmount from "../product/components/FormikProximateAmount";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import SnackeBar from "../../../_cloner/components/SnackeBar";
import CustomSnackbar from "../../../_cloner/components/SnackeBar";

const orderPaymentValues = {
    // amount: orders.length > 0 ? orders.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.productPrice.replace(/,/g, ""), 10), 0) : "",
    amount: "",
    number: "",
    settlement: ""
}


const initialValues = {
    customerId: "",
    settlementDate: "",
    exitType: "",
    orderSendTypeId: "",
    paymentTypeId: "",
    invoiceTypeId: "",
    customerOfficialName: "",
    // Order
    rowId: "",
    id: "",
    warehouseId: "",
    warehouseTypeId: "",
    proximateAmount: "",
    numberInPackage: "",
    productDesc: "",
    productPrice: "",
    cargoSendDate: "",
    buyPrice: "",
    purchaseInvoiceTypeId: "",
    purchaserCustomerId: "",
    purchaseSettlementDate: "",
    sellerCompanyRow: "",
    // not Main
    productName: "",
    warehouseName: "",
    proximateSubUnit: "",
    mainUnit: "",
    subUnit: ""
};

// const orderInitialValues = {
// };

const Order = () => {
    // Fetching Data
    const { data: customers, refetch: refetchCustomers } = useGetCustomers();
    const {
        data: products,
        isLoading: productLoading,
        isError: productError,
    } = useRetrieveProducts();
    const {
        data: productsByBrand,
        isLoading: productByBrandLoading,
        isError: productByBrandError,
    } = useRetrieveProductsByBrand();
    const { data: orderSendType } = useGetSendTypes();
    const { data: rent } = useGetPaymentTypes();
    const { data: purchaseInvoiceType } = useGetPurchaseInvoice();
    const { data: factor } = useGetInvoiceType();
    const { data: warehouse } = useGetWarehouses();
    const { mutate } = useCreateOrder();

    // States
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [selectedOrderIndex, setSelectedOrderIndex] = useState<any>(null);
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);
    const [selectedProductOpen, setSelectedProductOpen] =
        useState<boolean>(false);
    const [selectProductFromModal, setSelectProductFromModal] = useState<any>();
    const [orders, setOrders] = useState<any>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [purchaseInvoiceTypeSelected, setPurchaseInvoiceTypeSelected] =
        useState<{ value: number | null; label: string | null }>();
    const [isBuy, setIsBuy] = useState<boolean>(false);
    const [orderCode, setOrderCode] = useState<number>(0);
    const [orderData, setOrderData] = useState<any>();
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]);
    const [errorMessages, setErrorMessages] = useState<any>([]);

    // Snackebar
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    useEffect(() => {
        const prices = orders?.map((obj: any) =>
            Number(obj.productPrice?.replace(/,/g, ""))
        );
        const newPrices = [...prices];
        const newTotal = newPrices.reduce((acc: any, item) => acc + item, 0);
        setTotalAmount(newTotal);
    }, [orders]);

    const mainParseFields = (fields: FieldType, setFieldValue: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "customer":
                return (
                    <Box component="div" className="flex flex-col w-full">
                        <Box component="div" className="flex gap-x-2 w-full">
                            <FormikComboBox
                                onChange={(value: any) => handleChangeCustomer(value, setFieldValue)}
                                options={dropdownCustomer(customers?.data)}
                                {...rest}
                            />
                            <IconButton
                                onClick={() => setIsOpen(true)}
                                className="flex justify-center items-center cursor-pointer text-xl"
                            >
                                <AddCircle color="secondary" />
                            </IconButton>
                        </Box>
                        <Box component="div" className="flex justify-between mt-4">
                            <Box component="div" className="flex flex-row">
                                <Typography variant="h4" className="text-gray-500">بدهی جاری: </Typography>
                                <Typography variant="h3" className="px-4">0 ریال</Typography>
                            </Box>
                            <Box component="div" className="flex flex-row">
                                <Typography variant="h4" className="text-gray-500">بدهی کل: </Typography>
                                <Typography variant="h3" className="px-4">0 ریال</Typography>
                            </Box>
                        </Box>
                    </Box>
                );
            case "settlementDate":
                return <FormikDatepicker {...rest} />;
            case "orderSendTypeId":
                return (
                    <FormikSelect
                        options={dropdownOrderSendType(orderSendType)}
                        {...rest}
                    />
                );
            case "invoiceTypeId":
                return (
                    <FormikSelect
                        options={dropdownInvoiceType(factor)}
                        {...rest}
                    />
                );
            case "paymentTypeId":
                return (
                    <FormikSelect
                        options={dropdownRentPaymentType(rent)}
                        {...rest}
                    />
                );
            case "exitType":
                return (
                    <FormikSelect options={dropdownExitType(exit)} {...rest} />
                );
            default:
                <FormikInput {...rest} />;
                break;
        }
    };
    const orderParseFields = (
        fields: FieldType,
        values: any,
        setFieldValue: any
    ) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "product":
                return (
                    <Box component="div" className="flex gap-x-2 w-full">
                        <FormikProductComboSelect
                            onChange={(value: any) => handleChangeProduct(value, setFieldValue)}
                            options={dropdownProductName(products?.data)}
                            {...rest}
                        />
                        <Button
                            onClick={() => setSelectedProductOpen(true)}
                            variant="contained"
                            color="primary"
                        >
                            <Grading />
                        </Button>
                        <TransitionsModal
                            title="انتخاب محصول"
                            open={selectedProductOpen}
                            isClose={() => setSelectedProductOpen(false)}
                            // width="max-w-6xl"
                            description="می توانید از طریق لیست محصولات ذیل نیست به انتخاب کالا و ثبت در لیست سفارشات اقدام نمایید"
                        >
                            <ProductSelectedListInModal
                                // productsByBrand={productsByBrand?.data}
                                products={products?.data}
                                productLoading={productByBrandLoading}
                                productError={productByBrandError}
                                setSelectedProductOpen={setSelectedProductOpen}
                                setSelectProductFromModal={
                                    setSelectProductFromModal
                                }
                                setFieldValue={setFieldValue}
                                orders={orders}
                                setOrders={setOrders}
                            />
                        </TransitionsModal>
                    </Box>
                );
            case "warehouses":
                return (
                    <FormikSelect
                        onChange={(value) => onWarehouseChange(value)}
                        options={dropdownWarehouses(warehouse)}
                        {...rest}
                    />
                );
            case "purchaserCustomer":
                return (
                    <FormikComboBox
                        options={dropdownCustomer(customers?.data)}
                        {...rest}
                    />
                );
            case "purchaseInvoiceType":
                return (
                    <FormikSelect
                        value={purchaseInvoiceTypeSelected}
                        onSelect={(value: any) =>
                            setPurchaseInvoiceTypeSelected(value)
                        }
                        options={dropdownPurchaseInvoice(purchaseInvoiceType)}
                        {...rest}
                    />
                );
            case "date":
                return <FormikDatepicker {...rest} />;
            case "proximateAmount":
                return (
                    <FormikProximateAmount
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
                                    {/* {products?.data?.find(
                                            (i: IProducts) =>
                                                i.id ===
                                                values?.productName?.value
                                        )?.productMainUnitDesc} */}
                                    {/* {values.id
                                        ? products?.data?.find(
                                            (i: IProducts) =>
                                                i.id === values?.id
                                        )?.productMainUnitDesc
                                        : products?.data?.find(
                                            (i: IProducts) =>
                                                i.id ===
                                                values?.productName?.value
                                        )?.productMainUnitDesc} */}
                                </InputAdornment>
                            ),
                        }}
                        {...rest}
                    />
                );
            case "proximateSubUnit":
                return (
                    <FormikPrice
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    {values.subUnit}
                                    {/* {products?.data?.find(
                                            (i: IProducts) =>
                                                i.id ===
                                                values?.productName?.value
                                        )?.productSubUnitDesc} */}
                                    {/* {values.id
                                        ? products?.data?.find(
                                            (i: IProducts) =>
                                                i.id === values?.id
                                        )?.productSubUnitDesc
                                        : products?.data?.find(
                                            (i: IProducts) =>
                                                i.id ===
                                                values?.productName?.value
                                        )?.productSubUnitDesc} */}
                                </InputAdornment>
                            ),
                        }}
                        {...rest}
                    />
                );
            case "price":
                return <FormikPrice {...rest} />;
            case "input":
                return <FormikInput {...rest} />;
            default:
                <FormikInput {...rest} />;
                break;
        }
    };

    const handleChangeProduct = (value: any, setFieldValue: any) => {
        setFieldValue("mainUnit", products?.data?.find((i: IProducts) =>i.id ===value?.value)?.productMainUnitDesc)
        setFieldValue("subUnit", products?.data?.find((i: IProducts) =>i.id ===value?.value)?.productSubUnitDesc)

    }

    const onWarehouseChange = (value: number) => {
        const warehousTypeId = warehouse.find((i: any) => i.id === value);
        if (warehousTypeId.warehouseTypeId === 1) {
            setIsBuy(true);
        } else {
            setIsBuy(false);
        }
    };

    const handleOrder = (values: any, setFieldValue: any) => {
        const fields = [
            "productName",
            "id",
            "warehouseId",
            "warehouseTypeId",
            "warehouseName",
            "productDesc",
            "buyPrice",
            "purchaseSettlementDate",
            "purchaseInvoiceTypeId",
            "purchaseInvoiceTypeName",
            "sellerCompanyRow",
            "proximateAmount",
            "productPrice",
            "rowId",
            "proximateSubUnit",
            "mainUnit",
            "subUnit"
        ];

        const warehouseTypeId = warehouse?.find(
            (i: any) => i.id === values.warehouseId
        );
        const warehouseName = warehouse?.find(
            (i: any) => i.id === values.warehouseId
        );
        const purchaseInvoiceTypeName = purchaseInvoiceType?.find(
            (i: any) => i.id === Number(values?.purchaseInvoiceTypeId)
        );

        const productOrder = {
            id: values.productName.value ? values.productName.value : values.id,
            productName: values.productName.label
                ? values.productName.label
                : values.productName,
            warehouseId: values.warehouseId
                ? values.warehouseId
                : selectProductFromModal?.row.productInventories[
                    selectProductFromModal.row.productInventories.length - 1
                ].warehouseId,
            warehouseTypeId: warehouseTypeId?.warehouseTypeId,
            warehouseName: values.warehouseName
                ? values.warehouseName
                : warehouseName?.name,
            productDesc: values?.productDesc,
            buyPrice: values?.buyPrice,
            purchaseSettlementDate: values.purchaseSettlementDate,
            purchaseInvoiceTypeId: Number(values?.purchaseInvoiceTypeId),
            purchaseInvoiceTypeName: purchaseInvoiceTypeName?.desc,
            sellerCompanyRow: values.sellerCompanyRow,
            proximateAmount: values.proximateAmount,
            proximateSubUnit: values.proximateSubUnit,
            // mainUnit: products?.data?.find((i: IProducts) => i.id === values.productName.value ? values.productName.value : values.id)?.productMainUnitDesc,
            // subUnit: products?.data?.find((i: IProducts) => i.id === values.productName.value ? values.productName.value : values.id)?.productSubUnitDesc,
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
                    order.productName === productOrder.productName
            );

            if (values.productName === "" || values.productName.label === "") {
                setOpen(true)
                setMessage("کالا الزامی می باشد")
                setSeverity("error")
            } else if (values?.productPrice === "") {
                setOpen(true)
                setMessage("قیمت الزامی می باشد")
                setSeverity("error")
            } else if (isDuplicate) {
                setOpen(true)
                setMessage("کالا در لیست سفارشات موجود می باشد")
                setSeverity("error")

            } else {
                setOrders([...orders, productOrder]);
                setFieldValue("amount", sliceNumberPriceRial([...orders, productOrder].reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.productPrice.replace(/,/g, ""), 10), 0)))
            }
            fields.forEach((element) => {
                setFieldValue(element, "");
            });
        } else {
            const updatedOrder = {
                ...productOrder,
            };
            const updatedOrders = [...orders];
            updatedOrders[selectedOrderIndex] = updatedOrder;

            setOrders(updatedOrders);
            setFieldValue("amount", sliceNumberPriceRial(updatedOrders.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.productPrice.replace(/,/g, ""), 10), 0)))
            setSelectedOrderIndex(null);
            fields.forEach((element) => {
                setFieldValue(element, "");
            });
            setIsBuy(false);
            setIsUpdate(false);
        }
    };

    const [findCustomer, setFindCustomer] = useState<ICustomer>();

    const handleChangeCustomer = (value: any, setFieldValue: any) => {
        const findCustomer = customers?.data.find(
            (i: any) => i.id === value?.value
        );
        setFindCustomer(findCustomer);
        setFieldValue("number", findCustomer?.settlementDay)
        if (findCustomer?.settlementType !== 1) {
            setFieldValue("settlement", moment(new Date()).format("jYYYY/jMM/jDD"));
        } else {
            setFieldValue("settlement", "");
        }
        if (findCustomer === undefined || findCustomer === null) {
            setFieldValue("number", "")
            setFieldValue("settlement", "");
        }
    };

    const fieldsToMap = isBuy ? orderFieldsIsBuy : orderFields;

    const handleReset = () => {
        window.location.reload()
    }

    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        orderData?.message || (orderData?.data?.Errors.length > 0 && orderData?.data?.Errors[0]) ||
                        orderData?.Message ||
                        orderData?.data?.Message
                    }
                />
            )}
            <Formik
                enableReinitialize
                initialValues={{
                    ...initialValues,
                    ...orderPaymentValues,
                }}
                validationSchema={orderValidation}
                onSubmit={async (
                    values: any,
                    {
                        setStatus,
                        setSubmitting,
                        resetForm,
                    }
                ) => {
                    if (orders?.length === 0) {
                        alert("لیست سفارشات خالی می باشد");
                    } else {
                        try {
                            const formData = {
                                customerId: values.customerId.value,
                                totalAmount: totalAmount,
                                description: values.description,
                                productBrandId: 5,
                                exitType: Number(values.exitType),
                                orderSendTypeId: Number(
                                    values.orderSendTypeId
                                ),
                                paymentTypeId: Number(
                                    values.paymentTypeId
                                ),
                                customerOfficialName: "string",
                                invoiceTypeId: Number(
                                    values.invoiceTypeId
                                ),
                                freightName: "string",
                                settlementDate: values.settlementDate,
                                dischargePlaceAddress: "string",
                                freightDriverName: "string",
                                carPlaque: "string",
                                details: orders?.map((item: any) => {
                                    return {
                                        rowId: item.rowId
                                            ? Number(item.rowId)
                                            : 0,
                                        productId: item.id,
                                        warehouseTypeId:
                                            item.warehouseTypeId,
                                        warehouseId: item.warehouseId
                                            ? Number(item.warehouseId)
                                            : null,
                                        productBrandId: item.productBrandId
                                            ? Number(item.productBrandId)
                                            : 25,
                                        proximateAmount:
                                            item.proximateAmount
                                                ? Number(
                                                    item.proximateAmount?.replace(
                                                        /,/g,
                                                        ""
                                                    )
                                                )
                                                : 0,
                                        numberInPackage:
                                            item.numberInPackage
                                                ? Number(
                                                    item.numberInPackage
                                                )
                                                : 0,
                                        price: item.productPrice
                                            ? Number(
                                                item.productPrice?.replace(
                                                    /,/g,
                                                    ""
                                                )
                                            )
                                            : null,
                                        cargoSendDate: "1402/01/01",
                                        buyPrice: item.buyPrice
                                            ? Number(item.buyPrice)
                                            : 0,
                                        purchaseInvoiceTypeId:
                                            item.purchaseInvoiceTypeId
                                                ? item.purchaseInvoiceTypeId
                                                : null,
                                        purchaserCustomerId:
                                            item.purchaserCustomerId
                                                ? item
                                                    .purchaserCustomerId
                                                    .value
                                                : null,
                                        purchaseSettlementDate:
                                            "1402/01/01",
                                        sellerCompanyRow:
                                            item.sellerCompanyRow
                                                ? item.sellerCompanyRow
                                                : null,
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
                                onSuccess: (orderData) => {
                                    setOrderData(orderData);
                                    setSnackeOpen(true);
                                    setOrderCode(
                                        orderData?.data[0].orderCode
                                    );
                                },
                            });
                        } catch (error) {
                            setStatus(
                                "اطلاعات ثبت مشتری نادرست می باشد"
                            );
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ handleSubmit, values, setFieldValue }) => {
                    return <Form>
                        <Box
                            component="div"
                            className="md:grid md:grid-cols-2 gap-x-4 space-y-4 md:space-y-0 my-4"
                        >
                            <ReusableCard>
                                <Box component="div" className="space-y-8">
                                    <Box component="div" className="flex justify-between">
                                        <Box component="div" className="flex">
                                            <Typography variant="h4" className="text-gray-500">
                                                شماره سفارش:
                                            </Typography>
                                            <Typography variant="h3" className="text-green-600 px-4">
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
                                        <Typography variant="h3" className="px-4">
                                            {sliceNumberPriceRial(totalAmount)} ریال
                                        </Typography>
                                        <Typography className="px-2"> ({convertToPersianWord(totalAmount)} تومان)</Typography>
                                    </Box>
                                </Box>
                            </ReusableCard>
                            <ReusableCard>
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
                            <Typography variant="h2" color="primary">
                                کالا
                            </Typography>
                            {/* <Formik 
                            enableReinitialize
                            initialValues={{
                                ...orderInitialValues, 
                                ...orderPaymentValues, 
                                amount:orders.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.productPrice.replace(/,/g, ""), 10), 0)
                            
                            }} 
                                onSubmit={() => { }}>
                                {({ handleSubmit, values, setFieldValue }) => {
                                    return ( */}
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
                                            className="md:w-1/4 w-full order-0 md:order-1 mb-2"
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
                                                    className="w-full flex p-2 rounded-md bg-green-500 cursor-pointer"
                                                >
                                                    <Add />
                                                    <Typography>
                                                        افزودن به لیست سفارشات
                                                    </Typography>
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
                                    setOrders={setOrders}
                                    products={products?.data}
                                />
                            </Form>
                            {/* //         );
                            //     }}
                            // </Formik> */}
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
                                        <FormikPrice name="amount" label="مبلغ" InputProps={{
                                            inputProps: {
                                                style: {
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                },
                                            },
                                        }} />
                                        <FormikInput disabled={values.settlement !== ""} name="number" label="روز" boxClassName="md:w-[50%]" InputProps={{
                                            inputProps: {
                                                style: {
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                },
                                            },
                                        }} />
                                        <Box component="div" className="flex w-full">
                                            <FormikDatepicker disabled={values.number && values.number != 0} name="settlement" label="تاریخ" />
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

                                            if (Number(values.amount.replace(/,/g, "")) > Number(sliceNumberPriceRial(totalAmount).replace(/,/g, ""))) {
                                                setOpen(true)
                                                setMessage("مبلغ تسویه از مبلغ کل نمی تواند بیشتر باشد")
                                                setSeverity("error")
                                            } else if (new Date(moment(new Date()).format("jYYYY/jMM/jDD")) > new Date(values.settlement)) {
                                                setOpen(true)
                                                setMessage("تاریخ تسویه نمی تواند از تاریخ سفارش کمتر باشد")
                                                setSeverity("error")
                                            } else if (currentTotalPayment + Number(values.amount.replace(/,/g, "")) > Number(sliceNumberPriceRial(totalAmount).replace(/,/g, ""))) {
                                                setOpen(true)
                                                setMessage("مجموع مبالغ تسویه نمی تواند از مبلغ کل بیشتر باشد")
                                                setSeverity("error")

                                            } else if (values.amount === "0" || values.amount === "") {
                                                setOpen(true)
                                                setMessage("مبلغ نمیتولند صفر یا خالی باشد")
                                                setSeverity("error")
                                            }
                                            else {
                                                setOrderPayment([...orderPaymentCP, orderPaymentData])
                                                setFieldValue("amount", "")
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
                                            <Box component="div" className="flex justify-center items-center px-2">
                                                <Box component="div" className="flex justify-center items-center rounded-full bg-indigo-600 text-white w-[20px]">
                                                    {i.daysAfterExit}
                                                </Box>
                                                <Typography variant="h4" className="px-2">روز بعداز وزن</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h4" color="primary"> تاریخ تسویه: {i.paymentDate ? i.paymentDate : "ندارد"} </Typography>
                                            </Box>
                                            <Box>
                                                <Delete className="text-red-500 cursor-pointer" onClick={() => {
                                                    const orderPaymentFilter = orderPayment.filter((item: IOrderPayment) => item.id !== i.id)
                                                    setOrderPayment(orderPaymentFilter)
                                                }} />
                                            </Box>
                                        </ReusableCard>
                                    )}
                                    <Box component="div" className="flex justify-between mt-8">
                                        <Box component="div" className="flex mt-8">
                                            <Typography variant="h4" className="flex items-center text-gray-500">
                                                جمع کل مبالغ تسویه:
                                            </Typography>
                                            <Typography variant="h4" className="flex items-center px-4">
                                                {sliceNumberPriceRial(Number(values.amount.replace(/,/g, "")) + Number(orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + Number(currentValue.amount.replace(/,/g, "")), 0)))} ریال
                                            </Typography>
                                        </Box>
                                        <Box component="div" className="flex mt-8">
                                            <Typography variant="h4" className="flex items-center text-gray-500">
                                                قیمت کل:
                                            </Typography>
                                            <Typography variant="h4" className="flex items-center px-4">
                                                {sliceNumberPriceRial(totalAmount)} ریال
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
                                disabled={orderPayment.length <= 0}
                                color="primary"
                            />
                            <CustomButton
                                title="پاک کردن فرم"
                                onClick={() => handleReset()}
                                disabled={orderCode === 0}
                                color="secondary"
                            />
                        </Box>
                    </Form>
                }}

            </Formik>
            {/* Ok */}
            <TransitionsModal
                title="ایجاد مشتری جدید"
                open={isOpen}
                isClose={() => setIsOpen(false)}
                width="max-w-6xl"
                description="برای ایجاد مشتری جدید، لطفاً مشخصات مشتری خود را با دقت وارد کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <CreateCustomer
                    refetch={refetchCustomers}
                    setIsCreateOpen={setIsOpen}
                />
            </TransitionsModal>
            <CustomSnackbar
                open={open}
                message={message}
                severity={severity}
                handleClose={() => setOpen(false)}
            />
        </>
    );
};

export default Order;
