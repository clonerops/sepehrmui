import { useState, useRef, useEffect } from "react";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { dropdownCustomer } from "../../generic/_functions";
import { useGetCustomers } from "../../customer/core/_hooks";
import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { Delete, Person, Search, Add, NumbersOutlined, DateRangeRounded, TypeSpecimenTwoTone, HomeMaxRounded, HomeMiniOutlined, PhoneRounded, Place, TypeSpecimen, PriceChange, DateRange, CarCrash, HomeOutlined, Description } from "@mui/icons-material";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import { useParams } from "react-router-dom";
import { Formik, Form, FormikErrors } from "formik";
import { dropdownProductLading, dropdownVehicleType } from "../helpers/dropdowns";
import MuiTable from "../../../../_cloner/components/MuiTable";
import {
    useCargoById,
    useGetLadingLicenceById,
    useGetTransferRemitanceById,
    usePostExitRemiitance,
    usePostLadingLicence,
} from "../core/_hooks";
import FormikMaskInput from "../../../../_cloner/components/FormikMaskInput";
import CardTitleValue from "../../../../_cloner/components/CardTitleValue";
import { IExitRemittance, ILadingLicence } from "../core/_models";
import { enqueueSnackbar } from "notistack";
import Backdrop from "../../../../_cloner/components/Backdrop";
import FormikDescription from "../../../../_cloner/components/FormikDescription";
import FileUpload from "../../payment/components/FileUpload";
import { convertFilesToBase64 } from "../../../../_cloner/helpers/ConvertToBase64";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import { useGetVehicleTypes } from "../../generic/_hooks";

interface ILadingList {
    id?: number;
    description?: string;
    orderDetailId?: {
        value: number;
        label: string;
        productId: string;
    };
    orderDetailName?: string;
    ladingAmount?: any;
}

const initialValues: ILadingList = {
    id: 0,
    description: "",
    orderDetailId: {
        value: 0,
        label: "",
        productId: "",
    },
    orderDetailName: "",
    ladingAmount: 0,
};

const EvacuationPermit = () => {
    const { id }: any = useParams();
    const detailTools = useGetTransferRemitanceById(id)
    const postExitRemittance = usePostExitRemiitance();
    const vehicleList = useGetVehicleTypes()

    let formikRef: any = useRef();
    let realAmount = useRef<HTMLInputElement>(null);

    const [evacuationList, setEvacuationList] = useState<any[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }
    }, [files]);


    const orderAndAmountInfo = [
        { id: 1, title: "شماره حواله", icon: <NumbersOutlined color="secondary" />, value: detailTools?.data?.data?.id },
        { id: 2, title: "تاریخ حواله", icon: <DateRangeRounded color="secondary" />, value: detailTools?.data?.data?.registerDate },
        { id: 3, title: "نوع انتقال", icon: <TypeSpecimenTwoTone color="secondary" />, value: detailTools?.data?.data?.transferRemittanceTypeDesc },
        { id: 4, title: "انبار مبدا", icon: <HomeMaxRounded color="secondary" />, value: detailTools?.data?.data?.originWarehouseName },
        { id: 5, title: "انبار مقصد", icon: <HomeMiniOutlined color="secondary" />, value: detailTools?.data?.data?.destinationWarehouseName },
        // { id: 6, title: "نام و نام خانوادگی راننده", icon: <Person color="secondary" />, value: detailTools?.data?.data?.driverName },
        // { id: 7, title: "شماره همراه راننده", icon: <PhoneRounded color="secondary" />, value: detailTools?.data?.data?.driverMobile },
        // { id: 8, title: "شماره پلاک خودرو", icon: <Place color="secondary" />, value: detailTools?.data?.data?.carPlaque },
        // { id: 9, title: "نوع خودرو", icon: <TypeSpecimen color="secondary" />, value: detailTools?.data?.data?.vehicleTypeName },
        // { id: 10, title: "مبلغ کرایه", icon: <PriceChange color="secondary" />, value: detailTools?.data?.data?.fareAmount },
        // { id: 11, title: "تاریخ تحویل", icon: <DateRange color="secondary" />, value: detailTools?.data?.data?.deliverDate },
        // { id: 12, title: "باربری", icon: <CarCrash color="secondary" />, value: detailTools?.data?.data?.shippingName },
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
            { label: "تاریخ تحویل", name: "deliverDate", type: "datepicker" },
            { label: "مبلغ کرایه", name: "fareAmount", type: "amount" },
        ],
        [
            { label: "آدرس محل تخلیه", name: "unloadingPlaceAddress", type: "desc" },
        ]
    ];

    const parseFields = (fields: FieldType, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>, index: number) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "datepicker":
                return <FormikDatepicker key={index} setFieldValue={setFieldValue} boxClassName="w-full" {...rest} />
            case "select":
                return <FormikSelect key={index} options={dropdownVehicleType(vehicleList.data)} {...rest} />
            // case "amount":
            //     return <FormikAmount key={index} {...rest} />;
            case "desc":
                return <FormikInput key={index} multiline minRows={3} {...rest} />;

            default:
                return <FormikInput key={index} {...rest} />;
        }
    };


    const detailTransfer = [
        { id: 2, header: "نام کالا", accessor: "productName" },
        { id: 3, header: "برند", accessor: "brandName" },
        {
            id: 4,
            header: "مقدار واقعی تخلیه شده",
            accessor: "realAmount",
            flex: 1,
            headerClassName: "headerClassName",
            render: (params: any) => {
                return (
                    <OutlinedInput
                        sx={{ minWidth: 140 }}
                        onChange={(e) => {
                            handleRealAmountChange(
                                params,
                                e.target.value
                            );
                        }}
                        inputRef={realAmount}
                        size="small"
                    />
                );
            },
        },
    ]

    const handleRealAmountChange = (params: any, value: string) => {
        const updatedLadingList = evacuationList.map((item) => {
            if (params.id === item.id) {
                return { ...item, realAmount: +value }
            } else {
                return item
            }
        })
        setEvacuationList(updatedLadingList);
    };

    const handleFilter = (values: any) => {

    }

    const onSubmit = async (values: any) => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })
        const formData: IExitRemittance = {
            ladingLicenseId: +id,
            bankAccountNo: values.bankAccountNo,
            bankAccountOwnerName: "",
            creditCardNo: values.creditCardNo,
            fareAmount: values.fareAmount,
            otherAmount: values.otherAmount,
            description: values.description,
            attachments: attachments,
            cargoExitPermitDetails: evacuationList.map((item: any) => ({
                ladingLicenseDetailId: +item?.id,
                realAmount: +item.realAmount,
                productSubUnitId: +item.productSubUnitId,
                productSubUnitAmount: +item.productSubUnitAmount,
            })),
        };

        postExitRemittance.mutate(formData, {
            onSuccess: (res) => {
                if (res.succeeded) {
                    enqueueSnackbar(res.message, {
                        variant: "success",
                        anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                } else {
                    enqueueSnackbar(res.data.Message, {
                        variant: "error",
                        anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                }
            },
        });
    };

    return (
        <>
            {postExitRemittance.isLoading && <Backdrop loading={postExitRemittance.isLoading} />}
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />} 
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 mb-8">
                {orderAndAmountInfo.map((item: {
                    title: string,
                    icon: React.ReactNode,
                    value: any
                }, index) => {
                    return <CardTitleValue key={index} title={item.title} value={item.value} icon={item.icon} />
                })}
                <div className="lg:col-span-3">
                    <CardTitleValue title={"آدرس محل تخلیه"} value={detailTools?.data?.data?.unloadingPlaceAddress} icon={<HomeOutlined color="secondary" />} />
                </div>
                <div className="lg:col-span-4">
                    <CardTitleValue title={"توضیحات"} value={detailTools?.data?.data?.description} icon={<Description color="secondary" />} />
                </div>
            </div>
            <ReusableCard cardClassName="mt-4">
                <Typography variant="h2" color="primary" className="pb-4">
                    اقلام مجوز تخلیه
                </Typography>
                <MuiTable
                    headClassName="bg-[#272862]"
                    headCellTextColor="!text-white"
                    data={detailTools?.data?.data?.details}
                    columns={detailTransfer}
                />
            </ReusableCard>
            <ReusableCard cardClassName="mt-4">
                <Formik
                    innerRef={formikRef}
                    enableReinitialize
                    // initialValues={initialValues}
                    initialValues={
                        {
                            ...initialValues,
                            ...detailTools?.data?.data,
                        }
                    }
                    onSubmit={onSubmit}
                >
                    {({ values, setFieldValue }) => {
                        return (
                            <Form className="mt-8">
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

                                <Box
                                    component="div"
                                    // className="flex items-center justify-center gap-x-4 mb-4"
                                    className="grid grid-cols-1 md:grid-cols-3 gap-x-4 mb-4 md:space-y-0 space-y-4"
                                >
                                    <FormikInput
                                        name="bankAccountNo"
                                        label="شماره حساب راننده"
                                    />
                                    <FormikInput
                                        name="creditCardNo"
                                        label="شماره کارت راننده"
                                    />
                                    <FormikMaskInput
                                        thousandsSeparator=","
                                        mask={Number}
                                        name="otherAmount"
                                        label={"مقدار سایر هزینه ها"}
                                    />
                                    {/* <FormikMaskInput */}
                                </Box>

                                <Box
                                    component="div"
                                    // className="flex flex-row gap-x-4"
                                    className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:space-y-0 space-y-4"
                                >
                                    <FormikDescription
                                        name="description"
                                        label="توضیحات"
                                    />

                                    <Box
                                        component="div"
                                        className="flex flex-col w-full"
                                    >
                                        <Typography
                                            variant="h2"
                                            color="primary"
                                            className="pb-4"
                                        >
                                            افزودن پیوست
                                        </Typography>
                                        <FileUpload
                                            files={files}
                                            setFiles={setFiles}
                                        />
                                    </Box>
                                </Box>
                                <Box component="div" className="mt-8">
                                    <Button
                                        onClick={() => onSubmit(values)}
                                        className="!bg-green-500 !text-white"
                                    >
                                        <Typography className="py-1">
                                            ثبت مجوز
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

export default EvacuationPermit;
