import { useParams } from "react-router-dom"
import { Badge, Button, Card, Typography } from "@mui/material"

import { AddCard, AddHomeWork, Apps,  Filter1, Numbers, Person, Source, UploadFile } from "@mui/icons-material"
import Backdrop from "../../../../_cloner/components/Backdrop"
import CardWithIcons from "../../../../_cloner/components/CardWithIcons"
import { useGetLadingExitPermitById, useGetLadingPermitById, usePostApproveDriverFareAmount } from "../core/_hooks"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"
import FileUpload from "../../payment/components/FileUpload"
import { useState } from "react"

const ExitDetail = () => {
    const [files, setFiles] = useState<File[]>([])
    const {id}: any = useParams()
    
    const exitDetailTools = useGetLadingExitPermitById(id)
    const ladingDetailTools = useGetLadingPermitById(exitDetailTools?.data?.data?.ladingPermitId)

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

    // var signatures: any = {
    //     JVBERi0: "application/pdf",
    //     R0lGODdh: "image/gif",
    //     R0lGODlh: "image/gif",
    //     iVBORw0KGgo: "image/png",
    //     "/9j/": "image/jpg"
    // };

    // function detectMimeType(b64: any) {
    //     for (var s in signatures) {
    //         if (b64.indexOf(s) === 0) {
    //             return signatures[s];
    //         }
    //     }
    // }

    // const hadelDownload = () => {
    //     if (data?.data.attachments?.length === 0) {
    //         alert("فایلی برای دانلود وجود ندارد")
    //     } else {
    //         data?.data?.attachments?.forEach((element: any) => {
    //             switch (detectMimeType(element.fileData)) {
    //                 case "image/png":
    //                     const outputFilenamePng = `filesattachments${Date.now()}.png`;
    //                     DownloadFilePNG(element.fileData, outputFilenamePng)
    //                     break;
    //                 case "image/jpg":
    //                     const outputFilenameJpg = `filesattachments${Date.now()}.jpg`;
    //                     DownloadFileJPG(element.fileData, outputFilenameJpg)
    //                     break;
    //                 case "image/jpeg":
    //                     const outputFilenameJpeg = `filesattachments${Date.now()}.jpeg`;
    //                     DownloadFileJPEG(element.fileData, outputFilenameJpeg)
    //                     break;

    //                 default:
    //                     break;
    //             }
    //         });
    //     }
    // };

    if(exitDetailTools.isLoading) {
        return <Backdrop loading={exitDetailTools?.isLoading} />
    }
    if(ladingDetailTools.isLoading) {
        return <Backdrop loading={ladingDetailTools?.isLoading} />
    }

    return (
        <>
            {postApprove?.isLoading && <Backdrop loading={postApprove?.isLoading} />}
            <Typography color="primary" variant="h1" className="pb-8">جزئیات مجوز خروج</Typography>
            <div className="md:flex md:justify-end md:items-end gap-x-4 py-4">
                <Badge badgeContent={0} color="secondary">
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
                <div className="lg:col-span-3">
                    <CardWithIcons
                        title={"توضیحات مجوز خروج"}
                        icon={<Numbers className="text-black" />}
                        value={exitDetailTools?.data?.data?.exitPermitDescription}
                        iconClassName={"bg-[#ECEFF3]"}
                    />
                </div>
                <Card className="lg:col-span-3 px-16 py-8">
                    <FileUpload files={files} setFiles={setFiles} />
                    <div className="flex justify-end items-end">
                        <Button variant="contained" color="secondary">
                            <Typography>ثبت ضمیمه</Typography>
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default ExitDetail