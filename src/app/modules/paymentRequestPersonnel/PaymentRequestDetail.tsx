import { useParams } from "react-router-dom"
import { Badge, Button, Typography } from "@mui/material"

import { Apps, Numbers, Person } from "@mui/icons-material"
import Backdrop from "../../../_cloner/components/Backdrop"
import CardWithIcons from "../../../_cloner/components/CardWithIcons"
import { useEffect, useState } from "react"
import { convertFilesToBase64 } from "../../../_cloner/helpers/convertToBase64"
import { useGetPaymentRequestByIdMutation } from "./_hooks"
import ImagePreview from "../../../_cloner/components/ImagePreview"
import { downloadAttachments } from "../../../_cloner/helpers/downloadAttachments"
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount"

const PaymentRequestDetailPersonnel = () => {
    const [files, setFiles] = useState<File[]>([])
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    const { id }: any = useParams()

    const paymentRequestDetailTools = useGetPaymentRequestByIdMutation()
    useEffect(() => {
        paymentRequestDetailTools.mutate(id)
    }, [id])

    console.log("paymentRequestDetailTools", paymentRequestDetailTools?.data?.data)

    const fieldsValue = [
        {
            title: "شماره درخواست",
            value: `${paymentRequestDetailTools?.data?.data?.paymentRequestCode || "ثبت نشده"}`,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "تاریخ درخواست",
            value: `${paymentRequestDetailTools?.data?.data?.createdDate || "ثبت نشده"}`,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "درخواست کننده",
            value: `${paymentRequestDetailTools?.data?.data?.creatorName || "ثبت نشده"}`,
            // value: separateAmountWithCommas(exitDetailTools?.data?.data?.fareAmount),
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "پرداخت به حساب",
            value: `${paymentRequestDetailTools?.data?.data?.personnelName || "ثبت نشده"}`,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "مبلغ",
            value: `${separateAmountWithCommas(paymentRequestDetailTools?.data?.data?.amount) || "ثبت نشده"}`,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "بابت",
            value: `${paymentRequestDetailTools?.data?.data?.paymentRequestReasonDesc || "ثبت نشده"}`,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره حساب/کارت/شبا",
            value: `${paymentRequestDetailTools?.data?.data?.bankAccountOrShabaNo || "ثبت نشده"}`,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "صاحب حساب",
            value: `${paymentRequestDetailTools?.data?.data?.accountOwnerName || "ثبت نشده"}`,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "دلیل عدم تایید",
            value: `${paymentRequestDetailTools?.data?.data?.rejectReasonDesc || "ثبت نشده"}`,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "پرداخت از",
            value: `${paymentRequestDetailTools?.data?.data?.paymentOriginDesc || "ثبت نشده"}`,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },

    ]

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }
        // eslint-disable-next-line
    }, [files]);


    return (
        <>
            {paymentRequestDetailTools.isLoading && <Backdrop loading={paymentRequestDetailTools.isLoading} />}
            <Typography color="primary" variant="h1" className="pb-8">جزئیات درخواست پرداخت</Typography>
            <div className="md:flex md:justify-end md:items-end gap-x-4 py-4">
                <Badge badgeContent={paymentRequestDetailTools?.data?.data?.attachments?.length || 0} color="secondary">
                    <Button variant="contained" onClick={() => downloadAttachments(paymentRequestDetailTools?.data?.data?.attachments)} className='mb-2' color="primary">
                        <Typography>{"دانلود ضمیمه ها"}</Typography>
                    </Button>
                </Badge>
            </div>
            <div className="lg:grid lg:grid-cols-3 text-right lg:gap-4 lg:space-y-0 space-y-4">
                {fieldsValue.map((item: any) =>
                    <CardWithIcons
                        title={item.title}
                        icon={item.icon}
                        value={item.value}
                        iconClassName={item.bgColor}
                    />
                )}
                <div className="lg:col-span-2">
                    <CardWithIcons
                        title={"توضیحات درخواست"}
                        icon={<Numbers className="text-black" />}
                        value={`${paymentRequestDetailTools?.data?.data?.paymentRequestDescription || "ثبت نشده"}`}
                        iconClassName={"bg-[#ECEFF3]"}
                    />
                </div>
                <div className="mt-4">
                    <ImagePreview base64Strings={paymentRequestDetailTools?.data?.data?.attachments || []} />
                </div>
            </div>
        </>
    )
}

export default PaymentRequestDetailPersonnel