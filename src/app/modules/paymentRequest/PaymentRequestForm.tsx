import { FC, useState } from 'react'
import { Formik } from 'formik'
import { Button, Typography } from '@mui/material'
import { DateRange, Paid } from '@mui/icons-material'
import moment from 'moment-jalaali'

import { usePostPaymentRequest } from './_hooks'
import { useGetReceivePaymentSources } from '../generic/_hooks'

import FormikInput from '../../../_cloner/components/FormikInput'
import Backdrop from '../../../_cloner/components/Backdrop'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import CardWithIcons from '../../../_cloner/components/CardWithIcons'
import FormikCustomer from '../../../_cloner/components/FormikCustomer'
import FormikOrganzationBank from '../../../_cloner/components/FormikOrganzationBank'
import FormikPrice from '../../../_cloner/components/FormikPrice'
import { IRequestPayment } from './_models'
import { renderAlert } from '../../../_cloner/helpers/sweetAlert'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
import FormikPaymentRequestReason from '../../../_cloner/components/FormikPaymentRequestReason'

const initialValues: IRequestPayment = {
    customerId: {
        value: "",
        label: ""
    },
    amount: "",
    paymentRequestReasonId: 0,
    bankAccountOrShabaNo: "",
    accountOwnerName: "",
    bankId: 0,
    applicatorName: "",
    paymentRequestDescription: ""
}

interface IProps {
    id?: any
}

const PaymentRequestForm: FC<IProps> = ({ id }) => {
    const [trachingCode, setTrachingCode] = useState<any>(0)

    const recievePayTools = useGetReceivePaymentSources()
    const postPaymentRequestTools = usePostPaymentRequest()


    const onUpdate = (values: IRequestPayment) => { }

    const onAdd = (values: IRequestPayment) => {
        const formData = {
            ...values,
            customerId: values.customerId.value,
            amount: values.amount ? +values.amount?.replace(/,/g, "") : ""
        }

        postPaymentRequestTools.mutate(formData, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    renderAlert("درخواست پرداخت با موفقیت ایجاد گردید")
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            }
        })
    }

    const onSubmit = (values: IRequestPayment) => {
        if (id) onUpdate(values);
        else onAdd(values);
    };

    return (
        <>
            {recievePayTools.isLoading && <Backdrop loading={recievePayTools.isLoading} />}
            {postPaymentRequestTools.isLoading && <Backdrop loading={postPaymentRequestTools.isLoading} />}

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
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        {({ handleSubmit }) => {
                            return <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 space-y-4 lg:grid-cols-3 lg:space-y-0 lg:gap-4 mb-4'>
                                    <FormikCustomer name={"customerId"} label={"مشتری"} />
                                    <FormikPrice name={"amount"} label={"مبلغ"} type='text' />
                                    <FormikPaymentRequestReason name={"paymentRequestReasonId"} label='بابت' />
                                    <FormikInput name={"bankAccountOrShabaNo"} label='شماره حساب/کارت/شبا' type='text' />
                                    <FormikInput name={"accountOwnerName"} label='صاحب حساب' type='text' />
                                    <FormikOrganzationBank name={"bankId"} label='بانک' />
                                    <FormikInput name={"applicatorName"} label='درخواست کننده' type='text' />
                                    <div className='lg:col-span-2'>
                                        <FormikInput multiline minRows={3} name={"paymentRequestDescription"} label='توضیحات' type='text' />
                                    </div>
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

export default PaymentRequestForm