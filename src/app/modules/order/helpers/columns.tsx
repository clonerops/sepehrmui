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
            headerName: 'تاریخ ثبت سفارش', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'customerName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'سفارش دهنده', headerClassName: "headerClassName", minWidth: 160, flex: 1
        },
        // {
        //     field: 'orderSendTypeDesc', renderCell: (params: any) => {
        //         return <Typography variant="h4">{params.value}</Typography>;
        //     },
        //     headerName: 'نحوه ارسال', headerClassName: "headerClassName", minWidth: 120, flex: 1
        // },
        // {
        //     field: 'paymentTypeDesc', renderCell: (params: any) => {
        //         return <Typography variant="h4">{params.value}</Typography>;
        //     },
        //     headerName: 'نحوه پرداخت', headerClassName: "headerClassName", minWidth: 120, flex: 1
        // },
        {
            field: 'invoiceTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع فاکتور', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'isTemporary', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value === false ? "ثبت نهایی" : "ثبت موقت"}</Typography>;
            },
            headerName: 'نوع ثبت', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'orderStatusId', renderCell: (params: any) => {
                return params.value === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography>
                // return <Typography variant="h4">{params.value === false ? "عدم تایید" : "تایید"}</Typography>;
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        // {
        //     field: 'exitType', headerName: 'نوع خروج', renderCell: (params: any) => (
        //         params.value === 1 ? <Typography className="text-green-500" variant="h4">عادی</Typography> : <Typography className="text-blue-500">بعد از تسویه</Typography>
        //     ), headerClassName: "headerClassName", minWidth: 120, maxWidth: 120, flex: 1
        // },
        { headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}

export const columnsModalProduct = () => {
    const col = [
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
            minWidth: 80,
            maxWidth: 80,
            headerName: "برند",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            flex: 1,
        },
        {
            field: "warehouseName",

            minWidth: 80,
            maxWidth: 80,
            headerName: "انبار",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
            flex: 1,
        },
        {
            field: "inventory",
            minWidth: 90,
            maxWidth: 90,
            headerName: "موجودی",
            renderCell: (params: any) => {
                return <Typography variant="h5">{separateAmountWithCommas(params.value)}</Typography>;
            },

            headerClassName: "headerClassName",
            flex: 1,
        },
        // {
        //     field: "productMainUnitDesc",
        //     width: 80,
        //     headerName: "واحد",
        //     renderCell: (params: any) => {
        //      return <Typography variant="h5">{params.value}</Typography>;
        //     },

        //     headerClassName: "headerClassName",
        //     flex: 1,
        // },
        {
            field: "productPrice",
            minWidth: 60,
            headerName: "قیمت",
            flex: 1,
            renderCell: (value: any) =>
                <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(value.row.productPrice)}</Typography>,
            headerClassName: "headerClassName",
        },
    ];
    return col;
};

export const columnsSelectProduct = (renderAction: any, renderInput: any, renderSubUnit: any, renderPrice: any) => {
    const col = [
        {
            field: "productName",
            headerName: "کالا",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            minWidth: 160,
            flex: 1,
        },
        {
            field: "thickness",
            minWidth: 100,
            maxWidth: 100,
            headerName: "مقدار",
            renderCell: renderInput,
            headerAlign: "center",
            headerClassName: "headerClassName",
        },
        {
            field: "productBrandName",
            minWidth: 60,
            maxWidth: 60,
            headerName: "برند",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            flex: 1,
        },
        {
            field: "warehouseName",

            minWidth: 60,
            maxWidth: 60,
            headerName: "انبار",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
            flex: 1,
        },
        {
            field: "productSubUnitDesc",
            minWidth: 180,
            maxWidth: 180,
            headerName: "واحد فرعی",
            renderCell: renderSubUnit,
            headerClassName: "headerClassName",
            flex: 1,
        },
        {
            field: "productPrice",
            minWidth: 120,
            maxWidth: 120,
            headerName: "قیمت",
            flex: 1,
            renderCell: renderPrice,
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
export const columnsOrderConfirm = [
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
        headerName: 'مقدار', field: 'proximateAmount', renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
    {
        headerName: 'قیمت', field: 'price', renderCell: (params: any) => {
            return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
    {
        headerName: 'کالا رسمی', field: 'productName', renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
    {
        headerName: 'مقدار', field: 'proximateAmount', renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
    {
        headerName: 'قیمت', field: 'price', renderCell: (params: any) => {
            return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>
        }, headerClassName: "headerClassName", flex: 1
    },
];