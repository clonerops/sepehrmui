import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import ProductSelectedList from "./components/ProductSelectedList";
import ProductSelectedListInModal from "./components/ProductSelectedListInModal";
import { useRetrieveProducts, useRetrieveProductsByBrand, useRetrieveProductsByWarehouse } from "../product/core/_hooks";
import { Form, Formik, FormikProps } from "formik";
import { useCreateOrder, useGetOrderDetailByCode, useRetrieveOrder, useUpdateOrder } from "./core/_hooks";
import moment from "moment-jalaali";
import { useGetCustomers } from "../customer/core/_hooks";
import { dropdownCustomer, dropdownExitType, dropdownInvoiceType, dropdownOrderSendType, dropdownPurchaseInvoice, dropdownRentPaymentType, dropdownServices, dropdownTemporaryType, dropdownWarehouses } from "./helpers/dropdowns";
import { exit, temporary } from "./helpers/fakeData";
import Swal from 'sweetalert2'
import { orderValidation } from "./validations/orderValidation";
import {
    useGetInvoiceType, useGetPaymentTypes, useGetPurchaseInvoice, useGetSendTypes, useGetServices, useGetWarehouses,
} from "../generic/_hooks";
import { Box, Button, Typography, InputAdornment, Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import { sliceNumberPriceRial } from "../../../_cloner/helpers/sliceNumberPrice";
import { convertToPersianWord } from "../../../_cloner/helpers/convertPersian";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import FormikInput from "../../../_cloner/components/FormikInput";
import CustomButton from "../../../_cloner/components/CustomButton";
import { AddCircle, Add, Grading, Delete, Edit, Search, SearchRounded } from "@mui/icons-material";
import { dropdownProductByBrandName } from "../generic/_functions";
import FormikProductComboSelect from "./components/FormikProductComboSelect";
import FormikComboBox from "../../../_cloner/components/FormikComboBox";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { orderFields, orderFieldsIsBuy, orderTypesFields } from "./helpers/fields";
import { IOrderItems, IOrderPayment, IOrderService } from "./core/_models";
import FormikPrice from "../product/components/FormikPrice";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";
import FormikProximateAmount from "../product/components/FormikProximateAmount";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { calculateProximateAmount, calculateTotalAmount } from "./helpers/functions";
import { orderPaymentValues, orderUpdateInitialValues, orderServiceValues } from './helpers/initialValues'
import { useSnackbar } from 'notistack';
import BottomDrawer from "../../../_cloner/components/BottomSheetDrawer";
import FormikService from "../../../_cloner/components/FormikService";
import FormikMaskInput from "../../../_cloner/components/FormikMaskInput";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";

const Order = () => {
    // const id = "0c4279ca-ba40-4358-24e8-08dbe9cb402e"
    const { enqueueSnackbar } = useSnackbar();

    // Fetching Data
    const { data: customers } = useGetCustomers();
    const { data: products } = useRetrieveProducts();
    const productsTools = useRetrieveProductsByWarehouse();
    const { data: productsByBrand, isLoading: productByBrandLoading, isError: productByBrandError, } = useRetrieveProductsByBrand();
    const { data: orderSendType } = useGetSendTypes();
    const { data: rent } = useGetPaymentTypes();
    const { data: purchaseInvoiceType } = useGetPurchaseInvoice();
    const { data: factor } = useGetInvoiceType();
    const { data: warehouse } = useGetWarehouses();
    const { data: services } = useGetServices();
    const { mutate, data, isLoading } = useUpdateOrder();
    const detailTools = useGetOrderDetailByCode()

    // States
    const [selectedProductOpen, setSelectedProductOpen] = useState<boolean>(false); // OK
    const [isUpdate, setIsUpdate] = useState<boolean>(false); // OK
    const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0); // OK
    const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
    const [isBuy, setIsBuy] = useState<boolean>(false); // OK
    const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
    const [orderService, setOrderService] = useState<IOrderService[]>([]); //OK

    // const isNew = !id

    const formikRef = useRef<FormikProps<any>>(null);

    useEffect(() => { calculateTotalAmount(orders, orderService) }, [orders, orderService]);
    useEffect(() => {
        if (detailTools?.data?.data) {

            setOrderService([
                ...detailTools?.data?.data?.orderServices?.map((i: any) => ({
                    id: i.id,
                    serviceName: services.find((item: any) => item.id === i.serviceId)?.description,
                    serviceId: i?.serviceId,
                    description: i?.description
                })) || []
            ]);

            setOrderPayment([
                ...detailTools?.data?.data?.orderPayments?.map((i: any) => ({
                    id: i?.id,
                    amount: +i.amount,
                    // paymentDate: moment(i.paymentDate).format("jYYYY/jMM/jDD"),
                    paymentDate: i.paymentDate,
                    daysAfterExit: i.daysAfterExit
                })) || []
            ]);

            setOrders([
                ...detailTools?.data?.data?.details?.map((i: any) => ({
                    ...i,
                    mainUnit: i.product.productMainUnitDesc,
                    subUnit: i.product.productSubUnitDesc,
                    exchangeRate: +i.product.exchangeRate,
                    purchasePrice: +i.purchasePrice,
                    warehouseId: warehouse.find((item: any) => item.name === i.warehouseName).id,
                    price: separateAmountWithCommas(i.price),
                    proximateAmount: separateAmountWithCommas(i.proximateAmount),
                    productBrandName: i.brandName,
                    purchaserCustomerId: i.purchaserCustomerId ,
                    purchaserCustomerName: customers.data.find((item: any) => item.id === i.purchaserCustomerId)?.firstName+" "+customers.data.find((item: any) => item.id === i.purchaserCustomerId)?.lastName,
                    proximateSubUnit: Math.ceil(+i.proximateAmount / +i.product.exchangeRate)
                })) || []
            ]);

        }
    }, [detailTools?.data?.data])


    const onGetOrderDetailByCode = (orderCode: number) => {
        detailTools.mutate(orderCode, {
            onSuccess: () => {
                formikRef.current?.setFieldValue("searchOrderCode", 545)
            }
        })
    }

    const mainParseFields = (fields: FieldType, setFieldValue: any) => {
        const { type, ...rest } = fields;
        switch (type) {
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
                        disabled={true}
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
            case "temporary":
                return (
                    <FormikSelect options={dropdownTemporaryType(temporary)} {...rest} />
                );
            case "description":
                return (
                    <FormikInput multiline rows={3} {...rest} />
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
                        
                        >
                            <Grading />
                        </Button>
                        <BottomDrawer
                            title="انتخاب محصول"
                            open={selectedProductOpen}
                            onClose={() => setSelectedProductOpen(false)}
                        >
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
                    </Box>
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
                        options={dropdownPurchaseInvoice(purchaseInvoiceType)}
                        {...rest}
                    />
                );
            case "date":
                return <FormikDatepicker {...rest} />;
            case "proximateAmount":
                return (
                    <FormikProximateAmount
                        exchangeRate={values.exchangeRate}
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
                return <FormikPrice  {...rest} />;
            case "input":
                return <FormikInput  {...rest} />;
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
                return <FormikInput {...rest} />;
        }
    };

    const handleChangeWarehouse = (value: any, setFieldValue: any) => {
        productsTools.mutate(value)
        const fieldValue = [
            { id: uuidv4(), title: "productName", value: "" },
            { id: uuidv4(), title: "id", value: "" },
            { id: uuidv4(), title: "price", value: "" },
            { id: uuidv4(), title: "productBrandId", value: "" },
            { id: uuidv4(), title: "productBrandName", value: "" },
            { id: uuidv4(), title: "warehouseId", value: "" },
            { id: uuidv4(), title: "proximateAmount", value: "" },
            { id: uuidv4(), title: "warehouseName", value: "" },
            { id: uuidv4(), title: "proximateSubUnit", value: "" },
            { id: uuidv4(), title: "purchasePrice", value: "" },
            { id: uuidv4(), title: "purchaseInvoiceTypeDesc", value: "" },
            { id: uuidv4(), title: "purchaseInvoiceTypeId", value: "" },
            { id: uuidv4(), title: "purchaseSettlementDate", value: "" },
            { id: uuidv4(), title: "purchaserCustomerId", value: "" },
            { id: uuidv4(), title: "purchaserCustomerName", value: "" },
            { id: uuidv4(), title: "rowId", value: "" },
            { id: uuidv4(), title: "productDesc", value: "" },
            { id: uuidv4(), title: "mainUnit", value: "" },
            { id: uuidv4(), title: "subUnit", value: "" },
        ];
        fieldValue?.forEach((i: { title: string, value: any }) => setFieldValue(i.title, i.value))
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
        const fields = ["productName", "productId", "id", "warehouseId", "warehouseTypeId", "warehouseName", "productDesc", "productBrandDesc", "purchasePrice", "purchaseSettlementDate", "purchaseInvoiceTypeId", "purchaseInvoiceTypeDesc", "sellerCompanyRow", "proximateAmount", "price", "rowId", "proximateSubUnit", "purchaserCustomerId", "purchaserCustomerName", "mainUnit", "subUnit"];

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
            productId: values?.productName?.value ? values?.productName?.value : values?.productId ,
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
            price: values?.price,
            description: values.productDesc,
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
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                })
            } else if (values?.price === "") {
                enqueueSnackbar("وارد نمودن قیمت الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                })
            } else if (values?.proximateAmount === "") {
                enqueueSnackbar("وارد نمودن مقدار الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                })
            }
            else if (isDuplicate) {
                enqueueSnackbar("کالا انتخاب شده در لیست سفارشات موجود و تکراری می باشد", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                })
            } else {
                setOrders([...orders, productOrder]);
                setOrderPayment([])
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
                enqueueSnackbar("وارد نمودن کالا الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                })
            } else if (values?.price === "") {
                enqueueSnackbar("وارد نمودن قیمت الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                })
            } else if (values?.proximateAmount === "") {
                enqueueSnackbar("وارد نمودن مقدار الزامی می باشد", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                })
            } else {
                setOrders(updatedOrders);
                setOrderPayment([])
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

    const fieldsToMap = isBuy ? orderFieldsIsBuy : orderFields;

    if (detailTools.isLoading) {
        return <Typography>در حال بارگزاری ......</Typography>
    }
    return (
        <>

            <Formik
                enableReinitialize
                innerRef={formikRef}
                initialValues={{ ...orderUpdateInitialValues, ...orderPaymentValues, ...orderServiceValues, ...detailTools?.data?.data, paymentTypeId: detailTools?.data?.data.farePaymentTypeId }}
                onSubmit={async (values: any) => {
                    if (orders?.length === 0) {
                        enqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد", {
                            variant: "error",
                            anchorOrigin: { vertical: "top", horizontal: "center" }
                        })
                    } else {
                        const formData = {
                            id: detailTools?.data?.data?.id,
                            productBrandId: 25,
                            customerId: detailTools?.data?.data.customer.id, //ok
                            totalAmount: calculateTotalAmount(orders, orderService), //ok
                            description: values.description ? values.description : detailTools?.data?.data.description, //ok
                            exitType: values.exitType ? Number(values.exitType) : detailTools?.data?.data.exitType, //ok
                            orderSendTypeId: values.orderSendTypeId ? Number(values.orderSendTypeId) : detailTools?.data?.data.orderSendTypeId,//ok
                            paymentTypeId: values.paymentTypeId ? Number(values.paymentTypeId) : detailTools?.data?.data.paymentTypeId, //ok
                            customerOfficialName: "string",
                            customerOfficialCompanyId: values.customerOfficialCompanyId ? +values.customerOfficialCompanyId : null, //NOTOK
                            invoiceTypeId: detailTools?.data?.data.invoiceTypeId, //ok
                            isTemporary: values.isTemporary ? values.isTemporary : detailTools?.data?.data.isTemporary, //ok
                            freightName: "string", //ok
                            settlementDate: "1402/02/02", //ok
                            dischargePlaceAddress: "string", //ok
                            freightDriverName: "string", //ok
                            carPlaque: "string", //ok
                            // details: orders?.map((item: any) => {
                            //     return {
                            //         id: Number.isInteger(item.id) ? item.id : null,
                            //         rowId: item.rowId ? Number(item.rowId) : 0, //ok
                            //         productId: item.productId, //ok
                            //         warehouseId: item.warehouseId ? Number(item.warehouseId) : null, //ok
                            //         productBrandId: item.productBrandId ? Number(item.productBrandId) : 25,//ok
                            //         proximateAmount: item.proximateAmount ? Number(item.proximateAmount?.replace(/,/g, "")) : 0, //ok
                            //         numberInPackage: item.numberInPackage ? Number(item.numberInPackage) : 0,
                            //         price: item.price ? Number(item.price?.replace(/,/g, "")) : null, //ok
                            //         cargoSendDate: "1402/01/01",
                            //         description: item.description,
                            //         purchasePrice: item.purchasePrice ? Number(item.purchasePrice) : 0,
                            //         purchaseInvoiceTypeId: item.purchaseInvoiceTypeId ? item.purchaseInvoiceTypeId : null,
                            //         purchaserCustomerId: item.purchaserCustomerName?.value ? item.purchaserCustomerName?.value : null,
                            //         purchaseSettlementDate: item.purchaseSettlementDate,
                            //         sellerCompanyRow: item.sellerCompanyRow ? item.sellerCompanyRow : "string",
                            //     };
                            // }),
                            details: orders?.map((item: any) => {
                                const orderDetails: any = {
                                    rowId: item.rowId ? Number(item.rowId) : 0, //ok
                                    productId: item.productId, //ok
                                    warehouseId: item.warehouseId ? Number(item.warehouseId) : null, //ok
                                    productBrandId: item.productBrandId ? Number(item.productBrandId) : 25, //ok
                                    proximateAmount: item.proximateAmount ? Number(item.proximateAmount?.replace(/,/g, "")) : 0, //ok
                                    numberInPackage: item.numberInPackage ? Number(item.numberInPackage) : 0,
                                    price: item.price ? Number(item.price?.replace(/,/g, "")) : null, //ok
                                    cargoSendDate: "1402/01/01",
                                    description: item.description,
                                    purchasePrice: item.purchasePrice ? Number(item.purchasePrice) : 0,
                                    purchaseInvoiceTypeId: item.purchaseInvoiceTypeId ? item.purchaseInvoiceTypeId : null,
                                    purchaserCustomerId: item.purchaserCustomerName?.value ? item.purchaserCustomerName?.value : null,
                                    purchaseSettlementDate: item.purchaseSettlementDate,
                                    sellerCompanyRow: item.sellerCompanyRow ? item.sellerCompanyRow : "string",
                                };
                            
                                // Conditionally include id if it exists
                                if (Number.isInteger(item.id)) {
                                    orderDetails.id = item.id;
                                }
                            
                                return orderDetails;
                            }),
                            orderPayments: orderPayment?.map((item: IOrderPayment) => {
                                return {
                                    id: item.id ? item.id : null,
                                    amount: Number(item.amount),
                                    paymentDate: item.paymentDate,
                                    daysAfterExit: Number(item.daysAfterExit),
                                    paymentType: item.paymentType
                                }
                            }),
                            orderServices: orderService.map((item: IOrderService) => {
                                return {
                                    id: item.id ? item.id : null,
                                    serviceId: item.serviceId,
                                    description: item.description
                                }
                            }) //ok
                        };
                        try {
                            mutate(formData, {
                                onSuccess: (response) => {
                                    if(response.data.Errors && response.data.Errors.length >0) {
                                        response.data.Errors.forEach((item: any) => {
                                            enqueueSnackbar(item, {
                                                variant: "error",
                                                anchorOrigin: { vertical: "top", horizontal: "center" }
                                            })
                                        })
                                    } else {
                                        if (response.succeeded) {
                                            Swal.fire({
                                                title: `سفارش با موفقیت ویرایش گردید`,
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
                }}
            >
                {({ handleSubmit, values, setFieldValue }) => {
                    return <Form>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-8 md:space-y-0 space-y-4 gap-x-4 my-4">
                            <ReusableCard cardClassName="col-span-2">
                                <Box component="div" className="flex mt-4 gap-4">
                                    <FormikInput label="شماره سفارش" name="searchOrderCode" />
                                    <Button onClick={() => onGetOrderDetailByCode(values.searchOrderCode)}>
                                        <SearchRounded color="secondary" />
                                    </Button>
                                </Box>
                                <Box component="div" className="mt-8 space-y-8">
                                    <Box component="div" className="flex justify-between">
                                        <Typography variant="h4" className="text-gray-500">شماره سفارش</Typography>
                                        <Typography variant="h3">
                                            {detailTools?.data?.data.orderCode ? detailTools?.data?.data.orderCode : "------------------"}
                                        </Typography>
                                    </Box>
                                    <Box component="div" className="flex justify-between">
                                        <Typography variant="h4" className="text-gray-500">مشتری</Typography>
                                        <Typography variant="h3">
                                            {detailTools?.data?.data.customerName ? detailTools?.data?.data.customerName : "------------------"}
                                        </Typography>
                                    </Box>
                                    <Box component="div" className="flex justify-between">
                                        <Typography variant="h4" className="text-gray-500">تاریخ سفارش</Typography>
                                        <Typography variant="h3">
                                            {detailTools?.data?.data?.registerDate ? detailTools?.data?.data.registerDate : "------------------"}
                                        </Typography>
                                    </Box>
                                    <Box component="div" className="flex justify-between">
                                        <Typography variant="h4" className="text-gray-500">قیمت کل</Typography>
                                        <Typography variant="h3" className="text-green-500">
                                            {sliceNumberPriceRial(calculateTotalAmount(orders, orderService))} ریال
                                        </Typography>
                                    </Box>
                                    {/* <Box component="div" className="flex flex-wrap justify-between">
                                        <Typography variant="h4" className="text-gray-500">قیمت به حروف</Typography>
                                        <Typography variant="h3">
                                            {convertToPersianWord(calculateTotalAmount(orders, orderService))} تومان
                                        </Typography>
                                    </Box> */}
                                </Box>
                            </ReusableCard>
                            <ReusableCard cardClassName="col-span-3">
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
                            <ReusableCard cardClassName="col-span-3 flex items-center justify-center">
                                <img src={toAbsoulteUrl('/media/logos/3610632.jpg')} width={300} />
                            </ReusableCard>
                        </Box>
                        <Box component="div" className="md:grid md:grid-cols-8 gap-x-4 mt-4">
                            <ReusableCard cardClassName="col-span-8 mb-4">
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
                                        setOrderPayment={setOrderPayment}
                                        products={productsByBrand?.data}
                                        orderService={orderService}
                                    />
                                </Form>
                            </ReusableCard>
                            <ReusableCard cardClassName="col-span-4">
                                <Typography variant="h2" color="primary">بسته خدمت</Typography>
                                <Box component="div" className="flex flex-wrap md:flex-nowrap  gap-4 mt-4">
                                    <FormikService label="نوع خدمت" name="serviceId" />
                                    <FormikPrice name="serviceAmount" label="هزینه" />
                                    <Button color="secondary" onClick={
                                        () => {
                                            const orderServices = [...orderService]
                                            const orderServicetData: IOrderService = {
                                                // id: uuidv4(),
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
                                                            const filterServices = orderService.filter((item: IOrderService) => item.serviceId !== i.serviceId)
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
                            <ReusableCard cardClassName="col-span-4">
                                <Typography variant="h2" color="primary">
                                    تسویه حساب
                                </Typography>
                                <Form className="mt-4">
                                    <Box component="div" className="md:flex space-y-4 md:space-y-0 gap-x-2">
                                        <FormikMaskInput mask={Number} thousandsSeparator={","} name="amount" label="مبلغ" />
                                        <FormikInput name="number" label="روز" boxClassName="md:w-[50%]" InputProps={{
                                            inputProps: {
                                                style: {
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                },
                                            },
                                        }} />
                                        <Box component="div" className="flex w-full">
                                            <FormikDatepicker name="settlement" label="تاریخ" />
                                        </Box>
                                        <Box component="div" className="" onClick={() => {
                                            const orderPaymentCP = [...orderPayment]
                                            const orderPaymentData: IOrderPayment = {
                                                // id: uuidv4(),
                                                amount: values.amount,
                                                daysAfterExit: values.number,
                                                paymentDate: values.settlement,
                                                paymentType: 0
                                            }

                                            const currentTotalPayment = orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.amount, 10), 0);

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
                                            else if (values.settlement === "" || values.settlement === null) {
                                                enqueueSnackbar("تاریخ تسویه نمی تواند خالی باشد", {
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
                                                <Typography variant="h4" color="primary"> مبلغ: {separateAmountWithCommas(i.amount)} ریال</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h4" color="primary"> تاریخ تسویه: {i.paymentDate ? i.paymentDate : i.daysAfterExit + " " + "روز بعد از وزن"} </Typography>
                                            </Box>
                                            {/* {!data?.succeeded && */}
                                                <Box>
                                                    <Delete className="text-red-500 cursor-pointer" onClick={() => {
                                                        const orderPaymentFilter = orderPayment.filter((item: IOrderPayment) => item.id !== i.id)
                                                        setOrderPayment(orderPaymentFilter)
                                                        // setFieldValue("amount", sliceNumberPriceRial(calculateProximateAmount(orders, orderPaymentFilter, orderService)))
                                                        setFieldValue("amount", sliceNumberPriceRial(calculateProximateAmount(orders, orderPaymentFilter, orderService)))
                                                    }} />
                                                </Box>
                                            {/* } */}
                                        </ReusableCard>
                                    )}
                                    <Box component="div" className="flex flex-col justify-between mt-8">
                                        <Box component="div" className="flex mt-8">
                                            <Typography variant="h4" className="flex items-center text-gray-500">
                                                جمع کل مبالغ تسویه:
                                            </Typography>
                                            <Typography variant="h4" className="flex items-center px-4">
                                                {sliceNumberPriceRial(orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.amount, 10), 0))} ریال
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
                                title={isLoading ? "در حال پردازش ...." : "ویرایش سفارش"}
                                onClick={() => handleSubmit()}
                                color="secondary"
                                isLoading={isLoading}
                                disabled={orderPayment.length === 0}
                            />
                        </Box>
                    </Form >
                }}
            </Formik >
            {/* Ok */}
        </>
    );
};

export default Order;
