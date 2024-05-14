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
            field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName",minWidth: 100, maxWidth: 100
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
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'orderStatusId', renderCell: (params: any) => {
                return params.value === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
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
            headerName: 'تاریخ ثبت سفارش', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", maxWidth: 120
        },
        {
            field: 'originWarehouseDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'انبار مبدا', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: 'destinationWarehouseDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'انبار مقصد', headerClassName: "headerClassName", minWidth: 80, flex: 1
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
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'orderStatusDesc', renderCell: (params: any) => {
                return params.value === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
    ]
    return col
}

export const orderListColumns = (renderActions: any) => {
    const col = [
        {
            headerName: "کالا", field: "productName",
            renderCell: (params: any) => {
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
            headerName: "تاریخ تحویل", field: "deliverDate",
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
        { field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 120, maxWidth: 120 },
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
            field: 'creatorName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.creatorName}</Typography>;
            },
            headerName: 'ثبت کننده', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'deliveryDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ تحویل', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'customerName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.order.customerFirstName + " " + params.row.order.customerLastName}</Typography>;
            },
            headerName: 'سفارش دهنده', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'driverName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'راننده', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'driverMobile', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره همراه راننده', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'fareAmount', renderCell: (params: any) => {
                return <Typography className="text-green-500" variant="h4">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'کرایه(ریال)', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'orderStatusId', renderCell: (params: any) => {
                return params.row.order.orderStatusId === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.order.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.order.orderStatusDesc}</Typography>
            },
            headerName: 'وضعیت سفارش', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
       
    ]
    return col
}

export const ladingColumns = (renderAction: any) => {
    const col = [
        { field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 120, maxWidth: 120 },
        {
            field: 'id', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره مجوز بارگیری', headerClassName: "headerClassName", minWidth: 140, maxWidth: 140, flex: 1
        },
        {
            field: 'createdDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ ثبت مجوز بارگیری', headerClassName: "headerClassName", minWidth: 140, flex: 1
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
    ]
    return col
}
export const exitColumns = (renderAction: any) => {
    const col = [
        { field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160, maxWidth: 160 },
        {
            field: 'ladingExitPermitCode', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره مجوز خروج', headerClassName: "headerClassName", minWidth: 140, flex: 1
        },
        {
            field: 'createdDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ ثبت خروج', headerClassName: "headerClassName", minWidth: 140, flex: 1
        },
        {
            field: 'ladingPermitId', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره مجوز بارگیری', headerClassName: "headerClassName", minWidth: 140, flex: 1
        },
        {
            field: 'bankAccountNo', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره حساب', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
        {
            field: 'bankAccountOwnerName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'صاحب حساب', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
        {
            field: 'fareAmount', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نرخ کرایه', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
        {
            field: 'otherAmount', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'سایر هزینه ها', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
        {
            field: 'exitPermitDescription', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'توضیحات', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
    ]
    return col
}

export const ladingReportColumns = (renderAction: any) => {
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
        // { field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}


export const evacuationColumns = (renderAction: any) => {
    const col = [
        {
            field: 'entrancePermitCode', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره مجوز ورود', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: 'entrancePermitDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ ثبت ورود', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: 'id', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره حواله', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: 'registerDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ حواله', headerClassName: "headerClassName", minWidth: 90, flex: 1
        },
        {
            field: 'transferRemittanceTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع انتقال', headerClassName: "headerClassName", minWidth: 90, flex: 1
        },
        {
            field: 'transferRemittanceStatusDesc', renderCell: (params: any) => {
                return params.row.transferRemittanceStatusId === 2 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.transferRemittanceStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.transferRemittanceStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'originWarehouseName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'انبار مبدا', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'destinationWarehouseName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'انبار مقصد', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        { field: "Action", headerName: 'ویرایش', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}

export const entranceReportColumns = (renderAction: any) => {
    const col = [
        {
            field: 'entrancePermitCode', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره مجوز ورود', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: 'entrancePermitDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ ثبت ورود', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: 'id', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره حواله', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: 'registerDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ حواله', headerClassName: "headerClassName", minWidth: 90, flex: 1
        },
        {
            field: 'transferRemittanceTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع انتقال', headerClassName: "headerClassName", minWidth: 90, flex: 1
        },
        {
            field: 'transferRemittanceStatusDesc', renderCell: (params: any) => {
                return params.row.transferRemittanceStatusId === 2 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.transferRemittanceStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.transferRemittanceStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'originWarehouseName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'انبار مبدا', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'destinationWarehouseName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'انبار مقصد', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        { field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}


export const columnsModalProduct = () => {
    const col = [
        {
            field: "productCode",
            headerName: "کد",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            flex: 1,
            minWidth: 40,
            maxWidth: 40
        },
        {
            field: "productName",
            headerName: "کالا",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            flex: 1,
            minWidth: 140,
            maxWidth: 140,
        },
        {
            field: "productBrandName",
            headerName: "برند",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            flex: 1,
            minWidth: 70,
            maxWidth: 70
        },
        {
            field: "warehouseName",

            headerName: "انبار",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
            flex: 1,
            minWidth: 70,
            maxWidth: 70,

        },
        {
            field: "inventory",
            headerName: "موجودی واقعی",
            renderCell: (params: any) => {
                return <Typography variant="h4" color={params.value < 0 ? "red" : params.value > 0 ? "green" : "black"}>
                    {separateAmountWithCommas(params.value)} {params.value < 0 ? (<CallReceived className="text-red-500" fontSize="small" />) : params.value > 0 ? (<CallMade className="text-green-500" fontSize="small" />) : null}
                </Typography>;
            },

            headerClassName: "headerClassName",
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
        },
        {
            field: "price",
            headerName: "قیمت",
            flex: 1,
            minWidth: 80,
            // maxWidth: 100,
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
                return <Typography variant="h4" color={params.value < 0 ? "red" : params.value > 0 ? "green" : "black"}>
                    {separateAmountWithCommas(params.value)} {params.value < 0 ? (<CallReceived className="text-red-500" fontSize="small" />) : params.value > 0 ? (<CallMade className="text-green-500" fontSize="small" />) : null}
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
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "productBrandName",
            headerName: "برند",
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
        },
        {
            field: "warehouseName",
            headerName: "انبار",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },

            headerClassName: "headerClassName",
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
        },
        {
            field: "thickness",
            headerName: "مقدار",
            renderCell: renderInput,
            headerAlign: "center",
            headerClassName: "headerClassName",
            flex: 1,
            minWidth: 110,
            maxWidth: 110,
        },
        {
            field: "productSubUnitDesc",
            headerName: "واحد فرعی",
            renderCell: renderSubUnit,
            headerClassName: "headerClassName",
            flex: 1,
            minWidth: 200,
            // maxWidth: 200,
        },
        {
            field: "price",
            headerName: "قیمت",
            flex: 1,
            minWidth: 120,
            maxWidth: 120,
            renderCell: renderPrice,
            headerClassName: "headerClassName",
        },
        {
            field: "Action",
            renderCell: renderAction,
            headerName: "حذف",
            flex: 1,
            minWidth: 60,
            maxWidth: 60,
            headerClassName: "headerClassName",
        },
    ];
    return col;
};

export const columnsSelectProductMuiTable = (renderAction: any, renderInput: any, renderSubUnit: any, renderPrice: any) => {
    const col = [
        {
            accessor: "productName",
            header: "کالا",
            headerClassName: "headerClassName",
            render: (params: any) => {
                return <Typography variant="h5">{params.productName}</Typography>;
            },
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            accessor: "productBrandName",
            header: "برند",
            headerClassName: "headerClassName",
            render: (params: any) => {
                return <Typography variant="h5">{params.productBrandName}</Typography>;
            },
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
        },
        {
            accessor: "warehouseName",
            header: "انبار",
            render: (params: any) => {
                return <Typography variant="h5">{params.warehouseName}</Typography>;
            },

            headerClassName: "headerClassName",
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
        },
        {
            accessor: "thickness",
            header: "مقدار",
            render: renderInput,
            headerAlign: "center",
            headerClassName: "headerClassName",
            flex: 1,
            minWidth: 110,
            maxWidth: 110,
        },
        {
            accessor: "productSubUnitDesc",
            header: "واحد فرعی",
            render: renderSubUnit,
            headerClassName: "headerClassName",
            flex: 1,
            minWidth: 200,
            // maxWidth: 200,
        },
        {
            accessor: "price",
            header: "قیمت(ریال)",
            flex: 1,
            minWidth: 120,
            maxWidth: 120,
            render: renderPrice,
            headerClassName: "headerClassName",
        },
        {
            accessor: "Action",
            render: renderAction,
            header: "حذف",
            flex: 1,
            minWidth: 60,
            maxWidth: 60,
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
            headerName: 'تاریخ ثبت سفارش', headerClassName: "headerClassName", maxWidth: 120, minWidth: 120, flex: 1
        },
        {
            field: "Action", headerName: 'ثبت تایید', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 120
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
            headerName: 'سفارش دهنده', headerClassName: "headerClassName", minWidth: 160, flex: 1
        },
        {
            field: 'invoiceTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع فاکتور', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'orderStatusId', renderCell: (params: any) => {
                return params.value === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },

    ]
    return col
}
export const purchaserOrderConfirm = (renderAction: any) => {
    const col = [
        {
            field: "Action", headerName: 'ثبت تایید', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", maxWidth: 120, minWidth: 120
        },
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
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'orderStatusDesc', renderCell: (params: any) => {
                return params.value === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
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