import { useParams } from "react-router-dom"
import { Alert, Badge, Button, Typography } from "@mui/material"

import { AddCard, AddHomeWork, Apps, CheckCircleOutline, Description, Filter1, Numbers, PaymentOutlined, Person, Source } from "@mui/icons-material"
import { useState } from "react"
import { Formik } from "formik"
import Backdrop from "../../../_cloner/components/Backdrop"
import CardWithIcons from "../../../_cloner/components/CardWithIcons"
import TransitionsModal from "../../../_cloner/components/ReusableModal"
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog"
import FormikDescription from "../../../_cloner/components/FormikDescription"

const ApprovedRentPayment = () => {
    const [approve, setApprove] = useState<boolean>(false);
    const [disApprove, setDisApprove] = useState<boolean>(false);

    const fieldsValue = [
        {
            title: "شماره مجوز خروج",
            value: 112,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره مجوز بارگیری",
            // value: data?.data?.receivePaymentSourceFromDesc + " " + (data?.data?.receiveFromCustomerName === null ? "" : data?.data?.receiveFromCustomerName),
            value: 13,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره اعلام بار",
            // value: data?.data?.receivePaymentSourceToDesc + " " + (data?.data?.payToCustomerName === null ? "" : data?.data?.payToCustomerName),
            value: 10002,
            icon: <AddCard className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره سفارش فروش",
            value: 1295,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "تاریخ ثبت مجوز خروج",
            value: "1403/02/01",
            icon: <Source className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "نام راننده",
            value: "رضا حسنی",
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره همراه راننده",
            value: "09217767345",
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "نوع خودرو",
            value: "نیسان",
            icon: <Filter1 className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "باربری",
            value: "حامدبار",
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


    // const handleConfirm = () => {
    //     const formData ={
    //         ids: [id]
    //     }
    //     mutate(formData, {
    //         onSuccess: (response) => {
    //             if (response?.succeeded) {
    //                 EnqueueSnackbar(response.message, "success")
    //                 refetch()
    //                 setApprove(false)

    //             } else {
    //                 EnqueueSnackbar(response.data.Message, "warning")
    //             }
    //         }
    //     })
    // }

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

    return (
        <>
            {/* {fetchingLaoding && <Backdrop loading={fetchingLaoding} />} */}
            <Typography color="primary" variant="h1" className="pb-8">جزئیات و ثبت تایید کرایه</Typography>
            <div className="mb-4">
                <Alert icon={<PaymentOutlined fontSize="inherit" />} severity="info">
                    <Typography variant="h2">مبلغ کرایه</Typography>
                    <div className="flex flex-col gap-y-4 mt-8">
                        <div className="flex flex-row items-center gap-x-4">
                            <Typography variant="h4" className="text-red-500">به عدد:</Typography>
                            <Typography variant="h1">125,000,000 ریال</Typography>
                        </div>
                        <div className="flex flex-row items-center gap-x-4">
                            <Typography variant="h4" className="text-red-500">به حروف:</Typography>
                            <Typography variant="h1">صد و بیست و پنج میلیون تومان</Typography>
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
                        value={"خروج بلامانع می باشد"}
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
                    {/* <Typography>{isLoading ? "در حال پردازش..." : "ثبت تایید"}</Typography> */}
                </Button>
                <Button variant="contained" onClick={() => setDisApprove(true)} className='mb-2 !bg-red-500 hover:!bg-red-700' >
                    {/* <Typography>{rejectLoading ? "در حال پردازش..." : "عدم تایید حسابداری"}</Typography> */}
                </Button>
            </div>
            <ConfirmDialog
                open={approve}
                hintTitle="آیا از تایید سند دریافت و پرداخت مطمئن هستید؟"
                notConfirmText="لغو"
                // confirmText={fetchingLaoding ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => {}}
            />
            <TransitionsModal
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
            </TransitionsModal>
        </>
    )
}

export default ApprovedRentPayment