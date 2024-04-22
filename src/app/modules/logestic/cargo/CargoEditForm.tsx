import { useParams } from "react-router-dom"
import { Formik, FormikErrors } from "formik"
import { Button, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { AttachMoney, ExitToApp, LocalShipping, Person } from "@mui/icons-material"
import moment from "moment-jalaali"

import { useCargoById, useEditCargo, useRetrieveCargos } from "../core/_hooks"
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


const orderOrderColumnMain = [
    { id: 1, header: "نام کالا", accessor: "productName" },
    { id: 2, header: "انبار", accessor: "warehouseName" },
    { id: 3, header: "مقدار", accessor: "proximateAmount", },
    { id: 4, header: "قیمت", accessor: "price" },
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


const CargoEditForm = () => {
    const { id }: any = useParams()

    const { mutate, isLoading } = useEditCargo();
    const detailsCargo = useCargoById(id);
    const cargosList = useRetrieveCargos(id)
    const vehicleList = useGetVehicleTypes()

    const orderAndAmountInfoInCargo = [
        { id: 1, title: "شماره سفارش", icon: <Person color="secondary" />, value: detailsCargo?.data?.data?.order?.orderCode },
        { id: 2, title: "مشتری", icon: <Person color="secondary" />, value: detailsCargo?.data?.data?.order?.customerFirstName + " " + detailsCargo?.data?.data?.order?.customerLastName },
        { id: 3, title: "نوع خروج", icon: <ExitToApp color="secondary" />, value: detailsCargo?.data?.data?.order?.exitType === 1 ? "عادی" : "بعد از تسویه" },
        { id: 4, title: "نوع ارسال", icon: <LocalShipping color="secondary" />, value: detailsCargo?.data?.data?.order?.orderSendTypeDesc },
        { id: 5, title: "نوع کرایه", icon: <AttachMoney color="secondary" />, value: detailsCargo?.data?.data?.order?.paymentTypeDesc },
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

    const parseFields = (fields: FieldType, setFieldValue:  (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>, index: number) => {
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
                return <FormikAmount disabled={detailsCargo?.data?.data?.order?.orderSendTypeId === 3} key={index} {...rest} />;
            case "desc":
                return <FormikInput key={index} multiline minRows={3} {...rest} />;

            default:
                return <FormikInput key={index} {...rest} />;
        }
    };

    const onSubmit = (values: ICargo) => {
        try {
            const formData: ICargo = {
                ...values,
                id: id,
                approvedUserName: "",
            };
            console.log(JSON.stringify(formData))
            mutate(formData, {
                onSuccess: (message) => {
                    if (message.succeeded) {
                        renderSwal(`ویرایش با موفقیت انجام گردید`)
                    } else {
                        enqueueSnackbar(message.data.Message, {
                            variant: `error`,
                            anchorOrigin: { vertical: "top", horizontal: "center" }
                        })

                    }
                }

            })
        } catch (error) {
            console.log(error)
        }

    }

    if (detailsCargo.isLoading) {
        return <Backdrop loading={isLoading} />;
    }


    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
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

            <ReusableCard cardClassName={ "col-span-3"}>
                <Typography variant="h2" color="primary" className="pb-4">اقلام سفارش</Typography>
                <MuiTable tooltipTitle={detailsCargo?.data?.data?.order?.description ? <Typography>{detailsCargo?.data?.data?.order?.description}</Typography> : ""} onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={detailsCargo?.data?.data?.order.details} columns={orderOrderColumnMain} />
            </ReusableCard>

            <ReusableCard cardClassName="p-4 mt-4">
                <Typography variant="h2" color="primary" className="pb-4">لیست اعلام بار</Typography>
                <MuiTable onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={cargosList?.data?.data.length > 0 ? cargosList?.data?.data : []} columns={lastCargoList} />
            </ReusableCard>

            <ReusableCard cardClassName="mt-8">
                <Typography variant="h2" color="primary">مشخصات حمل</Typography>
                <Formik
                    enableReinitialize
                    initialValues={{
                        driverName: detailsCargo?.data?.data.driverName,
                        approvedUserName: detailsCargo?.data?.data.approvedUserName,
                        carPlaque: detailsCargo?.data?.data.carPlaque,
                        driverMobile: detailsCargo?.data?.data.driverMobile,
                        approvedDate: moment(new Date()).format("jYYYY/jMM/jDD"),
                        fareAmount: detailsCargo?.data?.data.fareAmount,
                        isComplete: detailsCargo?.data?.data.isComplete,
                        description: detailsCargo?.data?.data.description,
                        vehicleTypeId: detailsCargo?.data?.data.vehicleTypeId,
                        shippingName: detailsCargo?.data?.data.shippingName,
                        deliveryDate: detailsCargo?.data?.data.deliveryDate,
                        unloadingPlaceAddress: detailsCargo?.data?.data.unloadingPlaceAddress,
                    }}
                validationSchema={submitCargoValidation} onSubmit={onSubmit}>
                    {({ handleSubmit, setFieldValue}) => {
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
                                    <Typography variant="h3" className="px-8 py-2"> {isLoading ? "درحال پردازش ..." : "ویرایش اعلام بار" } </Typography>
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