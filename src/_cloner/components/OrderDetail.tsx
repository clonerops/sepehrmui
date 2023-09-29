import { useLocation, useParams } from "react-router-dom";
import { useConfirmOrder } from "../../app/modules/order/core/_hooks";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import MuiDataGrid from "./MuiDataGrid";
import { columns } from '../../app/modules/order/helpers/orderListColumns'

type Props = {
    data: any | undefined;
    isConfirm?: boolean;
    isError: boolean;
    isLoading: boolean;
}

const OrderDetail = (props: Props) => {
    // const location = useLocation();
    const { id } = useParams()
    // const { isConfirmed }: any = location.state;
    const { data } = props;
    const { mutate, isLoading } = useConfirmOrder()

    const handleConfirmOrder = () => {
        if (id)
            mutate(id, {
                onSuccess: (message) => {
                    if (message?.succeeded) {
                        // ToastComponent("تایید سفارش با موفقیت انجام شد!")
                    } else {
                        // ToastComponent("خطا! دوباره سعی کنید")
                    }
                },
                onError: () => {
                    // ToastComponent("خطا! دوباره سعی کنید")
                }
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

    return (
        <>
            <Container>
                <Box component="div" className="flex justify-between">
                    <Typography variant="h3" color="primary" className="pb-4">
                        <Typography variant="h1">جزئیات سفارش {data?.data?.orderCode}</Typography>
                    </Typography>
                    {/* {isConfirmed &&
                    <Button onClick={handleConfirmOrder} className="bg-success px-16 rounded-lg font-bold">
                        {isLoading ? "در حال پردازش" : "تایید سفارش"}
                    </Button>
                } */}
                </Box>
                <Box component="div" className="grid grid-cols-1 md:grid-cols-2 text-right gap-4">
                    {FieldItems.map((item: any) => {
                        return <Card className="px-8 py-4">
                            <Box component="div" className="text-lg text-gray-500">{item.title}: <span className="px-4 font-yekan_bold font-bold text-xl text-black">{item.value}</span></Box>
                        </Card>

                    })}
                </Box>
                <Box component="div">
                    <MuiDataGrid columns={columns(renderAction)} rows={data?.data?.details} data={data?.data?.details} />
                </Box>
            </Container>

        </>
    )
}

export default OrderDetail