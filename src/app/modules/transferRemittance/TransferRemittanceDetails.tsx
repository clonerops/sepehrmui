import { CarCrash, DateRange, DateRangeRounded, Description, HomeMaxRounded, HomeMiniOutlined, HomeOutlined, NumbersOutlined, Person, PhoneRounded, Place, PriceChange, TypeSpecimen, TypeSpecimenTwoTone } from "@mui/icons-material"
import { Badge, Button, Typography } from "@mui/material"
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount"
import { useGetTransferRemitanceById } from "./_hooks"
import { downloadAttachments } from "../../../_cloner/helpers/downloadAttachments"
import { useParams } from "react-router-dom"

import CardTitleValue from "../../../_cloner/components/CardTitleValue"
import MuiTable from "../../../_cloner/components/MuiTable"
import Backdrop from "../../../_cloner/components/Backdrop"
import { useGetEntrancePermit } from "../entrancePermit/_hooks"
import ImagePreview from "../../../_cloner/components/ImagePreview"

const TrasnferRemittanceDetails = () => {
    const { id }: any = useParams()
    const detailTools = useGetTransferRemitanceById(id)
    const entranceDetailTools = useGetEntrancePermit(detailTools?.data?.data?.entrancePermit?.id)

    const orderAndAmountInfo = [
        { id: 1, title: "شماره حواله", icon: <NumbersOutlined color="secondary" />, value: detailTools?.data?.data?.id || "ثبت نشده" },
        { id: 2, title: "تاریخ ثبت حواله", icon: <DateRangeRounded color="secondary" />, value: detailTools?.data?.data?.registerDate || "ثبت نشده" },
        { id: 2, title: "تاریخ ثبت ورود", icon: <DateRangeRounded color="secondary" />, value: detailTools?.data?.data?.registerDate || "ثبت نشده" },
        { id: 3, title: "نوع انتقال", icon: <TypeSpecimenTwoTone color="secondary" />, value: detailTools?.data?.data?.transferRemittanceTypeDesc || "ثبت نشده" },
        { id: 4, title: "انبار مبدا", icon: <HomeMaxRounded color="secondary" />, value: detailTools?.data?.data?.originWarehouseName || "ثبت نشده" },
        { id: 5, title: "انبار مقصد", icon: <HomeMiniOutlined color="secondary" />, value: detailTools?.data?.data?.destinationWarehouseName || "ثبت نشده" },
        { id: 6, title: "نام و نام خانوادگی راننده", icon: <Person color="secondary" />, value: detailTools?.data?.data?.driverName || "ثبت نشده" },
        { id: 7, title: "شماره همراه راننده", icon: <PhoneRounded color="secondary" />, value: detailTools?.data?.data?.driverMobile || "ثبت نشده" },
        { id: 8, title: "شماره پلاک خودرو", icon: <Place color="secondary" />, value: detailTools?.data?.data?.plaque || "ثبت نشده" },
        { id: 9, title: "نوع خودرو", icon: <TypeSpecimen color="secondary" />, value: detailTools?.data?.data?.vehicleTypeName || "ثبت نشده" },
        { id: 10, title: "مبلغ کرایه", icon: <PriceChange color="secondary" />, value: separateAmountWithCommas(detailTools?.data?.data?.fareAmount) || "ثبت نشده" },
        { id: 11, title: "تاریخ تحویل", icon: <DateRange color="secondary" />, value: detailTools?.data?.data?.deliverDate || "ثبت نشده" },
        { id: 12, title: "باربری", icon: <CarCrash color="secondary" />, value: detailTools?.data?.data?.shippingName || "ثبت نشده" },
        { id: 12, title: "شماره حساب راننده", icon: <CarCrash color="secondary" />, value: detailTools?.data?.data?.driverAccountNo || "ثبت نشده" },
        { id: 12, title: "سایر هزینه ها", icon: <CarCrash color="secondary" />, value: detailTools?.data?.data?.otherCosts || "ثبت نشده" },
    ]

    const detailTransfer = [
        { id: 2, header: "نام کالا", accessor: "productName" },
        { id: 3, header: "برند", accessor: "brandName" },
        {
            id: 4, header: "مقدار انتقال", accessor: "transferAmount", render: (params: any) => {
                return <Typography variant="h3" className="text-green-500">{`${separateAmountWithCommas(params.transferAmount)} ${params.product.productMainUnitDesc}`}</Typography>
            }
        },
        {
            id: 5, header: "مقدار دقیق هنگام تخلیه", accessor: "transferAmount", render: (params: any) => {
                return <Typography variant="h3" className="text-green-500">{`${separateAmountWithCommas(params.unloadedAmount ? params.unloadedAmount : 0)} ${params.product.productMainUnitDesc}`}</Typography>
            }
        },
    ]

    return (
        <>
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
            {entranceDetailTools.isLoading && <Backdrop loading={entranceDetailTools.isLoading} />}
            <Typography color="primary" variant="h1" className="pb-8">جزئیات حواله</Typography>
            <div className='flex justify-end items-end mb-2 gap-x-4' >
                <Badge badgeContent={entranceDetailTools?.data?.data?.attachments?.length || 0} color="secondary">
                    <Button variant="contained" onClick={() => downloadAttachments(detailTools?.data?.data?.entrancePermit?.attachments)} color="primary">
                        <Typography>{"دانلود ضمیمه ثبت برای حواله ورود"}</Typography>
                    </Button>
                </Badge>
                {/* <Badge badgeContent={detailTools?.data?.data?.entrancePermit?.unloadingPermits[0]?.attachments.length || 0} color="primary">
                    <Button variant="contained" onClick={() => downloadAttachments(detailTools?.data?.data?.entrancePermit?.unloadingPermits[0]?.attachments)} color="secondary">
                        <Typography>{"دانلود ضمیمه ثبت برای مجوز تخلیه"}</Typography>
                    </Button>
                </Badge> */}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 mb-8">
                {orderAndAmountInfo.map((item: { title: string, icon: React.ReactNode, value: any }, index) => {
                    return <CardTitleValue key={index} title={item.title} value={item.value} icon={item.icon} />
                })}
                <div className="lg:col-span-4">
                    <CardTitleValue title={"آدرس محل تخلیه"} value={detailTools?.data?.data?.unloadingPlaceAddress || "ثبت نشده"} icon={<HomeOutlined color="secondary" />} />
                </div>
                <div className="lg:col-span-4">
                    <CardTitleValue title={"توضیحات"} value={detailTools?.data?.data?.description || "ثبت نشده"} icon={<Description color="secondary" />} />
                </div>
            </div>

            <MuiTable data={detailTools?.data?.data?.details} columns={detailTransfer} />
            <div className="mt-4">
                <ImagePreview base64Strings={detailTools?.data?.data?.entrancePermit?.attachments || []} />
            </div>
        </>
    )
}

export default TrasnferRemittanceDetails