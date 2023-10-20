import { useEffect, useState } from "react";
import ProductSelectedList from "./components/ProductSelectedList";
import ProductSelectedListInModal from "./components/ProductSelectedListInModal";
import { useRetrieveProducts, useRetrieveProductsByBrand } from "../product/core/_hooks";
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
} from "@mui/material";
import { sliceNumberPrice } from "../../../_cloner/helpers/sliceNumberPrice";
import { convertToPersianWord } from "../../../_cloner/helpers/convertPersian";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import FormikInput from "../../../_cloner/components/FormikInput";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import TextValue from "./components/TextValue";
import CustomButton from "../../../_cloner/components/CustomButton";
import { AddCircle, Add, Grading } from "@mui/icons-material";
import { ICustomer } from "../customer/core/_models";
import {
    dropdownProductIntegrated,
    dropdownProductName,
} from "../generic/_functions";
import FormikProductComboSelect from "./components/FormikProductComboSelect";
import FormikComboBox from "../../../_cloner/components/FormikComboBox";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { mainFields, orderFields, orderFieldsIsBuy } from "./helpers/fields";
import { IProduct } from "./core/_models";
import { IProducts } from "../product/core/_models";
import FormikPrice from "../product/components/FormikPrice";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";

const initialValues = {
    customerId: "",
    settlementDate: "",
    exitType: "",
    orderSendTypeId: "",
    paymentTypeId: "",
    invoiceTypeId: "",
    customerOfficialName: "",
    // totalAmount: 0,
    // description: "",
    // freightName: "",
    // dischargePlaceAddress: "",
    // freightDriverName: "",
    // carPlaque: "",
    // rowId: "",
    // productId: "",
    // warehouseId: "",
    // warehouseTypeId: "",
    // proximateAmount: "",
    // numberInPackage: "",
    // price: "",
    // cargoSendDate: "",
    // buyPrice: "",
    // purchaseInvoiceTypeId: "",
    // purchaserCustomerId: "",
    // purchaseSettlementDate: "",
    // sellerCompanyRow: "",
    // productIntegratedName: "",
    // productName: "",
    // warehouseName: "",
};

const orderInitialValues = {
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
};

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

    useEffect(() => {
        const prices = orders?.map((obj: any) => Number(obj.productPrice?.replace(/,/g, "")));
        const newPrices = [...prices];
        const newTotal = newPrices.reduce((acc: any, item) => acc + item, 0);
        setTotalAmount(newTotal);
    }, [orders]);

    console.log("productsByBrand", productsByBrand)

    const mainParseFields = (fields: FieldType, values: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "customer":
                return (
                    <Box component="div" className="flex gap-x-2 w-full">
                        <FormikComboBox
                            onChange={() =>
                                handleChangeCustomer(values.customerId)
                            }
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
                            options={dropdownProductName(products?.data)}
                            {...rest}
                        />
                        <Button
                            onClick={() => setSelectedProductOpen(true)}
                            variant="contained"
                            color="secondary"
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
                                products={productsByBrand?.data}
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
                    <FormikPrice
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    {values.id ?
                                        products?.data?.find((i: IProducts) => i.id === values?.id)?.productMainUnitDesc :
                                        products?.data?.find((i: IProducts) => i.id === values?.productName?.value)?.productMainUnitDesc
                                    }
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
            id: values.productName.value
                ? values.productName.value
                : values.id,
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
            productPrice: values?.productPrice,
            rowId: values?.rowId,
        };

        if (!isUpdate) {
            const isDuplicate = orders.some((order: any) =>
            order.id === productOrder.id &&
            order.warehouseId === productOrder.warehouseId &&
            order.productName === productOrder.productName
        );

            if (values.productName === "" || values.productName.label === "") {
                alert("کالا الزامی می باشد");
            } else if (values?.productPrice === "") {
                alert("قیمت الزامی می باشد");
            } else if(isDuplicate){
                alert("کالا در لیست سفارشات موجود می باشد");
            } else  {
                setOrders([...orders, productOrder]);
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
            setSelectedOrderIndex(null);
            fields.forEach((element) => {
                setFieldValue(element, "");
            });
            setIsBuy(false);
            setIsUpdate(false);
        }
    };

    const [findCustomer, setFindCustomer] = useState<ICustomer>();

    const handleChangeCustomer = (value: any) => {
        const findCustomer = customers?.data.find(
            (i: any) => i.id === value.value
        );
        setFindCustomer(findCustomer);
    };

    const fieldsToMap = isBuy ? orderFieldsIsBuy : orderFields;


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
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={orderValidation}
                    onSubmit={async (
                        values: any,
                        { setStatus, setSubmitting, setFieldValue, resetForm }
                    ) => {
                        if (orders?.length === 0) {
                            alert("لیست سفارشات خالی می باشد");
                        } else {
                            try {
                                const formData = {
                                    customerId: values.customerId.value,
                                    totalAmount: totalAmount,
                                    description: values.description,
                                    exitType: Number(values.exitType),
                                    orderSendTypeId: Number(
                                        values.orderSendTypeId
                                    ),
                                    paymentTypeId: Number(values.paymentTypeId),
                                    customerOfficialName: "string",
                                    invoiceTypeId: Number(values.invoiceTypeId),
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
                                            proximateAmount:
                                                item.proximateAmount
                                                    ? Number(item.proximateAmount?.replace(/,/g, ""))
                                                    : 0,
                                            numberInPackage:
                                                item.numberInPackage
                                                    ? Number(
                                                        item.numberInPackage
                                                    )
                                                    : 0,
                                            price: item.productPrice
                                                ? Number(item.productPrice?.replace(/,/g, ""))
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
                                                    ? item.purchaserCustomerId
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
                                };
                                mutate(formData, {
                                    onSuccess: (orderData) => {
                                        setOrderData(orderData);
                                        setSnackeOpen(true);
                                        setOrderCode(
                                            orderData?.data[0].orderCode
                                        );
                                        resetForm();
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
                                <Box
                                    component="div"
                                    className="flex mb-4 justify-center items-center md:justify-end md:items-end"
                                >
                                    <CustomButton
                                        title="ثبت سفارش"
                                        onClick={() => handleSubmit()}
                                    />
                                </Box>
                                <Box component="div" className="mb-4">
                                    <Box
                                        component="div"
                                        className="md:flex md:justify-between my-1 p-2 rounded-md gap-x-10"
                                    >
                                        <TextValue
                                            title="شماره سفارش"
                                            value={orderCode}
                                            valueClassName="px-8 text-[#405189]"
                                            titleClassName="text-[#2E4374]"
                                        />
                                        <TextValue
                                            title="تاریخ سفارش"
                                            value={moment(new Date()).format(
                                                "jYYYY/jMM/jDD"
                                            )}
                                            valueClassName="text-[#405189]"
                                            titleClassName="text-[#2E4374]"
                                        />
                                    </Box>
                                    <Box
                                        component="div"
                                        className="md:flex my-1 p-2 rounded-md"
                                    >
                                        <TextValue
                                            title="قیمت کل"
                                            value={sliceNumberPrice(
                                                totalAmount
                                            )}
                                            valueClassName="!text-md"
                                            insideValue={"ریال"}
                                            titleClassName="text-gray-500 !text-md"
                                        />
                                        <TextValue
                                            title="قیمت به حروف"
                                            value={convertToPersianWord(
                                                totalAmount
                                            )}
                                            valueClassName="!text-md"
                                            insideValue={"تومان"}
                                            titleClassName="text-gray-500 !text-md"
                                        />
                                    </Box>
                                </Box>
                                <Box component="div" className="">
                                    {mainFields.map((rowFields) => (
                                        <Box
                                            component="div"
                                            className="md:flex md:justify-between md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                                        >
                                            {rowFields.map((field) =>
                                                mainParseFields(field, values)
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                                {/* <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <Card className="p-2">
                                        <Box component="div" className="md:flex md:flex-row md:items-center gap-4">
                                            <FormikComboBox onChange={() => handleChangeCustomer(values.customerId)} name="customerId" label="مشتری" options={dropdownCustomer(customers?.data)} />
                                            <Box component="span" onClick={() => setIsOpen(true)} className="flex w-full md:w-10 md:my-0 bg-green-600 p-2 rounded-md text-black font-bold font-boldcursor-pointer my-1">
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
                                    <Card className="p-2">
                                        <Box component="div" className="grid md:grid-cols-2 !gap-2" >
                                            <FormikSelect name="orderSendTypeId" label="نوع ارسال" options={dropdownOrderSendType(orderSendType)} />
                                            <FormikSelect name="invoiceTypeId" label="نوع فاکتور" options={dropdownInvoiceType(factor)} />
                                            <FormikSelect name="paymentTypeId" label="نوع پرداخت" options={dropdownRentPaymentType(rent)} />
                                            <FormikSelect name="exitType" label="نوع خروج" options={dropdownExitType(exit)} />
                                        </Box>
                                    </Card>
                                </Box> */}
                                {/* <Box component="div" className="mt-4">
                                    <Card className="p-2">
                                        <Box component="div" className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                            <Box component="div" className="">
                                                <Box component="div" className="flex mx-2">
                                                    <FormikProductComboSelect productName={values.productName} label="کالا" name="productName" options={dropdownProductName(products?.data)} />
                                                    <Box component="div" className="mx-1">
                                                        <Button onClick={() => setSelectedProductOpen(true)} variant="contained" color="secondary" >
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
                                                        orders={orders}
                                                        setOrders={setOrders}
                                                    />
                                                </TransitionsModal>
                                            </Box>
                                            <FormikSelect name="warehouseId" label="انبار" options={dropdownWarehouses(warehouse)} />
                                            <FormikInput name="proximateAmount" label="مقدار (کیلوگرم)" type="text" />
                                            <FormikInput name="price" label="قیمت" type="text" />
                                            <FormikInput name="productDesc" label="توضیحات کالا" type="text" />
                                            <FormikInput name="rowId" label="ردیف فروش" type="text" />
                                            {isBuy && (
                                                <>
                                                    <FormikComboBox name="purchaserCustomerId" label="خرید از" options={dropdownCustomer(customers?.data)} />
                                                    <FormikInput name="buyPrice" label="قیمت خرید" type="text" />
                                                    <FormikSelect value={purchaseInvoiceTypeSelected} onSelect={(value: any) => setPurchaseInvoiceTypeSelected(value)} name="purchaseInvoiceTypeId" label="نوع فاکتور خرید" options={dropdownPurchaseInvoice(purchaseInvoiceType)} />
                                                    <FormikDatepicker name="purchaseSettlementDate" label="تاریخ تسویه خرید" />
                                                </>
                                            )}
                                            {isUpdate ? (
                                                <Box component="div" onClick={() => handleOrder(values, setFieldValue)} className="flex bg-yellow-500 text-black font-bold font-boldtext-center py-2 rounded-md cursor-pointer mb-2 md:mt-0" >
                                                    <Add />
                                                    <Typography>ویرایش</Typography>
                                                </Box>
                                            ) : (
                                                <Box component="div" onClick={() => handleOrder(values, setFieldValue)} className="flex bg-green-500 text-black font-bold font-boldtext-center py-2 rounded-md cursor-pointer mb-2 md:mt-0" >
                                                    <Add />
                                                    <Typography>افزودن به لیست سفارشات</Typography>
                                                </Box>
                                            )}
                                        </Box>
                                        <ProductSelectedList setSelectedOrderIndex={setSelectedOrderIndex} selectedOrderIndex={selectedOrderIndex} setIsUpdate={setIsUpdate} setFieldValue={setFieldValue} orders={orders} setOrders={setOrders} />
                                    </Card>
                                </Box> */}
                            </Form>
                        );
                    }}
                </Formik>
                <Typography variant="h2" color="secondary">
                    کالا و خصوصیات سفارش
                </Typography>
                <Formik initialValues={orderInitialValues} onSubmit={() => { }}>
                    {({ handleSubmit, values, setFieldValue }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
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
                                                color="secondary"
                                            >
                                                لیست سفارشات
                                            </Typography>
                                        </Box>
                                        <Box
                                            component="div"
                                            className="md:w-1/4 w-full order-0 md:order-1"
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
                                />
                            </Form>
                        );
                    }}
                </Formik>
            </Card>
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
        </>
    );
};

export default Order;
