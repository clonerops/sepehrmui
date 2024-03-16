import { useState } from 'react'
import { Formik } from 'formik'
import { Button, Typography } from '@mui/material'
import moment from 'moment-jalaali'

import { useGetRecievePaymentById, usePostRecievePayment, useUpdateRecievePaymentById } from './core/_hooks'
import { dropdownReceivePaymentResource } from './helpers/dropdownConvert'
import { useGetReceivePaymentSources } from '../generic/_hooks'
import { convertToPersianWord } from '../../../_cloner/helpers/convertPersian'

import FileUpload from './components/FileUpload'
import FormikSelect from '../../../_cloner/components/FormikSelect'
import FormikInput from '../../../_cloner/components/FormikInput'
import Backdrop from '../../../_cloner/components/Backdrop'
import FormikPrice from '../../../_cloner/components/FormikPrice'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import { EnqueueSnackbar } from '../../../_cloner/helpers/Snackebar'
import CardWithIcons from '../../../_cloner/components/CardWithIcons'
import { DateRange, Paid } from '@mui/icons-material'
import FormikDescription from '../../../_cloner/components/FormikDescription'
import FormikCustomer from '../../../_cloner/components/FormikCustomer'
import { useParams } from 'react-router-dom'
import { separateAmountWithCommas } from '../../../_cloner/helpers/SeprateAmount'

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
    receivePaymentSourceToId: "",
    payToCustomerId: ""

}

const RecievePaymentEdit = () => {
    const { id }: any = useParams()

    const [trachingCode, setTrachingCode] = useState<any>(0)

    const { mutate, isLoading } = useUpdateRecievePaymentById()
    const { data: paymentResource } = useGetReceivePaymentSources()

    const detailTools = useGetRecievePaymentById(id)


    const [files, setFiles] = useState<File[]>([]);
    console.log({
        ...initialValues,
        ...detailTools?.data?.data
    })
    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                <CardWithIcons
                    title='شماره'
                    icon={<Paid className="text-white" />}
                    value={trachingCode ? trachingCode : detailTools?.data?.data?.trachingCode || 0}
                    iconClassName='bg-[#F8B30E]' />
                <CardWithIcons
                    title='تاریخ ثبت'
                    icon={<DateRange className="text-white" />}
                    value={moment(new Date(Date.now())).format('jYYYY/jMM/jDD')}
                    iconClassName='bg-[#EB5553]' />
            </div>

            <ReusableCard>
                <div className='mt-2'>
                    <Formik enableReinitialize initialValues={{
                        ...initialValues,
                        ...detailTools?.data?.data, 
                        amount: detailTools?.data?.data?.amount ? separateAmountWithCommas(detailTools?.data?.data?.amount) : ""
                    }} onSubmit={
                        async (values: any) => {
                            const formData: any = new FormData()
                            formData.append("Id", id)
                            formData.append("ReceivePaymentSourceFromId", Number(values.receivePaymentSourceFromId))
                            // formData.append("ReceiveFromCustomerId", values.ReceiveFromCustomerId)
                            formData.append("ReceiveFromCustomerId", values.receiveFromCustomerId.value)
                            formData.append("ReceivePaymentSourceToId", values.receivePaymentSourceToId)
                            formData.append("Amount", Number(values.amount?.replace(/,/g, "")))
                            // formData.append("PayToCustomerId", values.PayToCustomerId)
                            formData.append("PayToCustomerId", values.payToCustomerId.value)
                            formData.append("AccountOwner", values.accountOwner)
                            formData.append("TrachingCode", values.trachingCode)
                            formData.append("CompanyName", values.companyName)
                            formData.append("ContractCode", values.contractCode)
                            formData.append("Description", values.description)
                            files.forEach((file) => {
                                formData.append('Attachments', file);
                            });
                            mutate(formData, {
                                onSuccess: (response) => {
                                    if (response?.succeeded) {
                                        setTrachingCode(response?.data?.receivePayCode)
                                        EnqueueSnackbar(response.message, "success")
                                    }else {
                                        EnqueueSnackbar(response.data.Message, "warning")
                                      } 
                                }
                            })
                        }
                    }>
                        {({ handleSubmit, values }) => {
                            return <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-0'>
                                    <FormikSelect name='receivePaymentSourceFromId' label='دریافت از' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {Number(values.receivePaymentSourceFromId) == 1 &&
                                        // <FormikSelect name='ReceiveFromCustomerId' label='نام مشتری' options={dropdownCustomer(customers?.data)} />
                                        <FormikCustomer name='receiveFromCustomerId' label='نام مشتری' />
                                    }
                                    <FormikSelect name='receivePaymentSourceToId' label='پرداخت به' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {Number(values.receivePaymentSourceToId) == 1 &&
                                     <FormikCustomer name='payToCustomerId' label='نام مشتری' />
                                        // <FormikSelect name='PayToCustomerId' label='نام مشتری' options={dropdownCustomer(customers?.data)} />
                                    }
                                    <FormikInput name='accountOwner' label='صاحب حساب' type='text' />
                                    <div className='flex flex-col'>
                                        <FormikPrice name='amount' label='مبلغ' type='text' />
                                        {/* <Typography variant='subtitle1' color="secondary">{separateAmountWithCommas(values.Amount)}</Typography> */}
                                        <Typography variant='subtitle1' color="primary">{convertToPersianWord(Number(values.Amount?.replace(/,/g, "")))} تومان</Typography>
                                    </div>

                                    <FormikInput name='trachingCode' label='کد پیگیری' type='text' />
                                    <FormikInput name='companyName' label='نام شرکت' type='text' />
                                    <FormikInput name='contractCode' label='کد قرارداد' type='text' />
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

export default RecievePaymentEdit