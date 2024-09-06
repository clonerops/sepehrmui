import { useState } from 'react'
import { Formik } from 'formik'
import { Button, Typography } from '@mui/material'
import { DateRange, Paid } from '@mui/icons-material'
import moment from 'moment-jalaali'

import { usePostRecievePayment } from './core/_hooks'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'

import FormikInput from '../../../_cloner/components/FormikInput'
import Backdrop from '../../../_cloner/components/Backdrop'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import CardWithIcons from '../../../_cloner/components/CardWithIcons'
import FormikDescription from '../../../_cloner/components/FormikDescription'
import FormikPrice from '../../../_cloner/components/FormikPrice'
import FormikCompany from '../../../_cloner/components/FormikCompany'
import FileUpload from '../../../_cloner/components/FileUpload'
import PaymentOriginType from '../../../_cloner/components/PaymentOriginType'
import { convertToPersianWord } from '../../../_cloner/helpers/convertPersian'

const initialValues = {
    ReceivedFrom: "",
    PayTo: "",
    AccountOwner: "",
    ReceivePaymentTypeFromId: "",
    ReceivePaymentTypeToId: "",
    ReceiveFromId: "",
    PayToId: "",
    Amount: "",
    TrachingCode: "",
    CompanyName: "",
    ContractCode: "",
    Description: "",
    ReceiveFromCompanyId: "",
    PayToCompanyId: "",
    AccountingDocNo: "",
    AccountingDescription: ""

}

const RecievePayment = () => {
    const [trachingCode, setTrachingCode] = useState<any>(0)

    const postRecievePayTools = usePostRecievePayment()

    const [files, setFiles] = useState<File[]>([]);


    return (
        <>
            {postRecievePayTools.isLoading && <Backdrop loading={postRecievePayTools.isLoading} />}

            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                <CardWithIcons
                    title='شماره'
                    icon={<Paid className="text-white" />}
                    value={trachingCode || 0}
                    iconClassName='bg-[#F8B30E]' />
                <CardWithIcons
                    title='تاریخ ثبت'
                    icon={<DateRange className="text-white" />}
                    value={moment(new Date(Date.now())).format('jYYYY/jMM/jDD')}
                    iconClassName='bg-[#EB5553]' />
            </div>

            <ReusableCard>
                <div className='mt-2'>
                    <Formik initialValues={initialValues} onSubmit={
                        async (values: any) => {
                            const formData: any = new FormData()
                            formData.append("ReceivePaymentTypeFromId", Number(values.ReceivePaymentTypeFromId))
                            formData.append("ReceivePaymentTypeToId", values.ReceivePaymentTypeToId)
                            formData.append("AccountOwner", values.AccountOwner)
                            formData.append("TrachingCode", values.TrachingCode)
                            // formData.append("CompanyName", values.CompanyName)
                            formData.append("ReceiveFromCompanyId", values.ReceiveFromCompanyId)
                            formData.append("PayToCompanyId", values.PayToCompanyId)
                            formData.append("ContractCode", values.ContractCode)
                            formData.append("Amount", Number(values.Amount?.replace(/,/g, "")))
                            formData.append("Description", values.Description)
                            formData.append("ReceiveFromId", values.ReceivePaymentTypeFromId === 1 ? values.ReceiveFromId.value : values.ReceiveFromId)
                            formData.append("PayToId", values.ReceivePaymentTypeToId === 1 ? values.PayToId.value : values.PayToId)
                            files.forEach((file) => {
                                formData.append('Attachments', file);
                            });
                            postRecievePayTools.mutate(formData, {
                                onSuccess: (response) => {
                                    if (response.data.Errors && response.data.Errors.length > 0) {
                                        EnqueueSnackbar(response.data.Errors[0], "error")
                                    } else {
                                        if (response?.succeeded) {
                                            setTrachingCode(response?.data?.receivePayCode)
                                            EnqueueSnackbar(response.message, "success")
                                        } else {
                                            EnqueueSnackbar(response.data.Message, "warning")
                                        }
                                    }
                                }
                            })
                        }
                    }>
                        {({ handleSubmit, values }) => {
                            return <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-0'>
                                    <PaymentOriginType label="نوع دریافت از" officialLabel="دریافت از" typeName="ReceivePaymentTypeFromId" officialName="ReceiveFromId" typeId={values.ReceivePaymentTypeFromId} />
                                    {values?.ReceiveFromId?.value &&
                                        <FormikCompany customerid={values?.ReceiveFromId?.value} name="ReceiveFromCompanyId" label="نام شرکت دریافت از" />
                                    }
                                    <PaymentOriginType label="نوع پرداخت به" officialLabel="پرداخت به" typeName="ReceivePaymentTypeToId" officialName="PayToId" typeId={values.ReceivePaymentTypeToId} />

                                    {values?.PayToId?.value &&
                                        <FormikCompany customerid={values?.PayToId?.value} name="PayToCompanyId" label="نام شرکت پرداخت به" />
                                    }
                                    <FormikInput name='AccountOwner' label='صاحب حساب' type='text' />
                                    <div className='flex flex-col'>
                                        <FormikPrice name='Amount' label='مبلغ' type='text' />
                                    </div>
                                    <FormikInput name='TrachingCode' label='کد پیگیری' type='text' />

                                    <FormikInput name='ContractCode' label='کد قرارداد' type='text' />
                                </div>
                                <div className='grid grid-cols-1 my-8'>
                                    <FormikDescription name='Description' label='توضیحات' type='text' />
                                </div>
                                <div className='grid grid-cols-1'>
                                    <FileUpload files={files} setFiles={setFiles} />
                                </div>
                                <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                    <Typography variant="h3" className="px-8 py-2">ثبت دریافت و پرداخت</Typography>
                                </Button>
                            </form>
                        }}
                    </Formik>
                </div>

            </ReusableCard>
        </>
    )
}

export default RecievePayment