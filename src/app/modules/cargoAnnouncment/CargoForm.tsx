import { useParams } from "react-router-dom"
import { Formik, FormikErrors } from "formik"
import { Button, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { Add, AttachMoney, Close, Description, Details, ExitToApp, LocalShipping, OpenInBrowser, Person } from "@mui/icons-material"
import moment from "moment-jalaali"

import { useGetVehicleTypes } from "../generic/_hooks"

import FormikInput from "../../../_cloner/components/FormikInput"
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker"
import FormikSelect from "../../../_cloner/components/FormikSelect"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import CardTitleValue from "../../../_cloner/components/CardTitleValue"
import FormikCheckbox from "../../../_cloner/components/FormikCheckbox"
import FormikAmount from "../../../_cloner/components/FormikAmount"
import Backdrop from "../../../_cloner/components/Backdrop"
import MuiTable from "../../../_cloner/components/MuiTable"

import { FieldType } from "../../../_cloner/components/globalTypes"
import { renderSwal } from "../../../_cloner/helpers/swal"
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount"
import { submitCargoValidation } from "./_validations"
import { useRetrieveOrder } from "../managment-order/core/_hooks"
import { useEffect, useState } from "react"
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar"
import MaskInput from "../../../_cloner/components/MaskInput"
import { convertFilesToBase64 } from "../../../_cloner/helpers/convertToBase64"
import FileUpload from "../../../_cloner/components/FileUpload"
import { useCreateCargo, useGetCargosList } from "./_hooks"
import { ICargo, ICargoFilter } from "./_models"
import { dropdownVehicleType } from "../../../_cloner/helpers/dropdowns"
import TransitionsModal from "../../../_cloner/components/ReusableModal"

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

    const postCargoTools = useCreateCargo()
    const orderTools = useRetrieveOrder(id)
    const cargosList = useGetCargosList()
    const vehicleList = useGetVehicleTypes()

    // states
    const [ladingOrderDetail, setLadingOrderDetail] = useState<any>([])
    const [ladingAmount, setLadingAmount] = useState<{ [key: string]: string }>({})
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false)
    const [cargoAnnounceDetails, setCargoAnnounceDetails] = useState<any>({})

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }
        
    }, [files]);

    useEffect(() => {
        const filter: ICargoFilter = {
            OrderId: id
        }
        cargosList.mutate(filter)
        // eslint-disable-next-line
    }, [])

    const handleOpenDetails = (params: any) => {
        setCargoAnnounceDetails(params)
        setIsOpenDetail(true)
    }
    

    const orderAndAmountInfoInCargo = [
        { id: 1, title: "شماره سفارش", icon: <Person color="secondary" />, value: orderTools?.data?.data?.orderCode },
        { id: 2, title: "مشتری", icon: <Person color="secondary" />, value: orderTools?.data?.data?.customerFirstName + " " + orderTools?.data?.data?.customerLastName },
        { id: 3, title: "نوع خروج", icon: <ExitToApp color="secondary" />, value: orderTools?.data?.data?.orderExitTypeDesc },
        { id: 4, title: "نوع ارسال", icon: <LocalShipping color="secondary" />, value: orderTools?.data?.data?.orderSendTypeDesc },
        { id: 5, title: "نوع کرایه", icon: <AttachMoney color="secondary" />, value: orderTools?.data?.data?.paymentTypeDesc },
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
        { id: 7, header: "انبار", accessor: "warehouseName", render: (params: any) => console.log(params) },
        { id: 4, header: "مقدار اولیه", accessor: "proximateAmount", render: (params: any) => separateAmountWithCommas(params.proximateAmount) },
        { id: 5, header: "مجموع مقدار بارگیریهای قبلی", accessor: "totalLoadedAmount", render: (params: any) => separateAmountWithCommas(params.totalLoadedAmount) },
        { id: 6, header: "مقدار باقیمانده جهت بارگیری", accessor: "remainingLadingAmount", render: (params: any) => separateAmountWithCommas(params.remainingLadingAmount) },
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
        { id: 8, header: "", accessor: "details", render: (params: any) => {
            return <Button onClick={() => handleOpenDetails(params)} size="small" variant="contained" className="!bg-cyan-700">
                <Typography>مشاهده جزئیات</Typography>
            </Button>
        }},
    ]
    const lastCargoDetail: any = [
        { id: 1, header: "کالا", accessor: "productName", render: (params: {orderDetail: {productName: string}}) => params.orderDetail.productName },
        { id: 2, header: "برند", accessor: "brandName", render: (params: {orderDetail: {brandName: string}}) => params.orderDetail.brandName },
        { id: 3, header: "مقدار اولیه", accessor: "realAmount", render: (params: {realAmount: number}) => separateAmountWithCommas(params.realAmount) },
        { id: 4, header: "مقدار بارگیری", accessor: "ladingAmount", render: (params: {ladingAmount: number}) => separateAmountWithCommas(params.ladingAmount) },
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
                return <FormikAmount disabled={orderTools?.data?.data?.farePaymentTypeId === 2} key={index} {...rest} />;
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
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })

        const formData: ICargo = {
            ...values, orderId: id,
            fareAmount: values?.fareAmount.includes(',') ? +values?.fareAmount.replace(/,/g, "") : +values?.fareAmount,
            attachments: attachments,
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
        }  else if(ladingOrderDetail.length <= 0) {
            EnqueueSnackbar("کالایی جهت بارگیری انتخاب نشده است", "warning")
        } 
        else {
            postCargoTools.mutate(formData, {
                onSuccess: (message) => {
                    if (message.data.Errors && message.data.Errors.length > 0) {
                        EnqueueSnackbar(message.data.Errors[0], "error")
                    } else {
                        if (message.succeeded) {
                            renderSwal(`اعلام بار با شماره ${message?.data[0].cargoAnnounceNo} ثبت گردید`)
                            orderTools.refetch()
                            const filter: ICargoFilter = {
                                OrderId: id
                            }
                    
                            cargosList.mutate(filter)
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

    }

    return (
        <>
            {postCargoTools.isLoading && <Backdrop loading={postCargoTools.isLoading} />}
            {orderTools.isLoading && <Backdrop loading={orderTools.isLoading} />}
            {cargosList.isLoading && <Backdrop loading={cargosList.isLoading} />}
            {vehicleList.isLoading && <Backdrop loading={vehicleList.isLoading} />}

            <Typography color="primary" variant="h1" className="pb-8">ثبت اعلام بار</Typography>
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 my-4`}>
                {orderAndAmountInfoInCargo.map((item: {
                    title: string,
                    icon: React.ReactNode,
                    value: any
                }, index) => {
                    return <CardTitleValue index={index} title={item.title} value={item.value} icon={item.icon} />
                })}
                <div>
                    <CardTitleValue index={6} title={"توضیحات سفارش"} value={orderTools?.data?.data?.description || "ثبت نشده"} icon={<Description color="secondary" />} />
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <ReusableCard cardClassName={"col-span-3"}>
                    <div className="flex justify-between items-center mb-4">
                        <Typography variant="h2" color="primary" className="pb-4">اقلام سفارش</Typography>
                        <Button onClick={() => setIsOpen(true)} variant="contained" size="small" className="flex justify-center items-center !bg-indigo-500">
                           <OpenInBrowser /><Typography variant="h5" className="text-white px-4 py-2">اعلام بار های قبلی</Typography>
                        </Button>
                    </div>
                    <MuiTable tooltipTitle={orderTools?.data?.data?.description ? <Typography>{orderTools?.data?.data?.description}</Typography> : ""} onDoubleClick={(item: any) => handleSelectProduct(item)} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={orderTools?.data?.data?.details} columns={orderOrderColumnMain} />
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
                                <div key={index} className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4">
                                    {rowFields.map((field, index) =>
                                        parseFields(field, setFieldValue, index)
                                    )}
                                </div>
                            ))}
                            <div className="flex flex-col w-full">
                                <Typography variant="h2" color="primary" className="pb-4">
                                    افزودن پیوست
                                </Typography>
                                <FileUpload files={files} setFiles={setFiles} />
                            </div>

                            <div className="flex justify-end items-end">
                                <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                    <Typography variant="h3" className="px-8 py-2"> {postCargoTools.isLoading ? "درحال پردازش ..." : "ثبت اعلام بار"} </Typography>
                                </Button>
                            </div>
                        </form>
                    }}
                </Formik>
            </ReusableCard>
            <TransitionsModal  width="80%" title="لیست اعلام بارهای قبلی" open={isOpen} isClose={() => setIsOpen(false)}>
                <MuiTable onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={cargosList?.data?.data.length > 0 ? cargosList?.data?.data : []} columns={lastCargoList} />
            </TransitionsModal>
            <TransitionsModal  width="50%" title={`جزئیات اعلام بار ${cargoAnnounceDetails.cargoAnnounceNo}`} open={isOpenDetail} isClose={() => setIsOpenDetail(false)}>
                <MuiTable onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={cargoAnnounceDetails?.cargoAnnounceDetails?.length > 0 ? cargoAnnounceDetails?.cargoAnnounceDetails : []} columns={lastCargoDetail} />
            </TransitionsModal>

        </>
    )
}

export default CargoForm