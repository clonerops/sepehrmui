import React, { useEffect, useState } from "react";
import { IProducts } from "../../product/core/_models";
import { columnsSelectProduct } from "../helpers/productColumns";
import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiSelectionDataGrid from "../../../../_cloner/components/MuiSelectionDataGrid";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import { useRetrieveProductsByBrand } from "../../product/core/_hooks";

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
    const {
        data: productsByBrand,
        isLoading: productByBrandLoading,
        isError: productByBrandError,
    } = useRetrieveProductsByBrand();

    const [results, setResults] = useState<IProducts[]>([]);
    const [selectionModel, setSelectionModel] = useState<any>({});
    const [selectedProduct, setSelectedProduct] = useState<any[]>([]);
    const [proximateAmounts, setProximateAmounts] = useState<{
        [key: string]: string;
    }>({});

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
        const selectedRowData = {
            ...newSelectionModel.row,
            mainUnit: props.products?.find((i: IProducts) =>i.id === selectedRow.id)?.productMainUnitDesc,
            subUnit: props.products?.find((i: IProducts) =>i.id === selectedRow.id)?.productSubUnitDesc
        }
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
            ...product,
            proximateAmount: proximateAmounts[product.id] || "",
            productPrice: separateAmountWithCommas(product.productPrice),
            mainUnit: product.mainUnit,
            subUnit: product.subUnit,
            proximateSubUnit: product.productPrice / product.exchangeRate
            // warehouseName:
            //     product.productInventories[
            //         product.productInventories.length - 1
            //     ]?.warehouseName || "",
            // warehouseId:
            //     product.productInventories[
            //         product.productInventories.length - 1
            //     ]?.warehouseId || "",
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
                field: "productBrandName",
                width: 80,
                headerName: "برند",
                headerClassName: "headerClassName",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
            },
            {
                field: "warehouseName",

                width: 80,
                headerName: "انبار",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },

                headerClassName: "headerClassName",
            },
            {
                field: "inventory",
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
                field: "productPrice",
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
                field: "productBrandName",
                width: 80,
                headerName: "برند",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },

                headerClassName: "headerClassName",
            },
            {
                field: "warehouseName",
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


    if(props.productLoading) {
        return <Typography>Loading ...</Typography>
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
                    columns={columns(renderAction)}
                    rows={results}
                    data={productsByBrand?.data}
                    // pagination={false}
                    // hideFooter={true}
                    // columnHeaderHeight={40}
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
