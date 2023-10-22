import { useEffect, useState } from "react";
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
import FormikProximateAmount from "../product/components/FormikProximateAmount";

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
    proximateSubUnit: "",
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
        const prices = orders?.map((obj: any) =>
            Number(obj.productPrice?.replace(/,/g, ""))
        );
        const newPrices = [...prices];
        const newTotal = newPrices.reduce((acc: any, item) => acc + item, 0);
        setTotalAmount(newTotal);
    }, [orders]);

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
                                    {values.id
                                        ? products?.data?.find(
                                              (i: IProducts) =>
                                                  i.id === values?.id
                                          )?.productMainUnitDesc
                                        : products?.data?.find(
                                              (i: IProducts) =>
                                                  i.id ===
                                                  values?.productName?.value
                                          )?.productMainUnitDesc}
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
                                    {values.id
                                        ? products?.data?.find(
                                              (i: IProducts) =>
                                                  i.id === values?.id
                                          )?.productSubUnitDesc
                                        : products?.data?.find(
                                              (i: IProducts) =>
                                                  i.id ===
                                                  values?.productName?.value
                                          )?.productSubUnitDesc}
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
            "proximateSubUnit"
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
            mainUnit: products?.data?.find((i: IProducts) =>i.id === values.productName.value ? values.productName.value : values.id)?.productMainUnitDesc,
            subUnit:  products?.data?.find((i: IProducts) =>i.id === values.productName.value ? values.productName.value : values.id)?.productSubUnitDesc,
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
                alert("کالا الزامی می باشد");
            } else if (values?.productPrice === "") {
                alert("قیمت الزامی می باشد");
            } else if (isDuplicate) {
                alert("کالا در لیست سفارشات موجود می باشد");
            } else {
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
            <Box
                component="div"
                className="md:grid md:grid-cols-3 gap-x-4 space-y-4 md:space-y-0"
            >
                <Card className="px-8 py-4" elevation={4}>
                    <Box component="div" className="flex flex-col space-y-8">
                        <Box component="div" className="flex justify-between">
                            <Typography variant="h4" className="text-gray-500">
                                شماره سفارش:
                            </Typography>
                            <Typography variant="h3" className="text-green-600">
                                {orderCode}
                            </Typography>
                        </Box>
                        <Box component="div" className="flex justify-between">
                            <Typography variant="h4" className="text-gray-500">
                                تاریخ سفارش:
                            </Typography>
                            <Typography variant="h3">
                                {moment(new Date()).format("jYYYY/jMM/jDD")}
                            </Typography>
                        </Box>
                        <Box component="div" className="flex justify-between">
                            <Typography variant="h4" className="text-gray-500">
                                قیمت کل:
                            </Typography>
                            <Typography variant="h3">
                                {sliceNumberPrice(totalAmount)} ریال
                            </Typography>
                        </Box>
                        <Box
                            component="div"
                            className="flex justify-between flex-wrap"
                        >
                            <Typography variant="h4" className="text-gray-500">
                                قیمت کل به حروف:
                            </Typography>
                            <Typography variant="h3">
                                {convertToPersianWord(totalAmount)} هزار تومان
                            </Typography>
                        </Box>
                    </Box>
                </Card>
                <Card className="px-8 py-4 md:col-span-2" elevation={4}>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={orderValidation}
                        onSubmit={async (
                            values: any,
                            {
                                setStatus,
                                setSubmitting,
                                setFieldValue,
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
                                    setStatus(
                                        "اطلاعات ثبت مشتری نادرست می باشد"
                                    );
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
                                    <Box component="div" className="">
                                        {mainFields.map((rowFields) => (
                                            <Box
                                                component="div"
                                                className="md:flex md:justify-between md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                                            >
                                                {rowFields.map((field) =>
                                                    mainParseFields(
                                                        field,
                                                        values
                                                    )
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                </Form>
                            );
                        }}
                    </Formik>
                </Card>
            </Box>
            <Card className="px-8 py-4 my-4" elevation={4}>
                <Typography variant="h2" color="primary">
                    کالا و خصوصیات سفارش
                </Typography>
                <Formik initialValues={orderInitialValues} onSubmit={() => {}}>
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
