import { Typography } from "@mui/material";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import ActiveText from "../../../../_cloner/components/ActiveText";

export const columnsProductPrice = (renderAction: any) => {
    const col = [
        {
            field: "productName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "نام کالا",
            headerClassName: "headerClassName",
            minWidth: 160,
            flex: 1,
        },
        {
            field: "brandName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "نام برند",
            headerClassName: "headerClassName",
            minWidth: 160,
            flex: 1,
        },
        {
            field: "price",
            headerName: "قیمت",
            renderCell: (value: any) =>
                separateAmountWithCommas(value.row.price) + " " + "تومان",
            headerClassName: "headerClassName",
            cellClassName: "font-bold text-[14px]",
            minWidth: 160,
            flex: 1,
        },
        {
            field: "registerDate",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "تاریخ قیمت",
            headerClassName: "headerClassName font-bold",
            minWidth: 160,
            flex: 1,
        },
        {
            field: "isActive",
            headerName: "وضعیت",
            renderCell: (params: any) => {
                return (
                    <ActiveText
                        params={params}
                        successTitle="فعال"
                        dangerTitle="غیرفعال"
                    />
                );
            },
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1,
        },
        {
            field: "Action",
            headerName: "عملیات",
            renderCell: renderAction,
            headerClassName: "headerClassName",
            minWidth: 160,
            flex: 1,
        },
    ];
    return col;
};
export const columnsProductPriceDashboard = (renderAction: any) => {
    const col = [
        {
            field: "productName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "نام کالا",
            headerClassName: "headerClassName",
            minWidth: 220,
            maxWidth: 220,
            flex: 1,
        },
        {
            field: "productBrandName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "نام برند",
            headerClassName: "headerClassName",
            minWidth: 100,
            maxWidth: 100,
            flex: 1,
        },
        {
            field: "productPrice",
            headerName: "قیمت(ریال)",
            renderCell: (value: any) =>
                <Typography variant="h3" className="text-green-500">{separateAmountWithCommas(value.row.productPrice)}</Typography>,
            headerClassName: "headerClassName",
            cellClassName: "font-bold text-[14px]",
            minWidth: 160,
            flex: 1,
        },
        // {
        //     field: "registerDate",
        //     renderCell: (params: any) => {
        //         return <Typography variant="h5">{params.value}</Typography>;
        //     },
        //     headerName: "تاریخ قیمت",
        //     headerClassName: "headerClassName font-bold",
        //     minWidth: 160,
        //     flex: 1,
        // },
    ];
    return col;
};
