import { useParams } from "react-router-dom"
import { Form, Formik } from "formik"
import { useCreateCargo, useRetrievesNotSendedOrder } from "../core/_hooks"
import moment from "moment-jalaali"
import Backdrop from "../../../../_cloner/components/Backdrop"
import { Box, Button, Card, Container, Typography } from "@mui/material"
import FormikInput from "../../../../_cloner/components/FormikInput"
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker"
import FormikSelect from "../../../../_cloner/components/FormikSelect"
import { confirmValidation } from "../validations/confirm"
import PositionedSnackbar from "../../../../_cloner/components/Snackbar"
import { useState } from "react"
import { useRetrieveOrder } from "../../order/core/_hooks"
import React from "react"
import OrderDetail from "../../order/OrderDetail"
import ReusableCard from "../../../../_cloner/components/ReusableCard"

const initialValues = {
    driverName: "",
    approvedUserName: "",
    carPlaque: "",
    driverMobile: "",
    approvedDate: new Date(),
    rentAmount: 1
}

const Confirm = () => {
    const { id } = useParams()
    const { data, isLoading: orderLoading, isError: orderError } = useRetrievesNotSendedOrder()
    const { data: orderDetail, isLoading: orderDetailLoading, isError: orderDetailError } = useRetrieveOrder(id)
    const { mutate, data: cargoSended, isLoading } = useCreateCargo()
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const paymentInfo = [
        { value: 1, label: "نقدی" },
        { value: 2, label: "ماهیانه باربری" }
    ]

    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        cargoSended?.data?.Message ||
                        cargoSended?.message || "اعلام بار با موفقیت ثبت گردید"
                    }
                />
            )}
            {isLoading && <Backdrop loading={isLoading} />}
            {orderLoading && <Backdrop loading={orderLoading} />}
            <OrderDetail />
            <ReusableCard cardClassName="mt-8">
                <Typography variant="h2" color="primary">مشخصات حمل</Typography>
                <Formik initialValues={initialValues} validationSchema={confirmValidation} onSubmit={
                    async (values, { setStatus, setSubmitting }) => {
                        try {
                            const formData = {
                                orderId: id,
                                unloadingPlaceAddress: "",
                                driverName: values.driverName,
                                carPlaque: values.carPlaque,
                                driverMobile: values.driverMobile,
                                approvedUserName: values.approvedUserName,
                                approvedDate: moment(values.approvedDate).format("jYYYY/jMM/jDD"),
                                rentAmount: values.rentAmount
                            }
                            mutate(formData, {
                                onSuccess: () => {
                                    setSnackeOpen(true)
                                }
                            })
                        } catch (error) {
                            setStatus("اطلاعات ثبت اعلام بار نادرست می باشد");
                            setSubmitting(false);

                        }
                    }
                }>
                    {({ handleSubmit, setFieldValue }) => {
                        return <Form onSubmit={handleSubmit}>
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                                <FormikInput name="driverName" label="راننده" />
                                <FormikInput name="approvedUserName" label="باربری" />
                                <FormikInput name="carPlaque" label="پلاک خودرو" />
                                <FormikInput name="driverMobile " label="شماره همراه راننده" />
                                <FormikDatepicker name="approvedDate " label="تاریخ حمل" setFieldValue={setFieldValue} boxClassName="w-full" />
                                <FormikSelect name="rentAmount" label="نوع تسویه باربری" options={paymentInfo} />
                            </Box>
                            <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                <Typography variant="h3" className="px-8 py-2">ثبت اعلام بار</Typography>
                            </Button>
                        </Form>
                    }}
                </Formik>
            </ReusableCard>
        </>
    )
}

export default Confirm