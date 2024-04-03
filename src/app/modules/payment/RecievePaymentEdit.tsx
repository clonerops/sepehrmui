import { useEffect, useRef, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import { Button, Typography } from '@mui/material'
import moment from 'moment-jalaali'

import { useGetRecievePaymentById, useUpdatePaymentApproved, useUpdateRecievePaymentById } from './core/_hooks'
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
import useBase64toFile from '../../../_cloner/helpers/convertBaseToFile'
import ConfirmDialog from '../../../_cloner/components/ConfirmDialog'


const RecievePaymentEdit = () => {
    const { id }: any = useParams()
    const formikRef = useRef<FormikProps<any>>(null)

    const [approve, setApprove] = useState<boolean>(false);
    const convertBase64ToFile = useBase64toFile()

    const { mutate, isLoading } = useUpdateRecievePaymentById()
    const updateApprove = useUpdatePaymentApproved()

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

    const formData = new FormData()
    formData.append("Id", id)
    formData.append("ReceiveFromCustomerId", formikRef?.current?.values?.receiveFromCustomerId.value ? formikRef?.current?.values?.receiveFromCustomerId.value : formikRef?.current?.values?.receiveFromCustomerIdForm === "" ? "" : formikRef?.current?.values?.receiveFromCustomerIdForm)
    formData.append("PayToCustomerId", formikRef?.current?.values?.payToCustomerId.value ? formikRef?.current?.values?.payToCustomerId.value : formikRef?.current?.values?.payToCustomerIdForm === "" ? "" : formikRef?.current?.values?.payToCustomerIdForm)
    formData.append("ReceivePaymentSourceFromId", formikRef?.current?.values?.receivePaymentSourceFromId ? +formikRef?.current?.values?.receivePaymentSourceFromId : detailTools?.data?.data?.receivePaymentSourceFromId)
    formData.append("ReceivePaymentSourceToId", formikRef?.current?.values?.receivePaymentSourceToId ? formikRef?.current?.values?.receivePaymentSourceToId : detailTools?.data?.data?.receivePaymentSourceToId)
    formData.append("Amount", formikRef?.current?.values?.amount ? +formikRef?.current?.values?.amount?.replace(/,/g, "") : detailTools?.data?.data?.amount)
    formData.append("AccountOwner", formikRef?.current?.values?.accountOwner ? formikRef?.current?.values?.accountOwner : detailTools?.data?.data?.accountOwner)
    formData.append("TrachingCode", formikRef?.current?.values?.trachingCode ? formikRef?.current?.values?.trachingCode : detailTools?.data?.data?.trachingCode)
    formData.append("CompanyName", formikRef?.current?.values?.companyName ? formikRef?.current?.values?.companyName : detailTools?.data?.data?.companyName)
    formData.append("ContractCode", formikRef?.current?.values?.contractCode ? formikRef?.current?.values?.contractCode : detailTools?.data?.data?.contractCode)
    formData.append("AccountingDocNo", formikRef?.current?.values?.accountingDocNo ? +formikRef?.current?.values?.accountingDocNo : detailTools?.data?.data?.accountingDocNo)
    formData.append("AccountingDescription", formikRef?.current?.values?.accountingDescription ? formikRef?.current?.values?.accountingDescription : detailTools?.data?.data?.accountingDescription)
    formData.append("Description", formikRef?.current?.values?.description ? formikRef?.current?.values?.description : detailTools?.data?.data?.description)
    formData.append("ReceivedFrom", "")
    formData.append("PayTo", "")
    files.forEach((file) => {
        formData.append('Attachments', file);
    });


    const onSubmit = async () => {
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
        if (id)
        mutate(formData, {
            onSuccess: (response) => {
                if (response?.succeeded) {
                    EnqueueSnackbar("ویرایش با موفقیت انجام پذیرفت", "success")
                    if(approve) {
                        setApprove(false)
                        updateApprove.mutate(id, {
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
                        receiveFromCustomerId: detailTools?.data?.data?.receiveFromCustomerName || "",
                        receiveFromCustomerIdForm: detailTools?.data?.data?.receiveFromCustomerId || "",
                        payToCustomerId: detailTools?.data?.data?.payToCustomerName || "",
                        payToCustomerIdForm: detailTools?.data?.data?.payToCustomerId || "",

                    }} onSubmit={onSubmit}>
                        {({ handleSubmit, values }) => {
                            return <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-0'>
                                    <FormikSelect name='receivePaymentSourceFromId' label='دریافت از' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {Number(values.receivePaymentSourceFromId) === 1 &&
                                        // <FormikSelect name='ReceiveFromCustomerId' label='نام مشتری' options={dropdownCustomer(customers?.data)} />
                                        <FormikCustomer name='receiveFromCustomerId' label='نام مشتری' />
                                    }
                                    <FormikSelect name='receivePaymentSourceToId' label='پرداخت به' options={dropdownReceivePaymentResource(paymentResource)} />
                                    {Number(values.receivePaymentSourceToId) === 1 &&
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
                                <div className='flex gap-x-4'>
                                    <Button disabled={detailTools?.data?.data?.receivePayStatusId >= 3} onClick={() => handleSubmit()} variant="contained" color="secondary">
                                        <Typography variant="h3" className="px-8 py-2">ویرایش دریافت و پرداخت</Typography>
                                    </Button>
                                    <Button disabled={detailTools?.data?.data?.receivePayStatusId >= 2} variant="contained" onClick={() => setApprove(true)} className='mb-2' color="primary">
                                        <Typography variant="h3">{isLoading ? "در حال پردازش..." : "ثبت تایید"}</Typography>
                                    </Button>
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