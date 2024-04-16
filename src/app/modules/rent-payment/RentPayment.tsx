import { Formik } from "formik"
import { ApprovalRounded, AttachMoney, CheckBox, DateRangeSharp, LocalShipping, Newspaper, Person } from "@mui/icons-material"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import FormikInput from "../../../_cloner/components/FormikInput"
import FormikCustomer from "../../../_cloner/components/FormikCustomer"
import FormikOrganzationBank from "../../../_cloner/components/FormikOrganzationBank"
import FormikCashDesk from "../../../_cloner/components/FormikCashDesk"
import FormikIncome from "../../../_cloner/components/FormikIncome"
import FormikPettyCash from "../../../_cloner/components/FormikPettyCash"
import FormikCost from "../../../_cloner/components/FormikCost"
import FormikShareholders from "../../../_cloner/components/FormikShareholders"
import { Typography } from "@mui/material"
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker"
import ButtonComponent from "../../../_cloner/components/ButtonComponent"
import moment from "moment-jalaali"
import { IRentPaymentFields } from "./core/_models"
import { FC } from "react"
import { usePostRentPayments } from "./core/_hooks"
import { renderAlert } from "../../../_cloner/helpers/SweetAlert"
import { EnqueueSnackbar } from "../../../_cloner/helpers/Snackebar"
import Backdrop from "../../../_cloner/components/Backdrop"


interface IProps {
    item: IRentPaymentFields | undefined
    setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

const RentPayment:FC<IProps> = ({item, setIsOpen}) => {

    const initialValues = {
        receivePaymentTypeId: "",
        receivePaymentOriginId: 0,
        date: moment(new Date(Date.now())).format("jYYYY/jMM/jDD"),
        totalFareAmount: item?.totalAmount
    }
    
    const postRentPayment = usePostRentPayments()

    const orderAndAmountInfo = [
        { id: 1, title: "شماره مرجع", icon: <Person color="secondary" />, value: item?.referenceCode },
        // { id: 2, title: "فرستنده/گیرنده", icon: <Person color="secondary" />, value: 'ابوالفضل معصومی' },
        { id: 3, title: "تاریخ", icon: <DateRangeSharp color="secondary" />, value: item?.referenceDate },
        { id: 4, title: "شماره بارنامه", icon: <LocalShipping color="secondary" />, value: item?.cargoAnnounceNo },
        { id: 4, title: "نوع", icon: <LocalShipping color="secondary" />, value: item?.orderTypeDesc },
        { id: 5, title: "نام راننده", icon: <CheckBox color="secondary" />, value: item?.driverName },
        { id: 6, title: "شماره همراه", icon: <Newspaper color="secondary" />, value: item?.driverMobile },
        { id: 7, title: "شماره حساب", icon: <AttachMoney color="secondary" />, value: item?.driverAccountNo },
        { id: 8, title: "نام صاحب حساب", icon: <CheckBox color="secondary" />, value: item?.accountOwnerName },
        { id: 9, title: "مبلغ کرایه", icon: <CheckBox color="secondary" />, value: item?.totalAmount},
        { id: 10, title: "سایر هزینه ها", icon: <CheckBox color="secondary" />, value: item?.otherCosts},
    ]

    const onSubmit = (values: any) => {
        const formData = {
            receivePaymentOriginId: values.receivePaymentOriginId,
            puOrderTransRemittUnloadingPermitIds: item?.purchaseOrderTransferRemittanceUnloadingPermitId === null ? [] : [
                item?.purchaseOrderTransferRemittanceUnloadingPermitId
            ],
            ladingExitPermitIds: item?.ladingExitPermitId === null ? [] : [
                item?.ladingExitPermitId
            ],
            totalFareAmount: values.totalFareAmount,
            description: "string"
        }
        postRentPayment.mutate(formData, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    renderAlert("کرایه با موفقیت ثبت شد")
                    setIsOpen(false)
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
            {({handleSubmit}) => (
                <form>
                    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 my-4`}>
                        {orderAndAmountInfo.map((item: {
                            title: string,
                            icon: React.ReactNode,
                            value: any
                        }, index) => {
                            return <div className="flex items-center gap-x-4">
                                <Typography>{item.title}:</Typography>
                                <Typography variant="h3">{item.value}</Typography>
                            </div>
                            // return <CardTitleValue key={index} title={item.title} value={item.value} icon={item.icon} />
                        })}
                        {/* <div className="lg:col-span-4">
                            <CardTitleValue key={11} title={"توضیحات"} value={"ندارد"} icon={<Description color="secondary" />} />
                        </div> */}
                    </div>
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

export default RentPayment