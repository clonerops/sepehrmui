import { useParams } from "react-router-dom"
import { Formik, FormikErrors } from "formik"
import { Button, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { Add, AttachMoney, Close, Description, ExitToApp, LocalShipping, Person } from "@mui/icons-material"
import moment from "moment-jalaali"

import { useCreateCargo, useRetrieveCargos } from "../core/_hooks"
import { useGetVehicleTypes } from "../../generic/_hooks"

import FormikInput from "../../../../_cloner/components/FormikInput"
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker"
import FormikSelect from "../../../../_cloner/components/FormikSelect"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import CardTitleValue from "../../../../_cloner/components/CardTitleValue"
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox"
import FormikAmount from "../../../../_cloner/components/FormikAmount"
import Backdrop from "../../../../_cloner/components/Backdrop"
import MuiTable from "../../../../_cloner/components/MuiTable"

import { FieldType } from "../../../../_cloner/components/globalTypes"
import { dropdownVehicleType } from "../helpers/dropdowns"
import { ICargo } from "../core/_models"
import { renderSwal } from "../../../../_cloner/helpers/swal"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"
import { submitCargoValidation } from "./validations"
import { useRetrieveOrder } from "../../managment-order/core/_hooks"
import { useState } from "react"
import ReusableAccordion from "../../../../_cloner/components/ReusableAccordion"
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar"
import MaskInput from "../../../../_cloner/components/MaskInput"

const initialValues = {
    driverName: "",
    approvedUserName: "",
    carPlaque: "",
    driverMobile: "",
    approvedDate: moment(new Date()).format('jYYYY/jMM/jDD'),
    fareAmount: "",
    isComplete: false,
    description: "",
    vehicleTypeId: null,
    deliveryDate: "",
    unloadingPlaceAddress: ""
}



const CargoForm = () => {
    const { id } = useParams()
    const { mutate, isLoading } = useCreateCargo()
    const { data, isLoading: orderLoading } = useRetrieveOrder(id)
    const cargosList = useRetrieveCargos(id)
    const vehicleList = useGetVehicleTypes()

    // states
    const [ladingOrderDetail, setLadingOrderDetail] = useState<any>([])
    const [ladingAmount, setLadingAmount] = useState<{ [key: string]: string }>({})

    const orderAndAmountInfoInCargo = [
        { id: 1, title: "شماره سفارش", icon: <Person color="secondary" />, value: data?.data?.orderCode },
        { id: 2, title: "مشتری", icon: <Person color="secondary" />, value: data?.data?.customerFirstName + " " + data?.data?.customerLastName },
        { id: 3, title: "نوع خروج", icon: <ExitToApp color="secondary" />, value: data?.data?.orderExitTypeDesc },
        { id: 4, title: "نوع ارسال", icon: <LocalShipping color="secondary" />, value: data?.data?.orderSendTypeDesc },
        { id: 5, title: "نوع کرایه", icon: <AttachMoney color="secondary" />, value: data?.data?.paymentTypeDesc },
    ]
    const orderOrderColumnMain = [
        {
            id: 1, header: "افزودن به لیست", accessor: "add", render: (params: any) => {
                return <Button onClick={() => handleSelectProduct(params)} variant="contained" color="secondary">
                    <Add className="text-white" />
                    <Typography className="text-white">افزودن</Typography>
                </Button>
            }
        },
        { id: 2, header: "کد کالا", accessor: "productCode", render: (params: any) => params.product.productCode },
        { id: 3, header: "نام کالا", accessor: "productName", render: (params: any) => `${params.product.productName} ${params.brandName}` },
        { id: 4, header: "مقدار اولیه", accessor: "proximateAmount", render: (params: any) => separateAmountWithCommas(params.proximateAmount) },
        { id: 5, header: "مجموع مقدار بارگیریهای قبلی", accessor: "totalLoadedAmount", render: (params: any) => separateAmountWithCommas(params.totalLoadedAmount) },
        { id: 6, header: "مقدار باقیمانده جهت بارگیری", accessor: "remainingLadingAmount", render: (params: any) => separateAmountWithCommas(params.remainingLadingAmount) },
        // { id: 7, header: "مقدار قابل بارگیری", accessor: "totalLoadedAmount"},
    ]
    const orderOrderColumn = [
        {
            id: 1, header: "حذف", accessor: "add", render: (params: any) => {
                return <Close onClick={() => handleDeleteFromList(params.id)} className="text-red-500" />
            }
        },
        { id: 2, header: "نام کالا", accessor: "productName" },
        { id: 3, header: "انبار", accessor: "warehouseName" },
        { id: 4, header: "مقدار اولیه", accessor: "proximateAmount", render: (params: any) => separateAmountWithCommas(params.proximateAmount) },
        { id: 4, header: "مقدار قابل بارگیری", accessor: "remainingLadingAmount", render: (params: any) => separateAmountWithCommas(params.remainingLadingAmount) },
        {
            id: 5, header: "مقدار بارگیری", accessor: "remainingLadingAmount", render: (params: any) => {
                return <MaskInput
                    key={params.id}
                    mask={Number}
                    thousandsSeparator=","
                    label=""
                    color={+params.remainingLadingAmount < +ladingAmount[params.id] ? "error" : "primary"}
                    error={+params.remainingLadingAmount < +ladingAmount[params.id]}
                    value={ladingAmount[params.id]}
                    onAccept={(value, mask) => setLadingAmount({ ...ladingAmount, [params.id]: mask.unmaskedValue })}
                />
            }
        },
    ]

    const lastCargoList: any = [
        { id: 1, header: "شماره بارنامه", accessor: "cargoAnnounceNo" },
        { id: 1, header: "راننده", accessor: "driverName" },
        { id: 2, header: "شماره موبایل راننده", accessor: "driverMobile" },
        { id: 3, header: "شماره پلاک", accessor: "carPlaque" },
        { id: 4, header: "کرایه(ریال)", accessor: "rentAmount", render: (params: any) => separateAmountWithCommas(params.rentAmount) },
        { id: 5, header: "باربری", accessor: "shippingName" },
        { id: 6, header: "تاریخ تحویل", accessor: "deliveryDate" },
        { id: 7, header: "آدرس محل تخلیه", accessor: "unloadingPlaceAddress" },
    ]

    const fields: FieldType[][] = [
        [
            { label: "راننده", name: "driverName", type: "input" },
            { label: "باربری", name: "shippingName", type: "input" },
            { label: "پلاک خودرو", name: "carPlaque", type: "input" },
            { label: "نوع خودرو", name: "vehicleTypeId", type: "select" },
        ],
        [
            { label: "شماره همراه راننده", name: "driverMobile", type: "input" },
            { label: "تاریخ تحویل", name: "deliveryDate", type: "datepicker" },
            { label: "مبلغ کرایه", name: "fareAmount", type: "amount" },
            { label: "ندارد", name: "isComplete", type: "checkbox" },
        ],
        [
            { label: "آدرس محل تخلیه", name: "unloadingPlaceAddress", type: "desc" },
            { label: "توضیحات", name: "description", type: "desc" },
        ]
    ];

    const parseFields = (fields: FieldType, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>, index: number) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "checkbox":
                return (
                    <div key={index} className="w-full flex items-center">
                        <FormikCheckbox
                            name="isComplete"
                            label=""
                        />
                        <Typography variant="h3">
                            تکمیل بارگیری
                        </Typography>
                    </div>
                );
            case "datepicker":
                return <FormikDatepicker key={index} setFieldValue={setFieldValue} boxClassName="w-full" {...rest} />
            case "select":
                return <FormikSelect key={index} options={dropdownVehicleType(vehicleList.data)} {...rest} />
            case "amount":
                return <FormikAmount key={index} {...rest} />;
            case "desc":
                return <FormikInput key={index} multiline minRows={3} {...rest} />;

            default:
                return <FormikInput key={index} {...rest} />;
        }
    };

    const handleSelectProduct = (item: any) => {
        const isExist = ladingOrderDetail.some((l: any) => l.id === item.id)
        if (isExist) {
            EnqueueSnackbar("کالا قبلا به لیست اضافه شده است", "warning")
        } else if (item.remainingLadingAmount === 0) {
            EnqueueSnackbar("مقدار باقیمانده جهت بارگیری صفر می باشد و امکان بارگیری ندارد", "warning")
        } else {
            const formData = {
                id: item.id,
                productName: item.productName,
                warehouseName: item.warehouseName,
                proximateAmount: item.proximateAmount,
                remainingLadingAmount: item.remainingLadingAmount,
                cargoAnnounceId: id,
                orderDetailId: item.id,
                realAmount: item.proximateAmount,
            }
            setLadingAmount({ ...ladingAmount, [item.id]: item.remainingLadingAmount.toString() })
            setLadingOrderDetail([...ladingOrderDetail, formData])
        }
    }

    const handleDeleteFromList = (id: any) => {
        const filtered = ladingOrderDetail.filter((item: any) => item.id !== id);
        setLadingOrderDetail(filtered);
    }

    const onSubmit = (values: ICargo) => {
        try {
            const formData: ICargo = {
                ...values, orderId: id,
                fareAmount: values?.fareAmount.includes(',') ? +values?.fareAmount.replace(/,/g, "") : +values?.fareAmount,
                cargoAnnounceDetails: ladingOrderDetail.map((item: any) => ({
                    cargoAnnounceId: item.cargoAnnounceId,
                    orderDetailId: item.orderDetailId,
                    realAmount: item.realAmount,
                    ladingAmount: +ladingAmount[item.id],
                    packageCount: 0
                }))
            }
            if (ladingOrderDetail.some((item: any) => +item.remainingLadingAmount < +ladingAmount[item.id])) {
                EnqueueSnackbar("مقدار بارگیری را به درستی وارد کنید", "warning")
            } else {
                mutate(formData, {
                    onSuccess: (message) => {
                        if (message.data.Errors && message.data.Errors.length > 0) {
                            EnqueueSnackbar(message.data.Errors[0], "error")
                        } else {
                            if (message.succeeded) {
                                renderSwal(`اعلام بار با شماره ${message?.data.cargoAnnounceNo} ثبت گردید`)
                            }

                            if (!message?.data?.Succeeded) {
                                enqueueSnackbar(message.data.Message, {
                                    variant: `error`,
                                    anchorOrigin: { vertical: "top", horizontal: "center" }
                                })
                            }
                        }


                    }

                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    if (orderLoading) {
        return <Backdrop loading={orderLoading} />
    }

    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            <Typography color="primary" variant="h1" className="pb-8">ثبت اعلام بار</Typography>
            <div className={`grid grid-cols-1 lg:grid-cols-5 gap-4 my-4`}>
                {orderAndAmountInfoInCargo.map((item: {
                    title: string,
                    icon: React.ReactNode,
                    value: any
                }, index) => {
                    return <CardTitleValue index={index} title={item.title} value={item.value} icon={item.icon} />
                })}
                <div className="lg:col-span-5">
                    <CardTitleValue index={6} title={"توضیحات سفارش"} value={data?.data?.description} icon={<Description color="secondary" />} />
                </div>
            </div>
            <ReusableAccordion
                content={
                    <ReusableCard cardClassName="p-4 mt-4">
                        {/* <Typography variant="h2" color="primary" className="pb-4">اعلام بارهای قبلی</Typography> */}
                        <MuiTable onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={cargosList?.data?.data.length > 0 ? cargosList?.data?.data : []} columns={lastCargoList} />
                    </ReusableCard>
                }
                title="نمایش اعلام بارهای قبلی"
            />

            <div className="flex flex-col gap-4 mt-4">
                <ReusableCard cardClassName={"col-span-3"}>
                    <Typography variant="h2" color="primary" className="pb-4">اقلام سفارش</Typography>
                    <MuiTable tooltipTitle={data?.data?.description ? <Typography>{data?.data?.description}</Typography> : ""} onDoubleClick={(item: any) => handleSelectProduct(item)} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={data?.data?.details} columns={orderOrderColumnMain} />
                </ReusableCard>
                <ReusableCard cardClassName={"col-span-3"}>
                    <Typography variant="h2" color="primary" className="pb-4">کالا بارگیری</Typography>
                    <MuiTable tooltipTitle={""} onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={ladingOrderDetail} columns={orderOrderColumn} />
                </ReusableCard>
            </div>


            <ReusableCard cardClassName="mt-8">
                <Typography variant="h2" color="primary">مشخصات حمل</Typography>
                <Formik initialValues={initialValues} validationSchema={submitCargoValidation} onSubmit={onSubmit}>
                    {({ handleSubmit, setFieldValue }) => {
                        return <form onSubmit={handleSubmit}>
                            {fields.map((rowFields, index) => (
                                <div
                                    key={index}
                                    className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4"
                                >
                                    {rowFields.map((field, index) =>
                                        parseFields(field, setFieldValue, index)
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end items-end">
                                <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                    <Typography variant="h3" className="px-8 py-2"> {isLoading ? "درحال پردازش ..." : "ثبت اعلام بار"} </Typography>
                                </Button>
                            </div>
                        </form>
                    }}
                </Formik>
            </ReusableCard>
        </>
    )
}

export default CargoForm