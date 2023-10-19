import React, { useEffect, useState } from "react";
import { IProducts } from "../../product/core/_models";
import { columnsSelectProduct } from "../helpers/productColumns";
import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiSelectionDataGrid from "../../../../_cloner/components/MuiSelectionDataGrid";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";

const ProductSelectedListInModal = (props: {
    products: IProducts[];
    productLoading: boolean;
    productError: boolean;
    setFieldValue: any;
    setOrders?: any;
    orders?: any;
    setSelectedProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectProductFromModal: any;
}) => {
    const [results, setResults] = useState<IProducts[]>([]);
    const [selectionModel, setSelectionModel] = useState<any>({});
    const [selectedProduct, setSelectedProduct] = useState<any[]>([]);
    const [proximateAmounts, setProximateAmounts] = useState<{
        [key: string]: string;
    }>({});

    useEffect(() => {
        if (props.products) setResults(props.products);
    }, [props.products]);

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
                    }}
                />
            </>
        );
    };

    const handleInputValueChange = (productId: string, value: string) => {
        setProximateAmounts({
            ...proximateAmounts,
            [productId]: value,
        });
    };

    const handleSelectionChange: any = (newSelectionModel: any) => {
        const selectedRow = newSelectionModel.row;
        const isDuplicate = selectedProduct.some((item) => {
            return item.id === selectedRow.id;
        });
        if (!isDuplicate) {
            setSelectionModel(newSelectionModel);
            setSelectedProduct([...selectedProduct, newSelectionModel.row]);
        } else {
            alert("کالا قبلا به لیست کالا های انتخاب شده اضافه شده است");
        }
    };

    const handleSubmitSelectedProduct = () => {
        const selectedProductWithAmounts = selectedProduct.map((product) => ({
            ...product,
            proximateAmount: proximateAmounts[product.id] || "",
            productPrice: separateAmountWithCommas(product.productPrice),
            warehouseName:
                product.productInventories[
                    product.productInventories.length - 1
                ]?.warehouseName || "",
            warehouseId:
                product.productInventories[
                    product.productInventories.length - 1
                ]?.warehouseId || "",
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
            props.setSelectedProductOpen(false);
        } else {
            alert("برخی از کالا ها در لیست سفارشات موجود می باشد");
        }
    };
    const columns = (renderAction: any) => {
        const col = [
            // { field: 'productIntegratedName',  headerName: 'شرح کالا', headerClassName: "headerClassName" },
            {
                field: "productName",
                headerName: "کالا",
                headerClassName: "headerClassName",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },

                width: 140,
            },
            {
                field: "brandName",
                valueGetter: (params: any) =>
                    params.row.productPrices[
                        params.row.productPrices.length - 1
                    ]?.brandName,
                width: 80,
                headerName: "برند",
                headerClassName: "headerClassName",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
            },
            {
                field: "warehouseName",
                valueGetter: (params: any) =>
                    params.row.productInventories[
                        params.row.productInventories.length - 1
                    ]?.warehouseName,
                width: 80,
                headerName: "انبار",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },

                headerClassName: "headerClassName",
            },
            {
                field: "approximateInventory",
                valueGetter: (params: any) =>
                    params.row.productInventories[
                        params.row.productInventories.length - 1
                    ]?.approximateInventory,
                width: 60,
                headerName: "موجودی",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },

                headerClassName: "headerClassName",
            },
            {
                field: "productMainUnitDesc",
                width: 80,
                headerName: "واحد اصلی",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },

                headerClassName: "headerClassName",
            },
            {
                field: "price",
                valueGetter: (params: any) =>
                    params.row.productPrices[
                        params.row.productPrices.length - 1
                    ]?.price,
                minWidth: 60,
                headerName: "قیمت",
                flex: 1,
                renderCell: (value: any) =>
                    separateAmountWithCommas(value.row.productPrice),
                headerClassName: "headerClassName",
            },
        ];
        return col;
    };

    const columnsSelectProduct = (renderAction: any, renderInput: any) => {
        const col = [
            {
                field: "productName",
                headerName: "کالا",
                headerClassName: "headerClassName",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },

                width: 100,
            },
            {
                field: "thickness",
                minWidth: 160,
                headerName: "مقدار",
                renderCell: renderInput,
                headerAlign: "center",
                headerClassName: "headerClassName",
            },
            {
                field: "brand",
                width: 80,
                valueGetter: (params: any) =>
                    params.row.productPrices[
                        params.row.productPrices.length - 1
                    ]?.brandName,
                headerName: "برند",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },

                headerClassName: "headerClassName",
            },
            {
                field: "warehouseName",
                valueGetter: (params: any) =>
                    params.row.productInventories[
                        params.row.productInventories[0]
                    ]?.warehouseName,
                width: 80,
                headerName: "انبار",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },

                headerClassName: "headerClassName",
            },
            {
                field: "productMainUnitDesc",
                width: 80,
                headerName: "واحد اصلی",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },

                headerClassName: "headerClassName",
            },
            {
                field: "Action",
                minWidth: 60,
                renderCell: renderAction,
                headerName: "حذف",
                flex: 1,
                headerClassName: "headerClassName",
            },
        ];
        return col;
    };

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
                        data={props.products}
                        threshold={0.5}
                        setResults={setResults}
                    />
                </Box>
                <MuiSelectionDataGrid
                    onRowDoubleClick={handleSelectionChange}
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    columns={columns(renderAction)}
                    rows={results}
                    data={props.products}
                    pagination={false}
                    hideFooter={true}
                    columnHeaderHeight={40}
                />
            </Box>
            <Box component="div" className="mt-4">
                <Typography variant="h2" color="secondary">
                    کالاهای انتخاب شده
                </Typography>
                <MuiSelectionDataGrid
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    columns={columnsSelectProduct(renderAction, renderInput)}
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
