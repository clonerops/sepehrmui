import { useState } from "react"
import { Formik } from "formik"
import { useParams } from "react-router-dom"
import { Alert, Badge, Button, Typography } from "@mui/material"

import { AddCard, AddHomeWork, Apps,  Filter1, Numbers, PaymentOutlined, Person, Source } from "@mui/icons-material"
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount"
import { convertToPersianWord } from "../../../_cloner/helpers/convertPersian"
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar"
import { useGetLadingLicenceById } from "../ladingLicence/_hooks"

import Backdrop from "../../../_cloner/components/Backdrop"
import CardWithIcons from "../../../_cloner/components/CardWithIcons"
import TransitionsModal from "../../../_cloner/components/ReusableModal"
import FormikDescription from "../../../_cloner/components/FormikDescription"
import { useGetLadingExitPermitById, usePostApproveDriverFareAmount } from "./_hooks"

const ApprovedRentPayment = () => {
    const {id}: any = useParams()
    const [approve, setApprove] = useState<boolean>(false);
    
    const exitDetailTools = useGetLadingExitPermitById(id)
    const ladingDetailTools = useGetLadingLicenceById(exitDetailTools?.data?.data?.ladingPermitId)

    const postApprove = usePostApproveDriverFareAmount()


    const fieldsValue = [
        {
            title: "شماره مجوز خروج",
            value: exitDetailTools?.data?.data?.ladingExitPermitCode || "ثبت نشده",
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره مجوز بارگیری",
            value: exitDetailTools?.data?.data?.ladingPermitId || "ثبت نشده",
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره اعلام بار",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.cargoAnnounceNo || "ثبت نشده",
            icon: <AddCard className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره سفارش فروش",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.order?.orderCode || "ثبت نشده",
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "تاریخ ثبت مجوز خروج",
            value: exitDetailTools?.data?.data?.createdDate || "ثبت نشده",
            icon: <Source className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "نام راننده",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.driverName || "ثبت نشده",
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره همراه راننده",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.driverMobile || "ثبت نشده",
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "نوع خودرو",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.vehicleTypeName || "ثبت نشده",
            icon: <Filter1 className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "باربری",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.shippingName || "ثبت نشده",
            icon: <Numbers className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        
    ]


    const handleConfirm = (values: any) => {
        const formData ={
            ladingExitPermitId: id,
            description: values.description
        }
        postApprove.mutate(formData, {
            onSuccess: (response) => {
                if (response?.succeeded) {
                    EnqueueSnackbar(response.message, "success")

                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            }
        })
    }

    return (
        <>
            {exitDetailTools.isLoading && <Backdrop loading={exitDetailTools.isLoading} />}
            {ladingDetailTools.isLoading && <Backdrop loading={ladingDetailTools.isLoading} />}
            {postApprove?.isLoading && <Backdrop loading={postApprove?.isLoading} />}

            <Typography color="primary" variant="h1" className="pb-8">جزئیات و ثبت تایید کرایه خروج</Typography>
            <div className="mb-4">
                <Alert icon={<PaymentOutlined fontSize="inherit" />} severity="info">
                    <Typography variant="h2">مبلغ کرایه</Typography>
                    <div className="flex flex-col gap-y-4 mt-8">
                        <div className="flex flex-row items-center gap-x-4">
                            <Typography variant="h4" className="text-red-500">به عدد:</Typography>
                            <Typography variant="h1">{separateAmountWithCommas(exitDetailTools?.data?.data.fareAmount)} ریال</Typography>
                        </div>
                        <div className="flex flex-row items-center gap-x-4">
                            <Typography variant="h4" className="text-red-500">به حروف:</Typography>
                            <Typography variant="h1">{convertToPersianWord(exitDetailTools?.data?.data.fareAmount)} تومان</Typography>
                        </div>
                    </div>
                </Alert>            
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
            </div>
            <div className="md:flex md:justify-end md:items-end gap-x-4 py-4">
                <Badge badgeContent={0} color="secondary">
                    <Button variant="contained" onClick={() => {}} className='mb-2' color="primary">
                        <Typography>{"دانلود ضمیمه ها"}</Typography>
                    </Button>
                </Badge>
                <Button variant="contained" onClick={() => setApprove(true)} className='mb-2' color="secondary">
                    <Typography>{postApprove?.isLoading ? "در حال پردازش..." : "ثبت تایید"}</Typography>
                </Button>
            </div>
            <TransitionsModal
                open={approve}
                isClose={() => setApprove(false)}
                title="تایید کرایه"
                width="60%"
                description=" درصورتی که کرایه مورد تایید نمی باشد می توانید از طریق فرم زیر اقدام به عدم تایید آن نمایید"
            >
                <div className="flex flex-col space-y-4 mt-4">
                    <Typography variant="h3"> شماره مجوز خروح: {exitDetailTools?.data?.data?.ladingExitPermitCode}</Typography>
                    <Formik initialValues={{description: ""}} onSubmit={handleConfirm}>
                        {({handleSubmit}) => (
                            <form>
                                <FormikDescription name="description" label="توضیحات تایید کننده" />
                                <div className="flex gap-x-4 justify-end items-end mt-2">
                                    <Button onClick={() => handleSubmit()} className='!bg-yellow-500 hover:!bg-yellow-700'>
                                        <Typography variant="h3" className="text-white">ثبت تایید کرایه</Typography>
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </TransitionsModal>
        </>
    )
}

export default ApprovedRentPayment