import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, TextField, Typography, FormControl, MenuItem, Select } from "@mui/material";

import DeleteGridButton from "../../../../../_cloner/components/DeleteGridButton";
import MuiDataGrid from "../../../../../_cloner/components/MuiDataGrid";

import { sliceNumberPriceRial } from "../../../../../_cloner/helpers/sliceNumberPrice";
import { calculateTotalAmount } from "../../helpers/functions";
import { IOrderService } from "../../core/_models";
import { Form, Formik, FormikErrors } from "formik";
import FormikRadioGroup from "../../../../../_cloner/components/FormikRadioGroup";
import { useGetProductTypes, useGetUnits, useGetWarehouseTypes } from "../../../generic/_hooks";
import Backdrop from "../../../../../_cloner/components/Backdrop";
import { useGetProductList } from "../../../products/_hooks";
import SearchBackendInput from "../../../../../_cloner/components/SearchBackendInput";
import { EnqueueSnackbar } from "../../../../../_cloner/helpers/snackebar";
import FormikSelect from "../../../../../_cloner/components/FormikSelect";
import MuiTable from "../../../../../_cloner/components/MuiTable";
import { NumericFormat } from "react-number-format";
import { dropdownProductType, dropdownWarehouseType } from "../../../../../_cloner/helpers/dropdowns";
import { ModalProductColumn, SelectProductMuiTableColumn } from "../../../../../_cloner/helpers/columns";
import Pagination from "../../../../../_cloner/components/Pagination";
import { WarehouseType } from "../../../../../_cloner/helpers/Enums";
import { useAuth } from "../../../../../_cloner/helpers/checkUserPermissions";
import TypographyAccessDenied from "../../../../../_cloner/components/TypographyAccessDenied";

interface IProps {
    setOrders?: any
    setOrderPayment?: any
    orders?: any
    orderService?: IOrderService[];
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>
}

interface IProductData {
    productSubUnitDesc: { [key: string]: string };
    productSubUnitId: { [key: string]: string };
    proximateAmounts: { [key: string]: string };
    proximateSubAmounts: { [key: string]: string };
    // price: { [key: string]: string };
    productPrice: { [key: string]: string };

    selectedProduct: any[];
    selectionModel: any;
    tabResult: any[];
    selectedTab: number;
    filteredTabs: any[]
}

interface IFilter {
    ByBrand?: boolean
    WarehouseId?: number
    WarehouseTypeId?: number
    ProductTypeId?: number
    ProductName?: string
    Keyword?: string
    PageNumber?: number
    PageSize?: number
}

const pageSize = 100;

const ProductsList: FC<IProps> = ({ setOrders, setOrderPayment, orders, orderService, setIsOpen, setFieldValue }) => {
    // const { hasPermission } = useAuth()

    const filterTools =  useGetProductList();
    const warehouseTypeTools = useGetWarehouseTypes();
    const productTypeTools = useGetProductTypes();

    const [searchTerm, setSearchTerm] = useState<any>("")

    const { data: units } = useGetUnits();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentFilter, setCurrentFilter] = useState<IFilter>({
        ByBrand: true,
        WarehouseTypeId: WarehouseType.Addi,
        ProductTypeId: -1,
        PageNumber: currentPage,
        PageSize: pageSize,

    })

    const [productData, setProductData] = useState<IProductData>({
        productSubUnitDesc: {},
        productSubUnitId: {},
        proximateAmounts: {},
        proximateSubAmounts: {},
        // price: {},
        productPrice: {},

        selectedProduct: [],
        selectionModel: {},
        tabResult: [],
        selectedTab: -1,
        filteredTabs: []
    });

    const handleFilterProduct = (filter: IFilter) => {
        filterTools.mutate(filter);
    }

    useEffect(() => {
        handleFilterProduct(currentFilter)
        // eslint-disable-next-line
    }, [currentPage])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filter = {
                ...currentFilter,
                Keyword: searchTerm
            }
            filterTools.mutate(filter);

        }, 300)

        return () => clearTimeout(delayDebounceFn)
        // eslint-disable-next-line
    }, [searchTerm])

    const handleSelectProduct = useCallback((newSelectionModel: any) => {
        const selectedRow = newSelectionModel.row;
        setProductData((prevState) => ({
            ...prevState,
            productSubUnitDesc: { ...prevState.productSubUnitDesc, [selectedRow?.productBrandId]: newSelectionModel.row.productSubUnitId },
            productPrice: { ...prevState.productPrice, [selectedRow?.productBrandId]: newSelectionModel.row.productPrice },
        }))
        const isDuplicate = productData.selectedProduct.some((item) => {
            return item?.productBrandId === selectedRow?.productBrandId;
        });
        if (!isDuplicate) {
            setProductData((prevState) => ({
                ...prevState,
                selectedProduct: [...productData.selectedProduct, newSelectionModel.row],
                selectionModel: newSelectionModel
            }))
            console.log("productData", productData)
            EnqueueSnackbar("کالا به لیست اضافه گردید", 'success')

        } else {
            alert("کالا قبلا به لیست کالا های انتخاب شده اضافه شده است");
        }

        // eslint-disable-next-line
    }, [productData.selectedProduct, productData.selectionModel]);

    const renderAction = useCallback((indexToDelete: any) => {
        return (
            <>
                <DeleteGridButton
                    onClick={() => {
                        if (productData.selectedProduct) {
                            const updatedOrders = productData.selectedProduct.filter(
                                (item: any) => +item.productBrandId !== +indexToDelete.productBrandId
                            );
                            setProductData((prevState) => ({
                                ...prevState,
                                selectedProduct: updatedOrders,
                            }))

                        }
                    }}
                />
            </>
        );
    }, [productData.selectedProduct]);

    const renderInput = useCallback((params: any) => {
        const productId = params?.productBrandId;
        return (
            <>
                <NumericFormat
                    id={`outlined-adornment-weight-${productId}`}
                    className="numeric-input"
                    value={productData.proximateAmounts[productId] || ""}
                    onChange={(e: any) => {
                        console.log("e.ta", e.target.value)
                        setProductData((prevState) => ({
                            ...prevState,
                            proximateAmounts: { ...prevState.proximateAmounts, [productId]: e.target.value },
                            proximateSubAmounts: { ...prevState.proximateSubAmounts, [productId]: Math.ceil(Number(e.target.value.replace(/,/g, "")) / Number(params.exchangeRate)).toString() },
                        }))
                    }
                    }
                    autoFocus={true}
                    thousandSeparator
                />

                {/* <TextField
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    type="number"
                    className="w-[140px] lg:w-[120px]"
                    value={productData.proximateAmounts[productId] || ""}
                    onChange={(e: any) =>
                        setProductData((prevState) => ({
                            ...prevState,
                            proximateAmounts: { ...prevState.proximateAmounts, [productId]: e.target.value },
                            proximateSubAmounts: { ...prevState.proximateSubAmounts, [productId]: Math.ceil(Number(e.target.value) / Number(params.exchangeRate)).toString() },
                        }))
                    }
                    autoFocus={true}
                    inputProps={{
                        "aria-label": "weight",
                        style: {
                            textAlign: "center",
                        },
                    }}
                /> */}
            </>
        );
    }, [productData.proximateAmounts])

    const renderSubUnit = useCallback((params: any) => {
        const productId = params.productBrandId;
        return (
            <div className="flex gap-x-2">
                <TextField
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    type="number"
                    className="w-[140px] lg:w-[120px]"
                    value={productData.proximateSubAmounts[productId] || ""}
                    onChange={(e: any) =>
                        setProductData((prevState) => ({
                            ...prevState,
                            proximateSubAmounts: { ...prevState.proximateSubAmounts, [productId]: e.target.value },
                        }))
                    }
                    inputProps={{
                        style: {
                            textAlign: "center",
                        },
                    }}
                />

                <FormControl fullWidth>
                    <Select
                        labelId={`demo-simple-select-label-${productId}`}
                        id={`demo-simple-select-label-${productId}`}
                        value={productData.productSubUnitDesc[productId] || ""}
                        onChange={(e: any) =>
                            setProductData((prevState) => ({
                                ...prevState,
                                productSubUnitDesc: { ...prevState.productSubUnitDesc, [productId]: e.target.value },
                            }))
                        }
                        size="small"
                        className="w-[140px] lg:w-[80px]"
                        inputProps={{
                            "aria-label": "weight",
                            style: {
                                width: 48,
                            },
                        }}
                    >
                        {units?.map((item: any) => (
                            <MenuItem value={item.id}>{item.unitName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>{" "}
            </div>
        );
        // eslint-disable-next-line
    }, [productData.proximateSubAmounts, productData.productSubUnitDesc])

    const renderPrice = useCallback((params: any) => {
        const productId = params.productBrandId;
        return (
            <>
                <NumericFormat
                    id={`outlined-adornment-weight-${productId}`}
                    className="numeric-input"
                    // value={productData.price[productId] || ""}
                    value={productData.productPrice[productId] || ""}
                    onChange={(e: any) =>
                        setProductData((prevState) => ({
                            ...prevState,
                            // price: { ...prevState.price, [productId]: e.target.value },
                            productPrice: { ...prevState.productPrice, [productId]: e.target.value },
                        }))
                    }
                    thousandSeparator
                />
            </>
        );
        // eslint-disable-next-line
        // }, [productData.price])
    }, [productData.productPrice])

    const handleSubmitSelectedProduct = () => {

        const selectedProductWithAmounts = productData.selectedProduct.map((product) => {
            const { id, warehouseId, productBrandId, productName, exchangeRate, productBrandName, warehouseName, productDesc = "", purchasePrice = "", purchaseSettlementDate = "", purchaseInvoiceTypeId = 0, sellerCompanyRow = "string", productMainUnitDesc, rowId = 0, proximateAmount = productData.proximateAmounts[product.productBrandId] || "", warehouseTypeId = 0 } = product;

            const productSubUnitDesc = productData.productSubUnitDesc[product.productBrandId]
                ? units.find((i: any) => i.id === productData.productSubUnitDesc[product.productBrandId]).unitName
                : product.productSubUnitDesc;

            const productSubUnitId = productData.productSubUnitId[product.productBrandId]
                ? units.find((i: any) => i.id === productData.productSubUnitId[product.productBrandId]).unitName
                : product.productSubUnitId;

            // const price = productData.price[product.productBrandId] ? productData.price[product.productBrandId].replace(/,/g, "") : ""
            // const productPrice = productData.productPrice[product.productBrandId] ? productData.productPrice[product.productBrandId]: ""
            const productPrice =
                (productData.productPrice[product.productBrandId] && typeof (productData.productPrice[product.productBrandId]) === "string") ?
                    productData.productPrice[product.productBrandId].replace(/,/g, "") :
                    (productData.productPrice[product.productBrandId] && typeof (productData.productPrice[product.productBrandId]) === "number") ?
                        productData.productPrice[product.productBrandId] : ""

            const proximateSubUnit =
                productData.proximateSubAmounts[product.productBrandId] === undefined
                    ? 0
                    : productData.proximateSubAmounts[product.productBrandId];
            const productSubUnitAmount =
                productData.proximateSubAmounts[product.productBrandId] === undefined
                    ? 0
                    : productData.proximateSubAmounts[product.productBrandId];

            return { id, productId: id, warehouseId, productBrandId, productName, productBrandName, warehouseName, productDesc, purchasePrice, exchangeRate, purchaseSettlementDate, purchaseInvoiceTypeId: Number(purchaseInvoiceTypeId), purchaseInvoiceTypeDesc: "", sellerCompanyRow, purchaserCustomerId: "", purchaserCustomerName: "", productMainUnitDesc, productSubUnitDesc, productSubUnitId, rowId, proximateAmount, warehouseTypeId, productPrice, proximateSubUnit, productSubUnitAmount };
        });

        const duplicatesExist = selectedProductWithAmounts.some((newProduct) =>
            orders.some((existingProduct: any) => existingProduct.productBrandId === newProduct.productBrandId)
        );


        if (!duplicatesExist) {
            const updatedOrders = [...orders, ...selectedProductWithAmounts];

            setOrders(updatedOrders);
            console.log("updatedOrders", updatedOrders)
            setOrderPayment([]);
            setFieldValue(
                "orderPaymentAmount",
                sliceNumberPriceRial(
                    calculateTotalAmount(updatedOrders, orderService)
                )
            );
            setIsOpen(false)
        } else {
            alert("برخی از کالا ها در لیست سفارشات موجود می باشد");
        }
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };


    // if (!hasPermission("GetProductTypes") || !hasPermission("GetProductUnits") || !hasPermission("GetWarehouseTypes"))
    //     return <Typography variant="h4" className="flex justify-center items-center">جهت استفاده از این بخش باید دسترسی به لیست تمامی نوع کالاها، واحدهای کالا و نوع انبار ها داشته باشید</Typography>

    return (
        <>
            {warehouseTypeTools.isLoading && <Backdrop loading={warehouseTypeTools.isLoading} />}
            {productTypeTools.isLoading && <Backdrop loading={productTypeTools.isLoading} />}

            <div className="mx-1 hidden lg:block">
                <Button
                    className={`${currentFilter.ProductTypeId === -1 ? "!bg-[#fcc615] !text-black" : ""
                        }`}
                    onClick={() => {
                        setCurrentFilter({
                            ...currentFilter,
                            ProductTypeId: -1
                        })
                        handleFilterProduct({
                            ...currentFilter,
                            ProductTypeId: -1
                        })
                    }} >
                    <Typography className="px-2">کل محصولات</Typography>
                </Button>

                {productTypeTools?.data?.map((item: any, index: number) => {
                    return (
                        <Button key={index}
                            className={`${currentFilter.ProductTypeId === item.id
                                ? "!bg-[#fcc615] !text-black"
                                : ""
                                }`}

                            onClick={() => {
                                setCurrentFilter({
                                    ...currentFilter,
                                    ProductTypeId: item.id
                                })
                                handleFilterProduct({
                                    ...currentFilter,
                                    ProductTypeId: item.id
                                })

                            }}
                        >
                            <Typography className="px-2">{item.desc}</Typography>
                        </Button>
                    );
                })}
            </div>

            <div className="lg:hidden mt-4">
                <Formik initialValues={{ productTypeId: "" }} onSubmit={() => { }}>
                    {() => {
                        return <Form>
                            <FormikSelect
                                name="productTypeId"
                                label="نوع محصول"
                                options={dropdownProductType(productTypeTools?.data)}
                                onChange={(e: any) => {
                                    setCurrentFilter({
                                        ...currentFilter,
                                        ProductTypeId: e
                                    })
                                    handleFilterProduct({
                                        ...currentFilter,
                                        ProductTypeId: e
                                    })
                                }} />
                        </Form>
                    }}
                </Formik>
            </div>
            <div className="col-span-2 mx-4 my-2">
                <Formik initialValues={{ warehouseTypeId: WarehouseType.Addi.toString() }} onSubmit={() => { }}>
                    {() => {
                        return <Form>
                            <FormikRadioGroup
                                onChange={(value: number) => {
                                    setCurrentFilter({
                                        ...currentFilter,
                                        WarehouseTypeId: +value
                                    })
                                    handleFilterProduct({
                                        ...currentFilter,
                                        WarehouseTypeId: +value
                                    })
                                }}
                                radioData={dropdownWarehouseType(warehouseTypeTools?.data?.filter((item: { id: number }) => item.id !== 4))}
                                name="warehouseTypeId" />
                        </Form>
                    }}
                </Formik>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                <div className="lg:col-span-3">
                    <div className="my-2">
                        <SearchBackendInput label="جستجو" name="keyword" value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value)} />
                    </div>
                    <MuiDataGrid
                        onDoubleClick={handleSelectProduct}
                        columns={ModalProductColumn()}
                        isLoading={filterTools.isLoading}
                        rows={filterTools?.data?.data}
                        data={filterTools?.data?.data}
                        hideFooter={true}
                        height={420}
                    />
                    <Pagination
                        pageCount={filterTools?.data?.totalCount / pageSize}
                        onPageChange={handlePageChange}
                    />

                </div>
                <div className="lg:col-span-4">
                    <MuiTable
                        columns={SelectProductMuiTableColumn(
                            renderAction,
                            renderInput,
                            renderSubUnit,
                            renderPrice
                        )}
                        data={productData.selectedProduct}
                        onDoubleClick={() => { }}
                    />
                    <div
                        className="flex justify-end items-end mt-4"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            className=""
                            onClick={handleSubmitSelectedProduct}
                        >
                            <Typography>تایید</Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(ProductsList, (prevProps: Readonly<IProps>, nextProps: Readonly<IProps>) => {
    return prevProps === nextProps
});