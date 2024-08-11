import { useParams } from "react-router-dom"
import { Badge, Button, Typography } from "@mui/material"
import { useDisApprovePaymentApproved, useGetRecievePaymentById, useUpdatePaymentApproved } from "../core/_hooks"
import { DownloadFileJPEG, DownloadFileJPG, DownloadFilePDF, DownloadFilePNG } from "../../../../_cloner/helpers/downloadFiles"
import { EnqueueSnackbar } from '../../../../_cloner/helpers/snackebar'

import Backdrop from "../../../../_cloner/components/Backdrop"
import CardWithIcons from "../../../../_cloner/components/CardWithIcons"
import { AddCard, AddHomeWork, Apps, CheckCircleOutline, Description, Filter1, Numbers, Person, Source } from "@mui/icons-material"
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog"
import { useState } from "react"
import TransitionsModal from "../../../../_cloner/components/ReusableModal"
import { Formik } from "formik"
import FormikDescription from "../../../../_cloner/components/FormikDescription"

const Detail = () => {   
    const { id }: any = useParams()

    const receivePayTools = useGetRecievePaymentById(id)
    const updateReceivePayTools = useUpdatePaymentApproved()
    const rejectReceivePayTools = useDisApprovePaymentApproved()
    
    const [approve, setApprove] = useState<boolean>(false);
    const [disApprove, setDisApprove] = useState<boolean>(false);


    const fieldsValue = [
        {
            title: "شماره ثبت",
            value: receivePayTools?.data?.data?.receivePayCode,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "دریافت از",
            // value: receivePayTools?.data?.data?.receivePaymentSourceFromDesc + " " + (receivePayTools?.data?.data?.receiveFromCustomerName === null ? "" : receivePayTools?.data?.data?.receiveFromCustomerName),
            value: receivePayTools?.data?.data?.receiveFromDesc,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شرکت دریافت از",
            value: receivePayTools?.data?.data?.receiveFromCompanyName,
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "پرداخت به",
            // value: receivePayTools?.data?.data?.receivePaymentSourceToDesc + " " + (receivePayTools?.data?.data?.payToCustomerName === null ? "" : receivePayTools?.data?.data?.payToCustomerName),
            value: receivePayTools?.data?.data?.payToDesc,
            icon: <AddCard className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شرکت پرداخت به",
            value: receivePayTools?.data?.data?.payToCompanyName,
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "صاحب حساب",
            value: receivePayTools?.data?.data?.accountOwner,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "کد پیگیری",
            value: receivePayTools?.data?.data?.trachingCode,
            icon: <Source className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },        
        {
            title: "شماره قرارداد",
            value: receivePayTools?.data?.data?.contractCode,
            icon: <Filter1 className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره سند حسابداری",
            value: receivePayTools?.data?.data?.accountingDocNo,
            icon: <Numbers className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "وضعیت",
            value: receivePayTools?.data?.data?.receivePayStatusDesc,
            icon: <CheckCircleOutline className="text-black" />,
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

    const hadelDownload = () => {
        if (receivePayTools?.data?.data?.attachments?.length === 0) {
            alert("فایلی برای دانلود وجود ندارد")
        } else {
            receivePayTools?.data?.data?.attachments?.forEach((element: any) => {
                switch (detectMimeType(element.fileData)) {
                    case "image/png":
                        const outputFilenamePng = `filesattachments${Date.now()}.png`;
                        DownloadFilePNG(element.fileData, outputFilenamePng)
                        break;
                    case "image/jpg":
                        const outputFilenameJpg = `filesattachments${Date.now()}.jpg`;
                        DownloadFileJPG(element.fileData, outputFilenameJpg)
                        break;
                    case "image/jpeg":
                        const outputFilenameJpeg = `filesattachments${Date.now()}.jpeg`;
                        DownloadFileJPEG(element.fileData, outputFilenameJpeg)
                        break;
                    case "application/pdf":
                        const outputFilenamePdf = `filesattachments${Date.now()}.pdf`;
                        DownloadFilePDF(element.fileData, outputFilenamePdf)
                        break;

                    default:
                        break;
                }
            });
        }
    };


    const handleConfirm = () => {
        const formData ={
            ids: [id]
        }
        updateReceivePayTools.mutate(formData, {
            onSuccess: (response) => {
                if (response?.succeeded) {
                    EnqueueSnackbar(response.message, "success")
                    receivePayTools.refetch()
                    setApprove(false)

                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            }
        })
    }

    const handleDisApproveConfirm = (values: any) => {
        const formData = {
            id: id,
            accountingDescription: values.accountingDescription
        }
        if (id)
            rejectReceivePayTools.mutate(formData, {
                onSuccess: (response) => {
                    if (response?.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                        receivePayTools.refetch()
                        setApprove(false)

                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                    }
                }
            })

    }

    return (
        <>
            {receivePayTools.isLoading && <Backdrop loading={receivePayTools.isLoading} />}
            {updateReceivePayTools.isLoading && <Backdrop loading={updateReceivePayTools.isLoading} />}
            {rejectReceivePayTools.isLoading && <Backdrop loading={rejectReceivePayTools.isLoading} />}

            <Typography color="primary" variant="h1" className="pb-8">جزئیات و ثبت تایید دریافت و پرداخت</Typography>
            <div className="lg:grid lg:grid-cols-3 text-right lg:gap-4 lg:space-y-0 space-y-4">
                {fieldsValue.map((item: any) =>
                    <CardWithIcons
                        title={item.title}
                        icon={item.icon}
                        value={item.value}
                        iconClassName={item.bgColor}
                    />
                )}
                <div className="col-span-2">
                    <CardWithIcons
                        title="توضیحات حسابداری"
                        icon={<Description className="text-black" />}
                        value={receivePayTools?.data?.data?.accountingDescription}
                        iconClassName="bg-[#ECEFF3]"
                    />
                </div>
                <div className="col-span-3">
                    <CardWithIcons
                        title="توضیحات"
                        icon={<Description className="text-black" />}
                        value={receivePayTools?.data?.data?.description}
                        iconClassName="bg-[#ECEFF3]"
                    />
                </div>
            </div>
            <div className="md:flex md:justify-end md:items-end gap-x-4 py-4">
                <Badge badgeContent={receivePayTools?.data?.data?.attachments.length || 0} color="secondary">
                    <Button variant="contained" onClick={hadelDownload} className='mb-2' color="primary">
                        <Typography>{"دانلود ضمیمه ها"}</Typography>
                    </Button>
                </Badge>
                <Button variant="contained" onClick={() => setApprove(true)} className='mb-2' color="secondary">
                    <Typography>{receivePayTools.isLoading ? "در حال پردازش..." : "ثبت تایید"}</Typography>
                </Button>
                <Button variant="contained" onClick={() => setDisApprove(true)} className='mb-2 !bg-red-500 hover:!bg-red-700' >
                    <Typography>{rejectReceivePayTools.isLoading ? "در حال پردازش..." : "عدم تایید حسابداری"}</Typography>
                </Button>
            </div>
            <ConfirmDialog
                open={approve}
                hintTitle="آیا از تایید سند دریافت و پرداخت مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={receivePayTools.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleConfirm()}
            />
            <TransitionsModal
                open={disApprove}
                isClose={() => setDisApprove(false)}
                title="عدم تایید دریافت و پرداخت"
                width="60%"
                description=" درصورتی که دریافت و پرداخت مورد تایید نمی باشد می توانید از طریق فرم زیر اقدام به عدم تایید آن نمایید"
            >
                <div className="flex flex-col space-y-4 mt-4">
                    <Typography variant="h3"> شماره دریافت پرداخت: {receivePayTools?.data?.data?.receivePayCode}</Typography>
                    <Formik initialValues={{accountingDescription: ""}} onSubmit={handleDisApproveConfirm}>
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

export default Detail