import { useEffect, useState } from "react";
import { useDeleteCustomer, useGetCustomers } from "./core/_hooks";
import { ICustomer } from "./core/_models";
import CreateCustomer from "./components/CreateCustomer";
import EditCustomer from "./components/EditCustomer";
import { Box, Button, Card, Container, Modal, TextField, Typography } from "@mui/material";
import Backdrop from "../../../_cloner/components/Backdrop";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import { columns } from "./helpers/customerColumn";
import ReusableTable from "../../../_cloner/components/Tables";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { DataGrid } from "@mui/x-data-grid";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";

const Customer = () => {
    const {
        data: customers,
        isLoading: customersLoading,
        refetch,
    } = useGetCustomers();
    const { mutate,data: deleteData, isLoading: deleteLoading } = useDeleteCustomer();
    const [results, setResults] = useState<ICustomer[]>([]);

    useEffect(() => {
        setResults(customers?.data);
    }, [customers?.data]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<ICustomer>();
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const handleEdit = (item: ICustomer) => {
        setItemForEdit(item);
        setIsEditOpen(true);
    };

    const handleDelete = (id: string | undefined) => {
        if (id)
            mutate(id, {
                onSuccess: (message) => {
                    setSnackeOpen(true)
                    refetch();
                },
            });
    };

    const renderAction = (item: any) => {
        return (
            <Box component="div" className="flex gap-4">
                <Box component="div"
                    onClick={() => handleEdit(item?.row)}
                    className="bg-yellow-500 px-2 py-1 cursor-pointer rounded-md"
                >
                    <Box component="div" className="cursor-pointer text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                        </svg>
                    </Box>
                </Box>
                <Box component="div"
                    onClick={() => handleDelete(item?.row?.id)}
                    className="bg-red-500 px-2 py-1 cursor-pointer rounded-md"
                >
                    <Box component="div" className="cursor-pointer text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </Box>
                </Box>
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
                        deleteData?.message || "حذف با موفقیت انجام شد"
                    }
                />
            )}

            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {customersLoading && <Backdrop loading={customersLoading} />}
            <Container>
                <Card className="p-8">
                    <Typography color="primary" variant="h1" className="pb-8">مدیریت مشتری</Typography>
                    <Box component="div" className="flex justify-between items-center">
                        <Box component="div" className="w-80 md:w-[40%]">
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
                        <Button onClick={() => setIsCreateOpen(true)} variant="contained" color="secondary">
                            <Typography>ایجاد مشتری</Typography>
                        </Button>
                    </Box>
                    <MuiDataGrid columns={columns(renderAction)} rows={results} data={customers?.data} />
                </Card>
            </Container>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
            >

                <CreateCustomer
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />

            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
            >
                <EditCustomer refetch={refetch} item={itemForEdit} />
            </TransitionsModal>
        </>
    );
};

export default Customer;
