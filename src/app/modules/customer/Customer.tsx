import { useEffect, useState } from "react";
import { useDeleteCustomer, useGetCustomers } from "./core/_hooks";
import { ICustomer } from "./core/_models";
import { Box, Button, Typography } from "@mui/material";
import Backdrop from "../../../_cloner/components/Backdrop";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import EditGridButton from "../../../_cloner/components/DeleteGridButton";
import DeleteGridButton from "../../../_cloner/components/EditGridButton";
import ActiveText from "../../../_cloner/components/ActiveText";
import CustomerForm from "./components/CustomerForm";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { validateAndEnqueueSnackbar } from "../order/sales-order/functions";
import TransitionsModal from "../../../_cloner/components/ReusableModal";

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
                minWidth: 140,
                flex: 1
            },
            {
                field: "customerValidityDesc",
                headerName: "اعتبار",
                minWidth: 100,
                renderCell: (params: any) => {
                    const backgroundColor = params.row.customerValidityColorCode; // Assuming this code exists in your data
                    return <Typography style={{
                        backgroundColor: `#${backgroundColor}`,
                        color: "white"
                    }} className={`rounded-md px-4 py-1`}>{params.value}</Typography>
                },
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
                onSuccess: (response) => {
                    if(response.succeeded) {
                        validateAndEnqueueSnackbar(response.message || "حذف با موفقیت انجام شد", "success")
                        refetch();
                      } else {
                        validateAndEnqueueSnackbar(response.data.Message, "warning")
                      }
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
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {customersLoading && <Backdrop loading={customersLoading} />}
            <ReusableCard>
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
            </ReusableCard>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد مشتری جدید"
                width="80%"
                description="برای ایجاد مشتری جدید، لطفاً مشخصات مشتری خود را با دقت وارد کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <CustomerForm
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش"
                description="درصورتی که مغایرتی در اطلاعات مشتری ثبت شده وجود دارد می توانید از طریق فرم ذیل اقدام به ویرایش اطلاعات کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <CustomerForm
                    id={itemForEdit?.id}
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />

                {/* <EditCustomer refetch={refetch} item={itemForEdit} /> */}
            </TransitionsModal>
        </>
    );
};

export default Customer;
