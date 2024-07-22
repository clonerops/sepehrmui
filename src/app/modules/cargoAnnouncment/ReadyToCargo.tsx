import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import Backdrop from "../../../_cloner/components/Backdrop";

import { useRetrievesNotSendedOrder } from "./_hooks";
import { ICargo } from "./_models";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";


const ReadyToCargo = () => {
    const navigate = useNavigate()
    const readyToCargoOrder = useRetrievesNotSendedOrder();

    const [results, setResults] = useState<ICargo[]>([]);

    useEffect(() => {
        setResults(readyToCargoOrder?.data);
         // eslint-disable-next-line
    }, [readyToCargoOrder?.data]);

    const readyToCargoColumns = (renderAction: any) => {
        const col = [
            {field: "Action",  headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 },
            {
                field: 'orderCode', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'شماره سفارش', headerClassName: "headerClassName", minWidth: 100, maxWidth: 100, flex: 1
            },
            {
                field: 'registerDate', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'تاریخ ثبت سفارش', headerClassName: "headerClassName", minWidth: 120, flex: 1
            },
            {
                field: 'customerName', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'سفارش دهنده', headerClassName: "headerClassName", minWidth: 160, flex: 1
            },
            {
                field: 'orderExitTypeDesc', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'نوع خروج', headerClassName: "headerClassName", minWidth: 120, maxWidth: 120, flex: 1
            },
            {
                field: 'paymentTypeDesc', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'نوع کرایه', headerClassName: "headerClassName", minWidth: 100, maxWidth: 100, flex: 1
            },
            {
                field: 'invoiceTypeDesc', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'نوع فاکتور', headerClassName: "headerClassName", minWidth: 80, maxWidth: 80, flex: 1
            },
            {
                field: 'totalAmount', renderCell: (params: any) => {
                    return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
                },
                headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
            },
        ]
        return col
    }

    const renderAction = (item: any) => {
        return (
            <Link to={`/dashboard/order_ready_cargo/${item?.row?.id}`}>
                <Button variant="contained" color="secondary">
                    <Typography variant="h5">صدور اعلام بار</Typography>
                </Button>
            </Link>
        );
    };

    return (
        <>
            <ReusableCard>
                <div className="w-auto md:w-[40%] mb-4">
                    <FuzzySearch
                        keys={[ "orderCode", "registerDate", "customerFirstName", "customerLastName", "totalAmount"]}
                        data={readyToCargoOrder?.data}
                        setResults={setResults}
                    />
                </div>
                <MuiDataGrid
                    columns={readyToCargoColumns(renderAction)}
                    rows={results}
                    data={readyToCargoOrder?.data}
                    isLoading={readyToCargoOrder.isLoading}
                    onDoubleClick={(item: any) => navigate(`/dashboard/order_ready_cargo/${item?.row?.id}`)}
                />
            </ReusableCard>
        </>
    );
};

export default ReadyToCargo;
