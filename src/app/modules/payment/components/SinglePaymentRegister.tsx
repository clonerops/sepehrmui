// eslint-disable-next-line
import { useParams } from "react-router-dom"
import { Badge, Button, Typography } from "@mui/material"
import { useDisApprovePaymentApproved, useGetRecievePaymentById, usePutRecievePaymentRegister } from "../core/_hooks"
import { DownloadFileJPEG, DownloadFileJPG, DownloadFilePDF, DownloadFilePNG } from "../../../../_cloner/helpers/downloadFiles"
import { EnqueueSnackbar } from '../../../../_cloner/helpers/snackebar'

import Backdrop from "../../../../_cloner/components/Backdrop"
import CardWithIcons from "../../../../_cloner/components/CardWithIcons"
import { AddCard, AddHomeWork, Apps, CheckCircleOutline, Description, Filter1, Numbers, Person, Source } from "@mui/icons-material"
import { useRef, useState } from "react"
import TransitionsModal from "../../../../_cloner/components/ReusableModal"
import { Formik, FormikProps } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { renderAlert } from "../../../../_cloner/helpers/sweetAlert"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/seprateAmount"
import { useAuth } from "../../../../_cloner/helpers/checkUserPermissions"
import FormikDescription from "../../../../_cloner/components/FormikDescription"

const SinglePaymentRegister = () => {
    const {hasPermission} = useAuth()

    const putRecievePayRegister = usePutRecievePaymentRegister()
    const rejectReceivePayTools = useDisApprovePaymentApproved()


    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [disApprove, setDisApprove] = useState<boolean>(false);

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
            // value: data?.data?.receivePaymentSourceFromDesc + " " + (data?.data?.receiveFromCustomerName === null ? "" : data?.data?.receiveFromCustomerName),
            value: data?.data?.receiveFromDesc,
            icon: <Apps className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شرکت دریافت از",
            value: data?.data?.receiveFromCompanyName,
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "پرداخت به",
            // value: data?.data?.receivePaymentSourceToDesc + " " + (data?.data?.payToCustomerName === null ? "" : data?.data?.payToCustomerName),
            value: data?.data?.payToDesc,
            icon: <AddCard className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "شرکت پرداخت به",
            value: data?.data?.payToCompanyName,
            icon: <AddHomeWork className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "صاحب حساب",
            value: data?.data?.accountOwner,
            icon: <Person className="text-black" />,
            bgColor: "bg-[#ECEFF3]"
        },
        {
            title: "مبلغ(ریال)",
            value: separateAmountWithCommas(data?.data?.amount),
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
        {
            title: "توضیحات حسابداری",
            value: data?.data?.accountingDescription,
            icon: <Description className="text-black" />,
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
                        refetch()
                        setDisApprove(false)
                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                    }
                }
            })

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

            <div className="lg:grid lg:grid-cols-3 text-right lg:gap-4 lg:space-y-0 space-y-4">
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
                {hasPermission("ReceivePayAccReject") &&
                    <Button variant="contained" onClick={() => setDisApprove(true)} className='mb-2 !bg-red-500 hover:!bg-red-700' >
                        <Typography>{rejectReceivePayTools.isLoading ? "در حال پردازش..." : "عدم تایید حسابداری"}</Typography>
                    </Button>
                }

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
            <TransitionsModal
                open={disApprove}
                isClose={() => setDisApprove(false)}
                title="عدم تایید دریافت و پرداخت"
                width="60%"
                description=" درصورتی که دریافت و پرداخت مورد تایید نمی باشد می توانید از طریق فرم زیر اقدام به عدم تایید آن نمایید"
            >
                <div className="flex flex-col space-y-4 mt-4">
                    <Typography variant="h3"> شماره دریافت پرداخت: {data?.data?.receivePayCode}</Typography>
                    <Formik initialValues={{ accountingDescription: "" }} onSubmit={handleDisApproveConfirm}>
                        {({ handleSubmit }) => (
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