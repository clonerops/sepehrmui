import { useEffect, useRef, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import { Button, Typography } from '@mui/material'
import moment from 'moment-jalaali'

import { useDisApprovePaymentApproved, useGetRecievePaymentById, useUpdatePaymentApproved, useUpdateRecievePaymentById } from './core/_hooks'
import { convertToPersianWord } from '../../../_cloner/helpers/convertPersian'
import { useParams } from 'react-router-dom'
import { DateRange, Paid } from '@mui/icons-material'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
import { separateAmountWithCommas } from '../../../_cloner/helpers/seprateAmount'

import FormikInput from '../../../_cloner/components/FormikInput'
import Backdrop from '../../../_cloner/components/Backdrop'
import FormikPrice from '../../../_cloner/components/FormikPrice'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import CardWithIcons from '../../../_cloner/components/CardWithIcons'
import FormikDescription from '../../../_cloner/components/FormikDescription'
import useBase64toFile from '../../../_cloner/helpers/convertBaseToFile'
import ConfirmDialog from '../../../_cloner/components/ConfirmDialog'
// import TransitionsModal from '../../../_cloner/components/ReusableModal'
import FormikCompany from '../../../_cloner/components/FormikCompany'
import FileUpload from '../../../_cloner/components/FileUpload'
import PaymentOriginType from '../../../_cloner/components/PaymentOriginType'
import { useAuth } from '../../../_cloner/helpers/checkUserPermissions'

const RecievePaymentEdit = () => {
    const { hasPermission } = useAuth()

    const { id }: any = useParams()
    const formikRef = useRef<FormikProps<any>>(null)

    const [approve, setApprove] = useState<boolean>(false);

    const convertBase64ToFile = useBase64toFile()

    const { mutate, isLoading } = useUpdateRecievePaymentById()
    const updateApprove = useUpdatePaymentApproved()

    const detailTools = useGetRecievePaymentById(id)
    const initialValues = {
        receivedFrom: "",
        payTo: "",
        accountOwner: "",
        amount: "",
        trachingCode: "",
        companyName: "",
        contractCode: "",
        description: "",
        receivePaymentSourceFromId: "",
        receiveFromCustomerId: "",
        receiveFromCustomerIdForm: "",
        receivePaymentSourceToId: "",
        payToCustomerIdForm: "",
        payToCustomerId: "",
        accountingDocNo: "",
        receiveFromId: "",
        payToId: "",
        accountingDescription: "",

    }
    const [files, setFiles] = useState<File[]>([]);

    const formData = new FormData()
    formData.append("Id", id)
    formData.append("ReceivePaymentTypeFromId", formikRef.current?.values?.receivePaymentTypeFromId ? formikRef.current?.values?.receivePaymentTypeFromId : detailTools?.data?.data?.receivePaymentTypeFromId)
    formData.append("ReceivePaymentTypeToId", formikRef.current?.values?.receivePaymentTypeToId ? formikRef.current?.values?.receivePaymentTypeToId : detailTools?.data?.data?.receivePaymentTypeToId)
    formData.append("ReceiveFromId", formikRef.current?.values?.receiveFromDesc?.value ? formikRef.current?.values?.receiveFromDesc?.value : formikRef.current?.values?.receiveFromId ? formikRef.current?.values?.receiveFromId : detailTools?.data?.data?.receiveFromId)
    formData.append("PayToId", formikRef.current?.values?.payToDesc?.value ? formikRef.current?.values?.payToDesc?.value : formikRef.current?.values?.payToId ? formikRef.current?.values?.payToId : detailTools?.data?.data?.payToId)
    formData.append("Amount", formikRef.current?.values?.amount ? +formikRef.current?.values?.amount?.replace(/,/g, "") : detailTools?.data?.data?.amount)
    formData.append("AccountOwner", formikRef.current?.values?.accountOwner ? formikRef.current?.values?.accountOwner : detailTools?.data?.data?.accountOwner)
    formData.append("TrachingCode", formikRef.current?.values?.trachingCode ? formikRef.current?.values?.trachingCode : detailTools?.data?.data?.trachingCode)
    formData.append("CompanyName", formikRef.current?.values?.companyName ? formikRef.current?.values?.companyName : detailTools?.data?.data?.companyName)
    formData.append("ContractCode", formikRef.current?.values?.contractCode ? formikRef.current?.values?.contractCode : detailTools?.data?.data?.contractCode)
    formData.append("AccountingDocNo", formikRef.current?.values?.accountingDocNo ? +formikRef.current?.values?.accountingDocNo : detailTools?.data?.data?.accountingDocNo)
    formData.append("AccountingDescription", formikRef.current?.values?.accountingDescription ? formikRef.current?.values?.accountingDescription : (detailTools?.data?.data?.accountingDescription === "" || detailTools?.data?.data?.accountingDescription === null) ? "ندارد" : detailTools?.data?.data?.accountingDescription)
    formData.append("Description", formikRef.current?.values?.description ? formikRef.current?.values?.description : detailTools?.data?.data?.description)
    formData.append("ReceivedFrom", "")
    formData.append("ReceiveFromCompanyId", formikRef.current?.values?.receiveFromCompanyId ? formikRef.current?.values?.receiveFromCompanyId : detailTools?.data?.data?.receiveFromCompanyId === null ? "" : detailTools?.data?.data?.receiveFromCompanyId)
    formData.append("PayToCompanyId", formikRef.current?.values?.payToCompanyId ? formikRef.current?.values?.payToCompanyId : detailTools?.data?.data?.payToCompanyId === null ? "" : detailTools?.data?.data?.payToCompanyId)
    formData.append("PayTo", "")
    files.forEach((file) => {
        formData.append('Attachments', file);
    });

    const onSubmit = async (values: any) => {
        mutate(formData, {
            onSuccess: (response) => {
                if (response?.succeeded) {
                    EnqueueSnackbar("ویرایش با موفقیت انجام پذیرفت", "success")
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            }
        })

    }


    const handleConfirm = () => {
        mutate(formData, {
            onSuccess: (response) => {
                if (response?.succeeded) {
                    EnqueueSnackbar("ویرایش با موفقیت انجام پذیرفت", "success")
                    if (approve) {
                        setApprove(false)
                        const approveSendData = {
                            ids: [id]
                        }
                        updateApprove.mutate(approveSendData, {
                            onSuccess: (response) => {
                                if (response?.succeeded) {
                                    EnqueueSnackbar(response.message, "success")
                                } else {
                                    EnqueueSnackbar(response.data.Message, "warning")
                                }
                            }
                        })
                    }
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            }
        })
    }


    useEffect(() => {
        if (detailTools.isLoading) {
            setFiles([])
        } else {
            setFiles(detailTools?.data?.data?.attachments?.map((item: { fileData: string }) => convertBase64ToFile(item.fileData, "example.jpg")))
        }
        // eslint-disable-next-line
    }, [detailTools?.isLoading])


    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                <CardWithIcons
                    title='شماره'
                    icon={<Paid className="text-white" />}
                    value={detailTools?.data?.data?.receivePayCode}
                    iconClassName='bg-[#F8B30E]' />
                <CardWithIcons
                    title='تاریخ ثبت'
                    icon={<DateRange className="text-white" />}
                    value={moment(new Date(Date.now())).format('jYYYY/jMM/jDD')}
                    iconClassName='bg-[#EB5553]' />
            </div>

            <ReusableCard>
                <div className='mt-2'>
                    <Formik innerRef={formikRef} enableReinitialize initialValues={{
                        ...initialValues,
                        ...detailTools?.data?.data,
                        amount: detailTools?.data?.data?.amount ? separateAmountWithCommas(detailTools?.data?.data?.amount) : "",
                        receiveFromId: detailTools?.data?.data?.receivePaymentTypeFromId === 1 ? {value: detailTools?.data?.data?.receiveFromId, label: detailTools?.data?.data?.receiveFromDesc} : detailTools?.data?.data?.receiveFromId,
                        payToId: detailTools?.data?.data?.receivePaymentTypeToId === 1 ? {value: detailTools?.data?.data?.payToId, label: detailTools?.data?.data?.payToDesc} : detailTools?.data?.data?.payToId

                    }} onSubmit={onSubmit}>
                        {({ handleSubmit, values }) => {
                            return <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-0'>
                                    <PaymentOriginType label="نوع دریافت از" officialLabel="دریافت از" typeName="receivePaymentTypeFromId" officialName="receiveFromId" typeId={values.receivePaymentTypeFromId} />
                                    {detailTools?.data?.data?.receivePaymentTypeFromId === 1 &&
                                        <FormikCompany customerid={values?.receiveFromDesc ? values?.receiveFromDesc?.value : detailTools?.data?.data?.receiveFromId} name="receiveFromCompanyId" label="نام شرکت دریافت از" />
                                    }
                                    <PaymentOriginType label="نوع پرداخت به" officialLabel="پرداخت به" typeName="receivePaymentTypeToId" officialName="payToId" typeId={values.receivePaymentTypeToId} />

                                    {detailTools?.data?.data?.receivePaymentTypeToId === 1 &&
                                        <FormikCompany customerid={values?.payToDesc ? values?.payToDesc?.value : detailTools?.data?.data?.payToId} name="payToCompanyId" label="نام شرکت پرداخت به" />
                                    }
                                    <FormikInput name='accountOwner' label='صاحب حساب' type='text' />
                                    <div className='flex flex-col'>
                                        <FormikPrice name='amount' label='مبلغ' type='text' />
                                        <Typography variant='subtitle1' color="primary">{convertToPersianWord(Number(values.Amount?.replace(/,/g, "")))} تومان</Typography>
                                    </div>

                                    <FormikInput name='trachingCode' label='کد پیگیری' type='text' />

                                    <FormikInput name='contractCode' label='کد قرارداد' type='text' />
                                </div>
                                <div className='grid grid-cols-1 my-8'>
                                    <FormikDescription name='accountingDescription' label='توضیحات حسابداری' type='text' />
                                </div>
                                <div className='grid grid-cols-1 my-8'>
                                    <FormikDescription name='description' label='توضیحات' type='text' />
                                </div>
                                <div className='grid grid-cols-1'>
                                    <FileUpload files={files} setFiles={setFiles} />
                                </div>
                                <div className='flex gap-x-4'>
                                    {hasPermission("UpdateReceivePay") &&
                                        <Button disabled={detailTools?.data?.data?.receivePayStatusId >= 2} onClick={() => handleSubmit()} variant="contained" color="secondary">
                                            <Typography variant="h3" className="px-8 py-2">ویرایش دریافت و پرداخت</Typography>
                                        </Button>
                                    }
                                    {hasPermission("ReceivePayApprove") &&
                                        <Button disabled={detailTools?.data?.data?.receivePayStatusId >= 2} variant="contained" onClick={() => setApprove(true)} className='mb-2' color="primary">
                                            <Typography variant="h3">{isLoading ? "در حال پردازش..." : "ثبت تایید"}</Typography>
                                        </Button>
                                    }
                                </div>

                            </form>
                        }}
                    </Formik>
                </div>
            </ReusableCard>
            <ConfirmDialog
                open={approve}
                hintTitle="آیا از تایید سند دریافت و پرداخت مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={updateApprove?.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleConfirm()}
            />
        </>
    )
}

export default RecievePaymentEdit