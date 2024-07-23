import { Checkbox, OutlinedInput, Typography } from "@mui/material";
import { separateAmountWithCommas } from "./seprateAmount";
import { CallMade, CallReceived } from "@mui/icons-material";
import { IProducts } from "../../app/modules/products/_models";

import ActiveText from "../components/ActiveText";

const ProductBrandsColumn = (renderSwitch: any) => {
    const col = [
      {
        field: "id",
        headerName: "کد کالابرند",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.value}</Typography>;
        },
        headerClassName: "headerClassName",
        minWidth: 130,
        maxWidth: 130,
        flex: 1,
      },
      {
        field: "productCode",
        headerName: "کدکالا",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.row?.product?.productCode}</Typography>;
        },
        headerClassName: "headerClassName",
        minWidth: 130,
        maxWidth: 130,
        flex: 1,
      },
      {
        field: "productName",
        headerName: "کالا",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerClassName:
          "headerClassName",
        minWidth: 180,
        flex: 1,
      },
      {
        field: "brandId",
        headerName: "کدبرند",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.row?.brand?.id}</Typography>;
        },
        headerClassName: "headerClassName",
        flex: 1,
        minWidth: 130,
        maxWidth: 130,
      },
      {
        field: "brandName",
        headerName: "برند",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerClassName: "headerClassName",
        flex: 1,
        minWidth: 160,
      },
      {
        field: "isActive",
        headerName: "وضعیت",
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        flex: 1,
        minWidth: 160,
      },
    ];
    return col;
};

const ProductStandardsColumn = (renderSwitch: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد استاندارد', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'desc', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'استاندارد', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: "isActive",
        headerName: "وضعیت",
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        minWidth: 160,
        flex: 1,
      },
    ]
    return col
};

const ProductsColumn = (renderAction: any) => {
    const col = [
        {
            headerName: "ویرایش کالا",
            flex: 1,
            renderCell: renderAction,
            headerClassName: "headerClassName w-full",
            minWidth: 100,
            maxWidth: 160,
        },
        {
            field: "productCode",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "کد کالا",
            cellClassName: "font-bold",
            headerClassName: "headerClassName",
            minWidth: 60,
            maxWidth: 80,
            flex: 1,
        },
        {
            field: "productName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "نام کالا",
            cellClassName: "bg-green-100 font-bold",
            headerClassName: "headerClassName",
            minWidth: 240,
            flex: 1,
        },
        {
            field: "productTypeDesc",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "نوع کالا",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1,
        },
        {
            field: "isActive",
            renderCell: (params: any) => {
                return (
                    <ActiveText
                        params={params}
                        successTitle="فعال"
                        dangerTitle="غیرفعال"
                    />
                );
            },
            headerName: "وضعیت",
            headerClassName: "headerClassName",
            minWidth: 60,
            flex: 1,
        },
        {
            field: "productSize",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "سایز",
            headerClassName: "headerClassName",
            minWidth: 60,
            flex: 1,
        },
        {
            field: "productThickness",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "ضخامت",
            headerClassName: "headerClassName",
            minWidth: 60,
            flex: 1,
        },
        {
            field: "approximateWeight",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "وزن",
            headerClassName: "headerClassName",
            minWidth: 60,
            flex: 1,
        },
        {
            field: "numberInPackage",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "تعداد در بسته",
            headerClassName: "headerClassName",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "productStandardDesc",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "استاندارد",
            headerClassName: "headerClassName",
            maxWidth: 70,
            minWidth: 70,
            flex: 1,
        },
        {
            field: "productStateDesc",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "حالت",
            headerClassName: "headerClassName",
            maxWidth: 70,
            minWidth: 70,
            flex: 1,
        },
        {
            field: "productMainUnitDesc",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "واحد اصلی",
            headerClassName: "headerClassName",
            maxWidth: 70,
            minWidth: 70,
            flex: 1,
        },
        {
            field: "productSubUnitDesc",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "واحد فرعی",
            headerClassName: "headerClassName",
            maxWidth: 70,
            minWidth: 70,
            flex: 1,
        },
        {
            field: "maxInventory",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "حداکثر موجودی",
            headerClassName: "headerClassName",
            maxWidth: 100,
            minWidth: 100,

            flex: 1,
        },
        {
            field: "minInventory",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "حداقل موجودی",
            headerClassName: "headerClassName",
            maxWidth: 100,
            minWidth: 100,

            flex: 1,
        },
        {
            field: "inventotyCriticalPoint",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "نقطه بحرانی",
            headerClassName: "headerClassName",
            maxWidth: 100,
            minWidth: 100,

            flex: 1,
        },

    ];
    return col;
};

const ProductServicesColumn = (renderSwitch: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد خدمت', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'description', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نوع خدمت', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: "isActive",
        headerName: "وضعیت",
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        minWidth: 160,
        flex: 1,
      },
    ]
    return col
};

const BrandsColumn = (renderSwitch: any) => {
    const col = [
        {
            field: "id",
            headerName: "کد برند",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerClassName:
                "headerClassName",
            minWidth: 120,
            flex: 1,
        },
        {
            field: "name",
            headerName: "نام برند",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerClassName: "headerClassName",
            flex: 1,
            minWidth: 160,
        },
        {
            field: "isActive",
            headerName: "وضعیت",
            renderCell: renderSwitch,
            headerClassName: "headerClassName",
            flex: 1,
            minWidth: 160,
        },
    ];
    return col;
};

const SepehrInventoryColumn = (renderIncreaseInventory: (item: {row: IProducts}) => void) => {
    const col = [
        {
            field: "increase",
            minWidth: 140,
            maxWidth: 140,
            headerName: "افزایش موجودی",
            flex: 1,
            renderCell: renderIncreaseInventory,
            headerClassName: "headerClassName",
        },
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
            field: "floorInventory",
            minWidth: 140,
            maxWidth: 180,
            headerName: "موجودی",
            renderCell: (params: any) => {
                return <Typography variant="h4" color={params.value < 0 ?  "red" : params.value > 0 ? "green" : "black"}>
                    {separateAmountWithCommas(params.value)} {params.value < 0 ? ( <CallReceived className="text-red-500" fontSize="small" />) : params.value > 0 ? ( <CallMade className="text-green-500" fontSize="small" />) : null}
                </Typography>;
            },

            headerClassName: "headerClassName",
            flex: 1,
        },       
    ];
    return col;
};

const InventoryColumn = () => {
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

const WarehousesColumn = (renderAction: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد انبار', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'name', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نام انبار', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'warehouseTypeDesc', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نوع انبار', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: "Action",
        headerName: "عملیات", flex: 1,
        renderCell: renderAction,
        headerClassName: "headerClassName",
        minWidth: 160,
      },
    ]
    return col
};

const ProductPricesColumn = (renderAction: any) => {
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
            renderCell: (value: any) => <Typography>{`${separateAmountWithCommas(value.row.price)} تومان`}</Typography>,
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

const ProductTypesColumn = (renderAction: any, renderSwitch: any) => {
    const col = [
      {
        field: 'id',
        renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد نوع کالا', flex: 1, headerClassName: "headerClassName", minWidth: 120
      },
      {
        field: 'desc',
        renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نوع کالا', flex: 1, headerClassName: "headerClassName", minWidth: 160
      },
      {
        field: "isActive",
        headerName: "وضعیت", flex: 1,
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        minWidth: 160,
      },
      {
        field: "Delete",
        headerName: "حذف", flex: 1,
        renderCell: renderAction,
        headerClassName: "headerClassName",
        minWidth: 160,
      },
    ]
    return col
};

const ProductStateColumn = (renderSwitch: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد حالت', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'desc', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'حالت', headerClassName: "headerClassName", minWidth: 160,
        flex: 1,
      },
      {
        field: "isActive",
        headerName: "وضعیت",
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        minWidth: 160,
        flex: 1,
      },
    ]
    return col
};

const PaymentAccountingRegisterColumn = (renderCheckbox: any, renderAction: any, isSelectAll: boolean, setIsSelectAll: React.Dispatch<React.SetStateAction<boolean>>) => {
    const col = [
        {
            field: "id",
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
            headerName: "جزئیات و ثبت",
            renderCell: renderAction,
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: "receivePayCode",
            renderCell: (params: any) => <Typography variant="h4">{params.value}</Typography>,
            
            headerName: "شماره ثبت",
            headerClassName: "headerClassName",
            minWidth: 80,
            flex: 1
        },
        {
            field: "receiveFromDesc",
            headerName: "دریافت از",
            renderCell: (value: any) => <Typography variant="h4">{value.row.receiveFromDesc}</Typography>,
            headerClassName: "headerClassName",
            minWidth: 240,
            flex: 1
        },
        {
            field: "receiveFromCompanyName",
            renderCell: (params: any) => <Typography variant="h5">{params.value}</Typography>,
            headerName: "شرکت دریافت از",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: "payToDesc",
            renderCell: (value: any) => (
                <Typography variant="h4">
                    {value.row.payToDesc +
                        " " +
                        (value.row?.receivePaymentSourceToId !== 1
                            ? ""
                            : value.row?.payToCustomerName)}
                </Typography>
            ),
            headerName: "پرداخت به",
            headerClassName: "headerClassName",
            minWidth: 240,
            flex: 1
        },
        {
            field: "payToCompanyName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "شرکت پرداخت به",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: "amount",
            headerName: "مبلغ(ریال)",
            renderCell: (value: any) => <Typography color="primary" variant="h4">{separateAmountWithCommas(value.row.amount)} </Typography>,
            headerClassName: "headerClassName",
            minWidth: 160,
            flex: 1
        },
        {
            field: "receivePayStatusDesc",
            headerName: "وضعیت",
            renderCell: (value: any) => (
                <Typography className={`${value.row.receivePayStatusId === 1 ? "text-yellow-500" :
                    value.row.receivePayStatusId === 2 ? "text-green-500" :
                        value.row.receivePayStatusId === 3 ? "text-violet-500" : ""}`} variant="h4">
                    {value.row.receivePayStatusDesc}
                </Typography>
            ),
            headerClassName: "headerClassName",
            minWidth: 160,
            flex: 1
        },
        {
            field: "accountOwner",
            renderCell: (params: any) => <Typography variant="h5">{params.value}</Typography>,
            headerName: "صاحب حساب",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: "trachingCode",
            renderCell: (params: any) => <Typography variant="h5">{params.value}</Typography>,
            headerName: "کد پیگیری",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
       
       
        {
            field: "contractCode",
            renderCell: (params: any) => <Typography variant="h4">{params.value}</Typography>,
            headerName: "شماره قرارداد",
            headerClassName: "headerClassName",
            minWidth: 100,
            flex: 1
        },
    ];
    return col;
};

const PaymentAccountingColumn = (renderAction: any, renderCheckbox: any, isSelectAll: boolean, setIsSelectAll: React.Dispatch<React.SetStateAction<boolean>>) => {
    const col = [
        {
            field: "id",
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
            maxWidth: 80,
            flex: 1
        },
        {
            headerName: "جزئیات",
            renderCell: renderAction,
            headerClassName: "headerClassName",
            minWidth: 80,
            flex: 1
        },
        {
            field: "receivePayCode",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "شماره ثبت",
            headerClassName: "headerClassName",
            minWidth: 80,
            flex: 1
        },
        {
            field: "receiveFromDesc",
            headerName: "دریافت از",
            renderCell: (value: any) => (
                <Typography variant="h4">
                    {value.row.receiveFromDesc}
                </Typography>
            ),
            headerClassName: "headerClassName",
            minWidth: 240,
            flex: 1
        },
        {
            field: "receiveFromCompanyName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "شرکت دریافت از",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: "payToDesc",
            renderCell: (value: any) => (
                <Typography variant="h4">
                    {value.row.payToDesc +
                        " " +
                        (value.row?.receivePaymentSourceToId !== 1
                            ? ""
                            : value.row?.payToCustomerName)}
                </Typography>
            ),
            headerName: "پرداخت به",
            headerClassName: "headerClassName",
            minWidth: 240,
            flex: 1
        },
        {
            field: "payToCompanyName",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "شرکت پرداخت به",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: "amount",
            headerName: "مبلغ",
            renderCell: (value: any) => (
                <Typography color="primary" variant="h4">
                    {separateAmountWithCommas(value.row.amount) + "تومان"}
                </Typography>
            ),
            headerClassName: "headerClassName",
            minWidth: 160,
            flex: 1
        },
        {
            field: "receivePayStatusDesc",
            headerName: "وضعیت",
            renderCell: (value: any) => (
                <Typography className={`${value.row.receivePayStatusId === 1 ? "text-yellow-500" :
                    value.row.receivePayStatusId === 2 ? "text-green-500" :
                        value.row.receivePayStatusId === 3 ? "text-violet-500" : ""}`} variant="h4">
                    {value.row.receivePayStatusDesc}
                </Typography>
            ),
            headerClassName: "headerClassName",
            minWidth: 160,
            flex: 1
        },
        {
            field: "accountOwner",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "صاحب حساب",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: "trachingCode",
            renderCell: (params: any) => {
                return <Typography variant="h5">{params.value}</Typography>;
            },
            headerName: "کد پیگیری",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: "contractCode",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "شماره قرارداد",
            headerClassName: "headerClassName",
            minWidth: 100,
            flex: 1
        },
    ];
    return col;
};

const IncomeColumn = (renderSwitch: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد درآمد', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'incomeDescription', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'درآمد', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: "isActive",
        headerName: "وضعیت",
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        minWidth: 160,
        flex: 1,
      },
    ]
    return col
};

const CashDeskColumn = (renderSwitch: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد صندوق', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'cashDeskDescription', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'صندوق', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: "isActive",
        headerName: "وضعیت",
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        minWidth: 160,
        flex: 1,
      },
    ]
    return col
};
  
const PettyCashColumn = (renderAction: any) => {
    const col = [
        {
            field: "pettyCashDescription",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "نام تنخواه گردان",
            cellClassName: "font-bold",
            headerClassName: "headerClassName",
            minWidth: 240,
            flex: 1,
        },
        {
            field: "mobileNo",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "شماره موبایل",
            cellClassName: "bg-green-100 font-bold",
            headerClassName: "headerClassName",
            minWidth: 240,
            flex: 1,
        },
        
        {
            headerName: "عملیات",
            flex: 1,
            renderCell: renderAction,
            headerClassName: "headerClassName w-full",
            minWidth: 160,
        },
    ];
    return col;
};

const CostsColumn = (renderSwitch: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد هزینه', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'costDescription', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'هزینه', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: "isActive",
        headerName: "وضعیت",
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        minWidth: 160,
        flex: 1,
      },
    ]
    return col
};

const OrganizationBankColumn = (renderAction: any) => {
    const col = [
        {
            field: "id",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params?.row?.bank?.id}</Typography>;
            },
            headerName: "کد بانک",
            cellClassName: "font-bold",
            headerClassName: "headerClassName",
            minWidth: 60,
            maxWidth: 80,
            flex: 1,
        },
        {
            field: "bankName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params?.row?.bank?.bankName}</Typography>;
            },
            headerName: "نام بانک",
            cellClassName: "bg-green-100 font-bold",
            headerClassName: "headerClassName",
            minWidth: 240,
            flex: 1,
        },
        {
            field: "accountOwner",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "صاحب حساب",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1,
        },
        {
            field: "accountNo",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "شماره حساب",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1,
        },
        {
            field: "branchName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "شعبه",
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1,
        },
        {
            headerName: "عملیات",
            flex: 1,
            renderCell: renderAction,
            headerClassName: "headerClassName w-full",
            minWidth: 160,
        },
    ];
    return col;
};

const ShareholdersColumn = (renderAction: any) => {
    const col = [
        {
            field: "shareHolderCode",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "کد سهامدار",
            cellClassName: "bg-green-100 font-bold",
            headerClassName: "headerClassName",
            minWidth: 80,
            maxWidth: 120,
            flex: 1,
        },
        {
            field: "firstName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "نام سهامدار",
            cellClassName: "font-bold",
            headerClassName: "headerClassName",
            minWidth: 180,
            flex: 1,
        },
        {
            field: "lastName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "نام خانوادگی سهامدار",
            headerClassName: "headerClassName",
            minWidth: 180,
            flex: 1,
        },
        {
            field: "fatherName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "نام پدر",
            cellClassName: "font-bold",
            headerClassName: "headerClassName",
            minWidth: 180,
            flex: 1,
        },
        {
            field: "mobileNo",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: "موبایل",
            cellClassName: "font-bold", 
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1,
        },
        {
            headerName: "عملیات",
            flex: 1,
            renderCell: renderAction,
            headerClassName: "headerClassName w-full",
            minWidth: 160,
        },
    ];
    return col;
};

const RentsColumns = (renderAction: any, renderCheckbox: any,  isSelectAll: boolean, setIsSelectAll: React.Dispatch<React.SetStateAction<boolean>>) => {
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
            field: "Action", headerName: 'جزئیات و تایید', flex: 1, minWidth: 120, maxWidth: 120, renderCell: renderAction, headerClassName: "headerClassName" },
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
                return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'کرایه(ریال)', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
        {
            field: 'otherCosts', renderCell: (params: any) => {
                return <Typography variant="h4" >{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'سایر هزینه ها', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
      
        {
            field: 'totalPayableAmount', renderCell: (params: any) => {
                return <Typography variant="h3" className="text-green-500">{params.value}</Typography>;
            },
            headerName: 'مبلغ قابل پرداخت', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
      
        {
            field: 'driverName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نام راننده', headerClassName: "headerClassName", minWidth: 160, flex: 1
        },
      
        {
            field: 'driverMobile', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'موبایل راننده', headerClassName: "headerClassName", minWidth: 160, flex: 1
        },
      
        // {
        //     field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
};

const RentListsColumn = (renderPrint: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'شماره پرداخت', headerClassName: "headerClassName", minWidth: 130,
        flex: 1,
      },
      {
        field: 'referenceCode', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'شماره مرجع', headerClassName: "headerClassName", minWidth: 130,
        flex: 1,
      },
      {
        field: 'totalFareAmount', renderCell: (params: any) => {
          return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>;
        },
        headerName: 'مبلغ پرداخت شده(ریال)', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'otherCosts', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'سایر هزینه ها', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'driverName', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'راننده', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'driverMobile', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'شماره همراه راننده', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'driverAccountNo', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'شماره حساب راننده', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'orderType', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نوع سفارش', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'print', renderCell: renderPrint,
        headerName: 'پرینت رسید پرداخت', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      
    ]
    return col
};

const ReadyToCargoColumn = (renderAction: any) => {
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
};

const ReadyToLadingColumn = (renderAction: any) => {
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
            field: 'orderStatusId', renderCell: (params: any) => {
                return params.row.order.orderStatusId === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.order.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.order.orderStatusDesc}</Typography>
            },
            headerName: 'وضعیت سفارش', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'createdBy', renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.createdBy}</Typography>;
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
        
       
    ]
    return col
};

const LadingListColumn = (renderAction: any) => {
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
};

const OrderDetailForExitRemittanceColumn = (realAmount: React.RefObject<HTMLInputElement>, productSubUnitAmount: React.RefObject<HTMLInputElement>, handleRealAmountChange: (params: any, value: string) => void, handleProductSubUnitAmountChange: (params: any, value: string) => void) => {
    return [
        {
            id: 1,
            header: "نام کالا",
            accessor: "productName",
            flex: 1,
            headerClassName: "headerClassName",
            render: (params: any) => {
                return <Typography sx={{ minWidth: 140 }}>{params.productName}</Typography>;
            },
        },
        {
            id: 2,
            header: "مقدار بارگیری",
            accessor: "ladingAmount",
            headerClassName: "headerClassName",
            flex: 1,
            render: (params: any) => {
                return <Typography>{params.ladingAmount}</Typography>;
            },
        },
        {
            id: 3,
            header: "مقدار واحد فرعی",
            accessor: "proximateAmount",
            headerClassName: "headerClassName",
            flex: 1,
            render: (params: any) => {
                return <Typography>{params.proximateAmount}</Typography>;
            },
        },
        
        {
            id: 4,
            header: "مقدار واقعی بارگیری شده",
            accessor: "realAmount",
            flex: 1,
            headerClassName: "headerClassName",
            render: (params: any) => {
                return (
                    <OutlinedInput
                        sx={{ minWidth: 140 }}
                        onChange={(e) => {
                            handleRealAmountChange(
                                params,
                                e.target.value
                            );
                        }}
                        inputRef={realAmount}
                        size="small"
                    />
                );
            },
        },
        {
            id: 4,
            header: "واحد اصلی",
            accessor: "productMainUnitDesc",
            flex: 1,
            headerClassName: "headerClassName",
            render: (params: any) => {
                return <Typography>{params.productMainUnitDesc}</Typography>;
            },
        },
        {
            id: 4,
            header: "مقدار واقعی واحد فرعی",
            accessor: "productSubUnitAmount",
            flex: 1,
            headerClassName: "headerClassName",
            render: (params: any) => {
                return (
                    <OutlinedInput
                        inputRef={productSubUnitAmount}
                        sx={{ minWidth: 140 }}
                        onChange={(e) => {
                            handleProductSubUnitAmountChange(
                                params,
                                e.target.value
                            );
                        }}
                        size="small"
                    />
                );
            },
        },
        {
            id: 4,
            header: "واحد فرعی",
            accessor: "productSubUnitDesc",
            flex: 1,
            headerClassName: "headerClassName",
            render: (params: any) => {
                return <Typography>{params.productSubUnitDesc}</Typography>;
            },
        },
    ];
};

const ExitRemittanceColumn = (renderAction: any) => {
    const col = [
        { field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 210, maxWidth: 210 },
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
};


export {
    ProductBrandsColumn,
    ProductStandardsColumn,
    ProductsColumn,
    ProductServicesColumn,
    BrandsColumn,
    SepehrInventoryColumn,
    InventoryColumn,
    WarehousesColumn,
    ProductPricesColumn,
    ProductTypesColumn,
    ProductStateColumn,
    PaymentAccountingRegisterColumn,
    PaymentAccountingColumn,
    IncomeColumn,
    CashDeskColumn,
    PettyCashColumn,
    CostsColumn,
    OrganizationBankColumn,
    ShareholdersColumn,
    RentsColumns,
    RentListsColumn,
    ReadyToCargoColumn,
    ReadyToLadingColumn,
    LadingListColumn,
    OrderDetailForExitRemittanceColumn,
    ExitRemittanceColumn
}