import { useEffect, useState, useRef } from "react";
import ProductSelectedList from "./components/ProductSelectedList";
import ProductSelectedListInModal from "./components/ProductSelectedListInModal";
import { useRetrieveProducts } from "../product/core/_hooks";
import { IProducts } from "../product/core/_models";
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
import { ICreateOrderDetails } from "./core/_models";
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
import { PlusOne, } from '@mui/icons-material'
import { ICustomer } from "../customer/core/_models";

const Order = () => {
    // Fetching Data
    const { data: customers, refetch: refetchCustomers } = useGetCustomers();
    const {
        data: products,
        isLoading: productLoading,
        isError: productError,
    } = useRetrieveProducts();
    const { data: orderSendType } = useGetSendTypes();
    const { data: rent } = useGetPaymentTypes();
    const { data: purchaseInvoiceType } = useGetPurchaseInvoice();
    const { data: factor } = useGetInvoiceType();
    const { data: warehouse } = useGetWarehouses();
    // States
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const [selectedProductOpen, setSelectedProductOpen] =
        useState<boolean>(false);
    const [selectProductFromModal, setSelectProductFromModal] =
        useState<IProducts>();
    const [searchQuery, setSearchQuery] = useState("");
    const [productSelected, setProductSelected] = useState<any>("");
    const [showProducts, setShowProducts] = useState(false);
    const [filteredData, setFilteredData] = useState<IProducts[]>();
    const [orders, setOrders] = useState<any>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [purchaseInvoiceTypeSelected, setPurchaseInvoiceTypeSelected] =
        useState<{
            value: number | null;
            label: string | null;
        }>();

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newInputValue = event.target.value;
        setSearchQuery(newInputValue);

        const searchWords = newInputValue.trim().toLowerCase().split(/\s+/); // Split into words

        const newProduct = products?.data.filter((item: any) => {
            return searchWords.every((word: any) =>
                item.productName.toLowerCase().includes(word)
            );
        });

        setFilteredData(newProduct);

        setShowProducts(true);
    }

    const handleFocuse = () => {
        setShowProducts(true);
    };
    const handleBlur = () => {
        setTimeout(() => {
            setShowProducts(false);
        }, 500);
    };

    const handleProductSelect = (item: IProducts) => {
        if (item?.productIntegratedName) {
            setSearchQuery(item?.productIntegratedName.toString());
            setProductSelected(item?.id);
            setShowProducts(false);
        }
    };

    useEffect(() => {
        if (selectProductFromModal?.productIntegratedName)
            setSearchQuery(selectProductFromModal?.productIntegratedName);
        setProductSelected(selectProductFromModal?.id);
    }, [selectProductFromModal]);

    useEffect(() => {
        setFilteredData(products?.data);
    }, [products?.data]);

    useEffect(() => {
        const prices = orders?.map((obj: any) => Number(obj.price));
        const newPrices = [...prices];
        const newTotal = newPrices.reduce((acc: any, item) => acc + item, 0);
        setTotalAmount(newTotal);
    }, [orders]);

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
    };
    const { mutate, data, isLoading } = useCreateOrder();

    const [isBuy, setIsBuy] = useState<boolean>(false);
    const [orderCode, setOrderCode] = useState<number>(0);
    const [warehouseNameSelect, setWarehouseSelected] = useState<string>("");

    const handleWarehouseSelect = (values: any) => {
        const warehouseName = warehouse.find((i: any) => i.id === values);
        if (values === 1) {
            setIsBuy(true);
        } else {
            setIsBuy(false);
        }
        setWarehouseSelected(warehouseName.name);
    };

    const handleOrder = (values: any) => {
        const productOrder = {
            productId: productSelected,
            productName: searchQuery,
            warehouseId: values.warehouseId,
            warehouseTypeId: values?.warehouseTypeId,
            warehouseName: warehouseNameSelect,
            productDesc: values?.productDesc,
            buyPrice: values?.valuesbuyPrice,
            purchaseSettlementDate: values.purchaseSettlementDate,
            purchaseInvoiceTypeId: Number(values?.purchaseInvoiceTypeId),
            purchaseInvoiceTypeName: values?.purchaseInvoiceTypeName,
            sellerCompanyRow: values.sellerCompanyRow,
            proximateAmount: values.proximateAmount,
            price: values?.price,
            rowId: values?.rowId,
        };
        setOrders([...orders, productOrder]);
    };

    const [findCustomer, setFindCustomer] = useState<ICustomer>()

    const handleChangeCustomer = (value: string) => {
        const findCustomer = customers?.data.find((i: any) => i.id === value)
        setFindCustomer(findCustomer)
    }

    // console.log(findCustomer)

    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        data?.data?.Message ||
                        // data?.data?.Errors[0] ||
                        data?.message ||
                        "ثبت سفارش با موفقیت انجام شد"
                    }
                />
            )}
            <Card className="px-8 py-4">
                <Formik
                    initialValues={initialValues}
                    validationSchema={orderValidation}
                    onSubmit={async (values) => {
                        if (orders?.length === 0) {
                        } else {
                            const formData = {
                                customerId: values.customerId,
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
                                    (item: ICreateOrderDetails) => {
                                        return {
                                            rowId: item.rowId,
                                            productId: item.productId,
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
                                                item.purchaseInvoiceTypeId,
                                            purchaserCustomerId:
                                                item.purchaserCustomerId
                                                    ? item.purchaserCustomerId
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
                                    setOrderCode(orderData?.data[0].orderCode);
                                    setSnackeOpen(true);
                                },
                            });
                        }
                    }}
                >
                    {({ handleSubmit, values }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                {/* Order Code, Order Date, Order Submit */}
                                <Box component="div" className="md:flex p-2 rounded-md gap-x-10">
                                    <TextValue title="شماره سفارش" value={orderCode} valueClassName="px-8 text-[#405189]" />
                                    <TextValue title="تاریخ سفارش" value={moment(new Date()).format("jYYYY/jMM/jDD")} valueClassName="text-[#405189]" />
                                </Box>
                                <Box component="div" className="md:flex p-2 rounded-md">
                                    <TextValue title="قیمت کل" value={sliceNumberPrice(totalAmount)} valueClassName="!text-lg" insideValue={"ریال"} />
                                    <TextValue title="قیمت به حروف" value={convertToPersianWord(totalAmount)} valueClassName="!text-lg" insideValue={"تومان"} />
                                </Box>
                                <Box component="div" className="flex justify-center items-center md:justify-end md:items-end">
                                    <CustomButton title="ثبت سفارش" onClick={() => handleSubmit()} />
                                </Box>
                                {/* Customer, Settlement Date*/}
                                <Box component="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                                    <Card className="p-2">
                                        <Box component="div" className="md:flex md:flex-row md:items-center gap-4">
                                            <Box component="span" onClick={() => setIsOpen(true)} className="flex w-full md:w-10 md:my-0 bg-green-600 p-2 rounded-md text-white cursor-pointer my-1">
                                                <PlusOne />
                                            </Box>
                                            <FormikSelect onChange={(value) => handleChangeCustomer(value)} name="customerId" label="مشتری" options={dropdownCustomer(customers?.data)} />
                                            <FormikDatepicker name="settlementDate" label="تاریخ تسویه" />
                                        </Box>
                                        {findCustomer &&
                                            <Box component="div" className="pt-2 flex flex-col gap-y-2">
                                                <Typography variant="h4">شماره همراه مشتری: {findCustomer?.mobile}</Typography>
                                                <Typography variant="h4">نوع اعتبار: {findCustomer?.customerValidityId === 1 ? "عادی" : findCustomer?.customerValidityId === 2 ? "VIP" : "سیاه"}</Typography>
                                            </Box>
                                        }
                                    </Card>
                                    {/* orderSendTypeId, invoiceTypeId, paymentTypeId, exitType */}
                                    <Card className="p-2">
                                        <Box component="div" className="md:grid md:grid-cols-2 md:gap-2" >
                                            <FormikSelect name="orderSendTypeId" label="نوع ارسال" options={dropdownOrderSendType(orderSendType)} />
                                            <FormikSelect name="invoiceTypeId" label="نوع فاکتور" options={dropdownInvoiceType(factor)} />
                                            <FormikSelect name="paymentTypeId" label="نوع پرداخت" options={dropdownRentPaymentType(rent)} />
                                            <FormikSelect name="exitType" label="نوع خروج" options={dropdownExitType(exit)} />
                                        </Box>
                                    </Card>
                                </Box>

                                
                                {/* <Box component="div" className="mt-4">
                                    <Card className="p-2">
                                        <Box
                                            component="div"
                                            className="md:flex md:items-center flex-wrap md:gap-x-2"
                                        >
                                            <Box
                                                component="div"
                                                className="relative md:w-[20%]"
                                            >
                                                <input
                                                    onFocus={handleFocuse}
                                                    onBlur={handleBlur}
                                                    value={searchQuery}
                                                    onChange={handleInputChange}
                                                    placeholder="محصول / محصول"
                                                    type="text"
                                                    className="customInput border border-gray-300 rounded-md py-2 w-full outline-none"
                                                />

                                                {showProducts && (
                                                    <Box
                                                        component="div"
                                                        className="border w-[340px] overflow-auto max-h-[250px] min-h-[48px] absolute top-[42px] box-border bg-white shadow-md z-[9999] rounded-md"
                                                    >
                                                        <Box
                                                            component="ul"
                                                            onClick={(e: any) =>
                                                                e.stopPropagation()
                                                            }
                                                            className="serach__product-lists"
                                                        >
                                                            {productLoading && (
                                                                <Typography variant="body1">
                                                                    درحال
                                                                    بارگزاری
                                                                    محصولها
                                                                </Typography>
                                                            )}
                                                            {productError && (
                                                                <Typography variant="body1">
                                                                    خطا هنگام
                                                                    بارگزاری
                                                                    محصولها رخ
                                                                    داده است!
                                                                </Typography>
                                                            )}
                                                            {filteredData?.map(
                                                                (
                                                                    item: IProducts,
                                                                    index: number
                                                                ) => {
                                                                    return (
                                                                        <Box
                                                                            component="li"
                                                                            key={
                                                                                index
                                                                            }
                                                                            onClick={() =>
                                                                                handleProductSelect(
                                                                                    item
                                                                                )
                                                                            }
                                                                            className="min-h-[60px] cursor-pointer"
                                                                        >
                                                                            <Box
                                                                                component="div"
                                                                                className="flex flex-row justify-between items-center"
                                                                            >
                                                                                <Box
                                                                                    component="div"
                                                                                    className=" relative flex flex-col pt-4"
                                                                                >
                                                                                    <Typography className="text-sm px-4">
                                                                                        {" "}
                                                                                        {
                                                                                            item?.productIntegratedName
                                                                                        }
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Typography className="text-xs px-4">
                                                                                    {" "}
                                                                                    {
                                                                                        item?.productState
                                                                                    }
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    );
                                                                }
                                                            )}
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Box>
                                            <Box component="div" className="">
                                                <Button
                                                    onClick={() =>
                                                        setSelectedProductOpen(
                                                            true
                                                        )
                                                    }
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 4.5v15m7.5-7.5h-15"
                                                        />
                                                    </svg>
                                                </Button>
                                            </Box>
                                            <Box
                                                component="div"
                                                className="md:w-[20%]"
                                            >
                                                <FormikSelect
                                                    name="warehouseId"
                                                    label="انبار"
                                                    options={dropdownWarehouses(
                                                        warehouse
                                                    )}
                                                    onChange={(values) =>
                                                        handleWarehouseSelect(
                                                            values
                                                        )
                                                    }
                                                />
                                            </Box>
                                            <Box
                                                component="div"
                                                className="md:w-[20%]"
                                            >
                                                <FormikInput
                                                    name="proximateAmount"
                                                    label="مقدار (کیلوگرم)"
                                                    type="text"
                                                />
                                            </Box>
                                            <Box
                                                component="div"
                                                className="md:w-[20%]"
                                            >
                                                <FormikInput
                                                    name="price"
                                                    label="قیمت"
                                                    type="text"
                                                />
                                            </Box>
                                            <Box
                                                component="div"
                                                className="md:w-[20%]"
                                            >
                                                <FormikInput
                                                    name="productDesc"
                                                    label="توضیحات محصول"
                                                    type="text"
                                                />
                                            </Box>
                                            <Box
                                                component="div"
                                                className="md:w-[20%]"
                                            >
                                                <FormikInput
                                                    name="rowId"
                                                    label="ردیف فروش"
                                                    type="text"
                                                />
                                            </Box>
                                            {isBuy && (
                                                <>
                                                    <Box
                                                        component="div"
                                                        className="md:w-[20%]"
                                                    >
                                                        <FormikInput
                                                            name="sellerCompanyRow"
                                                            label="خرید از"
                                                            type="text"
                                                        />
                                                    </Box>
                                                    <Box
                                                        component="div"
                                                        className="md:w-[20%]"
                                                    >
                                                        <FormikInput
                                                            name="buyPrice"
                                                            label="قیمت خرید"
                                                            type="text"
                                                        />
                                                    </Box>
                                                    <Box
                                                        component="div"
                                                        className="md:w-[20%]"
                                                    >
                                                        <FormikSelect
                                                            value={
                                                                purchaseInvoiceTypeSelected
                                                            }
                                                            onSelect={(
                                                                value: any
                                                            ) =>
                                                                setPurchaseInvoiceTypeSelected(
                                                                    value
                                                                )
                                                            }
                                                            name="purchaseInvoiceTypeId"
                                                            label="نوع فاکتور خرید"
                                                            options={dropdownPurchaseInvoice(
                                                                purchaseInvoiceType
                                                            )}
                                                        />
                                                    </Box>
                                                    <Box
                                                        component="div"
                                                        className="md:w-[20%]"
                                                    >
                                                        <FormikDatepicker
                                                            name="purchaseSettlementDate"
                                                            label="تاریخ تسویه خرید"
                                                        />
                                                    </Box>
                                                </>
                                            )}
                                            <Box
                                                component="div"
                                                onClick={() =>
                                                    handleOrder(values)
                                                }
                                                className="md:w-[10%] bg-green-500 text-white text-center py-2 rounded-lg cursor-pointer"
                                            >
                                                افزودن
                                            </Box>
                                        </Box>
                                        <ProductSelectedList
                                            orders={orders}
                                            setOrders={setOrders}
                                        />
                                    </Card>
                                </Box> */}
                            </Form>
                        );
                    }}
                </Formik>
            </Card>

            <TransitionsModal open={isOpen} isClose={() => setIsOpen(false)}>
                <CreateCustomer
                    refetch={refetchCustomers}
                    setIsCreateOpen={setIsOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={selectedProductOpen}
                isClose={() => setSelectedProductOpen(false)}
            >
                <ProductSelectedListInModal
                    products={products?.data}
                    productLoading={productLoading}
                    productError={productError}
                    setSelectedProductOpen={setSelectedProductOpen}
                    setSelectProductFromModal={setSelectProductFromModal}
                />
            </TransitionsModal>
        </>
    );
};

export default Order;
