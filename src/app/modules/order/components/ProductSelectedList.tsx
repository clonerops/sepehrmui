import { IProducts } from "../../product/core/_models";
import { Button, Typography } from "@mui/material";
import MuiTable from "../../../../_cloner/components/MuiTable";
import { FormikErrors, useFormikContext } from "formik";

const ProductSelectedList = (props: {
    orders: IProducts[]
    setOrders: any
    // setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>
    setFieldValue?: any
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
    selectedOrderIndex?: any
    setSelectedOrderIndex?: any
}) => {
    const formikValue = useFormikContext()
    const handleDeleteFromList = (indexToDelete: any) => {
        if (props.orders) {
            const updatedOrders = props.orders.filter((order) => order.id !== indexToDelete.id);
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

    const onDoubleClick = (rowData: any, index: number) => {
        props.setSelectedOrderIndex(index);
        if (props.setFieldValue) {
            props.setFieldValue("productName", rowData.productName)
            props.setFieldValue("price", rowData.productPrice)
            props.setFieldValue("proximateAmount", rowData.proximateAmount)
        }
        props.setIsUpdate(true)

    }

    return (
        <>
            <MuiTable columns={columns} data={props.orders} onDoubleClick={onDoubleClick} />
        </>

    );
};

export default ProductSelectedList;