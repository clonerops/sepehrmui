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
            <Card className="p-8">
                <Typography color="primary" variant="h1" className="pb-8">
                    مدیریت تامین کنندگان
                </Typography>
                <Box
                    component="div"
                    className="flex justify-between items-center"
                >
                    <Box component="div" className="w-80 md:w-[40%]">
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
                        <Typography>ایجاد تامین کننده</Typography>
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
            >
                <CreateSupplier
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
            >
                <EditSupplier refetch={refetch} item={itemForEdit} />
            </TransitionsModal>
        </>
    );
};

export default Suppliers;
