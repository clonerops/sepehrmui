import { useParams } from "react-router-dom"
import { Box, Button, Container, Typography } from "@mui/material"
import { useGetRecievePaymentById, useUpdatePaymentApproved } from "../core/_hooks"
import { DownloadFileJPEG, DownloadFileJPG, DownloadFilePNG } from "../../../../_cloner/helpers/DownloadFiles"
import { validateAndEnqueueSnackbar } from '../../order/sales-order/functions'

import Backdrop from "../../../../_cloner/components/Backdrop"
import ReusableCard from '../../../../_cloner/components/ReusableCard'

const Detail = () => {
    const { id }: any = useParams()
    const { data, isLoading: fetchingLaoding } = useGetRecievePaymentById(id)
    const { mutate, isLoading } = useUpdatePaymentApproved()

    const fieldsValue = [
        { title: "دریافت از", value: data?.data?.receivePaymentSourceFromDesc + " " + (data?.data?.receiveFromCustomerName === null ? "" : data?.data?.receiveFromCustomerName) },
        { title: "پرداخت به", value: data?.data?.receivePaymentSourceToDesc + " " + (data?.data?.payToCustomerName === null ? "" : data?.data?.payToCustomerName) },
        { title: "صاحب حساب", value: data?.data?.accountOwner },
        { title: "کد پیگیری", value: data?.data?.trachingCode },
        { title: "صاحب شرکت", value: data?.data?.companyName },
        { title: "شماره قرارداد", value: data?.data?.contractCode },
        { title: "تایید حسابداری؟", value: data?.data?.isAccountingApproval === true ? "تایید شده" : "تایید نشده" },
        { title: "توضیحات", value: data?.data?.description }
    ]

    var signatures: any = {
        JVBERi0: "application/pdf",
        R0lGODdh: "image/gif",
        R0lGODlh: "image/gif",
        iVBORw0KGgo: "image/png",
        "/9j/": "image/jpg"
    };

    function detectMimeType(b64: any) {
        for (var s in signatures) {
            if (b64.indexOf(s) === 0) {
                return signatures[s];
            }
        }
    }

    const hadelDownload = () => {
        if (data?.data.attachments?.length === 0) {
            alert("فایلی برای دانلود وجود ندارد")
        } else {
            data?.data?.attachments?.forEach((element: any) => {
                switch (detectMimeType(element.fileData)) {
                    case "image/png":
                        const outputFilenamePng = `filesattachments${Date.now()}.png`;
                        DownloadFilePNG(element.fileData, outputFilenamePng)
                        break;
                    case "image/jpg":
                        const outputFilenameJpg = `filesattachments${Date.now()}.jpg`;
                        DownloadFileJPG(element.fileData, outputFilenameJpg)
                        break;
                    case "image/jpeg":
                        const outputFilenameJpeg = `filesattachments${Date.now()}.jpeg`;
                        DownloadFileJPEG(element.fileData, outputFilenameJpeg)
                        break;

                    default:
                        break;
                }
            });
        }
    };


    const handleConfirm = () => {
        if (id)
            mutate(id, {
                onSuccess: (response) => {
                    if (response?.succeeded) {
                        validateAndEnqueueSnackbar(response.message, "success")
                    }else {
                        validateAndEnqueueSnackbar(response.data.Message, "warning")
                      } 
}
            })

    }

    return (
        <>
            {fetchingLaoding && <Backdrop loading={fetchingLaoding} />}
            <Container>
                <ReusableCard>
                    <Typography color="secondary" variant="h1" className="pb-8">جزئیات حسابداری دریافت و پرداخت</Typography>
                    <Box component="div" className="md:flex md:justify-end md:items-end gap-x-8 pb-2">
                        <Button variant="outlined" onClick={hadelDownload} className='mb-2' color="secondary">
                            <Typography>{"دانلود ضمیمه ها"}</Typography>
                        </Button>
                        <Button variant="contained" onClick={handleConfirm} className='mb-2' color="secondary">
                            <Typography>{isLoading ? "در حال پردازش..." : "ثبت تایید حسابداری"}</Typography>
                        </Button>
                    </Box>

                    <Box component="div" className="grid grid-cols-1 md:grid-cols-2 text-right gap-4">
                        {fieldsValue.map((item: any) =>
                            <ReusableCard>
                                <Box component="div" className=" text-lg text-gray-500">{item.title}<span className="px-4 font-yekan_bold font-bold text-sm md:text-xl text-black font-bold">{item.value}</span></Box>
                            </ReusableCard>
                        )}
                    </Box>

                </ReusableCard>
            </Container>
        </>
    )
}

export default Detail