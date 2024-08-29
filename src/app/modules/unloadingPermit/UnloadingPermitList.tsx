import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Typography } from "@mui/material";
import { Approval, LayersClear, Print, Search, Visibility } from "@mui/icons-material";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import Backdrop from "../../../_cloner/components/Backdrop";
import Pagination from "../../../_cloner/components/Pagination";
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog";
import { UnloadingPemritColumn } from "../../../_cloner/helpers/columns";
import { useGetUnloadingPermitListByMutation, useRevokeUnloadingById } from "./_hooks";
import { Formik } from "formik";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import FormikInput from "../../../_cloner/components/FormikInput";

const pageSize = 100;

const UnloadingPermitList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [approve, setApprove] = useState<boolean>(false);
    const [selecetdId, setSelectedId] = useState<number>(0)

    const unloadingListTools = useGetUnloadingPermitListByMutation();
    const revokeUnloading = useRevokeUnloadingById()


    useEffect(() => {
        let formData = {
            PageNumber: currentPage,
            PageSize: pageSize,
        };
        unloadingListTools.mutate(formData);
        //  eslint-disable-next-line
    }, [currentPage]);

    const handleOpenApprove = (id: number) => {
        setApprove(true)
        setSelectedId(id)
    }


    const handleRevokeUnloading = (id: number) => {
        revokeUnloading.mutate(id, {
            onSuccess: (response) => {
                if (response.message) {
                    EnqueueSnackbar(response.message, 'success')
                    unloadingListTools.mutate({});
                    setApprove(false)
                } else {
                    EnqueueSnackbar(response.data.Message, 'error')
                }
            }
        })
    }


    const renderAction = (item: any) => {
        return (
            <div className="flex flex-row items-center justify-center gap-x-4">
                {/* <Tooltip title={<Typography variant='h3'>پرینت</Typography>}>
                    <div className="flex gap-x-4">
                        <Link to={`/dashboard/ladingUnloadingPermitOfficial_print/${item?.row?.id}/${item?.row?.ladingUnloadingPermitCode}/${item?.row?.createdDate}`}>
                            <Print color="primary" />
                        </Link>
                    </div>
                </Tooltip> */}
                {/* <Tooltip title={<Typography variant='h3'>ابطال تخلیه</Typography>}>
                    <div className="flex gap-x-4">
                        <LayersClear onClick={() => handleOpenApprove(item?.row?.id)} className="text-red-500" />
                    </div>
                </Tooltip> */}
                <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
                    {/* <Link to={`/dashboard/ladingUnloadingPermitDetail/${item?.row?.id}/${item?.row?.unloadingPermitCode}/${item?.row?.createdDate}`}> */}
                    <Link to={`/dashboard/unloadingDetail/${item?.row?.id}`}>
                        <Visibility className="text-yellow-500" />
                    </Link>
                </Tooltip>
                {/* <Tooltip title={<Typography variant='h3'>ویرایش مجوز خروج</Typography>}>
                    <Link to={`/dashboard/UnloadingEdit/${item?.row?.id}/${item?.row?.ladingUnloadingPermitCode}/${item?.row?.createdDate}`}>
                        <Edit className="text-yellow-500" />
                    </Link>
                </Tooltip> */}
            </div>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const handleFilter = (values: any) => {
        let formData = {
            UnloadingPermitCode: values.UnloadingPermitCode,
            PageNumber: currentPage,
            PageSize: pageSize,
        };
        unloadingListTools.mutate(formData);

    }

    if (unloadingListTools.isLoading) {
        return <Backdrop loading={unloadingListTools.isLoading} />
    }

    return (
        <>
            {revokeUnloading?.isLoading && <Backdrop loading={revokeUnloading?.isLoading} />}
            <ReusableCard>
                <Formik initialValues={{ UnloadingPermitCode: "" }} onSubmit={() => { }}>
                    {({ values }) => {
                        return (
                            <div className="flex flex-col lg:flex-row gap-4 w-full mb-4" >
                                <FormikInput name="UnloadingPermitCode" label="شماره مجوز تخلیه" />
                                <ButtonComponent onClick={() => handleFilter(values)}>
                                    <Search className="text-white" />
                                    <Typography className="text-white"> جستجو </Typography>
                                </ButtonComponent>
                            </div>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={UnloadingPemritColumn(renderAction)}
                    rows={unloadingListTools?.data?.data}
                    data={unloadingListTools?.data?.data}
                    isLoading={unloadingListTools?.isLoading}
                    onDoubleClick={() => { }}
                    hideFooter
                />
                <Pagination
                    pageCount={+unloadingListTools?.data?.totalCount / pageSize}
                    onPageChange={handlePageChange}
                />
            </ReusableCard>
            <ConfirmDialog
                open={approve}
                hintTitle="آیا از ابطال مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={revokeUnloading.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleRevokeUnloading(selecetdId)}

            />
        </>
    );
};

export default UnloadingPermitList;
