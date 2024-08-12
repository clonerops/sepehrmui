import { useState } from 'react'
import { Formik } from 'formik'
import { Button, Typography } from '@mui/material'
import { DateRange, Paid } from '@mui/icons-material'
import moment from 'moment-jalaali'

import { usePostRecievePayment } from './core/_hooks'
import { useGetReceivePaymentSources } from '../generic/_hooks'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
import { dropdownReceivePaymentResource } from '../../../_cloner/helpers/dropdowns'

import FormikSelect from '../../../_cloner/components/FormikSelect'
import FormikInput from '../../../_cloner/components/FormikInput'
import Backdrop from '../../../_cloner/components/Backdrop'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import CardWithIcons from '../../../_cloner/components/CardWithIcons'
import FormikDescription from '../../../_cloner/components/FormikDescription'
import FormikCustomer from '../../../_cloner/components/FormikCustomer'
import FormikOrganzationBank from '../../../_cloner/components/FormikOrganzationBank'
import FormikCashDesk from '../../../_cloner/components/FormikCashDesk'
import FormikIncome from '../../../_cloner/components/FormikIncome'
import FormikPrice from '../../../_cloner/components/FormikPrice'
import FormikCost from '../../../_cloner/components/FormikCost'
import FormikPettyCash from '../../../_cloner/components/FormikPettyCash'
import FormikShareholders from '../../../_cloner/components/FormikShareholders'
import FormikCompany from '../../../_cloner/components/FormikCompany'
import FileUpload from '../../../_cloner/components/FileUpload'

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

const PaymentRequest = () => {
    const [trachingCode, setTrachingCode] = useState<any>(0)

    const recievePayTools = useGetReceivePaymentSources()
    const postRecievePayTools = usePostRecievePayment()

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
            {recievePayTools.isLoading && <Backdrop loading={recievePayTools.isLoading} />}
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
                                <div className='grid grid-cols-1 space-y-4 lg:grid-cols-3 lg:space-y-0 lg:gap-4 mb-4'>
                                    <FormikInput name='AccountOwner' label='پرداخت به حساب' type='text' />
                                    <FormikPrice name='Amount' label='مبلغ' type='text' />
                                    <FormikInput name='AccountOwner' label='بابت' type='text' />
                                    <FormikInput name='AccountOwner' label='شماره حساب/کارت/شبا' type='text' />
                                    <FormikInput name='AccountOwner' label='صاحب حساب' type='text' />
                                    <FormikOrganzationBank name='AccountOwner' label='بانک' />    
                                    <FormikSelect name='ReceivePaymentTypeToId' label='نوع پرداخت از' options={dropdownReceivePaymentResource(recievePayTools?.data)} />
                                    {renderFields("PayToId", "پرداخت از", values.ReceivePaymentTypeToId)}
                                    <FormikInput name='AccountOwner' label='درخواست کننده' type='text' />
                                </div>

                                <div className='flex justify-end items-end'>
                                    <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                        <Typography variant="h3" className="px-8 py-2">ثبت درخواست پرداخت</Typography>
                                    </Button>
                                </div>
                            </form>
                        }}
                    </Formik>
                </div>

            </ReusableCard>
        </>
    )
}

export default PaymentRequest