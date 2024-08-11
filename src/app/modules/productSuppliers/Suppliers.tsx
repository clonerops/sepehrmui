import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import { ISuppliers } from "./_models";
import { useDeleteSupplier, useRetrieveSuppliers } from "./_hooks";

import Backdrop from "../../../_cloner/components/Backdrop";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import EditGridButton from "../../../_cloner/components/EditGridButton";
import DeleteGridButton from "../../../_cloner/components/DeleteGridButton";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import SupplierForm from "./SupplierForm";
import { SuppliersColumn } from "../../../_cloner/helpers/columns";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";

const Suppliers = () => {
    const supplierTools = useRetrieveSuppliers();
    const deleteTools = useDeleteSupplier();

    const [results, setResults] = useState<ISuppliers[]>([]);

    useEffect(() => {
        setResults(supplierTools?.data?.data);
         // eslint-disable-next-line
    }, [supplierTools?.data?.data]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<ISuppliers>();

    const handleEdit = (item: ISuppliers) => {
        setIsEditOpen(true);
        setItemForEdit(item);
    };
    const handleDelete = (id: string | undefined) => {
        if (id)
            deleteTools.mutate(id, {
                onSuccess: (response) => {
                    if(response.succeeded) {
                        EnqueueSnackbar(response.message || "حذفبا موفقیت انجام شد", "success")
                        supplierTools.refetch();
                      } else {
                        EnqueueSnackbar(response.data.Message, "error")
                      }
                },
            });
    };


    const renderAction = (item: any) => {
        return (
            <div className="flex gap-4">
                <EditGridButton onClick={() => handleEdit(item?.row)} />
                <DeleteGridButton onClick={() => handleDelete(item?.row?.id)} />
            </div>
        );
    };

    return (
        <>
            {deleteTools.isLoading && <Backdrop loading={deleteTools.isLoading} />}
            {supplierTools.isLoading && <Backdrop loading={supplierTools.isLoading} />}

            <ReusableCard>
                <div className="md:flex md:justify-between md:items-center space-y-2">
                    <div className="w-auto md:w-[40%] mb-4">
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
                            data={supplierTools?.data?.data}
                            setResults={setResults}
                        />
                    </div>
                    <ButtonComponent onClick={() => setIsCreateOpen(true)}>
                        <Typography variant="h4">ایجاد تامین کننده</Typography>
                    </ButtonComponent>
                </div>
                <MuiDataGrid
                    columns={SuppliersColumn(renderAction)}
                    rows={results}
                    data={supplierTools?.data?.data}
                    onDoubleClick={(item: any) => handleEdit(item?.row)}
                />
            </ReusableCard>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد تامین کننده جدید"
            >
                <SupplierForm  refetch={supplierTools.refetch} setIsCreateOpen={setIsCreateOpen} />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش تامین کننده جدید"
            >
                <SupplierForm  refetch={supplierTools.refetch} setIsCreateOpen={setIsCreateOpen} id={itemForEdit?.id} items={itemForEdit} />
            </TransitionsModal>
        </>
    );
};

export default Suppliers;
