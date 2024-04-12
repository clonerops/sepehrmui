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
import FormikPrice from '../../../_cloner/components/FormikPrice'
import FormikCost from '../../../_cloner/components/FormikCost'
import FormikPettyCash from '../../../_cloner/components/FormikPettyCash'
import FormikShareholders from '../../../_cloner/components/FormikShareholders'

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
    // ReceivePaymentSourceFromId: "",
    // ReceiveFromCustomerId: "",
    // ReceivePaymentSourceToId: "",
    // PayToCustomerId: "",
    AccountingDocNo: "",
    AccountingDescription: ""

}

const RecievePayment = () => {
    const [trachingCode, setTrachingCode] = useState<any>(0)

    const { mutate, isLoading } = usePostRecievePayment()
    const { data: paymentResource } = useGetReceivePaymentSources()

    const [files, setFiles] = useState<File[]>([]);


    const renderFields = (customerIdFieldName: string, label: string, receivePaymentSourceId: number) => {
        switch (receivePaymentSourceId) {
            case 1:
                return <FormikCustomer name={customerIdFieldName} label={label} />;
            case 2:
                return <FormikOrganzationBank name={customerIdFieldName} label={label} />;
            case 3:
                return <FormikCashDesk name={customerIdFieldName} label={label} />;
            case 4:
                return <FormikIncome name={customerIdFieldName} label={label} />;
            case 5:
                return <FormikPettyCash name={customerIdFieldName} label={label} />;
            case 6:
                return <FormikCost name={customerIdFieldName} label={label} />;
            case 7:
                return <FormikShareholders name={customerIdFieldName} label={label} />;
            case 8:
                return <FormikShareholders name={customerIdFieldName} label={label} />;
            default:
                return <FormikInput name={customerIdFieldName} label={label} disabled={true} />;
        }
    };


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
                            formData.append("ReceivePaymentTypeFromId", Number(values.ReceivePaymentTypeFromId))
                            formData.append("ReceivePaymentTypeToId", values.ReceivePaymentTypeToId)
                            formData.append("AccountOwner", values.AccountOwner)
                            formData.append("TrachingCode", values.TrachingCode)
                            formData.append("CompanyName", values.CompanyName)
                            formData.append("ContractCode", values.ContractCode)
                            formData.append("Amount", Number(values.Amount?.replace(/,/g, "")))
                            formData.append("Description", values.Description)
                            formData.append("ReceiveFromId", values.ReceivePaymentTypeFromId === 1 ? values.ReceiveFromId.value : values.ReceiveFromId)
                            formData.append("PayToId", values.ReceivePaymentTypeToId === 1 ? values.PayToId.value : values.PayToId)
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
                                    <FormikSelect name='ReceivePaymentTypeFromId' label='نوع دریافت از' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {renderFields("ReceiveFromId", "دریافت از", values.ReceivePaymentTypeFromId)}
                                    <FormikSelect name='ReceivePaymentTypeToId' label='نوع پرداخت به' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {renderFields("PayToId", "پرداخت به", values.ReceivePaymentTypeToId)}
                                    <FormikInput name='AccountOwner' label='صاحب حساب' type='text' />
                                    <div className='flex flex-col'>
                                        <FormikPrice name='Amount' label='مبلغ' type='text' />
                                        {/* <Typography variant='subtitle1' color="secondary">{separateAmountWithCommas(values.Amount)}</Typography>
                                        <Typography variant='subtitle1' color="primary">{convertToPersianWord(Number(values.Amount?.replace(/,/g, "")))} تومان</Typography> */}
                                    </div>

                                    <FormikInput name='TrachingCode' label='کد پیگیری' type='text' />
                                    <FormikInput name='CompanyName' label='نام شرکت' type='text' />
                                    <FormikInput name='ContractCode' label='کد قرارداد' type='text' />
                                    {/* <FormikInput name='AccountingDocNo' label='شماره سند حسابداری' type='text' /> */}








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