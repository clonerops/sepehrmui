import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { AttachMoney, CheckBox, ConfirmationNumber, Description, ExitToApp, LocalShipping, Newspaper, Person } from "@mui/icons-material";
import { Formik } from "formik";

import Backdrop from "../../../../_cloner/components/Backdrop";
import CardTitleValue from "../../../../_cloner/components/CardTitleValue";
import MuiTable from "../../../../_cloner/components/MuiTable";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import ImagePreview from "../../../../_cloner/components/ImagePreview";

import { useRetrievePurchaserOrder } from "../core/_hooks";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/seprateAmount";


type Props = {
    isCargo?: boolean
    isLading?: boolean
    ladingStateModal?: React.Dispatch<React.SetStateAction<boolean>> | undefined | any
}

const initialValues = {
    productName: "",
    proximateAmount: "",
    productPrice: "",

    invoiceTypeDesc: "",
    description: "",
    invoiceTypeCheck: false
}

const PurchaserOrderDetail = (props: Props) => {
    const { id } = useParams()
    const { data, isLoading } = useRetrievePurchaserOrder(id)
    // const cargosList = useRetrieveCargos(id)

    const orderAndAmountInfo = [
        { id: 1, title: "شماره سفارش", icon: <Person color="secondary" />, value: data?.data?.orderCode || "ثبت نشده" },
        { id: 2, title: "فروشنده", icon: <Person color="secondary" />, value: data?.data?.customerFirstName + " " + data?.data?.customerLastName || "ثبت نشده"},
        { id: 3, title: "تاریخ ثبت سفارش", icon: <ExitToApp color="secondary" />, value: data?.data?.registerDate || "ثبت نشده"},
        { id: 4, title: "نوع ارسال", icon: <LocalShipping color="secondary" />, value: data?.data?.orderSendTypeDesc  || "ثبت نشده"},
        { id: 4, title: "مبدا", icon: <LocalShipping color="secondary" />, value: data?.data?.originWarehouseDesc  || "ثبت نشده"},
        { id: 5, title: "وضعیت", icon: <CheckBox color="secondary" />, value: data?.data?.orderStatusDesc  || "ثبت نشده"},
        { id: 6, title: "نوع فاکتور", icon: <Newspaper color="secondary" />, value: data?.data?.invoiceTypeDesc  || "ثبت نشده"},
        { id: 7, title: "نوع کرایه", icon: <AttachMoney color="secondary" />, value: data?.data?.paymentTypeDesc  || "ثبت نشده"},
        { id: 8, title: "وضعیت تایید حسابداری", icon: <CheckBox color="secondary" />, value: data?.data?.confirmedStatus === false ? "تایید نشده" : "تایید شده"  || "ثبت نشده"},
        { id: 8, title: "مقصد", icon: <CheckBox color="secondary" />, value: data?.data?.destinationWarehouseDesc || "ثبت نشده"},
    ]
    const orderAndAmountInfoInCargo = [
        { id: 1, title: "شماره سفارش", icon: <Person color="secondary" />, value: data?.data?.orderCode },
        { id: 2, title: "فروشنده", icon: <Person color="secondary" />, value: data?.data?.customerFirstName + " " + data?.data?.customerLastName },
        { id: 3, title: "نوع خروج", icon: <ExitToApp color="secondary" />, value: data?.data?.orderExitTypeDesc },
        { id: 4, title: "نوع ارسال", icon: <LocalShipping color="secondary" />, value: data?.data?.orderSendTypeDesc },
        { id: 5, title: "نوع کرایه", icon: <AttachMoney color="secondary" />, value: data?.data?.paymentTypeDesc },
    ]

    const orderOrderColumnMain = [
        { id: 1, header: "نام کالا", accessor: "productName", render: (params: any) => <Typography>{params.productBrand.productName}</Typography> },
        { id: 2, header: "برند", accessor: "brandName", render: (params: any) => <Typography>{params.productBrand.brandName}</Typography> },
        { id: 3, header: "مقدار", accessor: "proximateAmount", render: (params: any) => <Typography variant="h4">{separateAmountWithCommas(params.proximateAmount)}</Typography> },
        { id: 4, header: "قیمت (ریال)", accessor: "price", render: (params: any) => <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.price)}</Typography> },
    ]
    const orderServicesColumn = [
        { id: 1, header: "نوع خدمت", accessor: "serviceDesc", render: (params: any) => <Typography>{params.serviceDesc}</Typography> },
        { id: 2, header: "هزینه(ریال)", accessor: "description", render: (params: any) => <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.description)}</Typography> },
    ]
    const orderPaymentsColumn = [
        { id: 1, header: "مبلغ(ریال)", accessor: "amount", render: (params: any) => <Typography className="text-green-500" variant="h3">{separateAmountWithCommas(params.amount)}</Typography> },
        { id: 2, header: "روز", accessor: "daysAfterExit" },
        { id: 3, header: "تاریخ تسویه", accessor: "paymentDate", render: (params: any) => params.paymentDate },
    ]


    const lastCargoList: any = [
        { id: 1, header: "شماره بارنامه", accessor: "cargoAccounceNo" },
        { id: 1, header: "راننده", accessor: "driverName" },
        { id: 2, header: "شماره موبایل راننده", accessor: "driverMobile" },
        { id: 3, header: "شماره پلاک", accessor: "carPlaque" },
        { id: 4, header: "کرایه(ریال)", accessor: "rentAmount", render: (params: any) => separateAmountWithCommas(params.rentAmount) },
        { id: 4, header: "باربری", accessor: "shippingName" },
        { id: 4, header: "تاریخ تحویل", accessor: "deliveryDate" },
        { id: 4, header: "آدرس محل تخلیه", accessor: "unloadingPlaceAddress" },
    ]

    if(props.isLading) {
        const appendActionLading = {
            id: 10, header: "صدور مجوز", accessor: "", render: (params: any) => {
                return <Button onClick={() => props.ladingStateModal(true)}>
                    <ConfirmationNumber color="secondary" />
                </Button>
            }
        }
        lastCargoList.push(appendActionLading)
    }


    if (isLoading) {
        return <Backdrop loading={isLoading} />
    }

    let renderOrderInfo = !props.isCargo ? orderAndAmountInfo : orderAndAmountInfoInCargo

    return (
        <>
            {/* <ReusableTab /> */}
            <Typography color="primary" variant="h1" className="pb-8">جزئیات سفارش خرید</Typography>
            <Formik initialValues={initialValues} onSubmit={() => { }}>
                {() => {
                    return <>
                        <div className={`grid grid-cols-1 ${props.isCargo? "md:grid-cols-5" : "md:grid-cols-5"} gap-4 my-4`}>
                            {renderOrderInfo.map((item: {
                                title: string,
                                icon: React.ReactNode,
                                value: any
                            }, index) => {
                                return <CardTitleValue key={index} title={item.title} value={item.value} icon={item.icon} />
                            })}
                            {!props.isCargo &&
                                <CardTitleValue key={renderOrderInfo.length + 1} className="md:col-span-5" title={"توضیحات"} value={data?.data?.description ? data?.data?.description : "ندارد"} icon={<Description color="secondary" />} />
                            }
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4">
                            {!props.isCargo &&
                                <ReusableCard>
                                    <Typography variant="h2" color="primary" className="pb-4">بسته های خدمت</Typography>
                                    <MuiTable data={data?.data?.orderServices} columns={orderServicesColumn} onDoubleClick={() => { }} />
                                </ReusableCard>
                            }
                            <ReusableCard cardClassName={!props.isCargo ? "col-span-2" : "col-span-3"}>
                                <Typography variant="h2" color="primary" className="pb-4">اقلام سفارش</Typography>
                                <MuiTable tooltipTitle={data?.data?.description ? <Typography>{data?.data?.description}</Typography> : ""} onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={data?.data?.details} columns={orderOrderColumnMain} />
                            </ReusableCard>
                        </div>
                        {!props.isCargo && !props.isLading && 
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 my-4">
                                <ReusableCard>
                                    <Typography variant="h2" color="primary" className="pb-4">تسویه حساب</Typography>
                                    <MuiTable data={data?.data?.orderPayments} columns={orderPaymentsColumn} onDoubleClick={() => { }} />
                                </ReusableCard>

                                <ReusableCard cardClassName="col-span-2">
                                    <Typography variant="h2" color="primary" className="pb-4">ضمیمه ها</Typography>
                                    <ImagePreview base64Strings={data?.data?.attachments.map((i: any) => i.fileData)} />
                                </ReusableCard>
                            </div>
                        }
                    </>
                }}
            </Formik>
        </>
    )
}

export default PurchaserOrderDetail