import { useState } from 'react'
import { Form, Formik } from 'formik'
import FileUpload from './components/FileUpload'
import moment from 'moment-jalaali'
import { usePostRecievePayment } from './core/_hooks'
import { dropdownReceivePaymentResource } from './helpers/dropdownConvert'
import { useGetCustomers } from '../customer/core/_hooks'
import { dropdownCustomer } from '../order/helpers/dropdowns'
import { useGetReceivePaymentSources } from '../generic/_hooks'
import Backdrop from '../../../_cloner/components/Backdrop'
import { Box, Button, Card, Typography } from '@mui/material'
import FormikSelect from '../../../_cloner/components/FormikSelect'
import FormikInput from '../../../_cloner/components/FormikInput'
import PositionedSnackbar from '../../../_cloner/components/Snackbar'
import { convertToPersianWord } from '../../../_cloner/helpers/convertPersian'
import FormikPrice from '../product/components/FormikPrice'

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
    PayToCustomerId: ""

}

const RecievePayment = () => {
    const [trachingCode, setTrachingCode] = useState<any>(0)
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const { mutate, isLoading, data } = usePostRecievePayment()
    const { data: paymentResource } = useGetReceivePaymentSources()
    const { data: customers } = useGetCustomers()

    const [files, setFiles] = useState<File[]>([]);

    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        data?.data?.Message ||
                        data?.message
                    }
                />
            )}
            {isLoading && <Backdrop loading={isLoading} />}
            <Card className='p-8'>
                <Box component="div" className='md:flex md:justify-between md:first-letter:items-center'>
                    <Box component="div" className='md:flex md:justify-center md:items-center text-center my-2 font-bold text-lg bg-slate-200 py-4 px-16 text-black font-bold font-boldrounded-lg'>شماره: <Typography variant='h3' className='px-4'>{trachingCode}</Typography></Box>
                    <Box component="div" className='md:flex md:justify-center md:items-center text-center my-2 font-bold text-lg bg-gray-200 text-black font-bold font-boldpy-4 px-16 rounded-lg'>تاریخ ثبت: <Typography variant='h3' className='pr-4'>{moment(Date.now()).format('jYYYY/jMM/jDD').toString()}</Typography></Box>
                </Box>
                <Box component="div" className='mt-2'>
                    <Formik initialValues={initialValues} onSubmit={
                        async (values) => {
                            const formData: any = new FormData()
                            formData.append("ReceivePaymentSourceFromId", Number(values.ReceivePaymentSourceFromId))
                            formData.append("ReceiveFromCustomerId", values.ReceiveFromCustomerId)
                            formData.append("ReceivePaymentSourceToId", values.ReceivePaymentSourceToId)
                            formData.append("Amount", Number(values.Amount?.replace(/,/g, "")))
                            formData.append("PayToCustomerId", values.PayToCustomerId)
                            formData.append("AccountOwner", values.AccountOwner)
                            formData.append("TrachingCode", values.TrachingCode)
                            formData.append("CompanyName", values.CompanyName)
                            formData.append("ContractCode", values.ContractCode)
                            formData.append("Description", values.Description)
                            files.forEach((file) => {
                                formData.append('Attachments', file);
                            });
                            mutate(formData, {
                                onSuccess: (message) => {
                                    if (message?.succeeded) {
                                        setTrachingCode(message?.data?.receivePayCode)
                                    }
                                    setSnackeOpen(true)
                                }
                            })
                        }
                    }>
                        {({ handleSubmit, values }) => {
                            return <Form onSubmit={handleSubmit}>
                                <Box component="div" className='grid grid-cols-1 md:grid-cols-3 gap-4 my-0'>
                                    <FormikSelect name='ReceivePaymentSourceFromId' label='دریافت از' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {Number(values.ReceivePaymentSourceFromId) == 1 &&
                                        <FormikSelect name='ReceiveFromCustomerId' label='نام مشتری' options={dropdownCustomer(customers?.data)} />
                                    }
                                    <FormikSelect name='ReceivePaymentSourceToId' label='پرداخت به' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {Number(values.ReceivePaymentSourceToId) == 1 &&
                                        <FormikSelect name='PayToCustomerId' label='نام مشتری' options={dropdownCustomer(customers?.data)} />
                                    }
                                    <FormikInput name='AccountOwner' label='صاحب حساب' type='text' />
                                    <Box component="div" className='flex flex-col'>
                                        <FormikPrice name='Amount' label='مبلغ' type='text' />
                                        {/* <Typography variant='subtitle1' color="secondary">{separateAmountWithCommas(values.Amount)}</Typography> */}
                                        <Typography variant='subtitle1' color="primary">{convertToPersianWord(Number(values.Amount?.replace(/,/g, "")))} تومان</Typography>
                                    </Box>

                                    <FormikInput name='TrachingCode' label='کد پیگیری' type='text' />
                                    <FormikInput name='CompanyName' label='نام شرکت' type='text' />
                                    {/* <FormikInput name='ContractCode' label='کد قرارداد' type='text' /> */}
                                </Box>
                                <Box component="div" className='grid grid-cols-1 py-4'>
                                    <FormikInput name='Description' label='توضیحات' type='text' />
                                </Box>
                                <Box component="div" className='grid grid-cols-1'>
                                    <FileUpload files={files} setFiles={setFiles} />
                                </Box>
                                <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                    <Typography variant="h3" className="px-8 py-2">ثبت دریافت و پرداخت</Typography>
                                </Button>
                            </Form>
                        }}
                    </Formik>
                </Box>

            </Card>
        </>
    )
}

export default RecievePayment