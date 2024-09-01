import { useEffect, useState } from "react";
import { useDeleteCustomer, useGetCustomers, useGetCustomersByMutation } from "./core/_hooks";
import { ICustomer } from "./core/_models";
import { Button, Typography } from "@mui/material";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { Add } from "@mui/icons-material";
import { CustomerColumn } from "../../../_cloner/helpers/columns";

import Backdrop from "../../../_cloner/components/Backdrop";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import EditGridButton from "../../../_cloner/components/DeleteGridButton";
import DeleteGridButton from "../../../_cloner/components/EditGridButton";
import CustomerForm from "./components/CustomerForm";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog";
import MuiTable from "../../../_cloner/components/MuiTable";
import PhonebookGridButton from "../../../_cloner/components/PhonebookGridButton";
import SearchBackendInput from "../../../_cloner/components/SearchBackendInput";
import Pagination from "../../../_cloner/components/Pagination";

const pageSize = 100

const Customer = () => {
    const customerTools = useGetCustomersByMutation()
    const deleteCustomerTools = useDeleteCustomer();

    const [results, setResults] = useState<ICustomer[]>([]);

    useEffect(() => {
        setResults(customerTools?.data?.data);
        // eslint-disable-next-line
    }, [customerTools?.data?.data]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isPhoneBookOpen, setIsPhoneBookOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<ICustomer>();
    const [itemCustomer, setItemCustomer] = useState<ICustomer>();
    const [approve, setApprove] = useState<boolean>(false);
    const [deletedId, setDeletedId] = useState<string>("")
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [keyword, setKeyword] = useState<string>("")


    const handleEdit = (item: ICustomer) => {
        setItemForEdit(item);
        setIsEditOpen(true);
    };
    const handleItemCustomer = (item: any) => {
        setItemCustomer(item);
        setIsPhoneBookOpen(true);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filter = {
                PageSize: pageSize,
                PageNumber: currentPage,
                keyword
            }
            customerTools.mutate(filter);

        }, 1000)

        return () => clearTimeout(delayDebounceFn)
        // eslint-disable-next-line
    }, [keyword, currentPage])


    const handleDelete = (id: string | undefined) => {
        if (id)
            deleteCustomerTools.mutate(id, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "حذف با موفقیت انجام شد", "success")
                        setApprove(false)
                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                        setApprove(false)
                    }
                    customerTools.mutate({});
                },
            });
    };

    const handleOpenApprove = (id: string) => {
        setApprove(true)
        setDeletedId(id)
    }


    const renderAction = (item: any) => {
        return (
            <div className="flex gap-4">
                <PhonebookGridButton onClick={() => handleItemCustomer(item?.row)} />
                <DeleteGridButton onClick={() => handleEdit(item?.row)} />
                <EditGridButton onClick={() => handleOpenApprove(item?.row?.id)} />
            </div>
        );
    };

    const phoneBookColumn = [
        { id: 1, header: "شماره تماس", accessor: "phoneNumber" },
        { id: 2, header: "نوع شماره تماس", accessor: "phoneNumberType", render: (params: { phoneNumberType: { label: string } }) => <Typography>{params.phoneNumberType.label}</Typography> },
    ]

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <>
            {customerTools.isLoading && <Backdrop loading={customerTools.isLoading} />}
            {deleteCustomerTools.isLoading && <Backdrop loading={deleteCustomerTools.isLoading} />}
            <ReusableCard>
                <div className="md:flex md:justify-between md:items-center space-y-2" >
                    <div className="w-auto md:w-[40%] mb-2">
                        <SearchBackendInput label="جستجو" name="keyword" value={keyword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e?.target.value)} />
                    </div>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        variant="contained"
                        className="!bg-indigo-500 hover:!bg-indigo-700"
                    >
                        <Add className="text-white" />
                        <Typography variant="h4" className="text-white">ایجاد مشتری</Typography >
                    </Button>
                </div>
                <MuiDataGrid
                    columns={CustomerColumn(renderAction)}
                    rows={results}
                    data={customerTools?.data?.data}
                    hideFooter={true}
                    onDoubleClick={(item: any) => handleEdit(item?.row)}
                />
                <Pagination
                    pageCount={customerTools?.data?.totalCount / pageSize}
                    onPageChange={handlePageChange}
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
                    // refetch={customerTools.mutate({})}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش"
                width="80%"
                description="درصورتی که مغایرتی در اطلاعات مشتری ثبت شده وجود دارد می توانید از طریق فرم ذیل اقدام به ویرایش اطلاعات کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <CustomerForm
                    id={itemForEdit?.id}
                    // refetch={customerTools.mutate({})}
                    setIsCreateOpen={setIsCreateOpen}
                />

            </TransitionsModal>
            <TransitionsModal
                open={isPhoneBookOpen}
                isClose={() => setIsPhoneBookOpen(false)}
                title={` شماره های تماس ${itemCustomer?.firstName} ${itemCustomer?.lastName}`}
                width="50%"
                description="شماره تماس های مشتری بصورت ذیل ثبت شده است."
            >
                <MuiTable columns={phoneBookColumn} data={itemCustomer?.phonebook?.map((item: any) => (
                    {
                        phoneNumber: item.phoneNumber,
                        phoneNumberType: {
                            value: item.phoneNumberTypeId,
                            label: item.phoneNumberTypeDesc,
                        }
                    }
                )) || []} onDoubleClick={() => { }} />
            </TransitionsModal>
            <ConfirmDialog
                open={approve}
                hintTitle="آیا از حذف مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={deleteCustomerTools.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleDelete(deletedId)}

            />

        </>
    );
};

export default Customer;
