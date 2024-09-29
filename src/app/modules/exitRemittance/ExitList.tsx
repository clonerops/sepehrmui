import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Typography } from "@mui/material";
import { Approval, LayersClear, Print, Visibility } from "@mui/icons-material";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import Backdrop from "../../../_cloner/components/Backdrop";
import Pagination from "../../../_cloner/components/Pagination";
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog";
import { useGetExitPermitListByMutation, useRevokeExitById } from "./_hooks";
import { ExitRemittanceColumn } from "../../../_cloner/helpers/columns";
import { useAuth } from "../../../_cloner/helpers/checkUserPermissions";
import AccessDenied from "../../routing/AccessDenied";

const pageSize = 100;

const ExitList = () => {
    const { hasPermission } = useAuth()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [approve, setApprove] = useState<boolean>(false);
    const [selecetdId, setSelectedId] = useState<number>(0)

    const exitListTools = useGetExitPermitListByMutation();
    const revokeExit = useRevokeExitById()


    useEffect(() => {
        let formData = {
            PageNumber: currentPage,
            PageSize: pageSize,
        };
        exitListTools.mutate(formData);
        //  eslint-disable-next-line
    }, [currentPage]);

    const handleOpenApprove = (id: number) => {
        setApprove(true)
        setSelectedId(id)
    }


    const handleRevokeExit = (id: number) => {
        revokeExit.mutate(id, {
            onSuccess: (response) => {
                if (response.message) {
                    EnqueueSnackbar(response.message, 'success')
                    exitListTools.mutate({});
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
                <Tooltip title={<Typography variant='h3'>پرینت</Typography>}>
                    <div className="flex gap-x-4">
                        <Link target="_blank" to={`/dashboard/ladingExitPermitOfficial_print/${item?.row?.id}/${item?.row?.ladingExitPermitCode}/${item?.row?.createdDate}`}>
                            <Print color="primary" />
                        </Link>
                    </div>
                </Tooltip>
                {hasPermission("RevokeLadingExitPermit") &&
                    <Tooltip title={<Typography variant='h3'>ابطال خروج</Typography>}>
                        <div className="flex gap-x-4">
                            <LayersClear onClick={() => handleOpenApprove(item?.row?.id)} className="text-red-500" />
                        </div>
                    </Tooltip>
                }
                {hasPermission("ApproveDriverFareAmount") &&
                    <Tooltip title={<Typography variant='h3'>تایید کرایه</Typography>}>
                        <Link target="_blank" to={`/dashboard/approveDriverFareAmount/${item?.row?.id}/${item?.row?.ladingExitPermitCode}/${item?.row?.createdDate}`}>
                            <Approval className="text-green-500" />
                        </Link>
                    </Tooltip>
                }
                {hasPermission("GetLadingExitPermitById") &&
                    <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
                        <Link target="_blank" to={`/dashboard/ladingExitPermitDetail/${item?.row?.id}/${item?.row?.ladingExitPermitCode}/${item?.row?.createdDate}`}>
                            <Visibility className="text-yellow-500" />
                        </Link>
                    </Tooltip>
                }
                {/* <Tooltip title={<Typography variant='h3'>ویرایش مجوز خروج</Typography>}>
                    <Link target="_blank" to={`/dashboard/exitEdit/${item?.row?.id}/${item?.row?.ladingExitPermitCode}/${item?.row?.createdDate}`}>
                        <Edit className="text-yellow-500" />
                    </Link>
                </Tooltip> */}
            </div>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    if (!hasPermission("GetAllLadingExitPermits"))
        return <AccessDenied />

    if (exitListTools.isLoading) {
        return <Backdrop loading={exitListTools.isLoading} />
    }

    return (
        <>
            {revokeExit?.isLoading && <Backdrop loading={revokeExit?.isLoading} />}
            <ReusableCard>
                <MuiDataGrid
                    columns={ExitRemittanceColumn(renderAction)}
                    rows={exitListTools?.data?.data}
                    data={exitListTools?.data?.data}
                    isLoading={exitListTools?.isLoading}
                    onDoubleClick={() => { }}
                    hideFooter
                />
                <Pagination
                    pageCount={+exitListTools?.data?.totalCount / pageSize}
                    onPageChange={handlePageChange}
                />
            </ReusableCard>
            <ConfirmDialog
                open={approve}
                hintTitle="آیا از ابطال مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={revokeExit.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleRevokeExit(selecetdId)}

            />

        </>
    );
};

export default ExitList;
