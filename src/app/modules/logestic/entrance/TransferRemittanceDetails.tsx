import { AttachMoney, CarCrash, DateRange, DateRangeRounded, Description, ExitToApp, HomeMaxRounded, HomeMiniOutlined, HomeOutlined, LocalShipping, NumbersOutlined, Person, PhoneRounded, Place, PriceChange, TypeSpecimen, TypeSpecimenTwoTone } from "@mui/icons-material"
import CardTitleValue from "../../../../_cloner/components/CardTitleValue"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import MuiTable from "../../../../_cloner/components/MuiTable"
import { Typography } from "@mui/material"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"
import { useEntrancePermission, useGetTransferRemitanceById } from "../core/_hooks"
import { useParams } from "react-router-dom"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog"
import { useState } from "react"
import { renderAlert } from "../../../../_cloner/helpers/SweetAlert"
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar"
import Backdrop from "../../../../_cloner/components/Backdrop"

const TransferRemittanceDetails = () => {
    const { id }: any = useParams()
    const detailTools = useGetTransferRemitanceById(id)
    const entranceTools = useEntrancePermission()

    const [approve, setApprove] = useState<boolean>(false)

    const orderAndAmountInfo = [
        { id: 1, title: "شماره حواله", icon: <NumbersOutlined color="secondary" />, value: detailTools?.data?.data?.id },
        { id: 2, title: "تاریخ حواله", icon: <DateRangeRounded color="secondary" />, value: detailTools?.data?.data?.registerDate },
        { id: 3, title: "نوع انتقال", icon: <TypeSpecimenTwoTone color="secondary" />, value: detailTools?.data?.data?.transferRemittanceTypeDesc },
        { id: 4, title: "انبار مبدا", icon: <HomeMaxRounded color="secondary" />, value: detailTools?.data?.data?.originWarehouseName },
        { id: 5, title: "انبار مقصد", icon: <HomeMiniOutlined color="secondary" />, value: detailTools?.data?.data?.destinationWarehouseName },
        { id: 6, title: "نام و نام خانوادگی راننده", icon: <Person color="secondary" />, value: detailTools?.data?.data?.driverName },
        { id: 7, title: "شماره همراه راننده", icon: <PhoneRounded color="secondary" />, value: detailTools?.data?.data?.driverMobile },
        { id: 8, title: "شماره پلاک خودرو", icon: <Place color="secondary" />, value: detailTools?.data?.data?.carPlaque },
        { id: 9, title: "نوع خودرو", icon: <TypeSpecimen color="secondary" />, value: detailTools?.data?.data?.vehicleTypeName },
        { id: 10, title: "مبلغ کرایه", icon: <PriceChange color="secondary" />, value: detailTools?.data?.data?.fareAmount },
        { id: 11, title: "تاریخ تحویل", icon: <DateRange color="secondary" />, value: detailTools?.data?.data?.deliverDate },
        { id: 12, title: "باربری", icon: <CarCrash color="secondary" />, value: detailTools?.data?.data?.shippingName },
    ]

    const detailTransfer = [
        { id: 1, header: "کد کالا", accessor: "productCode" },
        { id: 2, header: "نام کالا", accessor: "productName" },
        { id: 3, header: "برند", accessor: "brandName" },
        {
            id: 4, header: "مقدار انتفال", accessor: "transferAmount", render: (params: any) => {
                return <Typography variant="h2" className="text-green-500">{separateAmountWithCommas(params.transferAmount)}</Typography>
            }
        },
    ]

    const handleEntrancePermission = () => {
        const formData = {
            id: id
        }
        entranceTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    renderAlert(response.message)
                } else {
                    EnqueueSnackbar(response.data.Message, "error")
                }
            }
        })
        setApprove(false)

    }

    return (
        <>
            {entranceTools.isLoading && <Backdrop loading={entranceTools.isLoading} />}
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
            <div className="flex justify-end items-end mb-4">
                <ButtonComponent onClick={() => setApprove(true)}>
                    <Typography className="text-white px-4 py-2" variant="h4">ثبت مجوز ورود</Typography>
                </ButtonComponent>

            </div>
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
            <ConfirmDialog
                open={approve}
                hintTitle={`آیا از ثبت مجوز ورود شماره حواله ${detailTools?.data?.data?.id} مطمئن هستید؟`}
                notConfirmText="لغو"
                confirmText={detailTools.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleEntrancePermission()}

            />

        </>
    )
}

export default TransferRemittanceDetails