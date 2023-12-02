import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import {
    useCargoById,
    useCreateCargo,
    useEditCargo,
    useRetrieveCargos,
} from "../core/_hooks";
import moment from "moment-jalaali";
import Backdrop from "../../../../_cloner/components/Backdrop";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { confirmValidation } from "../validations/confirm";
import OrderDetail from "../../order/OrderDetail";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox";
import { enqueueSnackbar } from "notistack";
import MuiTable from "../../../../_cloner/components/MuiTable";
import { useGetVehicleTypes } from "../../generic/_hooks";
import { dropdownVehicleType } from "../helpers/dropdowns";
import { ICargo } from "../core/_models";
import Swal from "sweetalert2";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import FormikPrice from "../../product/components/FormikPrice";
import CardTitleValue from "../../../../_cloner/components/CardTitleValue";
import { Person } from "@mui/icons-material";

const initialValues = {
    driverName: "",
    approvedUserName: "",
    carPlaque: "",
    driverMobile: "",
    approvedDate: moment(new Date()).format("jYYYY/jMM/jDD"),
    fareAmount: "",
    isComplete: false,
    description: "",
    vehicleTypeId: null,
    deliveryDate: "",
    unloadingPlaceAddress: "",
};

const orderOrderColumnMain = [
    { id: 1, header: "نام کالا", accessor: "productName" },
    { id: 2, header: "انبار", accessor: "warehouseName" },
    { id: 3, header: "مقدار", accessor: "proximateAmount" },
    { id: 4, header: "قیمت", accessor: "price" },
];

const CargoEditForm = () => {
    const { id }: any = useParams();
    const { mutate, isLoading } = useEditCargo();
    const vehicleList = useGetVehicleTypes();

    const detailsCargo = useCargoById(id);

    const fields: FieldType[][] = [
        [
            { label: "راننده", name: "driverName", type: "input" },
            { label: "باربری", name: "shippingName", type: "input" },
            { label: "پلاک خودرو", name: "carPlaque", type: "input" },
            { label: "نوع خودرو", name: "vehicleTypeId", type: "select" },
        ],
        [
            {
                label: "شماره همراه راننده",
                name: "driverMobile",
                type: "input",
            },
            { label: "تاریخ تحویل", name: "deliveryDate", type: "datepicker" },
            { label: "مبلغ کرایه", name: "fareAmount", type: "price" },
            { label: "ندارد", name: "isComplete", type: "checkbox" },
        ],
        [
            {
                label: "آدرس محل تخلیه",
                name: "unloadingPlaceAddress",
                type: "desc",
            },
            { label: "توضیحات", name: "description", type: "desc" },
        ],
    ];

    const parseFields = (
        fields: FieldType,
        values: any,
        setFieldValue: any
    ) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "checkbox":
                return (
                    <Box component="div" className="w-full flex items-center">
                        <FormikCheckbox name="isComplete" label="" />
                        <Typography variant="h3">تکمیل بارگیری</Typography>
                    </Box>
                );
            case "datepicker":
                return (
                    <FormikDatepicker
                        setFieldValue={setFieldValue}
                        boxClassName="w-full"
                        {...rest}
                    />
                );
            case "select":
                return (
                    <FormikSelect
                        options={dropdownVehicleType(vehicleList.data)}
                        {...rest}
                    />
                );
            case "price":
                return <FormikPrice {...rest} />;
            case "desc":
                return <FormikInput multiline minRows={3} {...rest} />;

            default:
                return <FormikInput {...rest} />;
        }
    };

    if (detailsCargo.isLoading) {
        return <Backdrop loading={isLoading} />;
    }

    return (
        <>
            <Box component="div" className="grid grid-cols-5 gap-x-4 gap-y-4">
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="شماره سفارش"
                    value={detailsCargo?.data?.data?.order?.orderCode}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="نام مشتری"
                    value={detailsCargo?.data?.data?.order?.customerName}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="نوع ارسال"
                    value={detailsCargo?.data?.data?.order?.orderSendTypeDesc}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="نوع فاکتور"
                    value={detailsCargo?.data?.data?.order?.invoiceTypeDesc}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="وضعیت سفارش"
                    value={detailsCargo?.data?.data?.order?.orderStatusDesc}
                />
            </Box>
            <ReusableCard cardClassName="mt-4">
                <Typography variant="h2" color="primary" className="pb-4">
                    اقلام سفارش
                </Typography>
                <MuiTable
                    tooltipTitle={
                        detailsCargo?.data?.data?.order?.description ? (
                            <Typography>
                                {detailsCargo?.data?.data?.order?.description}
                            </Typography>
                        ) : (
                            ""
                        )
                    }
                    onDoubleClick={() => {}}
                    headClassName="bg-[#272862]"
                    headCellTextColor="!text-white"
                    data={detailsCargo?.data?.data?.order?.details}
                    columns={orderOrderColumnMain}
                />
            </ReusableCard>

            <ReusableCard cardClassName="mt-8">
                <Typography variant="h2" color="primary">
                    مشخصات حمل
                </Typography>
                <Formik
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
                    onSubmit={async (values, { setStatus, setSubmitting }) => {
                        try {
                            const formData: any = {
                                ...values,
                                id: id,
                                approvedUserName: "",
                            };
                            console.log("formData", JSON.stringify(formData))
                            mutate(formData, {
                                onSuccess: (message) => {
                                    if (message.succeeded) {
                                        Swal.fire({
                                            title: `اعلام بار با موفقیت ویرایش گردید`,
                                            confirmButtonColor: "#fcc615",
                                            showClass: {
                                                popup: "animate__animated animate__fadeInDown",
                                            },
                                            hideClass: {
                                                popup: "animate__animated animate__fadeOutUp",
                                            },
                                            confirmButtonText: "بستن",
                                            icon: "success",
                                            customClass: {
                                                title: "text-lg",
                                            },
                                        });
                                    }

                                    if (!message?.data?.Succeeded) {
                                        enqueueSnackbar(message.data.Message, {
                                            variant: `error`,
                                            anchorOrigin: {
                                                vertical: "top",
                                                horizontal: "center",
                                            },
                                        });
                                    }
                                },
                            });
                        } catch (error) {
                            setStatus(
                                "اطلاعات ویرایش اعلام بار نادرست می باشد"
                            );
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ handleSubmit, setFieldValue, values }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                {fields.map((rowFields) => (
                                    <Box
                                        component="div"
                                        className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4"
                                    >
                                        {rowFields.map((field) =>
                                            parseFields(
                                                field,
                                                values,
                                                setFieldValue
                                            )
                                        )}
                                    </Box>
                                ))}
                                <Box
                                    component="div"
                                    className="flex justify-end items-end"
                                >
                                    <Button
                                        onClick={() => handleSubmit()}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        <Typography
                                            variant="h3"
                                            className="px-8 py-2"
                                        >
                                            {" "}
                                            {isLoading
                                                ? "درحال پردازش ..."
                                                : "ویرایش اعلام بار"}{" "}
                                        </Typography>
                                    </Button>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>
            </ReusableCard>
        </>
    );
};

export default CargoEditForm;
