import { useParams } from "react-router-dom"
import { Badge, Button, Card, Typography } from "@mui/material"

import { AddCard, AddHomeWork, Apps, Filter1, Numbers, Person, Source } from "@mui/icons-material"
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount"
import { useEffect, useState } from "react"
import { convertFilesToBase64 } from "../../../_cloner/helpers/convertToBase64"
import { ExitDetailColumn } from "../../../_cloner/helpers/columns"
import { useGetLadingLicenceById } from "../ladingLicence/_hooks"
import { downloadAttachments } from "../../../_cloner/helpers/downloadAttachments"
import { useAddAttachmentsForExit, useGetLadingExitPermitById, usePostApproveDriverFareAmount } from "./_hooks"

import CardWithIcons from "../../../_cloner/components/CardWithIcons"
import Backdrop from "../../../_cloner/components/Backdrop"
import ImagePreview from "../../../_cloner/components/ImagePreview"
import FileUpload from "../../../_cloner/components/FileUpload"
import MuiTable from "../../../_cloner/components/MuiTable"
import AttachmentAfterExit from "./components/AttachmentAfterExit"

const ExitDetail = () => {
    const [files, setFiles] = useState<File[]>([])

    const { id }: any = useParams()

    const exitDetailTools = useGetLadingExitPermitById(id)
    const ladingDetailTools = useGetLadingLicenceById(exitDetailTools?.data?.data?.ladingPermitId)

    const postApprove = usePostApproveDriverFareAmount()

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




    return (
        <>
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
                <div className="lg:col-span-3">
                    <MuiTable headClassName="bg-[#272862]" headCellTextColor="!text-white" columns={ExitDetailColumn} data={exitDetailTools?.data?.data?.ladingExitPermitDetails} onDoubleClick={() => {}} />
                </div>
                <div className="mt-4">
                    <ImagePreview base64Strings={exitDetailTools?.data?.data?.attachments || []} />
                </div>
                <div className="lg:col-span-3">
                    <AttachmentAfterExit files={files} setFiles={setFiles} id={id} />
                </div>
            </div>
        </>
    )
}

export default ExitDetail