import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Tooltip, Typography } from "@mui/material";
import { Approval } from "@mui/icons-material";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import Backdrop from "../../../_cloner/components/Backdrop";
import Pagination from "../../../_cloner/components/Pagination";
import { useGetExitPermitListByMutation } from "./_hooks";
import { ExitRemittanceColumn } from "../../../_cloner/helpers/columns";

const pageSize = 100;

const ReadyToApproveExitFareAmount = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const exitListTools = useGetExitPermitListByMutation();


    useEffect(() => {
        let formData = {
            PageNumber: currentPage,
            PageSize: pageSize,
        };
        exitListTools.mutate(formData);
        //  eslint-disable-next-line
    }, [currentPage]);

    const renderAction = (item: any) => {
        return (
            <div className="flex flex-row items-center justify-center gap-x-4">
                <Tooltip title={<Typography variant='h3'>تایید کرایه</Typography>}>
                    <Link target="_blank" to={`/dashboard/approveDriverFareAmount/${item?.row?.id}/${item?.row?.ladingExitPermitCode}/${item?.row?.createdDate}`}>
                        <Button variant="contained" size="small" color="secondary">
                            <Typography>اقدام به تایید کرایه</Typography>
                        </Button>
                    </Link>
                </Tooltip>
            </div>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    if(exitListTools.isLoading) {
        return <Backdrop loading={exitListTools.isLoading} />
    }

    return (
        <>
            <ReusableCard>
                <MuiDataGrid
                    columns={ExitRemittanceColumn(renderAction)}
                    rows={exitListTools?.data?.data}
                    data={exitListTools?.data?.data}
                    isLoading={exitListTools?.isLoading}
                    onDoubleClick={() => {}}
                    hideFooter
                />
                <Pagination
                    pageCount={+exitListTools?.data?.totalCount / pageSize}
                    onPageChange={handlePageChange}
                />
            </ReusableCard>
        </>
    );
};

export default ReadyToApproveExitFareAmount;
