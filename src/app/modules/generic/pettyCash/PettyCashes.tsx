import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import EditGridButton from "../../../../_cloner/components/EditGridButton";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import Backdrop from "../../../../_cloner/components/Backdrop";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { IPettyCash } from "./_models";
import { useDeletePettyCash, useGetPettyCashList, usePutPettyCash } from "./_hooks";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import PettyCashForm from "./PettyCashForm";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import SwitchComponent from "../../../../_cloner/components/Switch";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";

const PettyCashs = () => {
    const { data: PettyCash, refetch } = useGetPettyCashList();
    const { mutate, isLoading: deleteLoading } = useDeletePettyCash();
    const updateTools = usePutPettyCash();

    const [results, setResults] = useState<IPettyCash[]>([]);

    useEffect(() => {
        setResults(PettyCash?.data);
         // eslint-disable-next-line
    }, [PettyCash]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IPettyCash>();

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "pettyCashDescription",
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

    const handleEdit = (item: IPettyCash) => {
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
            PettyCashDescription: rowData.row.PettyCashDescription,
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
            <div className="flex justify-center items-center gap-4">
                <EditGridButton onClick={() => handleEdit(item?.row)} />
                <DeleteGridButton onClick={() => handleDelete(item?.row?.id)} />
                <SwitchComponent
                    checked={item?.row.isActive}
                    onChange={(_) => onUpdateStatus(item)}
                />
            </div>
        );
    };
    

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <ReusableCard cardClassName="col-span-2">
                <div
                
                    className="md:flex md:justify-between md:items-center space-y-2 mb-4"
                >
                    <div className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={[
                                "mobileNo",
                                "PettyCashDescription",
                            ]}
                            data={PettyCash?.data}
                            setResults={setResults}
                        />
                    </div>
                    <ButtonComponent
                        onClick={() => setIsCreateOpen(true)}
                    >
                        <Typography variant="h4" className="px-4 py-1 text-white">ایجاد تنخواه گردان</Typography>
                    </ButtonComponent>
                </div>
                <MuiDataGrid
                    columns={columns(renderAction)}
                    getRowId={(row: { id: string }) => row.id}
                    rows={results}
                    data={PettyCash?.data}
                    onDoubleClick={(item: any) => handleEdit(item?.row)}
                />
                </ReusableCard>
                <ReusableCard cardClassName='lg:flex gap-4 hidden'>
                    <div>
                        <div className="hidden md:flex md:justify-center md:items-center">
                          <div className="flex flex-col flex-wrap gap-4">
                            <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
                            <Typography>از طریق فرم مقابل می توانید تمامی تنخواه گردان ها را تعریف کرده و ثبت نمایید</Typography>
                            <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
                            <Typography>امکان حذف تنخواه گردان کالا وجود ندارد اما می توانید اقدام به غیرفعاسازی کالابرند کنید</Typography>
                            <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
                            <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی کالابرند با پشتیبانی تماس بگیرید</Typography>
                          </div>
                        </div>
                    </div>
                    <div>
                      <div className="hidden md:flex md:justify-center md:items-center">
                        <img alt="sepehriranian"
                          src={toAbsoulteUrl("/media/logos/fund.png")}
                          width={400}
                        />
                      </div>
                    </div>
                </ReusableCard>
            </div>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد تنخواه گردان جدید"
                width="60%"
                description="لطفاً مشخصات تنخواه گردان را با دقت وارد کنید اگر سوال یا نیاز به راهنمایی بیشتر دارید، با تیم پشتیبانی تماس بگیرید."
            >
                <PettyCashForm
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
                <PettyCashForm
                    id={itemForEdit?.id}
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
        </>
    );
};

export default PettyCashs;
