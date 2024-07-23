import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import EditGridButton from "../../../_cloner/components/EditGridButton";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { IShareholder } from "./_models";
import { Add, Search, } from "@mui/icons-material";
import ShareholdersForm from "./ShareholdersForm";
import { useDeleteShareHolder, useGetShareholderList } from "./_hooks";
import { Formik } from "formik";
import FormikInput from "../../../_cloner/components/FormikInput";
import DeleteGridButton from "../../../_cloner/components/DeleteGridButton";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import Pagination from "../../../_cloner/components/Pagination";
import Backdrop from "../../../_cloner/components/Backdrop";
import { ShareholdersColumn } from "../../../_cloner/helpers/columns";

const pageSize = 100

const Shareholders = () => {
    const shareHolderTools = useGetShareholderList();
    const deleteShareHolderTools = useDeleteShareHolder();
    
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IShareholder>();
    const [currentPage, setCurrentPage] = useState<number>(1);


    const getLists = () => {
        const filter = {
            pageNumber: currentPage,
            pageSize: pageSize,
          }
          shareHolderTools.mutate(filter)
  
    }

    useEffect(() => {
        getLists()
         // eslint-disable-next-line
    }, [currentPage])

    const handleEdit = (item: IShareholder) => {
        setIsEditOpen(true);
        setItemForEdit(item);
    };
    const handleDelete = (id: string | undefined) => {
        if (id) deleteShareHolderTools.mutate(id, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    EnqueueSnackbar(response.message || "حذف با موفقیت انجام شد", "success")
                    getLists()
                } else {
                    EnqueueSnackbar(response.data.Message, "error")
                }
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

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };
    
    const handleFilter = (values: any) => {
        let formData =  values.shareHolderCode ? {
          pageNumber: currentPage,
          pageSize: pageSize,
          shareHolderCode: +values.shareHolderCode
        } : {
            pageNumber: currentPage,
            pageSize: pageSize,  
        };
        shareHolderTools.mutate(formData);
      }
    

    return (
        <>
            {deleteShareHolderTools.isLoading && <Backdrop loading={deleteShareHolderTools.isLoading} />}
            {shareHolderTools.isLoading && <Backdrop loading={shareHolderTools.isLoading} />}
            <ReusableCard>
                <div
                    className="flex lg:flex-row flex-col lg:justify-between lg:items-center space-y-2 mb-4"
                >
                    <Formik initialValues={{shareHolderCode: ""}} onSubmit={handleFilter}>
                        {({ values }) => (
                            <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[50%]">
                                <FormikInput
                                    name="shareHolderCode"
                                    label="شماره سهامداری"
                                />
                                <ButtonComponent onClick={() => handleFilter(values)}>
                                <Search className="text-white" />
                                <Typography className="px-2 text-white">جستجو</Typography>
                                </ButtonComponent>
                            </div>
                        )}
                    </Formik>

                    <Button onClick={() => setIsCreateOpen(true)} className="!bg-indigo-500">
                        <Add className="text-white"  />
                        <Typography variant="h4" className="px-4 py-1 text-white">ایجاد سهامدار جدید</Typography>
                    </Button>
                </div>
                <MuiDataGrid
                    columns={ShareholdersColumn(renderAction)}
                    getRowId={(row: { id: string }) => row.id}
                    rows={shareHolderTools?.data?.data}
                    data={shareHolderTools?.data?.data}
                    onDoubleClick={(item: any) => handleEdit(item?.row)}
                    hideFooter={true}
                />
                <Pagination pageCount={+1000 / +pageSize || 100} onPageChange={handlePageChange} />
            </ReusableCard>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد سهامدار جدید"
                width="60%"
                description="جهت ثبت سهامدار جدید لطفا اطلاعات زیر را تکمیل نمائید"
            >
                <ShareholdersForm
                    getLists={getLists}
                    setIsCreateOpen={setIsCreateOpen}
                    />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش سهامدار جدید"
                width="60%"
                description=" درصورتی که اطلاعتی که ثبت کرده اید نیاز به ویرایش داشته باشد ازطریق فرم زیر اقدام کنید"
                >
                <ShareholdersForm
                    id={itemForEdit?.id}
                    getLists={getLists}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
        </>
    );
};

export default Shareholders;
