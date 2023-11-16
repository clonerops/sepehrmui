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
import { FieldType } from "../../../../_cloner/components/globalTypes"
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox"

const initialValues = {
    driverName: "",
    approvedUserName: "",
    carPlaque: "",
    driverMobile: "",
    approvedDate: new Date(),
    rentAmount: 1,
    isComplete: false,
    description: ""
}

const Confirm = () => {
    const { id } = useParams()
    const { mutate, data: cargoSended, isLoading } = useCreateCargo()

    const paymentInfo = [
        { value: 1, label: "نقدی" },
        { value: 2, label: "ماهیانه باربری" }
    ]

    const fields: FieldType[][] = [
        [
            { label: "راننده", name: "driverName", type: "input" },
            { label: "باربری", name: "approvedUserName", type: "input" },
            { label: "پلاک خودرو", name: "carPlaque", type: "input" },
        ],
        [
            { label: "شماره همراه راننده", name: "driverMobile", type: "input" },
            { label: "تاریخ حمل", name: "approvedDate", type: "datepicker" },
            { label: "نوع تسویه باربری", name: "rentAmount", type: "select" },
        ],
        [
            { label: "ندارد", name: "isComplete", type: "checkbox" },
        ],
        [
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
                            name="isSupplier"
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
                return <FormikSelect options={paymentInfo} {...rest} />
            case "desc":
                return <FormikInput multiline {...rest} />;

            default:
                return <FormikInput {...rest} />;
        }
    };
    
    // {isLoading && <Backdrop loading={isLoading} />}

    return (
        <>
            <OrderDetail isCargo />
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
                                    <Typography variant="h3" className="px-8 py-2">ثبت اعلام بار</Typography>
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