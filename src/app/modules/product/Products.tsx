import React from "react";
import { useState, useEffect } from "react";
import { IProducts } from "./core/_models";
import { useDisableProduct, useRetrieveProducts } from "./core/_hooks";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import { columns } from "./helpers/productColumns";
import EditGridButton from "../../../_cloner/components/EditGridButton";
// import DeleteGridButton from "../../../_cloner/components/DeleteGridButton";
import { Box, Button, Card, Typography } from "@mui/material";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import Backdrop from "../../../_cloner/components/Backdrop";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";

const Products = () => {
    const {
        data: products,
        isLoading: productsLoading,
        refetch,
    } = useRetrieveProducts();
    const {
        mutate,
        data: deleteData,
        isLoading: deleteLoading,
    } = useDisableProduct();
    const [results, setResults] = useState<IProducts[]>([]);

    useEffect(() => {
        setResults(products?.data);
    }, [products]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IProducts>();
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "productCode",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "کد کالا",
                cellClassName: "font-bold",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 80,
            },
            {
                field: "productName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام کالا",
                cellClassName: "!bg-green-100 font-bold",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 160,
            },
            {
                field: "productTypeDesc",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "نوع کالا",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 120,
            },
            {
                field: "productSize",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "سایز",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 80,
            },
            {
                field: "productThickness",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "ضخامت",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 80,
            },
            {
                field: "approximateWeight",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "وزن",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 80,
            },
            {
                field: "numberInPackage",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "تعداد در بسته",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 100,
            },
            {
                field: "productStandardDesc",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "استاندارد",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 80,
            },
            {
                field: "productStateDesc",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "حالت",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 80,
            },
            {
                field: "productMainUnitDesc",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "واحد اصلی",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 80,
            },
            {
                field: "productSubUnitDesc",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "واحد فرعی",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 80,
            },
            {
                field: "maxInventory",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "حداکثر موجودی",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 90,
            },
            {
                field: "minInventory",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "حداقل موجودی",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 90,
            },
            {
                field: "inventotyCriticalPoint",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "نقطه بحرانی",
                headerClassName: "!bg-[#E2E8F0] text-black font-bold",
                width: 90,
            },
            {
                headerName: "عملیات",
                flex: 1,
                renderCell: renderAction,
                headerClassName: "!bg-[#E2E8F0] text-black font-bold !w-full",
                minWidth: 160,
            },
        ];
        return col;
    };

    const handleEdit = (item: IProducts) => {
        setIsEditOpen(true);
        setItemForEdit(item);
    };
    // const handleDelete = (id: string | undefined) => {
    //     if (id) mutate(id, {
    //         onSuccess: (message) => {
    //            setSnackeOpen(true)
    //             refetch()
    //         }
    //     });
    // };

    const renderAction = (item: any) => {
        return (
            <Box component="div" className="flex gap-4">
                <EditGridButton onClick={() => handleEdit(item?.row)} />
                {/* <DeleteGridButton onClick={() => handleDelete(item?.row?.id)} /> */}
            </Box>
        );
    };

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {productsLoading && <Backdrop loading={productsLoading} />}
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        deleteData?.data?.Message ||
                        deleteData?.message ||
                        "حذف با موفقیت انجام شد"
                    }
                />
            )}
            <Card className="p-8">
                {/* <Box component="div" className="md:grid md:grid-cols-4 md:gap-x-4">
                    <Box component="div" className="col-span-3"> */}
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2"
                >
                    <Box component="div" className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={[
                                "productCode",
                                "productName",
                                "productDetail.size",
                                "productDetail.productIntegratedName",
                                "approximateWeight",
                                "numberInPackage",
                                "productDetail.standard",
                                "productDetail.productState",
                                "description",
                            ]}
                            data={products?.data}
                            threshold={0.5}
                            setResults={setResults}
                        />
                    </Box>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        variant="contained"
                        color="secondary"
                    >
                        <Typography>ایجاد کالا</Typography>
                    </Button>
                </Box>
                <MuiDataGrid
                    columns={columns(renderAction)}
                    rows={results}
                    data={products?.data}
                />
                {/* </Box> */}
                {/* <Box component="div">
                        <Box
                            component="div"
                            className="hidden md:flex md:justify-center md:items-center"
                        >
                            <Box component="img"
                                src={toAbsoulteUrl("/media/logos/176.jpg")}
                            />
                        </Box>

                    </Box> */}
                {/* </Box> */}
            </Card>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد محصول جدید"
                width="80%"
            >
                <CreateProduct
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش محصول جدید"
                width="80%"
            >
                <EditProduct refetch={refetch} item={itemForEdit} />
            </TransitionsModal>
        </>
    );
};

export default Products;
