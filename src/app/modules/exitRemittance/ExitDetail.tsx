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
import { useAddAttachmentsForExit, useGetLadingExitPermitById, usePostApproveDriverFareAmount } from "./_hooks"
import ImagePreview from "../../../_cloner/components/ImagePreview"

const ExitDetail = () => {
    const [files, setFiles] = useState<File[]>([])
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    const { id }: any = useParams()

    const exitDetailTools = useGetLadingExitPermitById(id)
    const ladingDetailTools = useGetLadingLicenceById(exitDetailTools?.data?.data?.ladingPermitId)

    const postApprove = usePostApproveDriverFareAmount()
    const attachmentTools = useAddAttachmentsForExit()

    const fieldsValue = [
        {
            title: "شماره مجوز خروج",
            value: exitDetailTools?.data?.data?.ladingExitPermitCode,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره مجوز بارگیری",
            value: exitDetailTools?.data?.data?.ladingPermitId,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره اعلام بار",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.cargoAnnounceNo,
            icon: <AddCard className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره سفارش فروش",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.order?.orderCode,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },

        {
            title: "مبلغ کرایه (ریال)",
            value: separateAmountWithCommas(exitDetailTools?.data?.data?.fareAmount),
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "تاریخ ثبت مجوز خروج",
            value: exitDetailTools?.data?.data?.createdDate,
            icon: <Source className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "نام راننده",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.driverName,
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره همراه راننده",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.driverMobile,
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "نوع خودرو",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.vehicleTypeName,
            icon: <Filter1 className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
    ]

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }
        // eslint-disable-next-line
    }, [files]);

    const handleSubmitAttach = () => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })

        const formData: any = {
            id: id,
            attachments: attachments
        }

        attachmentTools.mutate(formData, {
            onSuccess: () => {

            }
        })
    }

    return (
        <>
            {attachmentTools.isLoading && <Backdrop loading={attachmentTools.isLoading} />}
            {postApprove?.isLoading && <Backdrop loading={postApprove?.isLoading} />}
            {exitDetailTools.isLoading && <Backdrop loading={exitDetailTools.isLoading} />}
            {ladingDetailTools.isLoading && <Backdrop loading={ladingDetailTools.isLoading} />}

            <Typography color="primary" variant="h1" className="pb-8">جزئیات مجوز خروج</Typography>
            <div className="md:flex md:justify-end md:items-end gap-x-4 py-4">
                <Badge badgeContent={exitDetailTools?.data?.data?.attachments.length || 0} color="secondary">
                    <Button variant="contained" onClick={() => downloadAttachments(exitDetailTools?.data?.data?.attachments)} className='mb-2' color="primary">
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
                <div className="lg:col-span-3">
                    <CardWithIcons
                        title={"توضیحات مجوز خروج"}
                        icon={<Numbers className="text-black" />}
                        value={exitDetailTools?.data?.data?.exitPermitDescription}
                        iconClassName={"bg-[#ECEFF3]"}
                    />
                </div>
                <div className="mt-4">
                    <ImagePreview base64Strings={exitDetailTools?.data?.data?.attachments || []} />
                </div>

                <Card className="lg:col-span-3 px-16 py-8">
                    <FileUpload files={files} setFiles={setFiles} />
                    <div className="flex justify-end items-end">
                        <Button onClick={handleSubmitAttach} variant="contained" color="secondary">
                            <Typography>ثبت ضمیمه</Typography>
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default ExitDetail