// eslint-disable-next-line
import { useParams } from "react-router-dom"
import { Badge, Button, Typography } from "@mui/material"
import { useGetRecievePaymentById, usePutRecievePaymentRegister } from "../core/_hooks"
import { DownloadFileJPEG, DownloadFileJPG, DownloadFilePNG } from "../../../../_cloner/helpers/DownloadFiles"
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'

import Backdrop from "../../../../_cloner/components/Backdrop"
import CardWithIcons from "../../../../_cloner/components/CardWithIcons"
import { AddCard, AddHomeWork, Apps, CheckCircleOutline, Description, Filter1, Numbers, Person, Source } from "@mui/icons-material"
import { useRef, useState } from "react"
import TransitionsModal from "../../../../_cloner/components/ReusableModal"
import { Formik, FormikProps } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { renderAlert } from "../../../../_cloner/helpers/SweetAlert"

const SinglePaymentRegister = () => {
    const putRecievePayRegister = usePutRecievePaymentRegister()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { id }: any = useParams()
    const { data, isLoading: fetchingLaoding, refetch } = useGetRecievePaymentById(id)

    const formikRefAccountDocNo = useRef<FormikProps<any>>(null)

    const fieldsValue = [
        {
            title: "شماره ثبت",
            value: data?.data?.receivePayCode,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "دریافت از",
            value: data?.data?.receivePaymentSourceFromDesc + " " + (data?.data?.receiveFromCustomerName === null ? "" : data?.data?.receiveFromCustomerName),
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "پرداخت به",
            value: data?.data?.receivePaymentSourceToDesc + " " + (data?.data?.payToCustomerName === null ? "" : data?.data?.payToCustomerName),
            icon: <AddCard className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "صاحب حساب",
            value: data?.data?.accountOwner,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "کد پیگیری",
            value: data?.data?.trachingCode,
            icon: <Source className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "صاحب شرکت",
            value: data?.data?.companyName,
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره قرارداد",
            value: data?.data?.contractCode,
            icon: <Filter1 className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شماره سند حسابداری",
            value: data?.data?.accountingDocNo,
            icon: <Numbers className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "وضعیت",
            value: data?.data?.receivePayStatusDesc,
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
        if (data?.data.attachments?.length === 0) {
            alert("فایلی برای دانلود وجود ندارد")
        } else {
            data?.data?.attachments?.forEach((element: any) => {
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

                    default:
                        break;
                }
            });
        }
    };


    const handleConfirm = () => {
        if (id) {
            const filters: any = {
                receivePays: [id],
                accountDocNo: formikRefAccountDocNo?.current?.values?.accountDocNo
            }
            putRecievePayRegister.mutate(filters, {
                onSuccess: (response) => {
                    if (response?.succeeded) {
                        renderAlert(response.message)
                        refetch()
                        setIsOpen(false)
                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                    }
                }
            })
        }

    }

    return (
        <>
            {fetchingLaoding && <Backdrop loading={fetchingLaoding} />}
            <Typography color="primary" variant="h1" className="pb-8">جزئیات و ثبت سند حسابداری</Typography>
            <div className="flex justify-end items-end mb-4">
                <Badge badgeContent={data?.data?.attachments.length || 0} color="secondary">
                    <Button variant="contained" onClick={hadelDownload} className='mb-2' color="primary">
                        <Typography>{"دانلود ضمیمه ها"}</Typography>
                    </Button>
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 text-right gap-4">
                {fieldsValue.map((item: any) =>
                    <CardWithIcons
                        title={item.title}
                        icon={item.icon}
                        value={item.value}
                        iconClassName={item.bgColor}
                    />
                )}
                <div className="col-span-3">
                    <CardWithIcons
                        title="توضیحات"
                        icon={<Description className="text-black" />}
                        value={data?.data?.description}
                        iconClassName="bg-[#ECEFF3]"
                    />
                </div>
            </div>
            <div className="md:flex md:justify-end md:items-end gap-x-4 py-4">
                <Button variant="contained" disabled={data?.data?.receivePayStatusId >= 3} onClick={() => setIsOpen(true)} className='mb-2' color="secondary">
                    <Typography>{"ثبت سند حسابداری"}</Typography>
                </Button>
            </div>
            <TransitionsModal
                open={isOpen}
                isClose={() => setIsOpen(false)}
                title="ثبت شماره سند"
                description="لطفا شماره سند را برای ثبت حسابداری دریافت و پرداخت را وارد نمایید"
            >
                <>
                    <Formik innerRef={formikRefAccountDocNo} initialValues={{ accountDocNo: "" }} onSubmit={
                        () => {
                        }
                }>
                        {() => (
                            <div className="flex flex-col space-y-4">
                                <div className="mt-8">
                                    <FormikInput name="accountDocNo" label="شماره سند" />
                                </div>
                                <div className="flex justify-end items-end gap-4">
                                    <Button className="!bg-green-500" onClick={() => handleConfirm()}>
                                        <Typography>{putRecievePayRegister.isLoading ? "درحال پردازش" : "ثبت"}</Typography>
                                    </Button>
                                    <Button className="!bg-red-500" onClick={() => setIsOpen(false)}>
                                        <Typography className="text-white">انصراف</Typography>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Formik>
                </>
            </TransitionsModal>


            {/* <ConfirmDialog
                open={approve}
                hintTitle="آیا از ثبت سند حسابداری مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={fetchingLaoding ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleConfirm()}
            /> */}

        </>
    )
}

export default SinglePaymentRegister