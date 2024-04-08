import { useState } from 'react'
import { Formik } from 'formik'
import { Button, Typography } from '@mui/material'
import moment from 'moment-jalaali'

import { usePostRecievePayment } from './core/_hooks'
import { dropdownReceivePaymentResource } from './helpers/dropdownConvert'
import { useGetReceivePaymentSources } from '../generic/_hooks'

import FileUpload from './components/FileUpload'
import FormikSelect from '../../../_cloner/components/FormikSelect'
import FormikInput from '../../../_cloner/components/FormikInput'
import Backdrop from '../../../_cloner/components/Backdrop'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import { EnqueueSnackbar } from '../../../_cloner/helpers/Snackebar'
import CardWithIcons from '../../../_cloner/components/CardWithIcons'
import { DateRange, Paid } from '@mui/icons-material'
import FormikDescription from '../../../_cloner/components/FormikDescription'
import FormikCustomer from '../../../_cloner/components/FormikCustomer'
import FormikOrganzationBank from '../../../_cloner/components/FormikOrganzationBank'
import FormikCashDesk from '../../../_cloner/components/FormikCashDesk'
import FormikIncome from '../../../_cloner/components/FormikIncome'

const initialValues = {
    ReceivedFrom: "",
    PayTo: "",
    AccountOwner: "",
    Amount: "",
    TrachingCode: "",
    CompanyName: "",
    ContractCode: "",
    Description: "",
    ReceivePaymentSourceFromId: "",
    ReceiveFromCustomerId: "",
    ReceivePaymentSourceToId: "",
    PayToCustomerId: "",
    AccountingDocNo: "",
    AccountingDescription: ""

}

const RecievePayment = () => {
    const [trachingCode, setTrachingCode] = useState<any>(0)

    const { mutate, isLoading } = usePostRecievePayment()
    const { data: paymentResource } = useGetReceivePaymentSources()

    const [files, setFiles] = useState<File[]>([]);

    const rendereFields = (receivePaymentSourceFromId: number) => {
        switch (receivePaymentSourceFromId) {
            case 1:
               return  <FormikCustomer name='ReceiveFromCustomerId' label='دریافت از' />
                break;
            case 2:
               return  <FormikOrganzationBank name='ReceiveFromCustomerId' label='دریافت از' />
                break;
            case 3:
               return  <FormikCashDesk name='ReceiveFromCustomerId' label='دریافت از' />
                break;
            case 4:
               return  <FormikCashDesk name='ReceiveFromCustomerId' label='دریافت از' />
                break;
            case 5:
               return  <FormikIncome name='ReceiveFromCustomerId' label='دریافت از' />
                break;
        
            default:
                return <FormikInput name='ReceiveFromCustomerId' label='دریافت از' disabled={true} />
                break;
        }
    }

    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
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
                            formData.append("ReceivePaymentSourceFromId", Number(values.ReceivePaymentSourceFromId))
                            // formData.append("ReceiveFromCustomerId", values.ReceiveFromCustomerId)
                            formData.append("ReceiveFromCustomerId", values.ReceiveFromCustomerId ? values.ReceiveFromCustomerId.value : "")
                            formData.append("ReceivePaymentSourceToId", values.ReceivePaymentSourceToId)
                            formData.append("Amount", Number(values.Amount?.replace(/,/g, "")))
                            // formData.append("PayToCustomerId", values.PayToCustomerId)
                            formData.append("PayToCustomerId", values.PayToCustomerId ? values.PayToCustomerId.value : "")
                            formData.append("AccountOwner", values.AccountOwner)
                            formData.append("TrachingCode", values.TrachingCode)
                            // formData.append("AccountingDocNo", Number(values.AccountingDocNo))
                            formData.append("AccountingDescription", values.AccountingDescription ? values.AccountingDescription : "ندارد")
                            formData.append("CompanyName", values.CompanyName)
                            formData.append("ContractCode", values.ContractCode)
                            formData.append("Description", values.Description)
                            files.forEach((file) => {
                                formData.append('Attachments', file);
                            });
                            mutate(formData, {
                                onSuccess: (response) => {
                                    if (response?.succeeded) {
                                        setTrachingCode(response?.data?.receivePayCode)
                                        EnqueueSnackbar(response.message, "success")
                                    } else {
                                        EnqueueSnackbar(response.data.Message, "warning")
                                    }
                                }
                            })
                        }
                    }>
                        {({ handleSubmit, values }) => {
                            return <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-0'>
                                    <FormikSelect name='ReceivePaymentSourceFromId' label='نوع دریافت از' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {rendereFields(values.ReceivePaymentSourceFromId)}
                                    {/* <FormikSelect 
                                        name='ReceivePaymentSourceFromId' 
                                        label='دریافت از' 
                                        options={dropdownReceivePaymentResource(paymentResource)} /> */}
                                    {/* {Number(values.ReceivePaymentSourceFromId) === 1 &&
                                        <FormikCustomer name='ReceiveFromCustomerId' label='دریافت از' />
                                    } */}
                                    {/* <FormikSelect name='ReceivePaymentSourceToId' label='پرداخت به' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {Number(values.ReceivePaymentSourceToId) === 1 &&
                                        <FormikCustomer name='PayToCustomerId' label='نام مشتری' />
                                        <FormikSelect name='PayToCustomerId' label='نام مشتری' options={dropdownCustomer(customers?.data)} />
                                    }
                                    <FormikInput name='AccountOwner' label='صاحب حساب' type='text' />
                                    <div className='flex flex-col'>
                                        <FormikPrice name='Amount' label='مبلغ' type='text' />
                                        <Typography variant='subtitle1' color="secondary">{separateAmountWithCommas(values.Amount)}</Typography>
                                        <Typography variant='subtitle1' color="primary">{convertToPersianWord(Number(values.Amount?.replace(/,/g, "")))} تومان</Typography>
                                    </div>

                                    <FormikInput name='TrachingCode' label='کد پیگیری' type='text' />
                                    <FormikInput name='CompanyName' label='نام شرکت' type='text' />
                                    <FormikInput name='ContractCode' label='کد قرارداد' type='text' />
                                    <FormikInput name='AccountingDocNo' label='شماره سند حسابداری' type='text' /> */}
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