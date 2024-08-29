import { useParams } from "react-router-dom"
import { Badge, Button, Typography } from "@mui/material"
import { downloadAttachments } from "../../../_cloner/helpers/downloadAttachments"
import { CarCrash, Money, Person, Person2, Phone, Shop } from "@mui/icons-material"
import { useCargoById } from "./_hooks"
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount"

import Backdrop from "../../../_cloner/components/Backdrop"
import CardWithIcons from "../../../_cloner/components/CardWithIcons"
import ImagePreview from "../../../_cloner/components/ImagePreview"

const CargoDetail = () => {
    const {id}: any = useParams()
    
    const cargoTools = useCargoById(id)

    const fieldsValue = [
        {
            title: "شماره اعلام بار",
            value: cargoTools?.data?.data?.cargoAnnounceNo,
            icon: <CarCrash className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "کاربر ثبت کننده",
            value: cargoTools?.data?.data?.createdBy || "ثبت نشده",
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره سفارش",
            value: cargoTools?.data?.data?.order?.orderCode,
            icon: <Shop className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "مبلغ کرایه(ریال)",
            value: separateAmountWithCommas(cargoTools?.data?.data?.fareAmount) || "ثبت نشده",
            icon: <Money className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "راننده",
            value: cargoTools?.data?.data?.driverName || "ثبت نشده",
            icon: <Person2 className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "موبایل راننده",
            value: cargoTools?.data?.data?.driverMobile || "ثبت نشده",
            icon: <Phone className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
      
    ]

    return (
        <>
            {cargoTools.isLoading && <Backdrop loading={cargoTools.isLoading} />}
            <Typography color="primary" variant="h1" className="pb-8">جزئیات اعلام بار</Typography>
            <div className="md:flex md:justify-end md:items-end gap-x-4 py-4">
                <Badge badgeContent={cargoTools?.data?.data.attachments?.length} color="secondary">
                    <Button variant="contained" onClick={() => downloadAttachments(cargoTools?.data?.data?.attachments)} className='mb-2' color="primary">
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
            </div>
            <div className="mt-4">
                <ImagePreview base64Strings={cargoTools?.data?.data?.attachments || []} />
            </div>

        </>
    )
}

export default CargoDetail