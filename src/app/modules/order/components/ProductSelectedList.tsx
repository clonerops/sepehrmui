import { IProducts } from "../../product/core/_models";
import { Button, Typography } from "@mui/material";
import MuiTable from "../../../../_cloner/components/MuiTable";

const ProductSelectedList = (props: {
    orders: IProducts[]
    setOrders: any
}) => {
    const handleDeleteFromList = (indexToDelete: any) => {
        console.log('Orders before deletion:', props.orders);
        console.log('Item to delete:', indexToDelete);
        if (props.orders) {
            const updatedOrders = props.orders.filter((order) => order.id !== indexToDelete.id);
            console.log('Updated orders:', updatedOrders);
            props.setOrders(updatedOrders);
        }
    }
    
    const renderActions = (index: any) => {
        return <>

            <Button onClick={() => handleDeleteFromList(index)} variant="outlined" color="secondary">
                <Typography className="text-red-500">حذف</Typography>
            </Button>
        </>
    }

    const columns = [
        { header: 'کالا', accessor: 'productName' },
        { header: 'انبار', accessor: 'warehouseName' },
        { header: 'مقدار', accessor: 'proximateAmount' },
        // { header: 'قیمت', accessor: 'price', },
        { header: 'قیمت', accessor: 'productPrice', },
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