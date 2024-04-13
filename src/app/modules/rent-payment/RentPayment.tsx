import { Formik } from "formik"
import { ApprovalRounded, AttachMoney, CheckBox, DateRangeSharp, Description, LocalShipping, Newspaper, Person } from "@mui/icons-material"
import CardTitleValue from "../../../_cloner/components/CardTitleValue"
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

const initialValues = {
    receivePaymentTypeId: "",
    receivePaymentOriginId: 0,
    date: moment(new Date(Date.now())).format("jYYYY/jMM/jDD")
}

const RentPayment = () => {
    const { data: paymentResource } = useGetReceivePaymentSources()

    const orderAndAmountInfo = [
        { id: 1, title: "شماره مرجع", icon: <Person color="secondary" />, value: "1245879" },
        { id: 2, title: "فرستنده/گیرنده", icon: <Person color="secondary" />, value: 'ابوالفضل معصومی' },
        { id: 3, title: "تاریخ", icon: <DateRangeSharp color="secondary" />, value: "1403/01/28" },
        { id: 4, title: "شماره برانامه", icon: <LocalShipping color="secondary" />, value: "12805" },
        { id: 4, title: "نوع", icon: <LocalShipping color="secondary" />, value: "فروش" },
        { id: 5, title: "نام راننده", icon: <CheckBox color="secondary" />, value: "حسن رمضانی" },
        { id: 6, title: "شماره همراه", icon: <Newspaper color="secondary" />, value: "09217767345" },
        { id: 7, title: "شماره حساب", icon: <AttachMoney color="secondary" />, value: "548744878747" },
        { id: 8, title: "نام صاحب حساب", icon: <CheckBox color="secondary" />, value: "حسن رمضانی" },
        { id: 9, title: "مبلغ کرایه", icon: <CheckBox color="secondary" />, value: "5,000,000"},
        { id: 10, title: "سایر هزینه ها", icon: <CheckBox color="secondary" />, value: "5,000,000"},
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


  return (
    <>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
            {({values}) => (
                <form>
                    <div className={`grid grid-cols-1 lg:grid-cols-5 gap-4 my-4`}>
                        {orderAndAmountInfo.map((item: {
                            title: string,
                            icon: React.ReactNode,
                            value: any
                        }, index) => {
                            return <CardTitleValue key={index} title={item.title} value={item.value} icon={item.icon} />
                        })}
                        <div className="lg:col-span-4">
                            <CardTitleValue key={11} title={"توضیحات"} value={"ندارد"} icon={<Description color="secondary" />} />
                        </div>
                    </div>
                    <ReusableCard>
                        <div className="my-4">
                            <Typography variant="h3">لطفا اطلاعات زیر را جهت پرداخت کرایه وارد نمایید</Typography>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <FormikSelect name='receivePaymentTypeId' label='نوع پرداخت' options={dropdownReceivePaymentResource(paymentResource)} />
                            {renderFields("receivePaymentOriginId", "پرداخت از", +values.receivePaymentTypeId)}
                            <FormikInput name="totalFareAmount" label="مجموع مبلغ قابل پرداخت" />
                            <FormikDatepicker name="date" label="تاریخ پرداخت" />
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