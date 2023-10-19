import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";

export const columns = (renderAction: any) => {
    const col = [
        // { field: 'productIntegratedName',  headerName: 'شرح کالا', headerClassName: "headerClassName" },
        {
            field: "productName",
            headerName: "کالا",
            headerClassName: "headerClassName",
            width: 140,
        },
        {
            field: "brandName",
            valueGetter: (params: any) =>
                params.row.productPrices[params.row.productPrices.length - 1]
                    ?.brandName,
            width: 80,
            headerName: "برند",
            headerClassName: "headerClassName",
        },
        {
            field: "warehouseName",
            valueGetter: (params: any) =>
                params.row.productInventories[
                    params.row.productInventories.length - 1
                ]?.warehouseName,
            width: 80,
            headerName: "انبار",
            headerClassName: "headerClassName",
        },
        {
            field: "approximateInventory",
            valueGetter: (params: any) =>
                params.row.productInventories[
                    params.row.productInventories.length - 1
                ]?.approximateInventory,
            width: 60,
            headerName: "موجودی",
            headerClassName: "headerClassName",
        },
        {
            field: "productMainUnitDesc",
            width: 80,
            headerName: "واحد اصلی",
            headerClassName: "headerClassName",
        },
        {
            field: "price",
            valueGetter: (params: any) =>
                params.row.productPrices[params.row.productPrices.length - 1]
                    ?.price,
            minWidth: 60,
            headerName: "قیمت",
            flex: 1,
            renderCell: (value: any) =>
                separateAmountWithCommas(
                    value.row.productPrice
                ),
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
            field: "brand",
            width: 80,
            valueGetter: (params: any) =>
                params.row.productPrices[params.row.productPrices.length - 1]
                    ?.brandName,
            headerName: "برند",
            headerClassName: "headerClassName",
        },
        {
            field: "warehouseName",
            valueGetter: (params: any) =>
                params.row.productInventories[
                    params.row.productInventories[0]
                ]?.warehouseName,
            width: 80,
            headerName: "انبار",
            headerClassName: "headerClassName",
        },
        {
            field: "productMainUnitDesc",
            width: 80,
            headerName: "واحد اصلی",
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
