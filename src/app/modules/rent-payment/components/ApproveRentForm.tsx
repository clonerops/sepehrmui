import { Formik, FormikProps } from "formik"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/seprateAmount"
import { FC } from "react"
import { AttachMoney, CheckBox, DateRangeSharp, LocalShipping, Newspaper, Person } from "@mui/icons-material"
import { usePostApproveDriverFareAmount as exitPostApprove } from '../../exitRemittance/_hooks'
import { usePostApproveDriverFareAmount as unloadingPostApprove } from '../../unloadingPermit/_hooks'
import { EnqueueSnackbar } from "../../../../_cloner/helpers/snackebar"
import { Alert, Typography } from "@mui/material"
import FormikAmount from "../../../../_cloner/components/FormikAmount"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { UseMutationResult } from "@tanstack/react-query"
import { IRentFilter } from "../core/_models"

interface IProps {
    formikRef: React.RefObject<FormikProps<any>>
    selectedItem: any
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    rents: UseMutationResult<any, unknown, IRentFilter, unknown>
}

const ApproveRentForm: FC<IProps> = ({ formikRef, selectedItem, setIsOpen, rents }) => {

    const exitApproveTools = exitPostApprove()
    const unloadingApproveTools = unloadingPostApprove()


    const orderAndAmountInfo = [
        { id: 1, title: "شماره مرجع", icon: <Person color="secondary" />, value: selectedItem?.referenceCode },
        { id: 3, title: "تاریخ", icon: <DateRangeSharp color="secondary" />, value: selectedItem?.referenceDate },
        { id: 4, title: "نوع", icon: <LocalShipping color="secondary" />, value: selectedItem?.orderTypeDesc },
        { id: 5, title: "نام راننده", icon: <CheckBox color="secondary" />, value: selectedItem?.driverName },
        { id: 6, title: "شماره همراه", icon: <Newspaper color="secondary" />, value: selectedItem?.driverMobile },
        { id: 7, title: "شماره حساب", icon: <AttachMoney color="secondary" />, value: selectedItem?.driverAccountNo },
        { id: 9, title: "مبلغ کرایه(ریال)", icon: <CheckBox color="secondary" />, value: separateAmountWithCommas(selectedItem?.totalAmount) },
        { id: 10, title: "سایر هزینه ها", icon: <CheckBox color="secondary" />, value: selectedItem?.otherCosts },
    ]

    const handleResponse = (response: any) => {
        if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
            setIsOpen(false)
            rents.mutate({
                fareAmountStatusId: 1,
                fromDate: null,
                toDate: null,
            })
        } else {
            EnqueueSnackbar(response.data.Message, "error")
        }
    }

    const handleApprove = () => {
        const formData: any = {
            fareAmount: +formikRef?.current?.values.fareAmount,
            description: formikRef?.current?.values.description
        }

        if (selectedItem.ladingExitPermitId) {
            formData["ladingExitPermitId"] = selectedItem.ladingExitPermitId;
            exitApproveTools.mutate(formData, {
                onSuccess: (response) => handleResponse(response)
            })

        } else if (selectedItem.unloadingPermitId) {
            formData["purOrderTransRemittUnloadingPermitId"] = selectedItem.unloadingPermitId;
            unloadingApproveTools.mutate(formData, {
                onSuccess: (response) => handleResponse(response)
            })
        }
    }


    return (
        <Formik
            innerRef={formikRef}
            initialValues={{ description: "", fareAmount: separateAmountWithCommas(selectedItem.totalAmount) }}
            onSubmit={handleApprove}>
            {({ handleSubmit }) => {
                return <div>
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 my-4`}>
                        {orderAndAmountInfo.map((item: {
                            title: string,
                            icon: React.ReactNode,
                            value: any
                        }, index) => {
                            return <div className="flex items-center gap-x-4">
                                <Typography>{item.title}:</Typography>
                                <Typography variant="h3">{item.value}</Typography>
                            </div>
                        })}
                    </div>
                    <div className='my-4'>
                        <Alert color='warning'>
                            <Typography>درصورت نیاز میتوانید مبلغ کرایه را تغییر دهید!</Typography>
                        </Alert>
                    </div>
                    <div className='flex flex-col space-y-4 my-4'>
                        <FormikAmount name='fareAmount' label="مبلغ کرایه(ریال)" />
                        <FormikInput multiline minRows={3} name='description' label="توضیحات" />
                    </div>
                    <div className='flex justify-end items-end my-4'>
                        <ButtonComponent onClick={() => handleSubmit()}>
                            <Typography className='text-white'>تایید کرایه</Typography>
                        </ButtonComponent>
                    </div>
                </div>
            }}
        </Formik>

    )
}

export default ApproveRentForm