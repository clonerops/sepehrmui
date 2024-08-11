import { FC } from "react"
import { Formik } from "formik"
import { ApprovalRounded } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { usePostRentPayments } from "./core/_hooks"
import { renderAlert } from "../../../_cloner/helpers/sweetAlert"
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar"

import ReusableCard from "../../../_cloner/components/ReusableCard"
import FormikInput from "../../../_cloner/components/FormikInput"
import FormikOrganzationBank from "../../../_cloner/components/FormikOrganzationBank"
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker"
import ButtonComponent from "../../../_cloner/components/ButtonComponent"
import moment from "moment-jalaali"


const initialValues = {
    receivePaymentTypeId: "",
    receivePaymentOriginId: 0,
    date: moment(new Date(Date.now())).format("jYYYY/jMM/jDD")
}

interface IProps {
    selectedLadingIds: any
    selectedTransferRemittanceIds: any
    setIsOpenSelected: React.Dispatch<React.SetStateAction<boolean>>
}

const RentPaymentSelected:FC<IProps> = ({selectedLadingIds, selectedTransferRemittanceIds, setIsOpenSelected}) => {
    const postRentPayment = usePostRentPayments()

    const onSubmit = (values: any) => {
        const formData = {
            receivePaymentOriginId: values.receivePaymentOriginId,
            puOrderTransRemittUnloadingPermitIds: selectedTransferRemittanceIds,
            ladingExitPermitIds: selectedLadingIds,
            totalFareAmount: values.totalFareAmount,
            description: "string"
        }
        postRentPayment.mutate(formData, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    renderAlert("کرایه با موفقیت ثبت شد")
                    setIsOpenSelected(false)
                } else {
                    EnqueueSnackbar(response.data.Message, "error")
                }
            }
        })
    }

  return (
    <>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <ReusableCard>
                        <div className="my-4">
                            <Typography variant="h3">لطفا اطلاعات زیر را جهت پرداخت کرایه وارد نمایید</Typography>
                        </div>
                        <FormikOrganzationBank name="receivePaymentOriginId" label="دریافت از" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                            <FormikInput name="totalFareAmount" label="مجموع مبلغ قابل پرداخت" />
                            <FormikDatepicker disabled name="date" label="تاریخ پرداخت" />
                        </div>
                        <div className="flex justify-end items-end mt-4">
                            <ButtonComponent onClick={() => handleSubmit()}>
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

export default RentPaymentSelected