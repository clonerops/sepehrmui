import { useLocation, useParams } from "react-router-dom";
import { useConfirmOrder, useRetrieveOrder } from "../../app/modules/order/core/_hooks";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import MuiDataGrid from "./MuiDataGrid";
import { columns } from '../../app/modules/order/helpers/orderListColumns'
import PositionedSnackbar from "./Snackbar";
import { useState } from "react";
import MuiTable from "./MuiTable";
import { separateAmountWithCommas } from "../helpers/SeprateAmount";

type Props = {
    data: any | undefined;
    isConfirm?: boolean;
    isError: boolean;
    isLoading: boolean;
}

const OrderDetail = (props: Props) => {
    const location = useLocation();
    const { id } = useParams()
    const { isConfirmed }: any = location.state;
    const { data } = useRetrieveOrder(id)
    const { mutate, data: confirmOrder, isLoading } = useConfirmOrder()
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const handleConfirmOrder = () => {
        if (id)
            mutate(id, {
                onSuccess: (message) => {
                    setSnackeOpen(true)
                },

            })
    }

    const renderAction = () => { return <></> }

    const FieldItems = [
        { title: "مشتری", value: data?.data?.customerFirstName + " " + data?.data?.customerLastName },
        { title: "نوع فاکتور", value: data?.data?.invoiceTypeDesc },
        { title: "نوع خروج", value: data?.data?.exitType === 1 ? "عادی" : "بعد از تسویه" },
        { title: "نوع ارسال", value: data?.data?.orderSendTypeDesc },
        { title: "پرداخت کرایه", value: data?.data?.paymentTypeDesc },
        { title: "تاریخ تسویه", value: data?.data?.settlementDate },
    ]

    const columns = [
        {
            headerName: 'شماره ردیف', field: 'rowId', renderCell: (params: any) => {
                return <Typography>{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1
        },
        {
            headerName: 'نام کالا', field: 'productName', renderCell: (params: any) => {
                return <Typography>{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1
        },
        {
            headerName: 'انبار', field: 'warehouseName', renderCell: (params: any) => {
                return <Typography>{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1
        },
        {
            headerName: 'قیمت', field: 'price', renderCell: (params: any) => {
                return <Typography>{separateAmountWithCommas(params.value)}</Typography>
            }, headerClassName: "headerClassName", flex: 1
        },
        {
            headerName: 'تاریخ ارسال بار', field: 'cargoSendDate', renderCell: (params: any) => {
                return <Typography>{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1
        },
        {
            headerName: 'مقدار تقریبی', field: 'proximateAmount', renderCell: (params: any) => {
                return <Typography>{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1
        },
        {
            headerName: 'تعداد در بسته', field: 'numberInPackage', renderCell: (params: any) => {
                return <Typography>{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1
        },
    ];
    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        confirmOrder?.data?.Message ||
                        confirmOrder?.message || "تایید سفارش با موفقیت ثبت گردید"
                    }
                />
            )}
            <Card className="p-8" elevation={8}>
                <Box component="div" className="flex justify-between">
                    <Typography variant="h3" color="primary" className="pb-4">
                        <Typography variant="h1">جزئیات سفارش {data?.data?.orderCode}</Typography>
                    </Typography>
                    {isConfirmed &&
                        <Button variant="contained" color="secondary" onClick={handleConfirmOrder}>
                            <Typography>{isLoading ? "در حال پردازش" : "تایید سفارش"}</Typography>
                        </Button>
                    }
                </Box>
                <Box component="div" className="grid grid-cols-1 md:grid-cols-3 text-right gap-4">
                    {FieldItems.map((item: any) => {
                        return <Card className="p-4" elevation={8}>
                            <Box component="div" className="!text-sm md:!text-lg text-gray-500">{item.title}: <span className="px-1 font-yekan_bold font-bold text-sm md:text-xl text-black font-bold">{item.value}</span></Box>
                        </Card>

                    })}
                </Box>
                <Box component="div" className="mt-4">
                    <MuiDataGrid columns={columns} data={data?.data?.details} rows={data?.data?.details} />
                    {/* <MuiTable columns={columns} data={data?.data?.details} /> */}
                </Box>
            </Card>
        </>
    )
}

export default OrderDetail