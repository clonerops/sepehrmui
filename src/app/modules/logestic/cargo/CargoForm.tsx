import { useParams } from "react-router-dom"
import { Form, Formik } from "formik"
import moment from "moment-jalaali"
import { Box, Button, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import Swal from 'sweetalert2'

import { useCreateCargo, useRetrieveCargos } from "../core/_hooks"
import { useGetVehicleTypes } from "../../generic/_hooks"

import FormikInput from "../../../../_cloner/components/FormikInput"
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker"
import FormikSelect from "../../../../_cloner/components/FormikSelect"
import OrderDetail from "../../order/OrderDetail"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import { FieldType } from "../../../../_cloner/components/globalTypes"
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox"
import { dropdownVehicleType } from "../helpers/dropdowns"
import FormikPrice from "../../product/components/FormikPrice"

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

const Confirm = () => {
    const { id } = useParams()
    const { mutate, isLoading } = useCreateCargo()
    const cargosList = useRetrieveCargos(id)
    const vehicleList = useGetVehicleTypes()

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
            { label: "مبلغ کرایه", name: "fareAmount", type: "price" },
            { label: "ندارد", name: "isComplete", type: "checkbox" },
        ],
        [
            { label: "آدرس محل تخلیه", name: "unloadingPlaceAddress", type: "desc" },
            { label: "توضیحات", name: "description", type: "desc" },
        ]
    ];

    const parseFields = (fields: FieldType, values: any, setFieldValue: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "checkbox":
                return (
                    <Box component="div" className="w-full flex items-center">
                        <FormikCheckbox
                            name="isComplete"
                            label=""
                        />
                        <Typography variant="h3">
                            تکمیل بارگیری
                        </Typography>
                    </Box>
                );
            case "datepicker":
                return <FormikDatepicker setFieldValue={setFieldValue} boxClassName="w-full" {...rest} />
            case "select":
                return <FormikSelect options={dropdownVehicleType(vehicleList.data)} {...rest} />
            case "price":
                return <FormikPrice {...rest} />;
            case "desc":
                return <FormikInput multiline minRows={3} {...rest} />;

            default:
                return <FormikInput {...rest} />;
        }
    };

    return (
        <>
            <OrderDetail isCargo />
            <ReusableCard cardClassName="mt-8">
                <Typography variant="h2" color="primary">مشخصات حمل</Typography>
                <Formik initialValues={initialValues} onSubmit={
                    async (values, { setStatus, setSubmitting }) => {
                        try {
                            const formData: any = {
                                ...values,
                                orderId: id,
                                fareAmount: +values.fareAmount.replace(/,/g, "")
                            }

                            mutate(formData, {
                                onSuccess: (message) => {
                                    if (message.succeeded) {
                                        Swal.fire({
                                            title: `اعلام بار با شماره ${message?.data.cargoAccounceNo} ثبت گردید`,
                                            confirmButtonColor: "#fcc615",
                                            showClass: {
                                                popup: 'animate__animated animate__fadeInDown'
                                            },
                                            hideClass: {
                                                popup: 'animate__animated animate__fadeOutUp'
                                            },
                                            confirmButtonText: "بستن",
                                            icon: "success",
                                            customClass: {
                                                title: "text-lg"
                                            }
                                        })
                                        cargosList.refetch()
                                    }

                                    if (!message?.data?.Succeeded) {
                                        enqueueSnackbar(message.data.Message, {
                                            variant: `error`,
                                            anchorOrigin: { vertical: "top", horizontal: "center" }
                                        })
                                    }

                                    
                                }

                            })
                        } catch (error) {
                            setStatus("اطلاعات ثبت اعلام بار نادرست می باشد");
                            setSubmitting(false);

                        }
                    }
                }>
                    {({ handleSubmit, setFieldValue, values }) => {
                        return <Form onSubmit={handleSubmit}>
                            {fields.map((rowFields) => (
                                <Box
                                    component="div"
                                    className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4"
                                >
                                    {rowFields.map((field) =>
                                        parseFields(field, values, setFieldValue)
                                    )}
                                </Box>
                            ))}
                            <Box component="div" className="flex justify-end items-end">
                                <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                    <Typography variant="h3" className="px-8 py-2"> {isLoading ? "درحال پردازش ..." : "ثبت اعلام بار" } </Typography>
                                </Button>
                            </Box>
                        </Form>
                    }}
                </Formik>
            </ReusableCard>
        </>
    )
}

export default Confirm