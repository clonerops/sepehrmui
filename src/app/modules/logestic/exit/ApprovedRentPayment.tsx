import { useParams } from "react-router-dom"
import { Alert, Badge, Button, Typography } from "@mui/material"

import { AddCard, AddHomeWork, Apps, CheckCircleOutline, Description, Filter1, Numbers, PaymentOutlined, Person, Source } from "@mui/icons-material"
import { useState } from "react"
import { Formik } from "formik"
import Backdrop from "../../../../_cloner/components/Backdrop"
import CardWithIcons from "../../../../_cloner/components/CardWithIcons"
import TransitionsModal from "../../../../_cloner/components/ReusableModal"
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog"
import FormikDescription from "../../../../_cloner/components/FormikDescription"
import { useGetLadingExitPermitById, useGetLadingPermitById, usePostApproveDriverFareAmount } from "../core/_hooks"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"
import { sliceNumberPrice } from "../../../../_cloner/helpers/sliceNumberPrice"
import { convertToPersianWord } from "../../../../_cloner/helpers/convertPersian"
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar"

const ApprovedRentPayment = () => {
    const {id}: any = useParams()
    const [approve, setApprove] = useState<boolean>(false);
    const [disApprove, setDisApprove] = useState<boolean>(false);
    
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
            // value: data?.data?.receivePaymentSourceFromDesc + " " + (data?.data?.receiveFromCustomerName === null ? "" : data?.data?.receiveFromCustomerName),
            value: exitDetailTools?.data?.data?.ladingPermitId,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره اعلام بار",
            // value: data?.data?.receivePaymentSourceToDesc + " " + (data?.data?.payToCustomerName === null ? "" : data?.data?.payToCustomerName),
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
        {
            title: "باربری",
            value: ladingDetailTools?.data?.data?.cargoAnnounce?.shippingName,
            icon: <Numbers className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        
    ]

    var signatures: any = {
        JVBERi0: "application/pdf",
        R0lGODdh: "image/gif",
        R0lGODlh: "image/gif",
        iVBORw0KGgo: "image/png",
        "/9j/": "image/jpg"
    };

    function detectMimeType(b64: any) {
        for (var s in signatures) {
            if (b64.indexOf(s) === 0) {
                return signatures[s];
            }
        }
    }

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

    // const handleDisApproveConfirm = (values: any) => {
    //     const formData = {
    //         id: id,
    //         accountingDescription: values.accountingDescription
    //     }
    //     if (id)
    //         reject(formData, {
    //             onSuccess: (response) => {
    //                 if (response?.succeeded) {
    //                     EnqueueSnackbar(response.message, "success")
    //                     refetch()
    //                     setApprove(false)

    //                 } else {
    //                     EnqueueSnackbar(response.data.Message, "warning")
    //                 }
    //             }
    //         })

    // }

    if(exitDetailTools.isLoading) {
        return <Backdrop loading={exitDetailTools?.isLoading} />
    }
    if(ladingDetailTools.isLoading) {
        return <Backdrop loading={ladingDetailTools?.isLoading} />
    }

    return (
        <>
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
                {/* <Button variant="contained" onClick={() => setDisApprove(true)} className='mb-2 !bg-red-500 hover:!bg-red-700' >
                    <Typography>{rejectLoading ? "در حال پردازش..." : "عدم تایید حسابداری"}</Typography>
                </Button> */}
            </div>
            {/* <ConfirmDialog
                open={approve}
                hintTitle="آیا از تایید سند دریافت و پرداخت مطمئن هستید؟"
                notConfirmText="لغو"
                // confirmText={fetchingLaoding ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => {}}
            /> */}
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
            {/* <TransitionsModal
                open={disApprove}
                isClose={() => setDisApprove(false)}
                title="عدم تایید دریافت و پرداخت"
                width="60%"
                description=" درصورتی که دریافت و پرداخت مورد تایید نمی باشد می توانید از طریق فرم زیر اقدام به عدم تایید آن نمایید"
            >
                <div className="flex flex-col space-y-4 mt-4">
                    <Typography variant="h3"> شماره دریافت پرداخت: {136}</Typography>
                    <Formik initialValues={{accountingDescription: ""}} onSubmit={() => {}}>
                        {({handleSubmit}) => (
                            <form>
                                <FormikDescription name="accountingDescription" label="توضیحات حسابداری" />
                                <div className="flex gap-x-4 justify-end items-end mt-2">
                                    <Button onClick={() => handleSubmit()} className='!bg-red-500 hover:!bg-red-700'>
                                        <Typography variant="h3" className="text-white">عدم تایید حسابداری</Typography>
                                    </Button>
                                    <Button onClick={() => setDisApprove(false)} variant="outlined" color="secondary">
                                        <Typography variant="h4">لغو</Typography>
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </TransitionsModal> */}
        </>
    )
}

export default ApprovedRentPayment