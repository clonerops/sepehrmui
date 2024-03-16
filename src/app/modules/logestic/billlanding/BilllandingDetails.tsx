import {  CarCrash, DateRange, DateRangeRounded, Description, HomeMaxRounded, HomeMiniOutlined, HomeOutlined, NumbersOutlined, Person, PhoneRounded, Place, PriceChange, TypeSpecimen, TypeSpecimenTwoTone } from "@mui/icons-material"
import CardTitleValue from "../../../../_cloner/components/CardTitleValue"
import MuiTable from "../../../../_cloner/components/MuiTable"
import { Typography } from "@mui/material"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"
import { useGetTransferRemitanceById } from "../core/_hooks"
import { useParams } from "react-router-dom"
import Backdrop from "../../../../_cloner/components/Backdrop"

const BilllandingDetails = () => {
    const { id }: any = useParams()
    const detailTools = useGetTransferRemitanceById(id)

    const orderAndAmountInfo = [
        { id: 1, title: "شماره حواله", icon: <NumbersOutlined color="secondary" />, value: detailTools?.data?.data?.id },
        { id: 2, title: "تاریخ ثبت حواله", icon: <DateRangeRounded color="secondary" />, value: detailTools?.data?.data?.registerDate },
        { id: 2, title: "تاریخ ثبت ورود", icon: <DateRangeRounded color="secondary" />, value: detailTools?.data?.data?.registerDate },
        { id: 3, title: "نوع انتقال", icon: <TypeSpecimenTwoTone color="secondary" />, value: detailTools?.data?.data?.transferRemittanceTypeDesc },
        { id: 4, title: "انبار مبدا", icon: <HomeMaxRounded color="secondary" />, value: detailTools?.data?.data?.originWarehouseName },
        { id: 5, title: "انبار مقصد", icon: <HomeMiniOutlined color="secondary" />, value: detailTools?.data?.data?.destinationWarehouseName },
        { id: 6, title: "نام و نام خانوادگی راننده", icon: <Person color="secondary" />, value: detailTools?.data?.data?.driverName },
        { id: 7, title: "شماره همراه راننده", icon: <PhoneRounded color="secondary" />, value: detailTools?.data?.data?.driverMobile },
        { id: 8, title: "شماره پلاک خودرو", icon: <Place color="secondary" />, value: detailTools?.data?.data?.plaque },
        { id: 9, title: "نوع خودرو", icon: <TypeSpecimen color="secondary" />, value: detailTools?.data?.data?.vehicleTypeName },
        { id: 10, title: "مبلغ کرایه", icon: <PriceChange color="secondary" />, value: detailTools?.data?.data?.fareAmount },
        { id: 11, title: "تاریخ تحویل", icon: <DateRange color="secondary" />, value: detailTools?.data?.data?.deliverDate },
        { id: 12, title: "باربری", icon: <CarCrash color="secondary" />, value: detailTools?.data?.data?.shippingName },
        { id: 12, title: "شماره حساب راننده", icon: <CarCrash color="secondary" />, value: detailTools?.data?.data?.driverAccountNo },
        { id: 12, title: "شماره کارت راننده", icon: <CarCrash color="secondary" />, value: detailTools?.data?.data?.driverCreditCardNo },
        { id: 12, title: "سایر هزینه ها", icon: <CarCrash color="secondary" />, value: detailTools?.data?.data?.otherCosts },
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

    if(detailTools.isLoading) {
        return <Backdrop loading={detailTools.isLoading} />
    }

    console.log("detailTools.isLoading", detailTools.isLoading)

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 mb-8">
                {orderAndAmountInfo.map((item: {
                    title: string,
                    icon: React.ReactNode,
                    value: any
                }, index) => {
                    return <CardTitleValue key={index} title={item.title} value={item.value} icon={item.icon} />
                })}
                <div className="lg:col-span-4">
                    <CardTitleValue title={"آدرس محل تخلیه"} value={detailTools?.data?.data?.unloadingPlaceAddress} icon={<HomeOutlined color="secondary" />} />
                </div>
                <div className="lg:col-span-4">
                    <CardTitleValue title={"توضیحات"} value={detailTools?.data?.data?.description} icon={<Description color="secondary" />} />
                </div>
            </div>

            <MuiTable data={detailTools?.data?.data?.details} columns={detailTransfer} />
        </>
    )
}

export default BilllandingDetails