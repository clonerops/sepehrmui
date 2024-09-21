import { useEffect, useState } from "react";
import { useDeletePersonnel, useGetPersonnels } from "./core/_hooks";
import { IPersonnel } from "./core/_models";
import { Button, Typography } from "@mui/material";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { Add } from "@mui/icons-material";

import Backdrop from "../../../_cloner/components/Backdrop";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import EditGridButton from "../../../_cloner/components/DeleteGridButton";
import DeleteGridButton from "../../../_cloner/components/EditGridButton";
import PersonnelForm from "./components/PersonnelForm";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog";
import MuiTable from "../../../_cloner/components/MuiTable";
import PhonebookGridButton from "../../../_cloner/components/PhonebookGridButton";
import { PersonnelColumn } from "../../../_cloner/helpers/columns";
import { useAuth } from "../../../_cloner/helpers/checkUserPermissions";
import AccessDenied from "../../routing/AccessDenied";

const Personnel = () => {
    const { hasPermission } = useAuth()

    const PersonnelTools = useGetPersonnels();
    const deletePersonnelTools = useDeletePersonnel();

    const [results, setResults] = useState<IPersonnel[]>([]);

    useEffect(() => {
        setResults(PersonnelTools?.data?.data);
        // eslint-disable-next-line
    }, [PersonnelTools?.data?.data]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isPhoneBookOpen, setIsPhoneBookOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IPersonnel>();
    const [itemPersonnel, setItemPersonnel] = useState<IPersonnel>();
    const [approve, setApprove] = useState<boolean>(false);
    const [deletedId, setDeletedId] = useState<string>("")

    const handleEdit = (item: IPersonnel) => {
        setItemForEdit(item);
        setIsEditOpen(true);
    };
    const handleItemPersonnel = (item: any) => {
        setItemPersonnel(item);
        setIsPhoneBookOpen(true);
    };

    const handleDelete = (id: string | undefined) => {
        if (id)
            deletePersonnelTools.mutate(id, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "حذف با موفقیت انجام شد", "success")
                        setApprove(false)
                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                        setApprove(false)
                    }
                    PersonnelTools.refetch();
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
                <PhonebookGridButton onClick={() => handleItemPersonnel(item?.row)} />
                {hasPermission("UpdatePersonnel") &&
                    <DeleteGridButton onClick={() => handleEdit(item?.row)} />
                }
                {hasPermission("DeletePersonnel") &&
                    <EditGridButton onClick={() => handleOpenApprove(item?.row?.id)} />
                }
            </div>
        );
    };

    const phoneBookColumn = [
        { id: 1, header: "شماره تماس", accessor: "phoneNumber" },
        { id: 2, header: "نوع شماره تماس", accessor: "phoneNumberType", render: (params: { phoneNumberType: { label: string } }) => <Typography>{params.phoneNumberType.label}</Typography> },
    ]

    if (!hasPermission("CreatePersonnel"))
        return <AccessDenied />

    return (
        <>
            {PersonnelTools.isLoading && <Backdrop loading={PersonnelTools.isLoading} />}
            {deletePersonnelTools.isLoading && <Backdrop loading={deletePersonnelTools.isLoading} />}
            <ReusableCard>
                <div className="md:flex md:justify-between md:items-center space-y-2" >
                    <div className="w-auto md:w-[40%] mb-2">
                        <FuzzySearch
                            keys={[
                                "PersonnelCode",
                                "firstName",
                                "lastName",
                                "representative",
                                "PersonnelValidityDesc",
                                "isSupplier",
                                "fatherName",
                                "nationalId",
                            ]}
                            data={PersonnelTools?.data?.data}
                            setResults={setResults}
                        />
                    </div>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        variant="contained"
                        className="!bg-indigo-500 hover:!bg-indigo-700"
                    >
                        <Add className="text-white" />
                        <Typography variant="h4" className="text-white">ایجاد پرسنل</Typography >
                    </Button>
                </div>
                <MuiDataGrid
                    columns={PersonnelColumn(renderAction)}
                    rows={results}
                    data={PersonnelTools?.data?.data}
                    onDoubleClick={(item: any) => handleEdit(item?.row)}
                />
            </ReusableCard>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد پرسنل جدید"
                width="80%"
                description="برای ایجاد پرسنل جدید، لطفاً مشخصات پرسنل خود را با دقت وارد کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <PersonnelForm
                    refetch={PersonnelTools.refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش"
                width="80%"
                description="درصورتی که مغایرتی در اطلاعات پرسنل ثبت شده وجود دارد می توانید از طریق فرم ذیل اقدام به ویرایش اطلاعات کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <PersonnelForm
                    id={itemForEdit?.id}
                    refetch={PersonnelTools.refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />

            </TransitionsModal>
            <TransitionsModal
                open={isPhoneBookOpen}
                isClose={() => setIsPhoneBookOpen(false)}
                title={` شماره های تماس ${itemPersonnel?.firstName} ${itemPersonnel?.lastName}`}
                width="50%"
                description="شماره تماس های پرسنل بصورت ذیل ثبت شده است."
            >
                <MuiTable columns={phoneBookColumn} data={itemPersonnel?.phonebook?.map((item: any) => (
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
                confirmText={deletePersonnelTools.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleDelete(deletedId)}

            />

        </>
    );
};

export default Personnel;
