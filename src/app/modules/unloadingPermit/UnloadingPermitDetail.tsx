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
import { useAddAttachmentsForUnloading, useGetUnloadingPermitById, usePostApproveDriverFareAmount } from "./_hooks"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import MuiTable from "../../../_cloner/components/MuiTable"
import { UnloadingPemritDetailColumn } from "../../../_cloner/helpers/columns"
import ImagePreview from "../../../_cloner/components/ImagePreview"

const UnloadingPermitDetail = () => {
    const [files, setFiles] = useState<File[]>([])
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    const { id }: any = useParams()

    const unloadingDetailTools = useGetUnloadingPermitById(id)
    const ladingDetailTools = useGetLadingLicenceById(unloadingDetailTools?.data?.data?.ladingPermitId)

    const postApprove = usePostApproveDriverFareAmount()
    const attachmentTools = useAddAttachmentsForUnloading()

    const fieldsValue = [
        {
            title: "شماره مجوز تخلیه",
            value: unloadingDetailTools?.data?.data?.unloadingPermitCode || "ثبت نشده",
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "تاریخ ثبت مجوز تخلیه",
            value: unloadingDetailTools?.data?.data?.createDate || "ثبت نشده",
            icon: <Source className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "مبلغ کرایه (ریال)",
            value: separateAmountWithCommas(unloadingDetailTools?.data?.data?.fareAmount) || "ثبت نشده",
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "تاریخ تحویل",
            value: unloadingDetailTools?.data?.data?.deliverDate || "ثبت نشده",
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "نام راننده",
            value: unloadingDetailTools?.data?.data?.driverName || "ثبت نشده",
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره همراه راننده",
            value: unloadingDetailTools?.data?.data?.driverMobile || "ثبت نشده",
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره حساب",
            value: unloadingDetailTools?.data?.data?.driverAccountNo || "ثبت نشده",
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
            {unloadingDetailTools.isLoading && <Backdrop loading={unloadingDetailTools.isLoading} />}
            {ladingDetailTools.isLoading && <Backdrop loading={ladingDetailTools.isLoading} />}

            <Typography color="primary" variant="h1" className="pb-8">جزئیات مجوز تخلیه</Typography>
            <div className="md:flex md:justify-end md:items-end gap-x-4 py-4">
                <Badge badgeContent={unloadingDetailTools?.data?.data?.attachments.length || 0} color="secondary">
                    <Button variant="contained" onClick={() => downloadAttachments(unloadingDetailTools?.data?.data?.attachments)} className='mb-2' color="primary">
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
                        title={"توضیحات مجوز تخلیه"}
                        icon={<Numbers className="text-black" />}
                        value={unloadingDetailTools?.data?.data?.description || "ثبت نشده"}
                        iconClassName={"bg-[#ECEFF3]"}
                    />
                </div>
                <ReusableCard cardClassName="lg:col-span-3">
                    <MuiTable
                        data={unloadingDetailTools?.data?.data?.unloadingPermitDetails}
                        columns={UnloadingPemritDetailColumn()}
                        onDoubleClick={() => { }}
                    />
                </ReusableCard>
                <div className="mt-4">
                    <ImagePreview base64Strings={unloadingDetailTools?.data?.data?.attachments || []} />
                </div>

                {/* <Card className="lg:col-span-3 px-16 py-8">
                    <FileUpload files={files} setFiles={setFiles} />
                    <div className="flex justify-end items-end">
                        <Button onClick={handleSubmitAttach} variant="contained" color="secondary">
                            <Typography>ثبت ضمیمه</Typography>
                        </Button>
                    </div>
                </Card> */}
            </div>
        </>
    )
}

export default UnloadingPermitDetail