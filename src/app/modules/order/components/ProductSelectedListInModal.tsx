import React, { useEffect, useState } from "react";
import { IProducts } from "../../product/core/_models";
import { Box, Button, OutlinedInput, Typography,FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiSelectionDataGrid from "../../../../_cloner/components/MuiSelectionDataGrid";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import { useRetrieveProductsByBrand } from "../../product/core/_hooks";
import { columnsModalProduct, columnsSelectProduct } from "../helpers/columns";
import { sliceNumberPriceRial } from "../../../../_cloner/helpers/sliceNumberPrice";
import { calculateTotalAmount } from "../helpers/functions";
import { useGetUnits } from "../../generic/productUnit/_hooks";

const ProductSelectedListInModal = (props: {
    products: IProducts[];
    productLoading: boolean;
    productError: boolean;
    setFieldValue: any;
    setOrders?: any;
    orders?: any;
    setSelectedProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { data: productsByBrand } = useRetrieveProductsByBrand();
    const { data: units } = useGetUnits()

    const [results, setResults] = useState<IProducts[]>([]);
    const [subUnit, setSubUnit] =  useState<{
        [key: string]: string;
    }>({});
    const [selectionModel, setSelectionModel] = useState<any>({});
    const [selectedProduct, setSelectedProduct] = useState<any[]>([]);
    const [proximateAmounts, setProximateAmounts] = useState<{
        [key: string]: string;
    }>({});
    const [productPrice, setProductPrice] = useState<{[key: string]: string}>({});

    useEffect(() => {
        if (productsByBrand?.data) setResults(productsByBrand?.data);
    }, [productsByBrand?.data]);

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
                        handleInputValueChange(productId, e.target.value)
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
    const renderPrice = (params: any) => {
        const productId = params.row.id;
        return (
            <>
                <TextField
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    defaultValue={separateAmountWithCommas(Number(productPrice))}
                    value={productPrice[productId]}
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

    const handleSubUnitChange  = (productId: string, value: string) => {
        setSubUnit({
            ...subUnit,
            [productId]: value,
        });
    }

    const renderSubUnit = (params: any) => {
        const productId = params.row.id;
        return (
            <Box component="div" className="flex gap-x-2">
                <OutlinedInput
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    value={proximateAmounts[productId] || ""}
                    onChange={(e: any) =>
                        handleInputValueChange(productId, e.target.value)
                    }
                    inputProps={{
                        "aria-label": "weight",
                        style: {
                            textAlign: "center",
                            width: 28
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
                                width: 28
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

    const handleInputValueChange = (productId: string, value: string) => {
        setProximateAmounts({
            ...proximateAmounts,
            [productId]: value,
        });
    };
    const handleInputPriceChange = (productId: string, value: string) => {
        setProductPrice({
            ...productPrice,
            [productId]: value,
            // [productId]: value,
        });
    };

    console.log("productPrice", productPrice)



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
        setProductPrice(newSelectionModel.row.productPrice)

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
            warehouseId: product.warehouseId,
            productBrandId: product.productBrandId,
            productName: product.productName,
            productBrandName: product.productBrandName,
            warehouseName: product.warehouseName,
            productDesc: product?.productDesc ? product?.productDesc : "",
            buyPrice: product?.buyPrice ? product?.buyPrice : "",
            purchaseSettlementDate: product.purchaseSettlementDate
                ? product.purchaseSettlementDate
                : "",
            purchaseInvoiceTypeId: product?.purchaseInvoiceTypeId
                ? Number(product?.purchaseInvoiceTypeId)
                : 0,
            purchaseInvoiceTypeName: "",
            sellerCompanyRow: product.sellerCompanyRow
                ? product.sellerCompanyRow
                : "string",
            purchaserCustomerId: "",
            purchaserCustomerName: "",
            mainUnit: product.mainUnit,
            subUnit: product.subUnit,
            rowId: product?.rowId ? product?.rowId : 0,
            proximateAmount: proximateAmounts[product.id] || "",
            warehouseTypeId: 0,
            productPrice: separateAmountWithCommas(product.productPrice),
            proximateSubUnit: Math.ceil(
                Number(proximateAmounts[product.id]) /
                    Number(product.exchangeRate)
            ),
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
            props.setFieldValue(
                "amount",
                sliceNumberPriceRial(calculateTotalAmount(updatedOrders))
            );
            props.setSelectedProductOpen(false);
        } else {
            alert("برخی از کالا ها در لیست سفارشات موجود می باشد");
        }
    };

    if (props.productLoading) {
        return <Typography>Loading ...</Typography>;
    }

    return (
        <Box component="div" className="md:grid md:grid-cols-2 gap-x-8">
            <Box component="div">
                <Box component="div" className="w-80 md:w-[40%]">
                    <FuzzySearch
                        keys={[
                            "productName",
                            "productIntegratedName",
                            "approximateWeight",
                        ]}
                        data={productsByBrand?.data}
                        threshold={0.5}
                        setResults={setResults}
                    />
                </Box>
                <MuiDataGrid
                    onDoubleClick={handleSelectionChange}
                    columns={columnsModalProduct(renderAction)}
                    rows={results}
                    data={productsByBrand?.data}
                />
            </Box>
            <Box component="div" className="mt-4">
                <Typography variant="h2" color="primary">
                    کالاهای انتخاب شده
                </Typography>
                <MuiSelectionDataGrid
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    columns={columnsSelectProduct(
                        renderAction,
                        renderInput,
                        renderSubUnit,
                        renderPrice
                    )}
                    rows={selectedProduct}
                    data={selectedProduct}
                    pagination={false}
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
    );
};

export default ProductSelectedListInModal;
