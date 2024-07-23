import { useParams } from "react-router-dom"
import { Formik, FormikErrors } from "formik"
import { Button, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { AttachMoney, Description, ExitToApp, LocalShipping, Person } from "@mui/icons-material"
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
import { useEffect, useState } from "react"
import { EnqueueSnackbar } from "../../../_cloner/helpers/Snackebar"
import MaskInput from "../../../_cloner/components/MaskInput"
import { dropdownVehicleType } from "../../../_cloner/helpers/dropdowns"
import { useCargoById, useEditCargo } from "./_hooks"
import { ICargo } from "./_models"

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

const CargoEditForm = () => {

    const { id }: any = useParams()

    const detailsCargo = useCargoById(id);
    const vehicleList = useGetVehicleTypes()
    const updateCargo = useEditCargo();
    // states
    const [ladingOrderDetail, setLadingOrderDetail] = useState<any>([])
    const [ladingAmount, setLadingAmount] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        setLadingOrderDetail(detailsCargo?.data?.data?.cargoAnnounceDetails.map((item: any) => ({
            id: item.orderDetailId,
            cargoAnnounceId: item.cargoAnnounceId,
            orderDetailId: item.orderDetailId,
            proximateAmount: item.realAmount,
            remainingLadingAmount: (+item.realAmount) - (+item.ladingAmount),
            productCode: item.orderDetail.product.productCode,
            productName: item.orderDetail.productName,
            brandName: item.orderDetail.brandName
        })))
        detailsCargo?.data?.data?.cargoAnnounceDetails.forEach((element: any) => {
            setLadingAmount(prevLadingAmount => {
                const updatedLadingAmount = {...prevLadingAmount, [element.orderDetailId]: element.ladingAmount.toString()};
                return updatedLadingAmount; 
            });
        });
         // eslint-disable-next-line
    }, [detailsCargo?.data?.data])

    const orderAndAmountInfoInCargo = [
        { id: 1, title: "شماره سفارش", icon: <Person color="secondary" />, value: detailsCargo?.data?.data?.order?.orderCode },
        { id: 2, title: "مشتری", icon: <Person color="secondary" />, value: detailsCargo?.data?.data?.order?.customerFirstName + " " + detailsCargo?.data?.data?.order?.customerLastName },
        { id: 3, title: "نوع خروج", icon: <ExitToApp color="secondary" />, value: detailsCargo?.data?.data?.order?.orderExitTypeDesc },
        { id: 4, title: "نوع ارسال", icon: <LocalShipping color="secondary" />, value: detailsCargo?.data?.data?.order?.orderSendTypeDesc },
        { id: 5, title: "نوع کرایه", icon: <AttachMoney color="secondary" />, value: detailsCargo?.data?.data?.order?.paymentTypeDesc },
    ]
    const orderOrderColumn = [
        { id: 2, header: "کد کالا", accessor: "productCode" },
        { id: 3, header: "نام کالا", accessor: "productName", render: (params: any) => `${params.productName} ${params.brandName}` },
        { id: 4, header: "مقدار اولیه", accessor: "proximateAmount", render: (params: any) => separateAmountWithCommas(params.proximateAmount) },
        { id: 4, header: "مقدار قابل بارگیری", accessor: "remainingLadingAmount", render: (params: any) => separateAmountWithCommas(params.remainingLadingAmount) },
        {
            id: 5, header: "مقدار بارگیری", accessor: "ladingAmount", render: (params: any) => {
                return <MaskInput
                    key={params.id}
                    mask={Number}
                    thousandsSeparator=","
                    label=""
                    color={+params.remainingLadingAmount < +ladingAmount[params.id] ? "error" : "primary"}
                    value={ladingAmount[params.id]}
                    onAccept={(value, mask) => setLadingAmount({ ...ladingAmount, [params.id]: mask.unmaskedValue })}
                />
            }
        },
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
                return <FormikAmount disabled={detailsCargo?.data?.data?.order?.orderSendTypeId !== 1} key={index} {...rest} />;
            case "desc":
                return <FormikInput key={index} multiline minRows={3} {...rest} />;
            default:
                return <FormikInput key={index} {...rest} />;
        }
    };

    const onSubmit = (values: ICargo) => {
        try {
            const formData: ICargo = {
                id: id,
                unloadingPlaceAddress: values.unloadingPlaceAddress,
                driverName: values.driverName,
                carPlaque: values.carPlaque,
                driverMobile: values.driverMobile,
                approvedUserName: values.approvedUserName,
                approvedDate: values.approvedDate,
                fareAmount: values.fareAmount,
                isComplete: values.isComplete,
                vehicleTypeId: values.vehicleTypeId,
                shippingName: values.shippingName,
                deliveryDate: values.deliveryDate,
                description: values.description,
                cargoAnnounceDetails: ladingOrderDetail.map((item: any) => ({
                    cargoAnnounceId: item.cargoAnnounceId,
                    orderDetailId: item.orderDetailId,
                    realAmount: item.proximateAmount,
                    ladingAmount: +ladingAmount[item.id],
                    packageCount: 0
                }))
            }
            updateCargo.mutate(formData, {
                onSuccess: (message) => {
                    if(message.data.Errors && message.data.Errors.length > 0) {
                        EnqueueSnackbar(message.data.Errors[0], "error")
                    } else {
                        if (message.succeeded) {
                            renderSwal(`اعلام بار با موفقیت ویرایش گردید`)
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

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {detailsCargo.isLoading && <Backdrop loading={detailsCargo.isLoading} />}
            {updateCargo.isLoading && <Backdrop loading={updateCargo.isLoading} />}

            <Typography color="primary" variant="h1" className="pb-8">ویرایش اعلام بار</Typography>
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 my-4`}>
                {orderAndAmountInfoInCargo.map((item: {
                    title: string,
                    icon: React.ReactNode,
                    value: any
                }, index) => {
                    return <CardTitleValue index={index} title={item.title} value={item.value} icon={item.icon} />
                })}
            </div>
            <div className="lg:col-span-5">
                <CardTitleValue index={6} title={"توضیحات سفارش"} value={detailsCargo?.data?.data?.description} icon={<Description color="secondary" />} />
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
                <ReusableCard cardClassName={"col-span-3"}>
                    <Typography variant="h2" color="primary" className="pb-4">کالا بارگیری</Typography>
                    <MuiTable tooltipTitle={""} onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={ladingOrderDetail} columns={orderOrderColumn} />
                </ReusableCard>
            </div>


            <ReusableCard cardClassName="mt-8">
                <Typography variant="h2" color="primary">مشخصات حمل</Typography>
                <Formik enableReinitialize initialValues={{
                    ...initialValues,
                    ...detailsCargo?.data?.data,
                    fareAmount: detailsCargo?.data?.data?.fareAmount.toString()
                    }} validationSchema={submitCargoValidation} onSubmit={onSubmit}>
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
                                    <Typography variant="h3" className="px-8 py-2"> {updateCargo.isLoading ? "درحال پردازش ..." : "ویرایش اعلام بار"} </Typography>
                                </Button>
                            </div>
                        </form>
                    }}
                </Formik>
            </ReusableCard>
        </>
    )
}

export default CargoEditForm