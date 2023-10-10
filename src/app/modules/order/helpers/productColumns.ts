import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";

export const columns = (renderAction: any) => {
    const col = [
        // { field: 'productIntegratedName',  headerName: 'شرح کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
        {
            field: "productName",
            headerName: "کالا",
            headerClassName: "bg-[#E2E8F0] text-black font-bold",
            width: 180,
        },
        {
            field: "brandName",
            valueGetter: (params: any) => params.row.productPrices[0]?.brandName,
            width: 80,
            headerName: "برند",
            headerClassName: "bg-[#E2E8F0] text-black font-bold",
        },
        {
            field: "warehouseName",
            width: 80,
            headerName: "انبار",
            headerClassName: "bg-[#E2E8F0] text-black font-bold",
        },
        {
            field: "approximateInventory",
            width: 80,
            headerName: "موجودی",
            flex: 1,
            headerClassName: "bg-[#E2E8F0] text-black font-bold",
        },
        {
            field: "price",
            valueGetter: (params: any) => params.row.productPrices[0]?.price,
            width: 80,
            headerName: "قیمت",
            renderCell: (value: any) => (
                separateAmountWithCommas(value.row.productPrices[0]?.price)
            ),
            headerClassName: "bg-[#E2E8F0] text-black font-bold",
        },
    ];
    return col;
};

export const columnsSelectProduct = (renderAction: any, renderInput: any) => {
    const col = [
        // { field: 'productIntegratedName',  headerName: 'شرح کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
        {
            field: "productName",
            headerName: "کالا",
            headerClassName: "bg-[#E2E8F0] text-black font-bold",
            width: 180,
        },
        {
            field: "brand",
            width: 80,
            valueGetter: (params: any) => params.row.productPrices[0]?.brandName,
            headerName: "برند",
            headerClassName: "bg-[#E2E8F0] text-black font-bold",
        },
        {
            field: "warehouseName",
            width: 80,
            headerName: "انبار",
            headerClassName: "bg-[#E2E8F0] text-black font-bold",
        },
        {
            field: "thickness",
            width: 80,
            flex: 1,
            headerName: "مقدار",
            renderCell: renderInput,
            headerAlign: 'center',
            headerClassName: "bg-[#E2E8F0] text-black font-bold",
        },
        {
            field: "Action",
            width: 80,
            renderCell: renderAction,
            headerName: "حذف",
            headerClassName: "bg-[#E2E8F0] text-black font-bold",
        },
    ];
    return col;
};
