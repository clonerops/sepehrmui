import { Formik } from "formik"
import { ApprovalRounded, AttachMoney, CheckBox, DateRangeSharp, LocalShipping, Newspaper, Person } from "@mui/icons-material"

import ReusableCard from "../../../../_cloner/components/ReusableCard"
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import moment from "moment-jalaali"
import Backdrop from "../../../../_cloner/components/Backdrop"

import { Typography } from "@mui/material"
import { IRentFilter, IRentPaymentFields } from "../core/_models"
import React, { FC, useEffect, useState } from "react"
import { usePostRentPayments } from "../core/_hooks"
import { renderAlert } from "../../../../_cloner/helpers/sweetAlert"
import { EnqueueSnackbar } from "../../../../_cloner/helpers/snackebar"
import PaymentOriginType from "../../../../_cloner/components/PaymentOriginType"
import FormikAmount from "../../../../_cloner/components/FormikAmount"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/seprateAmount"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { UseMutationResult } from "@tanstack/react-query"
import { convertFilesToBase64 } from "../../../../_cloner/helpers/convertToBase64"
import FileUpload from "../../../../_cloner/components/FileUpload"


interface IProps {
    item: IRentPaymentFields | undefined
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpenSelected?: boolean
    selectedLadingIds?: any
    selectedTransferRemittanceIds?: any
    setIsOpenSelected?: React.Dispatch<React.SetStateAction<boolean>> | any
    rentTools?: UseMutationResult<any, unknown, IRentFilter, unknown>
    setSelectedLadingIds: React.Dispatch<any>
    setSelectedTransferRemittanceIds: React.Dispatch<any>

}

const RentPayment: FC<IProps> = ({
    item, setIsOpen, isOpenSelected = false, selectedLadingIds, selectedTransferRemittanceIds, setIsOpenSelected, rentTools, setSelectedLadingIds, setSelectedTransferRemittanceIds }) => {

    const initialValues = {
        date: moment(new Date(Date.now())).format("jYYYY/jMM/jDD"),
        totalFareAmount: item?.totalAmount ? separateAmountWithCommas(item?.totalAmount) : 0,
        paymentOriginTypeId: 0,
        paymentOriginId: "",
        description: "",
    }

    const postRentPayment = usePostRentPayments()
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if (files.length > 0) convertFilesToBase64(files, setBase64Attachments)
        // eslint-disable-next-line
    }, [files]);

    const orderAndAmountInfo = [
        { id: 1, title: "شماره مرجع", icon: <Person color="secondary" />, value: item?.referenceCode },
        // { id: 2, title: "فرستنده/گیرنده", icon: <Person color="secondary" />, value: 'ابوالفضل معصومی' },
        { id: 3, title: "تاریخ", icon: <DateRangeSharp color="secondary" />, value: item?.referenceDate },
        { id: 4, title: "نوع", icon: <LocalShipping color="secondary" />, value: item?.orderTypeDesc },
        { id: 5, title: "نام راننده", icon: <CheckBox color="secondary" />, value: item?.driverName },
        { id: 6, title: "شماره همراه", icon: <Newspaper color="secondary" />, value: item?.driverMobile },
        { id: 7, title: "شماره حساب", icon: <AttachMoney color="secondary" />, value: item?.driverAccountNo },
        { id: 8, title: "نام صاحب حساب", icon: <CheckBox color="secondary" />, value: item?.accountOwnerName },
        { id: 9, title: "مبلغ کرایه", icon: <CheckBox color="secondary" />, value: item?.totalAmount ? separateAmountWithCommas(item?.totalAmount) : 0 },
        { id: 10, title: "سایر هزینه ها", icon: <CheckBox color="secondary" />, value: item?.otherCosts },
    ]


    const onSubmit = (values: any) => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })

        const formData = {
            ...values,
            paymentOriginId: values.paymentOriginTypeId === 1 ? values.paymentOriginId.value : values.paymentOriginId,
            puOrderTransRemittUnloadingPermitIds: item?.unloadingPermitId === null ? [] : item?.unloadingPermitId ? [
                item?.unloadingPermitId
            ] : selectedTransferRemittanceIds,
            ladingExitPermitIds: item?.ladingExitPermitId === null ? [] : item?.ladingExitPermitId ? [
                item?.ladingExitPermitId
            ] : selectedLadingIds,
            totalFareAmount: +values.totalFareAmount,
            description: values.description,
            attachments: attachments,

        }
        postRentPayment.mutate(formData, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    renderAlert(response.message)
                    if (isOpenSelected) {
                        setIsOpenSelected(false)
                    } else {
                        setIsOpen(false)
                    }
                    setSelectedLadingIds([])
                    setSelectedTransferRemittanceIds([])
                    const formData = {
                        fromDate: null,
                        toDate: null,
                    }
                    rentTools?.mutate(formData)

                } else {
                    EnqueueSnackbar(response.data.Message, "error")
                }
            }
        })
    }

    return (
        <>
            {postRentPayment.isLoading && <Backdrop loading={postRentPayment.isLoading} />}
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                        {!isOpenSelected &&
                            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 my-4`}>
                                {orderAndAmountInfo.map((item: {
                                    title: string,
                                    icon: React.ReactNode,
                                    value: any
                                }) => {
                                    return <div className="flex items-center gap-x-4">
                                        <Typography>{item.title}:</Typography>
                                        <Typography variant="h3">{item.value}</Typography>
                                    </div>
                                })}
                            </div>
                        }
                        <ReusableCard>
                            <div className="my-4">
                                <Typography variant="h3">لطفا اطلاعات زیر را جهت پرداخت کرایه وارد نمایید</Typography>
                            </div>
                            <PaymentOriginType className='flex flex-col lg:flex-row gap-4' label="نوع پرداخت از" officialLabel="پرداخت از" typeName="paymentOriginTypeId" officialName="paymentOriginId" typeId={values.paymentOriginTypeId} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                                <FormikAmount name="totalFareAmount" label="مجموع مبلغ قابل پرداخت" />
                                <FormikDatepicker disabled name="date" label="تاریخ پرداخت" />
                            </div>
                            <div className="my-4 lg:col-span-2">
                                <FormikInput multiline minRows={3} name="description" label="توضیحات" />
                            </div>
                            <div className="flex flex-col w-full" >
                                <Typography variant="h2" color="primary" className="pb-4">
                                    افزودن پیوست
                                </Typography>
                                <FileUpload files={files} setFiles={setFiles} />
                            </div>

                            <div className="flex justify-end items-end mt-4">
                                <ButtonComponent>
                                    <ApprovalRounded className="text-white" />
                                    <Typography className="text-white">ثبت کرایه</Typography>
                                </ButtonComponent>
                            </div>
                        </ReusableCard>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default RentPayment