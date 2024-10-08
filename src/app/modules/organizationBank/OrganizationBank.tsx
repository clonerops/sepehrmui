import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import EditGridButton from "../../../_cloner/components/EditGridButton";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { IOrganizationBank } from "./_models";
import { Add } from "@mui/icons-material";
import OrganizationBankForm from "./OrganizationBankForm";
import { useDeleteOrganizationBank, useGetOrganizationBankList } from "./_hooks";
import DeleteGridButton from "../../../_cloner/components/DeleteGridButton";
import Backdrop from "../../../_cloner/components/Backdrop";
import { OrganizationBankColumn } from "../../../_cloner/helpers/columns";

const OrganizationBank = () => {
    const organizationBankTools = useGetOrganizationBankList();
    const deleteOrganizationBankTools = useDeleteOrganizationBank();

    const [results, setResults] = useState<IOrganizationBank[]>([]);

    useEffect(() => {
        setResults(organizationBankTools?.data?.data);
         // eslint-disable-next-line
    }, [organizationBankTools?.data?.data]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IOrganizationBank>();

    const handleEdit = (item: IOrganizationBank) => {
        setIsEditOpen(true);
        setItemForEdit(item);
    };

    const handleDelete = (id: string | undefined) => {
        if (id) deleteOrganizationBankTools.mutate(id, {
            onSuccess: (message) => {
                organizationBankTools.refetch()
            }
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
            {organizationBankTools.isLoading && <Backdrop loading={organizationBankTools.isLoading} />}
            {deleteOrganizationBankTools.isLoading && <Backdrop loading={deleteOrganizationBankTools.isLoading} />}
            <ReusableCard>
                <div className="md:flex md:justify-between md:items-center space-y-2 mb-4">
                    <div className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={[
                                "bank.id",
                                "bank.bankName",
                                "accountOwner",
                                "accountNo",
                                "branchName",
                            ]}
                            data={organizationBankTools?.data?.data}
                            setResults={setResults}
                        />
                    </div>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="!bg-indigo-500"
                    >
                        <Add className="text-white" />
                        <Typography variant="h4" className="px-4 py-1 text-white">ایجاد بانک و حساب</Typography>
                    </Button>
                </div>
                <MuiDataGrid
                    columns={OrganizationBankColumn(renderAction)}
                    getRowId={(row: { id: string }) => row.id}
                    rows={results}
                    data={organizationBankTools?.data?.data}
                    onDoubleClick={(item: any) => handleEdit(item?.row)}
                />
            </ReusableCard>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد بانک جدید"
                width="60%"
                description="لطفاً مشخصات بانک را با دقت وارد کنید اگر سوال یا نیاز به راهنمایی بیشتر دارید، با تیم پشتیبانی تماس بگیرید."
            >
                <OrganizationBankForm
                    refetch={organizationBankTools.refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش بانک جدید"
                width="60%"
                description=" درصورتی که بانکی نیاز به ویرایش داشته باشد می توانید از طریق فرم زیر اقدام به ویرایش بانک نمایید"
            >
                <OrganizationBankForm
                    id={itemForEdit?.id}
                    refetch={organizationBankTools.refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
        </>
    );
};

export default OrganizationBank;
