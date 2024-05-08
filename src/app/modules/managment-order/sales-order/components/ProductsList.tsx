import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, OutlinedInput, Typography, FormControl, MenuItem, Select } from "@mui/material";

import MuiSelectionDataGrid from "../../../../../_cloner/components/MuiSelectionDataGrid";
import DeleteGridButton from "../../../../../_cloner/components/DeleteGridButton";
import MuiDataGrid from "../../../../../_cloner/components/MuiDataGrid";
import MaskInput from "../../../../../_cloner/components/MaskInput";

import { columnsModalProduct, columnsSelectProduct, columnsSelectProductMuiTable } from "../../helpers/columns";
import { sliceNumberPriceRial } from "../../../../../_cloner/helpers/sliceNumberPrice";
import { calculateTotalAmount } from "../../helpers/functions";
import { useGetUnits } from "../../../generic/productUnit/_hooks";
import { IOrderService } from "../../core/_models";
import { Form, Formik, FormikErrors } from "formik";
import FormikRadioGroup from "../../../../../_cloner/components/FormikRadioGroup";
import { dropdownProductType, dropdownWarehouseType } from "../../helpers/dropdowns";
import { useGetProductTypes, useGetWarehouseTypes } from "../../../generic/_hooks";
import Backdrop from "../../../../../_cloner/components/Backdrop";
import { useGetProductList } from "../../../generic/products/_hooks";
import SearchBackendInput from "../../../../../_cloner/components/SearchBackendInput";
import { EnqueueSnackbar } from "../../../../../_cloner/helpers/Snackebar";
import FormikSelect from "../../../../../_cloner/components/FormikSelect";
import MuiTable from "../../../../../_cloner/components/MuiTable";

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
            productSubUnitDesc: { ...prevState.productSubUnitDesc, [selectedRow?.productBrandId]: newSelectionModel.row.productSubUnitId },
            price: productData.price,
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
                                (item: any) => +item.productBrandId !== +indexToDelete.id
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
        // const productId = params?.row?.productBrandId;
        const productId = params?.productBrandId;
        return (
            <>
                <OutlinedInput
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    className="w-[200px] lg:w-full"
                    value={productData.proximateAmounts[productId] || ""}
                    onChange={(e: any) =>
                        setProductData((prevState) => ({
                            ...prevState,
                            proximateAmounts: { ...prevState.proximateAmounts, [productId]: e.target.value },
                            // proximateSubAmounts: { ...prevState.proximateAmounts, [productId]: Math.ceil(Number(e.target.value) / Number(params.row.exchangeRate)).toString() },
                            proximateSubAmounts: { ...prevState.proximateAmounts, [productId]: Math.ceil(Number(e.target.value) / Number(params.exchangeRate)).toString() },
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
        const productId = params.productBrandId;
        return (
            <div className="flex gap-x-2">
                <OutlinedInput
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    className="w-[200px] lg:w-full"
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
                        className="w-[200px] lg:w-full"
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
        // const productId = params.row.productBrandId;
        const productId = params.productBrandId;
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
                    className="!w-[200px] lg:!w-full"
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
        // eslint-disable-next-line
    }, [productData.price])

    const handleSubmitSelectedProduct = () => {
        const selectedProductWithAmounts = productData.selectedProduct.map((product) => {
            const { id, warehouseId, productBrandId, productName, exchangeRate, productBrandName, warehouseName, productDesc = "", purchasePrice = "", purchaseSettlementDate = "", purchaseInvoiceTypeId = 0, sellerCompanyRow = "string", productMainUnitDesc, rowId = 0, proximateAmount = productData.proximateAmounts[product.productBrandId] || "", warehouseTypeId = 0 } = product;
            const productSubUnitDesc = productData.productSubUnitDesc[product.productBrandId]
                ? units.find((i: any) => i.id === productData.productSubUnitDesc[product.productBrandId]).unitName
                : product.productSubUnitDesc;

            const productSubUnitId = productData.productSubUnitId[product.productBrandId]
                ? units.find((i: any) => i.id === productData.productSubUnitId[product.productBrandId]).unitName
                : product.productSubUnitId;

            const price = productData.price[product.productBrandId] ? productData.price[product.productBrandId].replace(/,/g, "") : ""

            const proximateSubUnit =
                productData.proximateSubAmounts[product.productBrandId] === undefined
                    ? 0
                    : productData.proximateSubAmounts[product.productBrandId];

            return { id, productId: id, warehouseId, productBrandId, productName, productBrandName, warehouseName, productDesc, purchasePrice, exchangeRate, purchaseSettlementDate, purchaseInvoiceTypeId: Number(purchaseInvoiceTypeId), purchaseInvoiceTypeDesc: "", sellerCompanyRow, purchaserCustomerId: "", purchaserCustomerName: "", productMainUnitDesc, productSubUnitDesc, productSubUnitId, rowId, proximateAmount, warehouseTypeId, price, proximateSubUnit };
        });

        const duplicatesExist = selectedProductWithAmounts.some((newProduct) =>
            orders.some(
                (existingProduct: any) =>
                    existingProduct.productBrandId === newProduct.productBrandId &&
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
                            className={`${currentFilter.ProductTypeId === item.productBrandId
                                ? "!bg-[#fcc615] !text-black"
                                : ""
                                }`}

                            onClick={() => {
                                setCurrentFilter({
                                    ...currentFilter,
                                    ProductTypeId: item.productBrandId
                                })
                                handleFilterProduct({
                                    ...currentFilter,
                                    ProductTypeId: item.productBrandId
                                })

                            }}
                        >
                            <Typography className="px-2">{item.desc}</Typography>
                        </Button>
                    );
                })}
            </div>
            
            <div className="lg:hidden mt-4">
                <Formik initialValues={{productTypeId: ""}} onSubmit={() => { }}>
                    {() => {
                        return <Form>
                            <FormikSelect 
                                name="productTypeId" 
                                label="نوع محصول" 
                                options={dropdownProductType(productTypeTools?.data)}
                                onChange={(e: any) => {
                                    console.log(e)
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
                <Formik initialValues={{ warehouseTypeId: "1" }} onSubmit={() => { }}>
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
                                radioData={dropdownWarehouseType(warehouseTypeTools?.data)}
                                name="warehouseTypeId" />
                        </Form>
                    }}
                </Formik>
            </div>
            {/* <ReusableAccordion
                title="لیست کالاها قابل انتخاب"
                content={
                    <div style={{direction: "rtl"}}>
                        <div className="my-2">
                            <SearchBackendInput label="جستجو" name="productName" value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value)} />
                        </div>
                        <MuiDataGrid
                            onDoubleClick={handleSelectProduct}
                            columns={columnsModalProduct()}
                            isLoading={filterTools.isLoading}
                            rows={filterTools?.data?.data}
                            data={filterTools?.data?.data}
                            height={340}
                        />
                    </div>
                }
            />
            <ReusableAccordion
                title="لیست کالاهای انتخاب شده"
                content={
                    <div style={{direction: "rtl"}}>
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
                }
            /> */}

            {/* <CustomTabs
                tabs={["لیست کالاهای موجود در انبار", "لیست کالاهای انتخاب شده"]}
                tabContents={[
                    <div style={{direction: "rtl"}}>
                        <div className="my-2">
                            <SearchBackendInput label="جستجو" name="productName" value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value)} />
                        </div>
                        <MuiDataGrid
                            onDoubleClick={handleSelectProduct}
                            columns={columnsModalProduct()}
                            isLoading={filterTools.isLoading}
                            rows={filterTools?.data?.data}
                            data={filterTools?.data?.data}
                            height={340}
                        />
                    </div>,
                    <div style={{direction: "rtl"}}>
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


                ]}
            /> */}
            {/* <div className="md:grid md:grid-cols-3 gap-x-8"> */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                    <div className="my-2">
                        <SearchBackendInput label="جستجو" name="productName" value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value)} />
                    </div>
                    <MuiDataGrid
                        onDoubleClick={handleSelectProduct}
                        columns={columnsModalProduct()}
                        isLoading={filterTools.isLoading}
                        rows={filterTools?.data?.data}
                        data={filterTools?.data?.data}
                        height={580}
                    />
                </div>
                <div className="lg:col-span-3">
                    {/* <MuiSelectionDataGrid
                        selectionModel={productData.selectionModel}
                        columns={columnsSelectProduct(
                            renderAction,
                            renderInput,
                            renderSubUnit,
                            renderPrice
                        )}
                        rows={productData.selectedProduct}
                        data={productData.selectedProduct}
                        getRowId={(row: { productBrandId: string }) => row.productBrandId.toString()}
                        hideFooter={true}
                        columnHeaderHeight={40}
                    /> */}
                    <MuiTable
                        columns={columnsSelectProductMuiTable(
                            renderAction,
                            renderInput,
                            renderSubUnit,
                            renderPrice
                        )}
                        data={productData.selectedProduct}
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