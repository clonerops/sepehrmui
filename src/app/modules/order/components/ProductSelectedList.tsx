import { IProducts } from "../../product/core/_models";
import { Button, Typography } from "@mui/material";
import MuiTable from "../../../../_cloner/components/MuiTable";

const ProductSelectedList = (props: {
    orders: IProducts[]
    setOrders: any
}) => {
    const handleDeleteFromList = (index: number) => {
        if (props.orders) {
            const cloneItems = [...props.orders]
            cloneItems?.splice(index, 1)
            props.setOrders(cloneItems)
        }
    }
    
    const renderActions = (index: any) => {
        return <>

            <Button onClick={() => handleDeleteFromList(index)} variant="outlined" color="primary">
                <Typography className="text-red-500">حذف</Typography>
            </Button>
        </>
    }

    const columns = [
        { header: 'محصول', accessor: 'productName' },
        { header: 'انبار', accessor: 'warehouseName' },
        { header: 'مقدار', accessor: 'proximateAmount' },
        { header: 'قیمت', accessor: 'price' },
        { header: 'توضیحات', accessor: 'productDesc' },
        { header: 'ردیف فروش', accessor: 'rowId' },
        { header: 'قیمت خرید', accessor: 'buyPrice' },
        { header: 'تاریخ تسویه خرید', accessor: 'purchaseSettlementDate' },
        { header: 'نوع فاکتور خرید', accessor: 'purchaseInvoiceTypeName' },
        { header: 'ردیف بنگاه فروشگاه', accessor: 'sellerCompanyRow' },
        {
            header: 'حذف',
            accessor: 'Action',
            render: renderActions
        },
    ];

    return (
        <>
            <MuiTable columns={columns} data={props.orders} />
        </>

    );
};

export default ProductSelectedList;