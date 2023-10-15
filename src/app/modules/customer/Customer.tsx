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
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "کد مشتری",
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
                width: 80,
            },
            {
                field: "firstName",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "نام",
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
            },
            {
                field: "lastName",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "نام خانوادگی",
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
                width: 150,
            },
            {
                field: "mobile",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "موبایل",
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
            },
            {
                field: "representative",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: "معرف",
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
            },
            {
                field: "customerValidityId",
                headerName: "نوع اعتبار",
                width: 80,
                renderCell: (params: any) =>
                    params.value === 1
                        ? "عادی"
                        : params.value === 2
                        ? "VIP"
                        : "سیاه",
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
            },
            {
                field: "tel1",
                headerName: "تلفن یک",
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
            },
            {
                field: "isSupplier",
                headerName: "تامین کننده؟",
                renderCell: (params: any) =>
                    params.value === true ? (
                        <Typography className="text-green-500">بله</Typography>
                    ) : (
                        <Typography className="text-red-500">خیر</Typography>
                    ),
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
                cellClassName: "text-center",
                width: 80,
            },
            {
                field: "fatherName",
                headerName: "نام پدر",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
            },
            {
                field: "nationalId",
                headerName: "کدملی",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
            },
            {
                field: "address1",
                headerName: "آدرس یک",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
                width: 280,
            },
            {
                field: "customerType",
                headerName: "نوع مشتری",
                width: 80,
                renderCell: (params: any) =>
                    params.value === 0 ? <Typography>حقیقی</Typography> : <Typography>حقوقی</Typography>,
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
            },
            {
                field: "address2",
                headerName: "آدرس دو",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
                width: 280,
            },
            {
                headerName: "عملیات",
                renderCell: renderAction,
                headerClassName: "bg-[#E2E8F0] text-black font-bold",
                width: 160,
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
                <Typography
                    color="secondary"
                    variant="h1"
                    className="pb-2 !text-sm md:!text-2xl"
                >
                    مدیریت مشتری
                </Typography>
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2"
                >
                    <Box component="div" className="w-auto md:w-[40%]">
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
                        <Typography>ایجاد مشتری</Typography>
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
