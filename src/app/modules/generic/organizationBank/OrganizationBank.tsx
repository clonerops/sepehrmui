import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import EditGridButton from "../../../../_cloner/components/EditGridButton";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { IOrganizationBank } from "./_models";
import { Add } from "@mui/icons-material";
import OrganizationBankForm from "./OrganizationBankForm";
import { useDeleteOrganizationBank, useGetOrganizationBankList } from "./_hooks";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import Backdrop from "../../../../_cloner/components/Backdrop";

const OrganizationBank = () => {
    const { data: organizationBank, refetch } = useGetOrganizationBankList();
    
    const {
        mutate,
        data: deleteData,
        isLoading: deleteLoading,
    } = useDeleteOrganizationBank();
    const [results, setResults] = useState<IOrganizationBank[]>([]);

    useEffect(() => {
        setResults(organizationBank?.data);
    }, [organizationBank?.data]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IOrganizationBank>();

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "bankId",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params?.row?.bank?.bankId}</Typography>;
                },
                headerName: "کد بانک",
                cellClassName: "font-bold",
                headerClassName: "headerClassName",
                minWidth: 60,
                maxWidth: 80,
                flex: 1,
            },
            {
                field: "bankName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params?.row?.bank?.bankName}</Typography>;
                },
                headerName: "نام بانک",
                cellClassName: "bg-green-100 font-bold",
                headerClassName: "headerClassName",
                minWidth: 240,
                flex: 1,
            },
            {
                field: "accountOwner",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "صاحب حساب",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "accountNo",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "شماره حساب",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "branchName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "شعبه",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                headerName: "عملیات",
                flex: 1,
                renderCell: renderAction,
                headerClassName: "headerClassName w-full",
                minWidth: 160,
            },
        ];
        return col;
    };

    const handleEdit = (item: IOrganizationBank) => {
        setIsEditOpen(true);
        setItemForEdit(item);
    };

    const handleDelete = (id: string | undefined) => {
        if (id) mutate(id, {
            onSuccess: (message) => {
                refetch()
            }
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
            {/* {organizationBankLoading && <Backdrop loading={organizationBankLoading} />} */}
            {/* <Box component="div" className="grid grid-cols-1 md:grid-cols-4 gap-x-8 space-y-4 md:space-y-0 my-4">
                <CardWithIcons
                    title='تعداد سرویس های ثبت شده'
                    icon={<DesignServices className="text-white" />}
                    value={organizationBank?.data && +organizationBank?.data?.length}
                    iconClassName='bg-[#3322D8]' />
                <CardWithIcons
                    title='میانگین حداقل موجودی'
                    icon={<AddTask className="text-white" />}
                    value={Math.ceil(+_.sumBy(organizationBank?.data && organizationBank?.data, 'minInventory') / +organizationBank?.data?.length)}
                    iconClassName='bg-[#369BFD]' />
                <CardWithIcons
                    title='میانگین حداکثر موجودی'
                    icon={<TextDecrease className="text-white" />}
                    value={Math.ceil(+_.sumBy(organizationBank?.data && organizationBank?.data, 'maxInventory') / +organizationBank?.data?.length)}
                    iconClassName='bg-[#F8B30E]' />
                <CardWithIcons
                    title='میانگین نقطه بحرانی'
                    icon={<AdfScanner className="text-white" />}
                    value={Math.ceil(+_.sumBy(organizationBank?.data && organizationBank?.data, 'inventotyCriticalPoint') / +organizationBank?.data?.length)}
                    iconClassName='bg-[#EB5553]' />
            </Box> */}

            <ReusableCard>
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2 mb-4"
                >
                    <Box component="div" className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={[
                                "bankId",
                                "bankName",
                                "accountOwner",
                                "accountNo",
                                "branchName",
                            ]}
                            // data={organizationBank?.data}
                            data={[]}
                            setResults={setResults}
                        />
                    </Box>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="!bg-indigo-500"
                    >
                        <Add className="text-white" />
                        <Typography variant="h4" className="px-4 py-1 text-white">ایجاد بانک</Typography>
                    </Button>
                </Box>
                <MuiDataGrid
                    columns={columns(renderAction)}
                    getRowId={(row: { id: string }) => row.id}
                    rows={results}
                    data={organizationBank?.data}
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
                    refetch={refetch}
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
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
        </>
    );
};

export default OrganizationBank;
