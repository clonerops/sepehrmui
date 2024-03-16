import { useParams } from "react-router-dom"
import { Box, Button, Container, Typography } from "@mui/material"
import { useGetRecievePaymentById, useUpdatePaymentApproved } from "../core/_hooks"
import { DownloadFileJPEG, DownloadFileJPG, DownloadFilePNG } from "../../../../_cloner/helpers/DownloadFiles"
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'

import Backdrop from "../../../../_cloner/components/Backdrop"
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import CardWithIcons from "../../../../_cloner/components/CardWithIcons"
import { AddCard, AddHomeWork, Apps, CheckCircleOutline, Description, Filter1, Paid, Person, Source } from "@mui/icons-material"
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog"
import { useState } from "react"

const Detail = () => {
    const [approve, setApprove] = useState<boolean>(false);

    const { id }: any = useParams()
    const { data, isLoading: fetchingLaoding } = useGetRecievePaymentById(id)
    const { mutate, isLoading } = useUpdatePaymentApproved()

    const fieldsValue = [
        { 
            title: "دریافت از", 
            value: data?.data?.receivePaymentSourceFromDesc + " " + (data?.data?.receiveFromCustomerName === null ? "" : data?.data?.receiveFromCustomerName),
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        { 
            title: "پرداخت به", 
            value: data?.data?.receivePaymentSourceToDesc + " " + (data?.data?.payToCustomerName === null ? "" : data?.data?.payToCustomerName),
            icon: <AddCard className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        { 
            title: "صاحب حساب", 
            value: data?.data?.accountOwner,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        { 
            title: "کد پیگیری", 
            value: data?.data?.trachingCode,
            icon: <Source className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        { 
            title: "صاحب شرکت", 
            value: data?.data?.companyName,
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        { 
            title: "شماره قرارداد", 
            value: data?.data?.contractCode,
            icon: <Filter1 className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        { 
            title: "تایید حسابداری؟", 
            value: data?.data?.isAccountingApproval === true ? "تایید شده" : "تایید نشده",
            icon: <CheckCircleOutline className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        { 
            title: "توضیحات", 
            value: data?.data?.description,
            icon: <Description className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        }
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
                        EnqueueSnackbar(response.message, "success")
                    }else {
                        EnqueueSnackbar(response.data.Message, "warning")
                      } 
}
            })

    }

    return (
        <>
            {fetchingLaoding && <Backdrop loading={fetchingLaoding} />}
                <Typography color="primary" variant="h1" className="pb-8">جزئیات حسابداری دریافت و پرداخت</Typography>
                <Box component="div" className="md:flex md:justify-end md:items-end gap-x-4 pb-4">
                    <Button variant="contained" onClick={hadelDownload} className='mb-2' color="primary">
                        <Typography>{"دانلود ضمیمه ها"}</Typography>
                    </Button>
                    <Button variant="contained" onClick={() => setApprove(true)} className='mb-2' color="secondary">
                        <Typography>{isLoading ? "در حال پردازش..." : "ثبت تایید حسابداری"}</Typography>
                    </Button>
                </Box>
                <Box component="div" className="grid grid-cols-1 md:grid-cols-2 text-right gap-4">
                    {fieldsValue.map((item: any) =>
                            <CardWithIcons
                                title={item.title}
                                icon={item.icon}
                                value={item.value}
                                iconClassName={item.bgColor}
                            />
                    )}
                </Box>
                <ConfirmDialog
                    open={approve}
                    hintTitle="آیا از تایید سند دریافت و پرداخت مطمئن هستید؟"
                    notConfirmText="لغو"
                    confirmText={fetchingLaoding ? "درحال پردازش ..." : "تایید"}
                    onCancel={() => setApprove(false)}
                    onConfirm={() => handleConfirm()}
                />

        </>
    )
}

export default Detail