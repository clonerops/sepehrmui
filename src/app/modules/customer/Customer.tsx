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
                <Typography color="primary" variant="h1" className="pb-2 !text-sm md:!text-2xl">
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
