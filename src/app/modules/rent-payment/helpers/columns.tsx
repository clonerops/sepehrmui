import { Checkbox, Typography } from "@mui/material";
import React from "react";

export const rentsColumns = (renderAction: any, renderCheckbox: any,  isSelectAll: boolean, setIsSelectAll: React.Dispatch<React.SetStateAction<boolean>>) => {
    const col = [
        {
            field: "ladingExitPermitId",
            headerName: (
                <Checkbox
                    color="primary"
                    checked={isSelectAll}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsSelectAll(event.target.checked)}
                />
            ),
            sortable: false,
            renderCell: renderCheckbox,
            headerClassName: "headerClassName",
            minWidth: 80,
            flex: 1
        },
        {
            field: 'referenceCode', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره مرجع', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
      
        {
            field: 'referenceDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ ثبت', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
      
        {
            field: 'cargoAnnounceNo', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره بارنامه', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
      
        {
            field: 'orderTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع سفارش', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
      
        {
            field: 'cargoTotalWeight', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'وزن بار', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
      
        {
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نرخ کرایه', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
        {
            field: 'otherCosts', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'سایر هزینه ها', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
      
        {
            field: 'totalPayableAmount', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'مبلغ قابل پرداخت', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
      
        {
            field: 'driverName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نام راننده', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
      
        {
            field: 'driverMobile', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'موبایل راننده', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
      
        {
            field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}
