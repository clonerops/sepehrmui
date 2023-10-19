import { useEffect, useState } from "react";
import { useDeleteCustomer, useGetCustomers } from "./core/_hooks";
import { ICustomer } from "./core/_models";
import CreateCustomer from "./components/CreateCustomer";
import EditCustomer from "./components/EditCustomer";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import Backdrop from "../../../_cloner/components/Backdrop";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import { columns } from "./helpers/customerColumn";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import EditGridButton from "../../../_cloner/components/DeleteGridButton";
import DeleteGridButton from "../../../_cloner/components/EditGridButton";
import React from "react";
import ActiveText from "../../../_cloner/components/ActiveText";

const Customer = () => {
    const {
        data: customers,
        isLoading: customersLoading,
        refetch,
    } = useGetCustomers();
    const {
        mutate,
        data: deleteData,
        isLoading: deleteLoading,
    } = useDeleteCustomer();
    const [results, setResults] = useState<ICustomer[]>([]);

    useEffect(() => {
        setResults(customers?.data);
    }, [customers?.data]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<ICustomer>();
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "customerCode",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography >;
                },
                headerName: "کد مشتری",
                align: "center",
                headerClassName: "headerClassName",
                maxWidth: 80,
                flex: 1
            },
            {
                field: "firstName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography >;
                },
                headerName: "نام",
                headerClassName: "headerClassName",
                flex: 1
            },
            {
                field: "lastName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography >;
                },
                headerName: "نام خانوادگی",
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1
            },
            {
                field: "mobile",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography >;
                },
                headerName: "موبایل",
                headerClassName: "headerClassName",
                minWidth: 80,
                flex: 1
            },
            {
                field: "representative",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography >;
                },
                headerName: "معرف",
                headerClassName: "headerClassName",
                flex: 1
            },
            {
                field: "customerValidityId",
                headerName: "اعتبار",
                minWidth: 60,
                renderCell: (params: any) =>
                params.value === 1
                ? <Typography variant="h4" className="text-indigo-600 px-4 py-1 rounded-md">عادی</Typography>
                : params.value === 2
                ? <Typography variant="h4" className="text-yellow-600 px-4 py-1 rounded-md">VIP</Typography>
                : <Typography variant="h4" className="text-black px-4 py-1 rounded-md">سیاه</Typography>,
                headerClassName: "headerClassName",
                flex: 1
            },
            {
                field: "tel1",
                headerName: "تلفن",
                headerClassName: "headerClassName",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography >;
                },
                minWidth: 120,
                flex: 1
            },
            {
                field: "isSupplier",
                headerName: "تامین کننده؟",
                renderCell: (params: any) => {
                    return <ActiveText params={params} successTitle="بله" dangerTitle="خیر" />
                    
                },
                headerClassName: "headerClassName",
                cellClassName: "text-center",
                minWidth: 80,
                flex: 1
            },
            {
                field: "fatherName",
                headerName: "نام پدر",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography >;
                },
                headerClassName: "headerClassName",
                flex: 1
            },
            {
                field: "nationalId",
                headerName: "کدملی",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography >;
                },
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            // {
            //     field: "address1",
            //     headerName: "آدرس یک",
            //     renderCell: (params: any) => {
            //         return <Typography variant="h4">{params.value}</Typography >;
            //     },
            //     headerClassName: "headerClassName",
            //     minWidth: 280,
            // },
            // {
            //     field: "customerType",
            //     headerName: "نوع مشتری",
            //     minWidth: 80,
            //     renderCell: (params: any) =>
            //         params.value === 0 ? <Typography variant="h4" className="text-purple-700">حقیقی</Typography > : <Typography variant="h4" className="text-yellow-700">حقوقی</Typography >,
            //     headerClassName: "headerClassName",
            // },
            // {
            //     field: "address2",
            //     headerName: "آدرس دو",
            //     renderCell: (params: any) => {
            //         return <Typography variant="h4">{params.value}</Typography >;
            //     },
            //     headerClassName: "headerClassName",
            //     minWidth: 280,
            // },
            {
                headerName: "عملیات",
                renderCell: renderAction,
                headerClassName: "headerClassName",
                minWidth: 100,
                flex: 1
            },
        ];
        return col;
    };

    const handleEdit = (item: ICustomer) => {
        setItemForEdit(item);
        setIsEditOpen(true);
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

    const renderAction = (item: any) => {
        return (
            <Box component="div" className="flex gap-4">
                <DeleteGridButton onClick={() => handleEdit(item?.row)} />
                <EditGridButton onClick={() => handleDelete(item?.row?.id)} />
            </Box>
        );
    };

    if (customersLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
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

            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {customersLoading && <Backdrop loading={customersLoading} />}
            <Card className="p-8">
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2"
                >
                    <Box component="div" className="w-auto md:w-[40%] mb-2">
                        <FuzzySearch
                            keys={[
                                "firstName",
                                "lastName",
                                "nationalId",
                                "customerType",
                                "customerValidityId",
                                "mobile",
                                "tel1",
                                "tel2",
                                "isSupplier",
                                "address1",
                                "address2",
                                "representative",
                            ]}
                            data={customers?.data}
                            threshold={0.5}
                            setResults={setResults}
                        />
                    </Box>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        variant="contained"
                        color="secondary"
                    >
                        <Typography variant="h4">ایجاد مشتری</Typography >
                    </Button>
                </Box>
                <MuiDataGrid
                    columns={columns(renderAction)}
                    rows={results}
                    data={customers?.data}
                />
            </Card>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد مشتری جدید"
            >
                <CreateCustomer
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش"
            >
                <EditCustomer refetch={refetch} item={itemForEdit} />
            </TransitionsModal>
        </>
    );
};

export default Customer;
