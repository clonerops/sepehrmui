import React, { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { Button, OutlinedInput, Typography, FormControl, MenuItem, Select } from "@mui/material";

import MuiSelectionDataGrid from "../../../../../_cloner/components/MuiSelectionDataGrid";
import DeleteGridButton from "../../../../../_cloner/components/DeleteGridButton";
import MuiDataGrid from "../../../../../_cloner/components/MuiDataGrid";
import MaskInput from "../../../../../_cloner/components/MaskInput";

import { columnsModalProduct, columnsSelectProduct } from "../../helpers/columns";
import { sliceNumberPriceRial } from "../../../../../_cloner/helpers/sliceNumberPrice";
import { calculateTotalAmount } from "../../helpers/functions";
import { useGetUnits } from "../../../generic/productUnit/_hooks";
import { IOrderService } from "../../core/_models";
import { Form, Formik, FormikErrors } from "formik";
import FormikRadioGroup from "../../../../../_cloner/components/FormikRadioGroup";
import { dropdownWarehouseType } from "../../helpers/dropdowns";
import { useGetProductTypes, useGetWarehouseTypes } from "../../../generic/_hooks";
import Backdrop from "../../../../../_cloner/components/Backdrop";
import { useGetProductList } from "../../../generic/products/_hooks";
import SearchBackendInput from "../../../../../_cloner/components/SearchBackendInput";

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
    price: { [key: string]: string };

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
    PageNumber?: number
    PageSize?: number
}

const ProductsList: FC<IProps> = ({ setOrders, setOrderPayment, orders, orderService, setIsOpen, setFieldValue }) => {
    const filterTools = useGetProductList();
    const warehouseTypeTools = useGetWarehouseTypes();
    const productTypeTools = useGetProductTypes();
    const [searchTerm, setSearchTerm] = useState<any>("")

    const { data: units } = useGetUnits();

    const [currentFilter, setCurrentFilter] = useState<IFilter>({
        ByBrand: true,
        WarehouseTypeId: 1,
        ProductTypeId: -1
    })

    const [productData, setProductData] = useState<IProductData>({
        productSubUnitDesc: {},
        productSubUnitId: {},
        proximateAmounts: {},
        proximateSubAmounts: {},
        price: {},

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
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filter = {
                ...currentFilter,
                ProductName: searchTerm
            }
            filterTools.mutate(filter);

        }, 1000)

        return () => clearTimeout(delayDebounceFn)
         // eslint-disable-next-line
    }, [searchTerm])

    const handleSelectProduct = useCallback((newSelectionModel: any) => {
        const selectedRow = newSelectionModel.row;
        setProductData((prevState) => ({
            ...prevState,
            productSubUnitDesc: { ...prevState.productSubUnitDesc, [selectedRow.id]: newSelectionModel.row.productSubUnitId },
            price: productData.price,
        }))
        const isDuplicate = productData.selectedProduct.some((item) => {
            return item.id === selectedRow.id;
        });
        if (!isDuplicate) {
            setProductData((prevState) => ({
                ...prevState,
                selectedProduct: [...productData.selectedProduct, newSelectionModel.row],
                selectionModel: newSelectionModel
            }))

        } else {
            alert("کالا قبلا به لیست کالا های انتخاب شده اضافه شده است");
        }
    }, [productData.selectedProduct, productData.selectionModel]);

    const renderAction = useCallback((indexToDelete: any) => {
        return (
            <>
                <DeleteGridButton
                    onClick={() => {
                        if (productData.selectedProduct) {
                            const updatedOrders = productData.selectedProduct.filter(
                                (item: any) => item.id !== indexToDelete.id
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
        const productId = params.row.id;
        return (
            <>
                <OutlinedInput
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    value={productData.proximateAmounts[productId] || ""}
                    onChange={(e: any) =>
                        setProductData((prevState) => ({
                            ...prevState,
                            proximateAmounts: { ...prevState.proximateAmounts, [productId]: e.target.value },
                            proximateSubAmounts: { ...prevState.proximateAmounts, [productId]: Math.ceil(Number(e.target.value) / Number(params.row.exchangeRate)).toString() },
                        }))
                    }
                    autoFocus={true}
                    inputProps={{
                        "aria-label": "weight",
                        style: {
                            textAlign: "center",
                        },
                    }}
                />
            </>
        );
    }, [productData.proximateAmounts])

    const renderSubUnit = useCallback((params: any) => {
        const productId = params.row.id;
        return (
            <div className="flex gap-x-2">
                <OutlinedInput
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    value={productData.proximateSubAmounts[productId] || ""}
                    onChange={(e: any) =>
                        setProductData((prevState) => ({
                            ...prevState,
                            proximateSubAmounts: { ...prevState.proximateAmounts, [productId]: e.target.value },
                        }))
                    }
                    inputProps={{
                        style: {
                            textAlign: "center",
                            width: 28,
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
                        inputProps={{
                            "aria-label": "weight",
                            style: {
                                width: 28,
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
    }, [productData.proximateSubAmounts])

    const renderPrice = useCallback((params: any) => {
        const productId = params.row.id;
        return (
            <>
                <MaskInput
                    label=""
                    mask={Number}
                    onAccept={(value: any) =>
                        setProductData((prevState) => ({
                            ...prevState,
                            price: { ...prevState.price, [productId]: value },
                        }))
                    }
                    thousandsSeparator=","
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    inputProps={{
                        "aria-label": "weight",
                        style: {
                            textAlign: "center",
                        },
                    }}
                />
            </>
        );
    }, [productData.price])



    const handleSubmitSelectedProduct = () => {
        const selectedProductWithAmounts = productData.selectedProduct.map((product) => {
            const { id, warehouseId, productBrandId, productName, exchangeRate, productBrandName, warehouseName, productDesc = "", purchasePrice = "", purchaseSettlementDate = "", purchaseInvoiceTypeId = 0, sellerCompanyRow = "string", productMainUnitDesc, rowId = 0, proximateAmount = productData.proximateAmounts[product.id] || "", warehouseTypeId = 0 } = product;
            const productSubUnitDesc = productData.productSubUnitDesc[product.id]
                ? units.find((i: any) => i.id === productData.productSubUnitDesc[product.id]).unitName
                : product.productSubUnitDesc;

            const productSubUnitId = productData.productSubUnitId[product.id]
                ? units.find((i: any) => i.id === productData.productSubUnitId[product.id]).unitName
                : product.productSubUnitId;

            const price = productData.price[product.id] ? productData.price[product.id].replace(/,/g, "") : ""

            const proximateSubUnit =
                productData.proximateSubAmounts[product.id] === undefined
                    ? 0
                    : productData.proximateSubAmounts[product.id];

            return { id, productId: id, warehouseId, productBrandId, productName, productBrandName, warehouseName, productDesc, purchasePrice, exchangeRate, purchaseSettlementDate, purchaseInvoiceTypeId: Number(purchaseInvoiceTypeId), purchaseInvoiceTypeDesc: "", sellerCompanyRow, purchaserCustomerId: "", purchaserCustomerName: "", productMainUnitDesc, productSubUnitDesc, productSubUnitId, rowId, proximateAmount, warehouseTypeId, price, proximateSubUnit };
        });

        const duplicatesExist = selectedProductWithAmounts.some((newProduct) =>
            orders.some(
                (existingProduct: any) =>
                    existingProduct.id === newProduct.id &&
                    existingProduct.warehouseId === newProduct.warehouseId &&
                    existingProduct.productBrandId === newProduct.productBrandId
            )
        );


        if (!duplicatesExist) {
            const updatedOrders = [...orders, ...selectedProductWithAmounts];

            setOrders(updatedOrders);
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

    if (warehouseTypeTools?.isLoading || productTypeTools?.isLoading) {
        return <Backdrop loading={warehouseTypeTools?.isLoading || productTypeTools?.isLoading} />
    }

    return (
        <>
            <div className="mx-1">
                <Button
                    className={`${currentFilter.ProductTypeId == -1 ? "!bg-[#fcc615] !text-black" : ""
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
                            className={`${currentFilter.ProductTypeId == item.id
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

            <div className="col-span-2 mx-4 my-2">
                <Formik initialValues={{ warehouseTypeId: "1" }} onSubmit={() => { }}>
                    {({ }) => {
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
                                radioData={dropdownWarehouseType(warehouseTypeTools?.data)}
                                name="warehouseTypeId" />
                        </Form>
                    }}
                </Formik>
            </div>
            <div className="md:grid md:grid-cols-2 gap-x-8">
                <div>
                    <div className="my-2">
                        <SearchBackendInput label="جستجو" name="productName" value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value)} />
                    </div>
                    <MuiDataGrid
                        onDoubleClick={handleSelectProduct}
                        columns={columnsModalProduct()}
                        isLoading={filterTools.isLoading}
                        rows={filterTools?.data?.data}
                        data={filterTools?.data?.data}
                        height={400}
                    />
                </div>
                <div>
                    <MuiSelectionDataGrid
                        selectionModel={productData.selectionModel}
                        columns={columnsSelectProduct(
                            renderAction,
                            renderInput,
                            renderSubUnit,
                            renderPrice
                        )}
                        rows={productData.selectedProduct}
                        data={productData.selectedProduct}
                        getRowId={(row: { id: string }) => row.id.toString()}
                        hideFooter={true}
                        columnHeaderHeight={40}
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