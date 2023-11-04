import React, { useEffect, useState } from "react";
import { IProducts } from "../../product/core/_models";
import {
    Box,
    Button,
    OutlinedInput,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    TextField,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiSelectionDataGrid from "../../../../_cloner/components/MuiSelectionDataGrid";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import {
    useRetrieveProductsByBrand,
    useRetrieveProductsByType,
    useRetrieveProductsByTypeAndWarehouseFilter,
} from "../../product/core/_hooks";
import { columnsModalProduct, columnsSelectProduct } from "../helpers/columns";
import { sliceNumberPriceRial } from "../../../../_cloner/helpers/sliceNumberPrice";
import { calculateTotalAmount } from "../helpers/functions";
import { useGetUnits } from "../../generic/productUnit/_hooks";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import ReusableTabComponent from "../../../../_cloner/components/ReusableTab";
import { useGetWarehouses } from "../../generic/_hooks";
import { IOrderService } from "../core/_models";
import TabProducts from "../../../../_cloner/components/TabProducts";
import ReusableTab from "../../../../_cloner/components/ReusableTab";

const ProductSelectedListInModal = (props: {
    products: IProducts[];
    productLoading: boolean;
    productError: boolean;
    setFieldValue: any;
    setOrders?: any;
    orders?: any;
    orderService?: IOrderService[];
    setSelectedProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { data: productsByType } = useRetrieveProductsByType();
    const { data: productsByBrand } = useRetrieveProductsByBrand();
    const filterTools = useRetrieveProductsByTypeAndWarehouseFilter();
    const { data: warehouses } = useGetWarehouses();

    const imageUrl = [
        { id: 1, url: "/media/product/border-design.png" },
        { id: 2, url: "/media/product/tubes.png" },
        { id: 3, url: "/media/product/beam.png" },
        { id: 4, url: "/media/product/steel.png" },
        { id: 5, url: "/media/product/tissue-roll.png" },
        { id: 6, url: "/media/product/conveyor-belt.png" },
        { id: 7, url: "/media/product/can.png" },
    ];

    const { data: units } = useGetUnits();

    const [results, setResults] = useState<IProducts[]>([]);
    const [resultsAll, setResultsAll] = useState<IProducts[]>([]);
    const [value, setValue] = useState(0);
    const [filteredData, setFilteredData] = useState<IProducts[]>([])

    // const [subUnit, setSubUnit] = useState<{ [key: string]: string }>({});
    const [subUnit, setSubUnit] = useState<{ [key: string]: string }>({});
    const [selectionModel, setSelectionModel] = useState<any>({});
    const [selectedProduct, setSelectedProduct] = useState<any[]>([]);
    const [proximateAmounts, setProximateAmounts] = useState<{
        [key: string]: string;
    }>({});
    const [proximateSubAmounts, setProximateSubAmounts] = useState<{
        [key: string]: string;
    }>({});
    const [productPrice, setProductPrice] = useState<{ [key: string]: string }>(
        {}
    );
    const [selectedWarehouse, setSelectedWarehouse] = useState<any>("");

    useEffect(() => {
        if (productsByBrand?.data) setResults(productsByBrand?.data);
    }, [productsByBrand?.data]);

    // useEffect(() => {
    //     if (filterTools?.data) {
    //         const initialResults = filterTools.data.data.map(
    //             (i: any) => i.products
    //         );
    //         setResults(initialResults);
    //     }
    // }, [filterTools?.data]);

    useEffect(() => {
        filterTools.mutate("");
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
                        Number(productPrice)
                    )}
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
            setProductPrice({
                ...productPrice,
                [productId]: formattedValue,
            });
        } else {
            setProductPrice({
                ...productPrice,
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
        setProductPrice(newSelectionModel.row.productPrice);
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
            subUnit: subUnit[product.id]
                ? units.find((i: any) => i.id === subUnit[product.id]).unitName
                : product.subUnit,
            rowId: product?.rowId ? product?.rowId : 0,
            proximateAmount: proximateAmounts[product.id] || "",
            warehouseTypeId: 0,
            productPrice: productPrice[product.id]
                ? productPrice[product.id]
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

    if (props.productLoading) {
        return <Typography>Loading ...</Typography>;
    }

    const onFilterProductByWarehouse = (e: SelectChangeEvent) => {
        setSelectedWarehouse(e.target.value);
        if (e.target.value) filterTools.mutate(e.target.value);
        else filterTools.mutate("");
    };

    const tabs = productsByType?.data?.map((i: any, index: number) => {
        const image: any = () => {
            switch (i.id) {
                case 1:
                    return imageUrl[0].url;
                case 2:
                    return imageUrl[1].url;
                case 3:
                    return imageUrl[2].url;
                case 4:
                    return imageUrl[3].url;
                case 5:
                    return imageUrl[4].url;
                case 6:
                    return imageUrl[5].url;
                case 7:
                    return imageUrl[6].url;

                default:
                    break;
            }
        };
        return {
            label: (
                <Box component="div" className="flex gap-x-2">
                    <Box
                        component="img"
                        src={toAbsoulteUrl(image()?.toString())}
                        width={16}
                    />
                    <Typography variant="h5">{i.desc}</Typography>
                </Box>
            ),
            content: (
                <Box>
                    <Box
                        component="div"
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-2"
                    >
                        <FuzzySearch
                            keys={["productName"]}
                            data={i.products}
                            threshold={0.5}
                            setResults={(newResults: any) => {
                                const updatedResults = [...results];
                                updatedResults[index] = newResults;
                                setResults(updatedResults);
                            }}
                        />
                        {/* <FormControl size="small">
                            <InputLabel id="demo-simple-select-label">انبار</InputLabel>
                            <Select label="انبار" labelId="demo-simple-select-label" size="small" value={selectedWarehouse} onChange={onFilterProductByWarehouse}>
                                {warehouses.map((i: any) => {
                                return <MenuItem value={i.id}>{i.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl> */}
                    </Box>
                    <MuiDataGrid
                        onDoubleClick={handleSelectionChange}
                        columns={columnsModalProduct()}
                        rows={results[index]}
                        data={filterTools?.data?.data}
                    />

                    {/* <MuiDataGrid
                        columns={columnsProductPriceDashboard(renderAction)}
                        rows={results[index]}
                        data={i.products}
                    /> */}
                </Box>
            ),
        };
    });

    return (
        <Box component="div" className="md:grid md:grid-cols-2 gap-x-8">
            <Box component="div">
                <TabProducts
                    handleSelectionChange={handleSelectionChange}
                    productsByBrand={productsByBrand}
                    results={results}
                    setResults={setResults}
                />
                {/* <ReusableTab tabs={tabs} /> */}
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
