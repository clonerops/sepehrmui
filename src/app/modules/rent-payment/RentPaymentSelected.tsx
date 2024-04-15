import { Formik } from "formik"
import { ApprovalRounded, AttachMoney, CheckBox, DateRangeSharp, Description, LocalShipping, Newspaper, Person } from "@mui/icons-material"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import FormikInput from "../../../_cloner/components/FormikInput"
import { dropdownReceivePaymentResource } from "../payment/helpers/dropdownConvert"
import FormikCustomer from "../../../_cloner/components/FormikCustomer"
import FormikOrganzationBank from "../../../_cloner/components/FormikOrganzationBank"
import FormikCashDesk from "../../../_cloner/components/FormikCashDesk"
import FormikIncome from "../../../_cloner/components/FormikIncome"
import FormikPettyCash from "../../../_cloner/components/FormikPettyCash"
import FormikCost from "../../../_cloner/components/FormikCost"
import FormikShareholders from "../../../_cloner/components/FormikShareholders"
import { useGetReceivePaymentSources } from "../generic/_hooks"
import FormikSelect from "../../../_cloner/components/FormikSelect"
import { Typography } from "@mui/material"
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker"
import ButtonComponent from "../../../_cloner/components/ButtonComponent"
import moment from "moment-jalaali"
import { IRentPaymentFields } from "./core/_models"
import { FC } from "react"
import { usePostRentPayments } from "./core/_hooks"
import { renderAlert } from "../../../_cloner/helpers/SweetAlert"
import { EnqueueSnackbar } from "../../../_cloner/helpers/Snackebar"

const initialValues = {
    receivePaymentTypeId: "",
    receivePaymentOriginId: 0,
    date: moment(new Date(Date.now())).format("jYYYY/jMM/jDD")
}

interface IProps {
    item: IRentPaymentFields | undefined
    selectedLadingIds: any
    selectedTransferRemittanceIds: any
    setIsOpenSelected: React.Dispatch<React.SetStateAction<boolean>>
}

const RentPaymentSelected:FC<IProps> = ({item, selectedLadingIds, selectedTransferRemittanceIds, setIsOpenSelected}) => {
    const { data: paymentResource } = useGetReceivePaymentSources()
    const postRentPayment = usePostRentPayments()

    const orderAndAmountInfo = [
        { id: 1, title: "شماره مرجع", icon: <Person color="secondary" />, value: item?.referenceCode },
        // { id: 2, title: "فرستنده/گیرنده", icon: <Person color="secondary" />, value: 'ابوالفضل معصومی' },
        { id: 3, title: "تاریخ", icon: <DateRangeSharp color="secondary" />, value: item?.referenceDate },
        { id: 4, title: "شماره برانامه", icon: <LocalShipping color="secondary" />, value: item?.cargoAnnounceNo },
        { id: 4, title: "نوع", icon: <LocalShipping color="secondary" />, value: item?.orderTypeDesc },
        { id: 5, title: "نام راننده", icon: <CheckBox color="secondary" />, value: item?.driverName },
        { id: 6, title: "شماره همراه", icon: <Newspaper color="secondary" />, value: item?.driverMobile },
        { id: 7, title: "شماره حساب", icon: <AttachMoney color="secondary" />, value: item?.driverAccountNo },
        { id: 8, title: "نام صاحب حساب", icon: <CheckBox color="secondary" />, value: item?.accountOwnerName },
        { id: 9, title: "مبلغ کرایه", icon: <CheckBox color="secondary" />, value: item?.totalAmount},
        { id: 10, title: "سایر هزینه ها", icon: <CheckBox color="secondary" />, value: item?.otherCosts},
    ]


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

    const onSubmit = (values: any) => {
        const formData = {
            receivePaymentOriginId: values.receivePaymentOriginId,
            puOrderTransRemittUnloadingPermitIds: selectedTransferRemittanceIds,
            ladingExitPermitIds: selectedLadingIds,
            totalFareAmount: values.totalFareAmount,
            description: "string"
        }
        console.log(JSON.stringify(formData))
        // postRentPayment.mutate(formData, {
        //     onSuccess: (response) => {
        //         if(response.succeeded) {
        //             renderAlert("کرایه با موفقیت ثبت شد")
        //             setIsOpenSelected(false)
        //         } else {
        //             EnqueueSnackbar(response.data.Message, "error")
        //         }
        //     }
        // })
    }

  return (
    <>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({values, handleSubmit}) => (
                <form>
                    {/* <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 my-4`}>
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
                    </div> */}
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