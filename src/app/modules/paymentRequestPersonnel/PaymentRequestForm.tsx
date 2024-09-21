import { FC, useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Typography } from '@mui/material'
import { DateRange, Paid } from '@mui/icons-material'
import moment from 'moment-jalaali'

import { useGetPaymentRequestByIdMutation, usePostPaymentRequest, useUpdatePaymentRequestById } from './_hooks'
import { useGetReceivePaymentSources } from '../generic/_hooks'

import FormikInput from '../../../_cloner/components/FormikInput'
import Backdrop from '../../../_cloner/components/Backdrop'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import CardWithIcons from '../../../_cloner/components/CardWithIcons'
import FormikPrice from '../../../_cloner/components/FormikPrice'
import { IRequestPayment } from './_models'
import { renderAlert } from '../../../_cloner/helpers/sweetAlert'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
import { useParams } from 'react-router-dom'
import FormikPersonnel from '../../../_cloner/components/FormikPersonnel'
import { useUserInfo } from '../user/core/_hooks'
import RadioGroup from '../../../_cloner/components/RadioGroup'
import { separateAmountWithCommas } from '../../../_cloner/helpers/seprateAmount'
import { useAuth } from '../../../_cloner/helpers/checkUserPermissions'
import AccessDenied from '../../routing/AccessDenied'

const initialValues: IRequestPayment = {
    personnelId: {
        value: "",
        label: ""
    },
    amount: "",
    paymentRequestReasonDesc: "",
    bankAccountOrShabaNo: "",
    accountOwnerName: "",
    paymentRequestTypeId: "1",
    paymentRequestDescription: ""
}

interface IProps { }

const PaymentRequestFormPersonnel: FC<IProps> = ({ }) => {
    const { hasPermission } = useAuth()

    const { id } = useParams()
    const [trachingCode, setTrachingCode] = useState<any>(0)
    const [categories, setCategories] = useState<{value: string, title: string, defaultChecked: boolean}[]>([
        { value: "1", title: "رسمی", defaultChecked: true },
        { value: "2", title: "غیررسمی", defaultChecked: false }
    ])

    const recievePayTools = useGetReceivePaymentSources()
    const postPaymentRequestTools = usePostPaymentRequest()
    const updatePaymentRequestTools = useUpdatePaymentRequestById()
    const detailPaymentRequestTools = useGetPaymentRequestByIdMutation()

    useEffect(() => {
        if (id) detailPaymentRequestTools.mutate(id, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    setTrachingCode(response.data.paymentRequestCode)
                    setCategories([
                        { value: "1", title: "رسمی", defaultChecked: response.data.paymentRequestTypeId === 1 ? true : false },
                        { value: "2", title: "غیررسمی", defaultChecked: response.data.paymentRequestTypeId === 2 ? true : false }
                    ])
                }
            }
        })
    }, [id])

    const onUpdate = (values: IRequestPayment) => {
        const formData = {
            ...values,
            personnelId: values.personnelId.value,
            amount: typeof (values.amount) === "string" ? +values.amount?.replace(/,/g, "") : values.amount,
            paymentRequestTypeId: values.paymentRequestTypeId ? +values.paymentRequestTypeId : 1

        }
        updatePaymentRequestTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    renderAlert("درخواست پرداخت با موفقیت ویرایش گردید")
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            }
        })

    }

    const onAdd = (values: IRequestPayment) => {
        const formData = {
            ...values,
            personnelId: values.personnelId.value,
            amount: values.amount ? +values.amount?.replace(/,/g, "") : "",
            paymentRequestTypeId: values.paymentRequestTypeId ? +values.paymentRequestTypeId : 1

        }
        postPaymentRequestTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    setTrachingCode(response.data.paymentRequestCode)
                    renderAlert(`درخواست پرداخت با شماره ${response.data.paymentRequestCode} موفقیت ایجاد گردید`)
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

    if(!hasPermission("CreatePersonnelPaymentRequest"))
        return <AccessDenied />

    if (detailPaymentRequestTools.isLoading) {
        return <Backdrop loading={detailPaymentRequestTools.isLoading} />
    }
    return (
        <>
            {recievePayTools.isLoading && <Backdrop loading={recievePayTools.isLoading} />}
            {postPaymentRequestTools.isLoading && <Backdrop loading={postPaymentRequestTools.isLoading} />}
            {updatePaymentRequestTools.isLoading && <Backdrop loading={updatePaymentRequestTools.isLoading} />}

            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                <CardWithIcons
                    title='شماره درخواست'
                    icon={<Paid className="text-white" />}
                    value={trachingCode || 0}
                    iconClassName='bg-[#F8B30E]' />
                <CardWithIcons
                    title='تاریخ ثبت'
                    icon={<DateRange className="text-white" />}
                    value={id ? detailPaymentRequestTools?.data?.data?.createdDate : moment(new Date(Date.now())).format('jYYYY/jMM/jDD')}
                    iconClassName='bg-[#EB5553]' />
            </div>
            {/* userInfo?.data?.userName */}
            <ReusableCard>
                <div className='mt-2'>
                    <Formik enableReinitialize initialValues={id ? {
                        ...initialValues,
                        ...detailPaymentRequestTools?.data?.data,
                        amount: separateAmountWithCommas(detailPaymentRequestTools?.data?.data?.amount),
                        personnelId: { value: detailPaymentRequestTools?.data?.data?.personnelId, label: detailPaymentRequestTools?.data?.data?.personnelName }
                    } : {
                        ...initialValues,
                    }} onSubmit={onSubmit}>
                        {({ handleSubmit }) => {
                            return <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 space-y-4 lg:grid-cols-3 lg:space-y-0 lg:gap-4 mb-4'>
                                    <FormikPersonnel name={"personnelId"} label={"پرداخت به حساب"} />
                                    <FormikPrice name={"amount"} label={"مبلغ"} type='text' />
                                    <FormikInput name={"paymentRequestReasonDesc"} label='بابت' />
                                    <FormikInput name={"bankAccountOrShabaNo"} label='شماره حساب/کارت/شبا' type='text' />
                                    <FormikInput name={"accountOwnerName"} label='صاحب حساب' type='text' />
                                    <RadioGroup
                                        categories={categories}
                                        disabled={postPaymentRequestTools?.data?.succeeded}
                                        id="paymentRequestTypeId"
                                        key="paymentRequestTypeId"
                                        name="paymentRequestTypeId"
                                    />
                                    <div className='lg:col-span-3'>
                                        <FormikInput multiline minRows={3} name={"paymentRequestDescription"} label='توضیحات' type='text' />
                                    </div>
                                </div>

                                <div className='flex justify-end items-end'>
                                    <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                        <Typography variant="h3" className="px-8 py-2">
                                            {id ? "ویرایش درخواست پرداخت" : "ثبت درخواست پرداخت"}
                                        </Typography>
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

export default PaymentRequestFormPersonnel