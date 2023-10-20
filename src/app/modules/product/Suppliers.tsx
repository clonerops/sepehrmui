import React from "react";
import { useState, useEffect } from "react";
import { ISuppliers } from "./core/_models";
import { useDeleteSupplier, useRetrieveSuppliers } from "./core/_hooks";
import CreateSupplier from "./components/CreateSupplier";
import EditSupplier from "./components/EditSupplier";
import { columns } from "./helpers/supplierColumns";
import Backdrop from "../../../_cloner/components/Backdrop";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import EditGridButton from "../../../_cloner/components/EditGridButton";
import DeleteGridButton from "../../../_cloner/components/DeleteGridButton";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";

const Suppliers = () => {
    const {
        data: suppliers,
        isLoading: suppliersLoading,
        refetch,
    } = useRetrieveSuppliers();
    const {
        mutate,
        data: deleteData,
        isLoading: deleteLoading,
    } = useDeleteSupplier();
    const [results, setResults] = useState<ISuppliers[]>([]);

    useEffect(() => {
        setResults(suppliers?.data);
    }, [suppliers?.data]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<ISuppliers>();
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const handleEdit = (item: ISuppliers) => {
        setIsEditOpen(true);
        setItemForEdit(item);
    };
    const handleDelete = (id: string | undefined) => {
        if (id)
            mutate(id, {
                onSuccess: (message) => {
                    setSnackeOpen(true);
                    refetch();
                },
            });
    };

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "customerFirstName",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "نام",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "customerLastName",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "نام خانوادگی",
                headerClassName: "headerClassName",
                minWidth: 130,
                flex: 1
            },
            {
                field: "productName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "کالا",
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1
            },
            {
                field: "price",
                renderCell: (params: any) => {
                    return (
                        <Typography variant="h4" className="bg-indigo-600 p-1 rounded-md text-white">
                            {separateAmountWithCommas(params.value) + "تومان"}
                        </Typography>
                    );
                },
                headerName: "قیمت",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "rentAmount",
                renderCell: (params: any) => {
                    return (
                        <Typography variant="h4" className="bg-yellow-600 p-1 rounded-md text-white">
                            {separateAmountWithCommas(params.value) + "تومان"}
                        </Typography>
                    );
                },
                headerName: "کرایه",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "overPrice",
                renderCell: (params: any) => {
                    return (
                        <Typography variant="h4" className="bg-sky-600 p-1 rounded-md text-white">
                            {separateAmountWithCommas(params.value) + "تومان"}
                        </Typography>
                    );
                },
                headerName: "قیمت تمام شده",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "priceDate",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "تاریخ قیمت",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "rate",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "امتیاز",
                headerClassName: "headerClassName",
                maxWidth: 60,
                flex: 1
            },
            {
                headerName: "عملیات",
                renderCell: renderAction,
                flex: 1,
                headerClassName: "headerClassName",
                minWidth: 100,
            },
        ];
        return col;
    };

    const renderAction = (item: any) => {
        return (
            <Box component="div" className="flex gap-4">
                <EditGridButton onClick={() => handleEdit(item?.row)} />
                <DeleteGridButton onClick={() => handleDelete(item?.row?.id)} />
            </Box>
        );
    };

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {suppliersLoading && <Backdrop loading={suppliersLoading} />}
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
            <Card className="p-8" elevation={8}>
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2"
                >
                    <Box component="div" className="w-auto md:w-[40%] mb-4">
                        <FuzzySearch
                            keys={[
                                "customerFirstName",
                                "customerLastName",
                                "productName",
                                "price",
                                "rentAmount",
                                "overPrice",
                                "priceDatepriceDate",
                                "rate",
                            ]}
                            data={suppliers?.data}
                            threshold={0.5}
                            setResults={setResults}
                        />
                    </Box>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        variant="contained"
                        color="secondary"
                    >
                        <Typography variant="h4">ایجاد تامین کننده</Typography>
                    </Button>
                </Box>
                <MuiDataGrid
                    columns={columns(renderAction)}
                    rows={results}
                    data={suppliers?.data}
                />
            </Card>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد تامین کننده جدید"
            >
                <CreateSupplier
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش تامین کننده جدید"
            >
                <EditSupplier refetch={refetch} item={itemForEdit} />
            </TransitionsModal>
        </>
    );
};

export default Suppliers;
