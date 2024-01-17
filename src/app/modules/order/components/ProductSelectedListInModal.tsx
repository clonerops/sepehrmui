import React, { useEffect, useState } from "react";
import { IProducts } from "../../product/core/_models";
import {
    Box,
    Button,
    OutlinedInput,
    Typography,
    FormControl,
    MenuItem,
    TextField,
} from "@mui/material";
import Select from "@mui/material/Select";
import MuiSelectionDataGrid from "../../../../_cloner/components/MuiSelectionDataGrid";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import {
    useGetProductList,
    useRetrieveProductsByBrand,
    useRetrieveProductsByTypeAndWarehouseFilter,
} from "../../product/core/_hooks";
import { columnsModalProduct, columnsSelectProduct } from "../helpers/columns";
import { sliceNumberPriceRial } from "../../../../_cloner/helpers/sliceNumberPrice";
import { calculateTotalAmount } from "../helpers/functions";
import { useGetUnits } from "../../generic/productUnit/_hooks";
import { IOrderService } from "../core/_models";
import TabProducts from "../../../../_cloner/components/TabProducts";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";

const ProductSelectedListInModal = (props: {
    products: IProducts[];
    productLoading: boolean;
    productError: boolean;
    setFieldValue: any;
    setOrders?: any;
    setOrderPayment?: any;
    orders?: any;
    orderService?: IOrderService[];
    setSelectedProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { data: productsByBrand } = useRetrieveProductsByBrand();
    // const filterTools = useRetrieveProductsByTypeAndWarehouseFilter();
    const filterTools = useGetProductList();

    const { data: units } = useGetUnits();

    const [results, setResults] = useState<IProducts[]>([]);
    const [filteredTabs, setFilteredTabs] = useState<any>([]);
    const [selectedTab, setSelectedTab] = useState<number>(-1);
    const [tabResult, setTabResult] = useState<any>([]);
    const [subUnit, setSubUnit] = useState<{ [key: string]: string }>({});
    const [selectionModel, setSelectionModel] = useState<any>({});
    const [selectedProduct, setSelectedProduct] = useState<any[]>([]);
    const [proximateAmounts, setProximateAmounts] = useState<{
        [key: string]: string;
    }>({});
    const [proximateSubAmounts, setProximateSubAmounts] = useState<{
        [key: string]: string;
    }>({});
    const [price, setPrice] = useState<{ [key: string]: string }>(
        {}
    );

    useEffect(() => {
        const filter = {
            ByBrand: true
        }
        filterTools.mutate(filter);
    }, []);

    const renderAction = (indexToDelete: any) => {
        return (
            <>
                <DeleteGridButton
                    onClick={() => {
                        if (selectedProduct) {
                            const updatedOrders = selectedProduct.filter(
                                (item: any) => item.id !== indexToDelete.id
                            );
                            setSelectedProduct(updatedOrders);
                        }
                    }}
                />
            </>
        );
    };

    const renderInput = (params: any) => {
        const productId = params.row.id;
        return (
            <>
                <OutlinedInput
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    value={proximateAmounts[productId] || ""}
                    onChange={(e: any) =>
                        handleInputValueChange(
                            productId,
                            e.target.value,
                            params.row.exchangeRate
                        )
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
    };
    const renderPrice = (params: any) => {
        const productId = params.row.id;
        return (
            <>
                <TextField
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    defaultValue={separateAmountWithCommas(
                        Number(price)
                    )}
                    value={price[productId]}
                    onChange={(e: any) =>
                        handleInputPriceChange(productId, e.target.value)
                    }
                    inputProps={{
                        "aria-label": "weight",
                        style: {
                            textAlign: "center",
                        },
                    }}
                />
            </>
        );
    };

    const handleSubUnitChange = (productId: string, value: string) => {
        setSubUnit({
            ...subUnit,
            [productId]: value,
        });
    };

    const renderSubUnit = (params: any) => {
        const productId = params.row.id;
        return (
            <Box component="div" className="flex gap-x-2">
                <OutlinedInput
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    value={proximateSubAmounts[productId] || ""}
                    onChange={(e: any) =>
                        handleInputSubUnitChange(productId, e.target.value)
                    }
                    inputProps={{
                        "aria-label": "weight",
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
                        value={subUnit[productId] || ""}
                        onChange={(e: any) =>
                            handleSubUnitChange(productId, e.target.value)
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
            </Box>
        );
    };

    const handleInputValueChange = (
        productId: string,
        value: string,
        exchangeRate: string
    ) => {
        setProximateAmounts({
            ...proximateAmounts,
            [productId]: value,
        });
        setProximateSubAmounts({
            ...proximateSubAmounts,
            [productId]: Math.ceil(
                Number(value) / Number(exchangeRate)
            ).toString(),
        });
    };

    const handleInputSubUnitChange = (productId: string, value: string) => {
        setProximateSubAmounts({
            ...proximateSubAmounts,
            [productId]: value,
        });
    };

    const handleInputPriceChange = (productId: string, value: string) => {
        const sanitizedValue = value.replace(/,/g, "");
        const numericValue = parseFloat(sanitizedValue);
        if (!isNaN(numericValue)) {
            const formattedValue = numericValue.toLocaleString("en-US");
            setPrice({
                ...price,
                [productId]: formattedValue,
            });
        } else {
            setPrice({
                ...price,
                [productId]: "",
            });
        }
    };

    const handleSelectionChange: any = (newSelectionModel: any) => {
        const selectedRow = newSelectionModel.row;
        const selectedRowData = {
            ...newSelectionModel.row,
            mainUnit: props.products?.find(
                (i: IProducts) => i.id === selectedRow.id
            )?.productMainUnitDesc,
            subUnit: props.products?.find(
                (i: IProducts) => i.id === selectedRow.id
            )?.productSubUnitDesc,
        };
        setPrice(newSelectionModel.row.productPrice);
        setSubUnit({
            ...subUnit,
            [selectedRow.id]: newSelectionModel.row.productSubUnitId,
        });

        const isDuplicate = selectedProduct.some((item) => {
            return item.id === selectedRow.id;
        });
        if (!isDuplicate) {
            setSelectionModel(newSelectionModel);
            setSelectedProduct([...selectedProduct, selectedRowData]);
        } else {
            alert("کالا قبلا به لیست کالا های انتخاب شده اضافه شده است");
        }
    };

    const handleSubmitSelectedProduct = () => {
        const selectedProductWithAmounts = selectedProduct.map((product) => ({
            id: product.id,
            productId: product.id,
            warehouseId: product.warehouseId,
            productBrandId: product.productBrandId,
            productName: product.productName,
            productBrandName: product.productBrandName,
            warehouseName: product.warehouseName,
            productDesc: product?.productDesc ? product?.productDesc : "",
            purchasePrice: product?.purchasePrice ? product?.purchasePrice : "",
            purchaseSettlementDate: product.purchaseSettlementDate
                ? product.purchaseSettlementDate
                : "",
            purchaseInvoiceTypeId: product?.purchaseInvoiceTypeId
                ? Number(product?.purchaseInvoiceTypeId)
                : 0,
            purchaseInvoiceTypeDesc: "",
            sellerCompanyRow: product.sellerCompanyRow
                ? product.sellerCompanyRow
                : "string",
            purchaserCustomerId: "",
            purchaserCustomerName: "",
            mainUnit: product.mainUnit,
            subUnit: subUnit[product.id]
                ? units.find((i: any) => i.id === subUnit[product.id]).unitName
                : product.subUnit,
            productSubUnitId: subUnit[product.id]
                ? units.find((i: any) => i.id === subUnit[product.id]).id
                : product.subUnit,
            rowId: product?.rowId ? product?.rowId : 0,
            proximateAmount: proximateAmounts[product.id] || "",
            warehouseTypeId: 0,
            price: price[product.id]
                ? price[product.id]
                : separateAmountWithCommas(product.productPrice),
            proximateSubUnit:
                proximateSubAmounts[product.id] === undefined
                    ? 0
                    : proximateSubAmounts[product.id],
        }));

        const duplicatesExist = selectedProductWithAmounts.some((newProduct) =>
            props.orders.some(
                (existingProduct: any) =>
                    existingProduct.id === newProduct.id &&
                    existingProduct.warehouseId === newProduct.warehouseId &&
                    existingProduct.productBrandId === newProduct.productBrandId
            )
        );
        if (!duplicatesExist) {
            const updatedOrders = [
                ...props.orders,
                ...selectedProductWithAmounts,
            ];

            props.setOrders(updatedOrders);
            props.setOrderPayment([])
            props.setFieldValue(
                "amount",
                sliceNumberPriceRial(
                    calculateTotalAmount(updatedOrders, props.orderService)
                )
            );
            props.setSelectedProductOpen(false);
        } else {
            alert("برخی از کالا ها در لیست سفارشات موجود می باشد");
        }
    };

    useEffect(() => {
        const filtered = productsByBrand?.data.filter(
            (item: any) => item.productTypeId === selectedTab
        );
        setFilteredTabs(selectedTab === -1 ? productsByBrand?.data : filtered);
        setResults(selectedTab === -1 ? productsByBrand?.data : filtered);
    }, [selectedTab]);

    const onSelectTab = (id: any) => setSelectedTab(id);


    const onFilterProductByWarehouse = (value: any) => {
        if (value === "-1") {
            setResults(filteredTabs)
            setTabResult(filteredTabs)
        } else {
            const filter = {
                ByBrand: true,
                WarehouseId: +value
            }
            filterTools.mutate(filter, {
                onSuccess: (res) => {
                    setResults(res?.data)
                    setTabResult(res?.data)
                }
            });
        }
    };


    if (props.productLoading) {
        return <Typography>درحال بارگزاری ...</Typography>;
    }

    return (
        <>

            <Box component="div" className="w-full">
                <TabProducts
                    handleSelectionChange={handleSelectionChange}
                    productsByBrand={productsByBrand}
                    onSelectTab={onSelectTab}
                    onFilterProductByWarehouse={onFilterProductByWarehouse}
                    results={results}
                    setResults={setResults}
                    selectedTab={selectedTab}
                    tabResult={tabResult}
                />
            </Box>
            <Box component="div" className="md:grid md:grid-cols-2 gap-x-8">
                <Box component="div">
                    <MuiDataGrid
                        onDoubleClick={handleSelectionChange}
                        columns={columnsModalProduct()}
                        // getRowId={(row: {id: string, productBrandName: string, warehouseName: string}) => row.id+row.productBrandName+row.warehouseName}
                        rows={results}
                        data={filteredTabs}
                    />
                </Box>
                <Box component="div">
                    <MuiSelectionDataGrid
                        selectionModel={selectionModel}
                        columns={columnsSelectProduct(
                            renderAction,
                            renderInput,
                            renderSubUnit,
                            renderPrice
                        )}
                        rows={selectedProduct}
                        data={selectedProduct}
                        hideFooter={true}
                        columnHeaderHeight={40}
                    />
                    <Box
                        component="div"
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
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProductSelectedListInModal;
