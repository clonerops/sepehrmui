import React, { useEffect, useState } from "react";
import { Box, Button, OutlinedInput, Typography, FormControl, MenuItem, TextField, Select } from "@mui/material";

import MuiSelectionDataGrid from "../../../../_cloner/components/MuiSelectionDataGrid";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import TabProducts from "../../../../_cloner/components/TabProducts";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";

import { IProducts } from "../../product/core/_models";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import {useGetProductList} from "../../product/core/_hooks";
import { columnsModalProduct, columnsSelectProduct } from "../helpers/columns";
import { sliceNumberPriceRial } from "../../../../_cloner/helpers/sliceNumberPrice";
import { calculateTotalAmount } from "../helpers/functions";
import { useGetUnits } from "../../generic/productUnit/_hooks";
import { IOrderService } from "../core/_models";
import MaskInput from "../../../../_cloner/components/MaskInput";
import { AnyCnameRecord } from "dns";
import { validateAndEnqueueSnackbar } from "../sales-order/functions";

const ProductsList = (props: {
    products: IProducts[];
    productLoading: boolean;
    productError: boolean;
    setFieldValue: any;
    setOrders?: any;
    setOrderPayment?: any;
    orders?: any;
    orderService?: IOrderService[];
    setState: React.Dispatch<React.SetStateAction<{
        isBuy: boolean;
        orderIndex: number;
        isUpdate: boolean;
        isProductChoose: boolean;
    }>>}) => {
    const filterTools = useGetProductList();

    const { data: units } = useGetUnits();

    const [results, setResults] = useState<IProducts[]>([]);

    const [productData, setProductData] = useState<{
        productSubUnitDesc: { [key: string]: string };
        proximateAmounts: { [key: string]: string };
        proximateSubAmounts: { [key: string]: string };
        price: { [key: string]: string };

        selectedProduct: any[];
        selectionModel: any;
        tabResult: any[];
        selectedTab: number;
        filteredTabs: any[]
      }>({
        productSubUnitDesc: {},
        proximateAmounts: {},
        proximateSubAmounts: {},
        price: {},

        selectedProduct: [],
        selectionModel: {},
        tabResult: [],
        selectedTab: -1,
        filteredTabs: []
      });

    const renderAction = (indexToDelete: any) => {
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
    };

    const renderInput = (params: any) => {
        const productId = params.row.id;
        return (
            <>
                <OutlinedInput
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    value={productData.proximateAmounts[productId] || ""}
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
                <MaskInput
                    label=""
                    mask={Number}
                    onAccept={(value: any) => handleInputPrice(value, productId)}
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
    };

    const handleSubUnitChange = (productId: string, value: string) => {
        setProductData((prevState) => ({
            ...prevState, 
            productSubUnitDesc: { ...prevState.productSubUnitDesc, [productId]: value },
        }))
    };

    const renderSubUnit = (params: any) => {
        const productId = params.row.id;
        return (
            <Box component="div" className="flex gap-x-2">
                <OutlinedInput
                    id={`outlined-adornment-weight-${productId}`}
                    size="small"
                    value={productData.proximateSubAmounts[productId] || ""}
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
                        value={productData.productSubUnitDesc[productId] || ""}
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
        setProductData((prevState) => ({
            ...prevState, 
            proximateAmounts: { ...prevState.proximateAmounts, [productId]: value },
            proximateSubAmounts: { ...prevState.proximateAmounts, [productId]: Math.ceil(Number(value) / Number(exchangeRate)).toString() },
        }))
    };

    const handleInputSubUnitChange = (productId: string, value: string) => {
        setProductData((prevState) => ({
            ...prevState, 
            proximateSubAmounts: { ...prevState.proximateAmounts, [productId]: value},
        }))
    };

    const handleInputPrice = (value: any, productId: string, ) => {
        setProductData((prevState) => ({
            ...prevState, 
            price: { ...prevState.price, [productId]: value },
        }))
    }

    const handleSelectionChange = (newSelectionModel: any) => {
        const selectedRow = newSelectionModel.row;
        setProductData((prevState) => ({
            ...prevState, 
            productSubUnitDesc: { ...prevState.productSubUnitDesc, [selectedRow.id]: newSelectionModel.row.productSubUnitId },
            price: productData.price
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
    };

    const handleSubmitSelectedProduct = () => {
        console.log("productData.selectedProduct", productData.selectedProduct)
        const selectedProductWithAmounts = productData.selectedProduct.map((product) => {
          const {
            id,
            warehouseId,
            productBrandId,
            productName,
            exchangeRate,
            productBrandName,
            warehouseName,
            productDesc = "",
            purchasePrice = "",
            purchaseSettlementDate = "",
            purchaseInvoiceTypeId = 0,
            sellerCompanyRow = "string",
            productMainUnitDesc,
            productSubUnitDesc: productSubUnitId = product.subUnit,
            rowId = 0,
            proximateAmount = productData.proximateAmounts[product.id] || "",
            warehouseTypeId = 0,
          } = product;
      
          const productSubUnitDesc = productData.productSubUnitDesc[product.id]
            ? units.find((i: any) => i.id === productData.productSubUnitDesc[product.id]).unitName
            : product.productSubUnitDesc;
      
          const price = productData.price[product.id] ? productData.price[product.id].replace(/,/g, "") : ""
      
          const proximateSubUnit =
            productData.proximateSubAmounts[product.id] === undefined
              ? 0
              : productData.proximateSubAmounts[product.id];
      
          return {
            id,
            productId: id,
            warehouseId,
            productBrandId,
            productName,
            productBrandName,
            warehouseName,
            productDesc,
            purchasePrice,
            exchangeRate,
            purchaseSettlementDate,
            purchaseInvoiceTypeId: Number(purchaseInvoiceTypeId),
            purchaseInvoiceTypeDesc: "",
            sellerCompanyRow,
            purchaserCustomerId: "",
            purchaserCustomerName: "",
            productMainUnitDesc,
            productSubUnitDesc,
            productSubUnitId,
            rowId,
            proximateAmount,
            warehouseTypeId,
            price,
            proximateSubUnit,
          };
        });
      
        const duplicatesExist = selectedProductWithAmounts.some((newProduct) =>
          props.orders.some(
            (existingProduct: any) =>
              existingProduct.id === newProduct.id &&
              existingProduct.warehouseId === newProduct.warehouseId &&
              existingProduct.productBrandId === newProduct.productBrandId
          )
        );
        

        if (!duplicatesExist) {
          const updatedOrders = [...props.orders, ...selectedProductWithAmounts];
      
          props.setOrders(updatedOrders);
          props.setOrderPayment([]);
          props.setFieldValue(
            "amount",
            sliceNumberPriceRial(
              calculateTotalAmount(updatedOrders, props.orderService)
            )
          );
          props.setState((prev) => ({
            ...prev,
            isProductChoose: false,
          }));
        } else {
          alert("برخی از کالا ها در لیست سفارشات موجود می باشد");
        }
      };
      

    const onSelectTab = (id: number) => setProductData((prevState) => ({
        ...prevState, 
        selectedTab: id 
    }))


    const onFilterProductByWarehouse = (value: any) => {
        if (value === -1) {
            setProductData((prevState) => ({
                ...prevState, 
                tabResult: productData.filteredTabs 
            }))

            setResults(productData.filteredTabs)
        } else {
            const filter = {
                ByBrand: true,
                WarehouseId: +value
            }
            filterTools.mutate(filter, {
                onSuccess: (res) => {
                    setResults(res?.data)
                    setProductData((prevState) => ({
                        ...prevState, 
                        tabResult: res?.data 
                    }))        
                }
            });
        }
    };


    // useEffects
    useEffect(() => {
        const filter = { ByBrand: true }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                setResults(res?.data)
            }
        });
    }, []);


    useEffect(() => {
        const filtered = filterTools?.data?.data.filter((item: {productTypeId: number}) => item.productTypeId === productData.selectedTab);
        setProductData((prevState) => ({
            ...prevState, 
            filteredTabs: productData.selectedTab === -1 ? filterTools?.data?.data : filtered 
        }))        
        setResults(productData.selectedTab === -1 ? filterTools?.data?.data : filtered);

    }, [productData.selectedTab]);


    console.log(productData.price)

    if (props.productLoading) {
        return <Typography>Loading ...</Typography>;
    }

    return (
        <>

            <Box component="div" className="w-full">
                <TabProducts
                    handleSelectionChange={handleSelectionChange}
                    productsByBrand={filterTools?.data?.data}
                    onSelectTab={onSelectTab}
                    onFilterProductByWarehouse={onFilterProductByWarehouse}
                    results={results}
                    setResults={setResults}
                    selectedTab={productData.selectedTab}
                    tabResult={productData.tabResult}
                />
            </Box>
            <Box component="div" className="md:grid md:grid-cols-2 gap-x-8">
                <Box component="div">
                    <MuiDataGrid
                        onDoubleClick={handleSelectionChange}
                        columns={columnsModalProduct()}
                        rows={results}
                        data={productData.filteredTabs}
                    />
                </Box>
                <Box component="div">
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
                        getRowId={(row:{id: string}) => row.id.toString()}
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

export default ProductsList;
