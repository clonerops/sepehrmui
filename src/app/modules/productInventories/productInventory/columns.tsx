import { Typography } from "@mui/material";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import { CallMade, CallReceived } from "@mui/icons-material";

export const columnsProductInventories = () => {
    const col = [
        {
            field: "productCode",
            headerName: "کدکالا",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            minWidth: 100,
            flex: 1,
        },
        {
            field: "productName",
            headerName: "کالا",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            minWidth: 180,
            flex: 1,
        },
        {
            field: "productBrandName",
            minWidth: 130,
            maxWidth: 130,
            headerName: "برند",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            flex: 1,
        },
        {
            field: "warehouseName",

            minWidth: 120,
            maxWidth: 120,
            headerName: "انبار",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
            flex: 1,
        },
        {
            field: "floorInventory",
            minWidth: 140,
            maxWidth: 180,
            headerName: "موجودی واقعی",
            renderCell: (params: any) => {
                return <Typography variant="h4" color={params.value < 0 ?  "red" : params.value > 0 ? "green" : "black"}>
                    {separateAmountWithCommas(params.value)} {params.value < 0 ? ( <CallReceived className="text-red-500" fontSize="small" />) : params.value > 0 ? ( <CallMade className="text-green-500" fontSize="small" />) : null}
                </Typography>;
            },
            headerClassName: "headerClassName",
            flex: 1,
        },

        {
            field: "approximateInventory",
            minWidth: 180,
            headerName: "موجودی تقریبی",
            flex: 1,
            renderCell: (params: any) => {
                return <Typography variant="h4" color={params.value < 0 ?  "red" : params.value > 0 ? "green" : "black"}>
                    {separateAmountWithCommas(params.value)} {params.value < 0 ? ( <CallReceived className="text-red-500" fontSize="small" />) : params.value > 0 ? ( <CallMade className="text-green-500" fontSize="small" />) : null}
                </Typography>;
            },

            headerClassName: "headerClassName",
        },
    ];
    return col;
};
