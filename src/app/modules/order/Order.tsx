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
import { useGetInvoiceType, useGetPaymentTypes, useGetPurchaseInvoice, useGetSendTypes, useGetWarehouses } from "../generic/_hooks";
import { Box, Button, Card, Typography } from "@mui/material";
import { sliceNumberPrice } from "../../../_cloner/helpers/sliceNumberPrice";
import { convertToPersianWord } from "../../../_cloner/helpers/convertPersian";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import FormikInput from "../../../_cloner/components/FormikInput";

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
    const [warehouseSelected, setWarehouseSelected] = useState<{
        value: number | null;
        label: string | null;
        warehouseTypeId: number | null;
    }>();
    const [purchaseInvoiceTypeSelected, setPurchaseInvoiceTypeSelected] =
        useState<{
            value: number | null;
            label: string | null;
        }>();
    const [purchaseSettlementDate, setPurchaseSettlementDate] = useState<any>();

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
    const { mutate, isLoading } = useCreateOrder();

    const proximateAmountRef = useRef<any>();
    const priceRef = useRef<any>();
    const productDescRef = useRef<any>();
    const rowIdRef = useRef<any>();
    const sellerCompanyRowRef = useRef<any>();
    const buyPriceRef = useRef<any>();
    const [isBuy, setIsBuy] = useState<boolean>(false);

    const handleSelectWarehouse = (value: any) => {
        setWarehouseSelected(value);
        if (value.warehouseTypeId === 1) {
            setIsBuy(true);
        } else {
            setIsBuy(false);
        }
    };

    const handleOrder = () => {
        const productOrder = {
            productId: productSelected,
            productName: searchQuery,
            warehouseId: warehouseSelected?.value,
            warehouseTypeId: warehouseSelected?.warehouseTypeId,
            warehouseName: warehouseSelected?.label,
            productDesc: productDescRef.current?.value,
            buyPrice: buyPriceRef.current?.value,
            purchaseSettlementDate: moment(
                new Date(purchaseSettlementDate)
            ).format("jYYYY/jMM/jDD"),
            purchaseInvoiceTypeId: purchaseInvoiceTypeSelected?.value,
            purchaseInvoiceTypeName: purchaseInvoiceTypeSelected?.label,
            sellerCompanyRow: sellerCompanyRowRef.current?.value,
            proximateAmount: proximateAmountRef.current?.value,
            price: priceRef.current?.value,
            rowId: rowIdRef.current?.value,
        };
        setOrders([...orders, productOrder]);
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={orderValidation}
                onSubmit={async (values) => {
                    if (orders.length === 0) {
                        // Swal.fire({
                        //     position: "top-end",
                        //     icon: "error",
                        //     title: "کالایی در لیست سفارشات موجود نمی باشد",
                        //     showConfirmButton: false,
                        //     timer: 8500,
                        // });
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
                                        // warehouseTypeId: item.warehouseTypeId
                                        //     ? Number(item.warehouseTypeId)
                                        //     : null,
                                        proximateAmount: item.proximateAmount
                                            ? Number(item.proximateAmount)
                                            : null,
                                        numberInPackage: item.proximateAmount
                                            ? Number(item.proximateAmount)
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
                                        purchaseSettlementDate: "1402/01/01",
                                        sellerCompanyRow: item.sellerCompanyRow
                                            ? item.sellerCompanyRow
                                            : null,
                                    };
                                }
                            ),
                        };
                        mutate(formData, {
                            onSuccess: (orderData) => {
                                // orderData.succeeded === true
                                //     ? Swal.fire({
                                //           position: "top-end",
                                //           icon: "success",
                                //           title: orderData.message,
                                //           showConfirmButton: false,
                                //           timer: 8500,
                                //       })
                                //     : Swal.fire({
                                //           position: "top-end",
                                //           icon: "error",
                                //           title: orderData.data.Message,
                                //           showConfirmButton: false,
                                //           timer: 8500,
                                //       });
                            },
                        });
                    }
                }}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Box component="div" className="mb-4">
                                <Card>
                                    <Box component="div" className="grid grid-cols-1 md:grid-cols-3">
                                        <Box component="div" className="md:border-l-2 md:border-gray-300">
                                            <span className="font-yekan_bold text-xl">
                                                قیمت کل:{" "}
                                                <span className="text-green-500 text-2xl font-bold px-8">
                                                    {sliceNumberPrice(
                                                        totalAmount
                                                    )}{" "}
                                                    ریال
                                                </span>
                                            </span>
                                        </Box>
                                        <Box component="div" className="md:pr-8">
                                            <span className="font-yekan_bold text-xl">
                                                قیمت به حروف:{" "}
                                                <span className="text-green-500 text-sm font-bold px-8">
                                                    {convertToPersianWord(
                                                        totalAmount
                                                    )}{" "}
                                                    تومان
                                                </span>
                                            </span>
                                        </Box>
                                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                            <Typography variant="h3" className="px-8 py-2">ثبت</Typography>
                                        </Button>

                                        {/* <SubmitButton
                                            isLoading={isLoading}
                                            title="ثبت"
                                        /> */}
                                    </Box>
                                </Card>
                            </Box>
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                <Card>
                                    <Box component="div" className="flex justify-between flex-col">
                                        <Box component="div" className="pt-2">
                                            <Typography variant="h2" className="font-yekan_bold text-lg">
                                                مشتری و تاریخ تسویه
                                            </Typography>
                                            <Box component="div" className="mt-2">
                                                <Box component="div" className="flex flex-row items-center gap-x-4">
                                                    <Box component="div" className="w-full md:w-full">
                                                        <FormikSelect
                                                            name="customerId"
                                                            label="مشتری"
                                                            options={dropdownCustomer(
                                                                customers?.data
                                                            )}
                                                        />
                                                    </Box>
                                                    <Box component="span"
                                                        onClick={() =>
                                                            setIsOpen(true)
                                                        }
                                                        className="flex w-10 my-2 md:my-0 bg-green-600 p-3 rounded-md text-white cursor-pointer"
                                                    >
                                                        {" "}
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
                                                    </Box>
                                                </Box>
                                                <Box component="div" className="mt-2">
                                                    <FormikDatepicker
                                                        name="settlementDate"
                                                        label="تاریخ تسویه"
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card>
                                    <Typography variant="h2" className="font-yekan_bold text-lg py-4">
                                        مشخصه سفارش
                                    </Typography>
                                    <Box component="div" className="md:grid md:grid-cols-2 md:gap-4">
                                        <FormikSelect
                                            name="orderSendTypeId"
                                            label="نوع ارسال"
                                            options={dropdownOrderSendType(
                                                orderSendType
                                            )}
                                        />
                                        <FormikSelect
                                            name="invoiceTypeId"
                                            label="نوع فاکتور"
                                            options={dropdownInvoiceType(
                                                factor
                                            )}
                                        />
                                        <FormikSelect
                                            name="paymentTypeId"
                                            label="نوع پرداخت"
                                            options={dropdownRentPaymentType(
                                                rent
                                            )}
                                        />
                                        <FormikSelect
                                            name="exitType"
                                            label="نوع خروج"
                                            options={dropdownExitType(exit)}
                                        />
                                    </Box>
                                </Card>
                            </Box>
                            <Box component="div" className="mt-4">
                                <Card>
                                    <Box component="div"
                                        onClick={() =>
                                            setSelectedProductOpen(true)
                                        }
                                        className="bg-indigo-500 text-white cursor-pointer w-[18rem] text-center p-4 rounded-lg"
                                    >
                                        انتخاب کالا
                                    </Box>
                                    <TransitionsModal
                                        open={selectedProductOpen}
                                        isClose={() =>
                                            setSelectedProductOpen(false)
                                        }
                                    >
                                        <ProductSelectedListInModal
                                            products={products?.data}
                                            productLoading={productLoading}
                                            productError={productError}
                                            setSelectedProductOpen={
                                                setSelectedProductOpen
                                            }
                                            setSelectProductFromModal={
                                                setSelectProductFromModal
                                            }
                                        />
                                    </TransitionsModal>
                                    <Box component="div" className="md:flex md:items-center flex-wrap md:gap-x-8">
                                        <Box component="div" className="relative md:w-[20%] my-2">
                                            <input
                                                onFocus={handleFocuse}
                                                onBlur={handleBlur}
                                                value={searchQuery}
                                                onChange={handleInputChange}
                                                placeholder="کالا / کالا"
                                                type="text"
                                                className="customInput border px-2 border-gray-300 rounded-md py-2 w-full outline-none"
                                            />

                                            {showProducts && (
                                                <Box component="div" className="border w-[340px] overflow-auto max-h-[250px] min-h-[48px] absolute top-[42px] box-border bg-white shadow-md z-[9999] rounded-md">
                                                    <Box component="ul"
                                                        onClick={(e: any) =>
                                                            e.stopPropagation()
                                                        }
                                                        className="serach__product-lists"
                                                    >
                                                        {productLoading && (
                                                            <Typography variant="body1">
                                                                درحال بارگزاری
                                                                کالاها
                                                            </Typography>
                                                        )}
                                                        {productError && (
                                                            <Typography variant="body1">
                                                                خطا هنگام
                                                                بارگزاری کالاها
                                                                رخ داده است!
                                                            </Typography>
                                                        )}
                                                        {filteredData?.map(
                                                            (
                                                                item: IProducts,
                                                                index: number
                                                            ) => {
                                                                return (
                                                                    <Box component="li"
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
                                                                        <Box component="div" className="flex flex-row justify-between items-center">
                                                                            <Box component="div" className=" relative flex flex-col pt-4">
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
                                        <Box component="div" className="md:w-[20%] my-2">
                                            <FormikSelect
                                                value={warehouseSelected}
                                                onSelect={handleSelectWarehouse}
                                                name="warehouseId"
                                                label="انبار"
                                                options={dropdownWarehouses(
                                                    warehouse
                                                )}
                                            />
                                        </Box>
                                        <Box component="div" className="md:w-[20%] my-2">
                                            <FormikInput
                                                ref={proximateAmountRef}
                                                name="proximateAmount"
                                                label="مقدار (کیلوگرم)"
                                                type="text"
                                            />
                                        </Box>
                                        <Box component="div" className="md:w-[20%] my-2">
                                            <FormikInput
                                                ref={priceRef}
                                                name="price"
                                                label="قیمت"
                                                type="text"
                                            />
                                        </Box>
                                        <Box component="div" className="md:w-[20%] my-2">
                                            <FormikInput
                                                ref={productDescRef}
                                                name="productDesc"
                                                label="توضیحات کالا"
                                                type="text"
                                            />
                                        </Box>
                                        <Box component="div" className="md:w-[20%] my-2">
                                            <FormikInput
                                                ref={rowIdRef}
                                                name="rowId"
                                                label="ردیف فروش"
                                                type="text"
                                            />
                                        </Box>
                                        {isBuy && (
                                            <>
                                                <Box component="div" className="md:w-[20%] my-2">
                                                    <FormikInput
                                                        ref={
                                                            sellerCompanyRowRef
                                                        }
                                                        name="sellerCompanyRow"
                                                        label="خرید از"
                                                        type="text"
                                                    />
                                                </Box>
                                                <Box component="div" className="md:w-[20%] my-2">
                                                    <FormikInput
                                                        ref={buyPriceRef}
                                                        name="buyPrice"
                                                        label="قیمت خرید"
                                                        type="text"
                                                    />
                                                </Box>
                                                <Box component="div" className="md:w-[20%] my-2">
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
                                                <Box component="div" className="md:w-[20%] my-2">
                                                    <FormikDatepicker
                                                        value={
                                                            purchaseSettlementDate
                                                        }
                                                        // onChange={(date: any) =>
                                                        //     setPurchaseSettlementDate(
                                                        //         date
                                                        //     )
                                                        // }
                                                        name="purchaseSettlementDate"
                                                        label="تاریخ تسویه خرید"
                                                    />
                                                </Box>
                                            </>
                                        )}
                                        <Box component="div"
                                            onClick={handleOrder}
                                            className="md:w-[10%] my-2 bg-green-500 text-white text-center py-2 rounded-lg cursor-pointer"
                                        >
                                            افزودن
                                        </Box>
                                    </Box>
                                    <ProductSelectedList
                                        orders={orders}
                                        setOrders={setOrders}
                                    />
                                </Card>
                            </Box>
                        </Form>
                    );
                }}
            </Formik>
            <TransitionsModal
                open={isOpen}
                isClose={() => setIsOpen(false)}
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
