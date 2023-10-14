import React, { useEffect, useState } from "react";
import { IProducts } from "../../product/core/_models";
import { columns, columnsSelectProduct } from "../helpers/productColumns";
import {
    Box,
    Button,
    Container,
    OutlinedInput,
    Typography,
} from "@mui/material";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiSelectionDataGrid from "../../../../_cloner/components/MuiSelectionDataGrid";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";

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
    const [proximateAmounts, setProximateAmounts] = useState<{ [key: string]: string }>({});
    const [warehouseName, setWarehouseName] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (props.products) setResults(props.products);
    }, [props.products]);

    const renderAction = () => {
        return (
            <>
                <DeleteGridButton
                    onClick={(index: number) => {
                        const cloneItems = [...selectedProduct];
                        cloneItems?.splice(index, 1);
                        setSelectedProduct(cloneItems);
                    }}
                    key="selectedProduct"
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
                    onChange={(e: any) => handleInputValueChange(productId, e.target.value)}
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
        setSelectionModel(newSelectionModel);
        setSelectedProduct([...selectedProduct, newSelectionModel.row]);
        // props.setFieldValue('productIntegratedName', newSelectionModel.row.productIntegratedName)
        // props.setSelectedProductOpen(false);
        // props.setSelectProductFromModal(newSelectionModel);
    };

    const handleSubmitSelectedProduct = () => {
        // Combine product data with input values
        const selectedProductWithAmounts = selectedProduct.map((product) => ({
            ...product,
            proximateAmount: proximateAmounts[product.id] || "",
            warehouseName: product.productInventories[product.productInventories.length - 1].warehouseName || "",
            warehouseId: product.productInventories[product.productInventories.length - 1].warehouseId || "",
        }));
        const updatedOrders = [...props.orders, ...selectedProductWithAmounts];
        props.setOrders(updatedOrders);
        props.setSelectedProductOpen(false);
    };

    return (
        <Box component="div" className="grid grid-cols-2 gap-x-8">
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
                    columns={columnsSelectProduct(
                        renderAction,
                        renderInput
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
