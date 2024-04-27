import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetExitPermitListByMutation, useGetLadingPermitListByMutation, useRevokeLadingById } from "../core/_hooks";
import { exitColumns } from "../../managment-order/helpers/columns";
import { Tooltip, Typography } from "@mui/material";
import { LayersClear, Print } from "@mui/icons-material";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Backdrop from "../../../../_cloner/components/Backdrop";
import Pagination from "../../../../_cloner/components/Pagination";
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog";

const pageSize = 100;

const ExitList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [approve, setApprove] = useState<boolean>(false);
    const [selecetdId, setSelectedId] = useState<number>(0)

    const exitListTools = useGetExitPermitListByMutation();
    const revokeLading = useRevokeLadingById()


    useEffect(() => {
        let formData = {
            pageNumber: currentPage,
            pageSize: pageSize,
        };
        exitListTools.mutate(formData);
        //  eslint-disable-next-line
    }, [currentPage]);

    const handleOpenApprove = (id: number) => {
        setApprove(true)
        setSelectedId(id)
      }
    

    const handleRevokeLading = (id: number) => {
        revokeLading.mutate(id, {
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
                        <Link to={`/dashboard/ladingPermit_print/${item?.row?.cargoAnnounceId}/${item?.row?.id}/${item?.row?.createDate}`}>
                            <Print color="primary" />
                        </Link>
                    </div>
                </Tooltip>
                <Tooltip title={<Typography variant='h3'>ابطال بارگیری</Typography>}>
                    <div className="flex gap-x-4">
                        <LayersClear onClick={() => handleOpenApprove(item?.row?.id)} className="text-red-500" />
                    </div>
                </Tooltip>
            </div>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <>
            {revokeLading?.isLoading && <Backdrop loading={revokeLading?.isLoading} />}
            <ReusableCard>
                <MuiDataGrid
                    columns={exitColumns(renderAction)}
                    rows={exitListTools?.data?.data}
                    data={exitListTools?.data?.data}
                    isLoading={exitListTools?.isLoading}
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
                confirmText={revokeLading.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleRevokeLading(selecetdId)}

            />

        </>
    );
};

export default ExitList;
