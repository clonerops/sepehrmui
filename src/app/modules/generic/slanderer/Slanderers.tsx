import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import EditGridButton from "../../../../_cloner/components/EditGridButton";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import Backdrop from "../../../../_cloner/components/Backdrop";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { ISlanderer } from "./_models";
import { useDeleteSlanderer, useGetSlandererList, usePutSlanderer } from "./_hooks";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import SlandererForm from "./SlandererForm";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import SwitchComponent from "../../../../_cloner/components/Switch";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";

const Slanderers = () => {
    const { data: slanderer, refetch } = useGetSlandererList();
    const { mutate, isLoading: deleteLoading } = useDeleteSlanderer();
    const updateTools = usePutSlanderer();

    const [results, setResults] = useState<ISlanderer[]>([]);

    useEffect(() => {
        setResults(slanderer?.data);
    }, [slanderer]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<ISlanderer>();

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "slandererDescription",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام تنخواه گردان",
                cellClassName: "font-bold",
                headerClassName: "headerClassName",
                minWidth: 240,
                flex: 1,
            },
            {
                field: "mobileNo",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "شماره موبایل",
                cellClassName: "bg-green-100 font-bold",
                headerClassName: "headerClassName",
                minWidth: 240,
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

    const handleEdit = (item: ISlanderer) => {
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

    const onUpdateStatus = (rowData: any) => {
        try {
          const formData = {
            id: rowData.row.id,
            mobileNo: rowData.row.mobileNo,
            slandererDescription: rowData.row.slandererDescription,
            isActive: !rowData.row.isActive
          }
          updateTools.mutate(formData, {
            onSuccess: (response) => {
              if (response.succeeded) {
                EnqueueSnackbar(response.message, "success")
              } else {
                EnqueueSnackbar(response.data.Message, "error")
              }
              refetch()
            }
          })
        } catch (e) {
          return e;
        }
      };
    

    const renderAction = (item: any) => {
        return (
            <Box component="div" className="flex justify-center items-center gap-4">
                <EditGridButton onClick={() => handleEdit(item?.row)} />
                <DeleteGridButton onClick={() => handleDelete(item?.row?.id)} />
                <SwitchComponent
                    checked={item?.row.isActive}
                    onChange={(_) => onUpdateStatus(item)}
                />
            </Box>
        );
    };
    

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            <Box className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ReusableCard>
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2 mb-4"
                >
                    <Box component="div" className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={[
                                "mobileNo",
                                "slandererDescription",
                            ]}
                            data={slanderer?.data}
                            setResults={setResults}
                        />
                    </Box>
                    <ButtonComponent
                        onClick={() => setIsCreateOpen(true)}
                    >
                        <Typography variant="h4" className="px-4 py-1 text-white">ایجاد تنخواه گردان</Typography>
                    </ButtonComponent>
                </Box>
                <MuiDataGrid
                    columns={columns(renderAction)}
                    getRowId={(row: { id: string }) => row.id}
                    rows={results}
                    data={slanderer?.data}
                />
                </ReusableCard>
                <ReusableCard cardClassName='lg:flex gap-4 hidden'>
                    <Box component="div">
                        <Box component="div" className="hidden md:flex md:justify-center md:items-center">
                          <Box className="flex flex-col flex-wrap gap-4">
                            <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
                            <Typography>هر کالایی که تعریف می شود استاندارد مخصوص به خود را دارا می باشد</Typography>
                            <Typography>از طریق فرم مقابل می توانید تمامی استادارد ها را تعریف کرده و در فرم تعریف کالا از این استادارد ها برای اختصاص به به کالا استفاده کنید</Typography>
                            <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
                            <Typography>امکان حذف استادارد کالا وجود ندارد اما می توانید اقدام به غیرفعاسازی کالابرند کنید</Typography>
                            <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
                            <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی کالابرند با پشتیبانی تماس بگیرید</Typography>
                          </Box>
                        </Box>
                    </Box>
                    <Box component="div">
                      <Box
                        component="div"
                        className="hidden md:flex md:justify-center md:items-center"
                      >
                        <Box component="img"
                          src={toAbsoulteUrl("/media/logos/11089.jpg")}
                          width={400}
                        />
                      </Box>
                    </Box>
                </ReusableCard>
            </Box>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد تنخواه گردان جدید"
                width="60%"
                description="لطفاً مشخصات تنخواه گردان را با دقت وارد کنید اگر سوال یا نیاز به راهنمایی بیشتر دارید، با تیم پشتیبانی تماس بگیرید."
            >
                <SlandererForm
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش تنخواه گردان جدید"
                width="60%"
                description=" درصورتی که تنخواه گردانی نیاز به ویرایش داشته باشد می توانید از طریق فرم زیر اقدام به ویرایش تنخواه گردان نمایید"
            >
                <SlandererForm
                    id={itemForEdit?.id}
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
        </>
    );
};

export default Slanderers;