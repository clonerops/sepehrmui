import { useLocation, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import { useConfirmOrder, useRetrieveOrder } from "./core/_hooks";
import { columnsOrderDetail } from "./helpers/columns";

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

    const FieldItems = [
        { title: "مشتری", value: data?.data?.customerFirstName + " " + data?.data?.customerLastName },
        { title: "نوع فاکتور", value: data?.data?.invoiceTypeDesc },
        { title: "نوع خروج", value: data?.data?.exitType === 1 ? "عادی" : "بعد از تسویه" },
        { title: "نوع ارسال", value: data?.data?.orderSendTypeDesc },
        { title: "پرداخت کرایه", value: data?.data?.paymentTypeDesc },
        { title: "تاریخ تسویه", value: data?.data?.settlementDate },
    ]

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
            <ReusableCard>
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
                        return <ReusableCard>
                            <Box component="div" className="!text-sm md:!text-lg text-gray-500">{item.title}: <span className="px-1 font-yekan_bold font-bold text-sm md:text-xl text-black font-bold">{item.value}</span></Box>
                        </ReusableCard>

                    })}
                </Box>
                <Box component="div" className="mt-4">
                    <MuiDataGrid columns={columnsOrderDetail} data={data?.data?.details} rows={data?.data?.details} />
                </Box>
            </ReusableCard>
        </>
    )
}

export default OrderDetail