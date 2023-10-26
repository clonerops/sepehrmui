import { Typography } from "@mui/material";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";

export const orderColumns = (renderAction: any) => {
    const col = [
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
            headerName: 'تاریخ ثبت سفارش', headerClassName: "headerClassName", minWidth: 120, maxWidth: 120, flex: 1
        },
        {
            field: 'customerName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'سفارش دهنده', headerClassName: "headerClassName", minWidth: 160, flex: 1
        },
        {
            field: 'orderSendTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نحوه ارسال', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'paymentTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نحوه پرداخت', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'invoiceTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع فاکتور', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'exitType', headerName: 'نوع خروج', renderCell: (params: any) => (
                params.value === 1 ? <Typography className="text-green-500" variant="h4">عادی</Typography> : <Typography className="text-blue-500">بعد از تسویه</Typography>
            ), headerClassName: "headerClassName", minWidth: 120, maxWidth: 120, flex: 1
        },
        { headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}

export const columnsModalProduct = (renderAction: any) => {
    const col = [
        {
            field: "productName",
            headerName: "کالا",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            width: 140,
        },
        {
            field: "productBrandName",
            width: 80,
            headerName: "برند",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
        },
        {
            field: "warehouseName",

            width: 80,
            headerName: "انبار",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
        },
        {
            field: "inventory",
            width: 60,
            headerName: "موجودی",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
        },
        {
            field: "productMainUnitDesc",
            width: 80,
            headerName: "واحد اصلی",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
        },
        {
            field: "productPrice",
            minWidth: 60,
            headerName: "قیمت",
            flex: 1,
            renderCell: (value: any) =>
                separateAmountWithCommas(value.row.productPrice),
            headerClassName: "headerClassName",
        },
    ];
    return col;
};

export const columnsSelectProduct = (renderAction: any, renderInput: any) => {
    const col = [
        {
            field: "productName",
            headerName: "کالا",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            width: 100,
        },
        {
            field: "thickness",
            minWidth: 160,
            headerName: "مقدار",
            renderCell: renderInput,
            headerAlign: "center",
            headerClassName: "headerClassName",
        },
        {
            field: "productBrandName",
            width: 80,
            headerName: "برند",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
        },
        {
            field: "warehouseName",
            width: 80,
            headerName: "انبار",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
        },
        {
            field: "productMainUnitDesc",
            width: 80,
            headerName: "واحد اصلی",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
        },
        {
            field: "Action",
            minWidth: 60,
            renderCell: renderAction,
            headerName: "حذف",
            flex: 1,
            headerClassName: "headerClassName",
        },
    ];
    return col;
};

export const columnsOrderDetail = [
    {
        headerName: 'شماره ردیف', field: 'rowId', renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, headerClassName: "headerClassName", flex: 1, maxWidth: 100, minWidth: 100
    },
    {
        headerName: 'نام کالا', field: 'productName', renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
    {
        headerName: 'انبار', field: 'warehouseName', renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
    {
        headerName: 'قیمت', field: 'price', renderCell: (params: any) => {
            return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
    {
        headerName: 'تاریخ ارسال بار', field: 'cargoSendDate', renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
    {
        headerName: 'مقدار تقریبی', field: 'proximateAmount', renderCell: (params: any) => {
            return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
    {
        headerName: 'تعداد در بسته', field: 'numberInPackage', renderCell: (params: any) => {
            return <Typography>{params.value}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
];