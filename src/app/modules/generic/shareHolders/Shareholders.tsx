import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import EditGridButton from "../../../../_cloner/components/EditGridButton";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { IShareholder } from "./_models";
import _ from 'lodash'
import { Add, Search, } from "@mui/icons-material";
import ShareholdersForm from "./ShareholdersForm";
import { useDeleteShareHolder, useGetShareholderList } from "./_hooks";
import { Formik } from "formik";
import FormikInput from "../../../../_cloner/components/FormikInput";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import Pagination from "../../../../_cloner/components/Pagination";
import Backdrop from "../../../../_cloner/components/Backdrop";

const pageSize = 100


const Shareholders = () => {
    
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IShareholder>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const shareHolderLists = useGetShareholderList();
        const { mutate, data: deleteData, isLoading: deleteLoading, } = useDeleteShareHolder();

    const getLists = () => {
        const filter = {
            pageNumber: currentPage,
            pageSize: 100,
          }
          shareHolderLists.mutate(filter)
  
    }

    useEffect(() => {
        getLists()
         // eslint-disable-next-line
    }, [currentPage])
    

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "shareHolderCode",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "کد سهامدار",
                cellClassName: "bg-green-100 font-bold",
                headerClassName: "headerClassName",
                minWidth: 80,
                maxWidth: 120,
                flex: 1,
            },
            {
                field: "firstName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام سهامدار",
                cellClassName: "font-bold",
                headerClassName: "headerClassName",
                minWidth: 180,
                flex: 1,
            },
            {
                field: "lastName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام خانوادگی سهامدار",
                headerClassName: "headerClassName",
                minWidth: 180,
                flex: 1,
            },
            {
                field: "fatherName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام پدر",
                cellClassName: "font-bold",
                headerClassName: "headerClassName",
                minWidth: 180,
                flex: 1,
            },
            {
                field: "mobileNo",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "موبایل",
                cellClassName: "font-bold", 
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

    const handleEdit = (item: IShareholder) => {
        setIsEditOpen(true);
        setItemForEdit(item);
    };
    const handleDelete = (id: string | undefined) => {
        if (id) mutate(id, {
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
          pageSize: 100,
          shareHolderCode: +values.shareHolderCode
        } : {
            pageNumber: currentPage,
            pageSize: 100,  
        };
        shareHolderLists.mutate(formData);
      }
    

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {shareHolderLists.isLoading && <Backdrop loading={shareHolderLists.isLoading} />}
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
                    columns={columns(renderAction)}
                    getRowId={(row: { id: string }) => row.id}
                    rows={shareHolderLists?.data?.data}
                    data={shareHolderLists?.data?.data}
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
