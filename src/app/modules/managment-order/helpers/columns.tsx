import { Typography } from "@mui/material";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import { CallMade, CallReceived } from "@mui/icons-material";

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
            field: 'orderTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع سفارش', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'customerName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'سفارش دهنده', headerClassName: "headerClassName", minWidth: 190, flex: 1
        },
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
            headerName: 'نوع ثبت', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: 'orderStatusId', renderCell: (params: any) => {
                return params.value === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 140 }
    ]
    return col
}
export const purchaserOrderColumns = (renderAction: any) => {
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
            headerName: 'فروشنده', headerClassName: "headerClassName", minWidth: 160, flex: 1
        },
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
            field: 'purchaseOrderStatusDesc', renderCell: (params: any) => {
                return params.value === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.purchaseOrderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.purchaseOrderStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 120 }
    ]
    return col
}

export const orderListColumns = (renderActions: any) => {
    const col = [
        {
            headerName: "کالا", field: "productName",
            renderCell: (params: any) => {
                console.log("params", params)
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 190
        },
        {
            headerName: "برند", field: "productBrandName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 80,
        },
        {
            headerName: "نام انبار", field: "warehouseName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 90,
        },
        {
            headerName: "مقدار", field: "proximateAmount",
            renderCell: (params: any) => {
                const combinedValue = `${params.row.proximateAmount} ${params.row.productMainUnitDesc} `;
                return <Typography variant="h4">{combinedValue}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 90,
        },
        {
            headerName: "مقدار(فرعی)", field: "proximateSubUnit",
            renderCell: (params: any) => {
                const combinedValue = `${params.row.proximateSubUnit} ${params.row.productSubUnitDesc}`;
                return <Typography variant="h4">{combinedValue}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "قیمت(ریال)", field: "price",
            renderCell: (params: any) => {
                return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 90,
        },

        {
            headerName: "قیمت خرید", field: "purchasePrice",
            renderCell: (params: any) => {
                return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 90,
        },
        {
            headerName: "تاریخ تحویل", field: "purchaseSettlementDate",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        // {
        //     headerName: "نوع فاکتور خرید", field: "purchaseInvoiceTypeDesc",
        //     renderCell: (params: any) => {
        //         return <Typography variant="h4">{params.value}</Typography>
        //     }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        // },
        {
            headerName: "", field: "rowId", hide: true
        },
        {
            headerName: "", field: "warehouseId", type: "hidden"
        },
        {
            headerName: "", field: "productBrandId", type: "hidden"
        },
        {
            headerName: "", field: "purchaseInvoiceTypeId", type: "hidden"
        },
        {
            headerName: "", field: "purchaserCustomerName", type: "hidden"
        },
        {
            headerName: "", field: "purchaserCustomerName", type: "hidden"
        },
        {
            headerName: "حذف",
            field: "Action",
            renderCell: renderActions,
            headerClassName: "headerClassName",
            maxWidth: 60,
            flex: 1
        },
    ];
    return col;
}
export const orderPurchaserListColumns = (renderActions: any) => {
    const col = [
        {
            headerName: "کالا", field: "productName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 190, maxWidth: 190
        },
        {
            headerName: "برند", field: "productBrandName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "مقدار", field: "proximateAmount",
            renderCell: (params: any) => {
                const combinedValue = `${params.row.proximateAmount} ${params.row.productMainUnitDesc} `;
                return <Typography variant="h4">{combinedValue}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "مقدار(فرعی)", field: "proximateSubUnit",
            renderCell: (params: any) => {
                const combinedValue = `${params.row.proximateSubUnit} ${params.row.productSubUnitDesc}`;
                return <Typography variant="h4">{combinedValue}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "قیمت(ریال)", field: "price",
            renderCell: (params: any) => {
                return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },

        {
            headerName: "قیمت خرید", field: "purchasePrice",
            renderCell: (params: any) => {
                return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "تاریخ تحویل", field: "purchaseSettlementDate",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        // {
        //     headerName: "نوع فاکتور خرید", field: "purchaseInvoiceTypeDesc",
        //     renderCell: (params: any) => {
        //         return <Typography variant="h4">{params.value}</Typography>
        //     }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        // },
        {
            headerName: "", field: "rowId", hide: true
        },
        {
            headerName: "", field: "warehouseId", type: "hidden"
        },
        {
            headerName: "", field: "productBrandId", type: "hidden"
        },
        {
            headerName: "", field: "purchaseInvoiceTypeId", type: "hidden"
        },
        {
            headerName: "", field: "purchaserCustomerName", type: "hidden"
        },
        {
            headerName: "", field: "purchaserCustomerName", type: "hidden"
        },
        {
            headerName: "حذف",
            field: "Action",
            renderCell: renderActions,
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
    ];
    return col;
}

export const readyToLadingColumns = (renderAction: any) => {
    const col = [
        {
            field: 'cargoAnnounceNo', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره اعلام بار', headerClassName: "headerClassName", minWidth: 100, maxWidth: 100, flex: 1
        },
        {
            field: 'orderCode', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.order.orderCode}</Typography>;
            },
            headerName: 'شماره سفارش', headerClassName: "headerClassName", minWidth: 100, maxWidth: 100, flex: 1
        },
        {
            field: 'registerDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.order.registerDate}</Typography>;
            },
            headerName: 'تاریخ ثبت سفارش', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'customerName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.order.customerFirstName+ " " +params.row.order.customerLastName}</Typography>;
            },
            headerName: 'سفارش دهنده', headerClassName: "headerClassName", minWidth: 160, flex: 1
        },
        {
            field: 'invoiceTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.order.invoiceTypeDesc}</Typography>;
            },
            headerName: 'نوع فاکتور', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'isTemporary', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.order.isTemporary === false ? "ثبت نهایی" : "ثبت موقت"}</Typography>;
            },
            headerName: 'نوع ثبت', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'orderStatusId', renderCell: (params: any) => {
                return params.row.order.orderStatusId === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.order.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.order.orderStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.row.order.totalAmount)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 120 },
    ]
    return col
}

export const ladingColumns = (renderAction: any) => {
    const col = [
        {
            field: 'id', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره مجوز', headerClassName: "headerClassName", minWidth: 100, maxWidth: 100, flex: 1
        },
        {
            field: 'createDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ ثبت مجوز', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'cargoAnnounceNo', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.cargoAnnounce.cargoAnnounceNo}</Typography>;
            },
            headerName: 'شماره اعلام بار', headerClassName: "headerClassName", minWidth: 160, flex: 1
        },
        {
            field: 'driverName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.cargoAnnounce.driverName}</Typography>;
            },
            headerName: 'راننده', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'isTemporary', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.cargoAnnounce.vehicleTypeName}</Typography>;
            },
            headerName: 'نوع وسیله نقلیه', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'carPlaque', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.cargoAnnounce.carPlaque}</Typography>;
            },
            headerName: 'شماره پلاک خودروبر', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        { field: "Action", headerName: 'ویرایش', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}

export const columnsModalProduct = () => {
    const col = [
        {
            field: "productCode",
            headerName: "کدکالا",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            maxWidth: 80,
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
            field: "price",
            minWidth: 60,
            headerName: "قیمت",
            flex: 1,
            renderCell: (value: any) =>
                <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(value.row.price)}</Typography>,
            headerClassName: "headerClassName",
        },
    ];
    return col;
};
export const columnsProductInventories = () => {
    const col = [
        {
            field: "productCode",
            headerName: "کدکالا",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            maxWidth: 80,
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
            field: "price",
            minWidth: 60,
            headerName: "موجودی مجازی",
            flex: 1,
            renderCell: (value: any) =>
                <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(value.row.price)}</Typography>,
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
            field: "price",
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

export const salesOrderConfirm = (renderAction: any) => {
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
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}
export const purchaserOrderConfirm = (renderAction: any) => {
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
            headerName: 'فروشنده', headerClassName: "headerClassName", minWidth: 160, flex: 1
        },
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
            field: 'purchaseOrderStatusDesc', renderCell: (params: any) => {
                return params.value === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.purchaseOrderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.purchaseOrderStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}

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