import { useState, useEffect } from "react"
import { useGetRecievePaymentByApproved } from "./core/_hooks"
import { columns } from "./helpers/paymentAccountingColumns"
import { Link } from "react-router-dom"
import Backdrop from "../../../_cloner/components/Backdrop"
import { Box, Button, Card, Container, Typography } from "@mui/material"
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/Fuse"
import { IPayment } from "./core/_models"

// const approvied = [
//     { value: "0", label: "تایید نشده" },
//     { value: "1", label: "تایید شده" },
// ]

const PaymentAccounting = () => {
    // Fetching
    const { mutate, data, isLoading } = useGetRecievePaymentByApproved()
    // States
    const [results, setResults] = useState<IPayment[]>([]);

    useEffect(() => {
        setResults(data?.data);
    }, [data?.data]);
    useEffect(() => {
        mutate("0")
        // eslint-disable-next-line
    }, [])

    // const handleFetch = (selectedOption: any) => {
    //     mutate(selectedOption.value)
    // }

    const renderActions = (item: any) => {
        return <Link to={`/dashboard/payment/accounting/${item?.row?.id}`}>
            <Button variant="contained" color="secondary">
                <Typography>
                    جزئیات و تایید حسابداری
                </Typography>
            </Button>
        </Link>

    }
    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            <Container>
                <Card className="p-8">
                    <Typography color="primary" variant="h1" className="pb-8">ثبت حسابداری دریافت و پرداخت</Typography>
                    <Box component="div" className="w-80 md:w-[40%]">
                        <FuzzySearch
                            keys={[
                                "id",
                                "receivePaymentSourceFromDesc",
                                "receivePaymentSourceToDesc",
                                "accountOwner",
                                "trachingCode",
                                "companyName",
                                "contractCode",
                                "isAccountingApproval",
                                "accountingApprovalDate",
                                "accountingApproverId",
                                "description",
                            ]}
                            data={data?.data}
                            threshold={0.5}
                            setResults={setResults}
                        />
                    </Box>
                    <MuiDataGrid columns={columns(renderActions)} rows={results} data={data?.data} />
                </Card>
            </Container>
        </>
    )
}

export default PaymentAccounting