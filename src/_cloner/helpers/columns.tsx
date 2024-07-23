import { Typography } from "@mui/material";
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
  }


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
    ProductStateColumn
}