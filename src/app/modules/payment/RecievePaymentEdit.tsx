import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Typography } from '@mui/material'
import moment from 'moment-jalaali'

import { useGetRecievePaymentById, useUpdateRecievePaymentById } from './core/_hooks'
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
import { convertFilesToBase64 } from '../../../_cloner/helpers/ConvertToBase64'
import useBase64toFile from '../../../_cloner/helpers/convertBaseToFile'
import TransitionsModal from '../../../_cloner/components/ReusableModal'


const RecievePaymentEdit = () => {
    const { id }: any = useParams()

    const [trachingCode, setTrachingCode] = useState<any>(0)
    const convertBase64ToFile = useBase64toFile()

    const { mutate, isLoading } = useUpdateRecievePaymentById()
    const { data: paymentResource } = useGetReceivePaymentSources()

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
        accountingDescription: "",

    }
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    useEffect(() => {
        convertFilesToBase64(files, setBase64Attachments);
        // if (files.length > 0) {
        // }
    }, [files]);

    let attachments = base64Attachments.map((i) => {
        let convert = {
            fileData: i,
        }
        return convert
    })

    const onSubmit = async (values: any) => {
        const formData = new FormData()
        formData.append("Id", id)
        formData.append("ReceiveFromCustomerId", values.receiveFromCustomerId.value ? values.receiveFromCustomerId.value : values.receiveFromCustomerIdForm === "" ? "" : values.receiveFromCustomerIdForm)
        formData.append("PayToCustomerId", values.payToCustomerId.value ? values.payToCustomerId.value : values.payToCustomerIdForm === "" ? "" : values.payToCustomerIdForm)
        formData.append("ReceivePaymentSourceFromId", values.receivePaymentSourceFromId ? +values.receivePaymentSourceFromId : detailTools?.data?.data?.receivePaymentSourceFromId)
        formData.append("ReceivePaymentSourceToId", values.receivePaymentSourceToId ? values.receivePaymentSourceToId : detailTools?.data?.data?.receivePaymentSourceToId)
        formData.append("Amount", values.amount ? +values.amount?.replace(/,/g, "") : detailTools?.data?.data?.amount)
        formData.append("AccountOwner", values.accountOwner ? values.accountOwner : detailTools?.data?.data?.accountOwner)
        formData.append("TrachingCode", values.trachingCode ? values.trachingCode : detailTools?.data?.data?.trachingCode)
        formData.append("CompanyName", values.companyName ? values.companyName : detailTools?.data?.data?.companyName)
        formData.append("ContractCode", values.contractCode ? values.contractCode : detailTools?.data?.data?.contractCode)
        formData.append("AccountingDocNo", values.accountingDocNo ? +values.accountingDocNo : detailTools?.data?.data?.accountingDocNo)
        formData.append("AccountingDescription", values.accountingDescription ? values.accountingDescription : detailTools?.data?.data?.accountingDescription)
        formData.append("Description", values.description ? values.description : detailTools?.data?.data?.description)
        formData.append("ReceivedFrom",  "")
        formData.append("PayTo",  "")
        files.forEach((file) => {
            formData.append('Attachments', file);
        });
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

    useEffect(() => {
        if(detailTools.isLoading) {
            setFiles([])
        } else {
            setFiles(detailTools?.data?.data?.attachments?.map((item: { fileData: string }) => convertBase64ToFile(item.fileData, "example.jpg")))
        }
    }, [detailTools?.isLoading])
    
    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} /> }
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                <CardWithIcons
                    title='شماره'
                    icon={<Paid className="text-white" />}
                    // value={trachingCode ? trachingCode : detailTools?.data?.data?.trachingCode || 0}
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
                    <Formik enableReinitialize initialValues={{
                        ...initialValues,
                        ...detailTools?.data?.data,
                        amount: detailTools?.data?.data?.amount ? separateAmountWithCommas(detailTools?.data?.data?.amount) : "",
                        receiveFromCustomerId: detailTools?.data?.data?.receiveFromCustomerName || "",
                        receiveFromCustomerIdForm: detailTools?.data?.data?.receiveFromCustomerId || "",
                        payToCustomerId: detailTools?.data?.data?.payToCustomerName || "",
                        payToCustomerIdForm: detailTools?.data?.data?.payToCustomerId || "",

                    }} onSubmit={onSubmit}>
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
                                    {/* <FormikInput name='accountingDocNo' label='شماره سند حسابداری' type='text' /> */}
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
                                <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                    <Typography variant="h3" className="px-8 py-2">ویرایش دریافت و پرداخت</Typography>
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