import { useParams } from "react-router-dom"
import { Badge, Box, Button, Container, Typography } from "@mui/material"
import { useGetRecievePaymentById, useUpdatePaymentApproved } from "../core/_hooks"
import { DownloadFileJPEG, DownloadFileJPG, DownloadFilePNG } from "../../../../_cloner/helpers/DownloadFiles"
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'

import Backdrop from "../../../../_cloner/components/Backdrop"
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import CardWithIcons from "../../../../_cloner/components/CardWithIcons"
import { AddCard, AddHomeWork, Apps, CheckCircleOutline, Description, Filter1, Numbers, Paid, Person, Source } from "@mui/icons-material"
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog"
import { useState } from "react"

const Detail = () => {
    const [approve, setApprove] = useState<boolean>(false);

    const { id }: any = useParams()
    const { data, isLoading: fetchingLaoding, refetch } = useGetRecievePaymentById(id)
    const { mutate, isLoading } = useUpdatePaymentApproved()

    const fieldsValue = [
        {
            title: "شماره ثبت",
            value: data?.data?.receivePayCode,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
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
            title: "شماره سند حسابداری",
            value: data?.data?.accountingDocNo,
            icon: <Numbers className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "وضعیت",
            value: data?.data?.receivePayStatusDesc,
            icon: <CheckCircleOutline className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
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
                        refetch()
                        setApprove(false)

                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                    }
                }
            })

    }

    return (
        <>
            {fetchingLaoding && <Backdrop loading={fetchingLaoding} />}
            <Typography color="primary" variant="h1" className="pb-8">جزئیات و ثبت تایید دریافت و پرداخت</Typography>
            <Box component="div" className="grid grid-cols-1 md:grid-cols-3 text-right gap-4">
                {fieldsValue.map((item: any) =>
                    <CardWithIcons
                        title={item.title}
                        icon={item.icon}
                        value={item.value}
                        iconClassName={item.bgColor}
                    />
                )}
                <div className="col-span-3">
                    <CardWithIcons
                        title="توضیحات"
                        icon={<Description className="text-black" />}
                        value={data?.data?.description}
                        iconClassName="bg-[#ECEFF3]"
                    />
                </div>
            </Box>
            <Box component="div" className="md:flex md:justify-end md:items-end gap-x-4 py-4">
                <Badge badgeContent={data?.data?.attachments.length || 0} color="secondary">
                    <Button variant="contained" onClick={hadelDownload} className='mb-2' color="primary">
                        <Typography>{"دانلود ضمیمه ها"}</Typography>
                    </Button>
                </Badge>
                <Button variant="contained" onClick={() => setApprove(true)} className='mb-2' color="secondary">
                    <Typography>{isLoading ? "در حال پردازش..." : "ثبت تایید"}</Typography>
                </Button>
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