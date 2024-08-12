import { useParams } from "react-router-dom"
import { Badge, Button, Card, Typography } from "@mui/material"

import { AddCard, AddHomeWork, Apps, Filter1, Numbers, Person, Source } from "@mui/icons-material"
import Backdrop from "../../../_cloner/components/Backdrop"
import CardWithIcons from "../../../_cloner/components/CardWithIcons"
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount"
import { useEffect, useState } from "react"
import { convertFilesToBase64 } from "../../../_cloner/helpers/convertToBase64"
import FileUpload from "../../../_cloner/components/FileUpload"
import { useGetLadingLicenceById } from "../ladingLicence/_hooks"
import { downloadAttachments } from "../../../_cloner/helpers/downloadAttachments"
import ImagePreview from "../../../_cloner/components/ImagePreview"

const PaymentRequestDetail = () => {
    const [files, setFiles] = useState<File[]>([])
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    const { id }: any = useParams()

    // const ladingDetailTools = useGetLadingLicenceById(0)

    const fieldsValue = [
        {
            title: "شماره درخواست",
            value: "ثبت نشده",
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "تاریخ درخواست",
            value: "ثبت نشده",
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "درخواست کننده",
            value: "ثبت نشده",
            // value: separateAmountWithCommas(exitDetailTools?.data?.data?.fareAmount),
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "پرداخت به حساب",
            value: "ثبت نشده",
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "مبلغ",
            value: "ثبت نشده",
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "بابت",
            value: "ثبت نشده",
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره حساب/کارت/شبا",
            value: "ثبت نشده",
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "صاحب حساب",
            value: "ثبت نشده",
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "بانک",
            value: "ثبت نشده",
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "پرداخت از",
            value: "ثبت نشده",
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
            {/* {ladingDetailTools.isLoading && <Backdrop loading={ladingDetailTools.isLoading} />} */}

            <Typography color="primary" variant="h1" className="pb-8">جزئیات درخواست پرداخت</Typography>
            <div className="md:flex md:justify-end md:items-end gap-x-4 py-4">
                {/* <Badge badgeContent={exitDetailTools?.data?.data?.attachments.length || 0} color="secondary"> */}
                <Badge badgeContent={0} color="secondary">
                    {/* <Button variant="contained" onClick={() => downloadAttachments(exitDetailTools?.data?.data?.attachments)} className='mb-2' color="primary"> */}
                    <Button variant="contained" onClick={() => {}} className='mb-2' color="primary">
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
                        value={"ثبت نشده"}
                        iconClassName={"bg-[#ECEFF3]"}
                    />
                </div>
                <div className="mt-4">
                    {/* <ImagePreview base64Strings={exitDetailTools?.data?.data?.attachments || []} /> */}
                </div>
            </div>
        </>
    )
}

export default PaymentRequestDetail