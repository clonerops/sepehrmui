import { useState, useRef, useEffect } from "react";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import FormikInput from "../../../_cloner/components/FormikInput";
import MuiTable from "../../../_cloner/components/MuiTable";
import FormikMaskInput from "../../../_cloner/components/FormikMaskInput";
import Backdrop from "../../../_cloner/components/Backdrop";
import FileUpload from "../../../_cloner/components/FileUpload";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikDescription from "../../../_cloner/components/FormikDescription";
import CardTitleValue from "../../../_cloner/components/CardTitleValue";

import { Button, Typography } from "@mui/material";
import { DateRangeRounded, Description, HomeMaxRounded, HomeMiniOutlined, HomeOutlined, NumbersOutlined, TypeSpecimenTwoTone } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { Formik, FormikErrors } from "formik";
import { enqueueSnackbar } from "notistack";
import { convertFilesToBase64 } from "../../../_cloner/helpers/convertToBase64";
import { renderAlert } from "../../../_cloner/helpers/sweetAlert";
import { OrderDetailForUnloadingColumn } from "../../../_cloner/helpers/columns";
import { useGetTransferRemitanceById } from "../transferRemittance/_hooks";
import { usePostUnloadingPermit } from "./_hooks";
import { useGetVehicleTypes } from "../generic/_hooks";
import { IUnloadingPermit } from "./_models";
import { dropdownVehicleType } from "../../../_cloner/helpers/dropdowns";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { unloadingValidation } from "./_validation";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";

const initialValues = {
    id: 0,
    description: "",
    unloadedAmount: 0,
    driverName: "",
    shippingName: "",
    carPlaque: "",
    vehicleTypeId: "",
    driverMobile: "",
    deliverDate: "",
    fareAmount: "",
    unloadingPlaceAddress: "",
    driverAccountNo: "",
    otherAmount: "",
};

const UnloadingPermit = () => {
    const { id, entranceId }: any = useParams();
    const detailTools = useGetTransferRemitanceById(id)
    const postUnloading = usePostUnloadingPermit();
    const vehicleList = useGetVehicleTypes()


    let formikRef: any = useRef();
    let realAmount = useRef<HTMLInputElement>(null);
    let productSubUnitAmount = useRef<HTMLInputElement>(null);

    const [UnloadingList, setUnloadingList] = useState<any[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    useEffect(() => {
        if (files.length > 0) convertFilesToBase64(files, setBase64Attachments)
        // eslint-disable-next-line
    }, [files]);

    useEffect(() => {
        if (detailTools?.data?.data?.details.length > 0) {
            const destructureData = detailTools?.data?.data?.details.map(
                (item: any) => {
                    return {
                        id: item.id,
                        productBrandId: item?.productBrandId,
                        transferAmount: item?.transferAmount,
                        productCode: item?.productCode,
                        productName: item?.productName,
                        unloadedAmount: item?.unloadedAmount ? item?.unloadedAmount : "",
                        realAmount: item?.unloadedAmount ? item?.unloadedAmount : ""
                    };
                }
            );
            if (realAmount.current) {
                realAmount.current.value = destructureData[0]?.realAmount || "";
            }
    
            if (destructureData) {
                setUnloadingList(destructureData);
            }
        }
        // eslint-disable-next-line
    }, [detailTools?.data?.data?.details]);

    const orderAndAmountInfo = [
        { id: 1, title: "شماره حواله", icon: <NumbersOutlined color="secondary" />, value: detailTools?.data?.data?.id || "ثبت نشده" },
        { id: 2, title: "تاریخ حواله", icon: <DateRangeRounded color="secondary" />, value: detailTools?.data?.data?.registerDate || "ثبت نشده" },
        { id: 3, title: "نوع انتقال", icon: <TypeSpecimenTwoTone color="secondary" />, value: detailTools?.data?.data?.transferRemittanceTypeDesc || "ثبت نشده" },
        { id: 4, title: "انبار مبدا", icon: <HomeMaxRounded color="secondary" />, value: detailTools?.data?.data?.originWarehouseName || "ثبت نشده" },
        { id: 5, title: "انبار مقصد", icon: <HomeMiniOutlined color="secondary" />, value: detailTools?.data?.data?.destinationWarehouseName || "ثبت نشده" },
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
            { label: "شماره حساب راننده", name: "driverAccountNo", type: "input" },
            { label: "سایر هزینه ها", name: "otherAmount", type: "amount" },
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
            case "amount":
                return <FormikMaskInput
                    thousandsSeparator=","
                    mask={Number}
                    autoComplete="off"
                    {...rest}
                />

            case "desc":
                return <FormikInput key={index} multiline minRows={3} {...rest} />;

            default:
                return <FormikInput key={index} {...rest} />;
        }
    };


    const handleRealAmountChange = (params: any, value: string) => {
        // const updatedLadingList = detailTools?.data?.data?.details.map((item: { id: any; }) => {
        const updatedLadingList = UnloadingList.map((item: { id: any; }) => {
            if (params.id === item.id) {
                return { ...item, realAmount: +value }
            } else {
                return item
            }
        })
        setUnloadingList(updatedLadingList);
    };

    const handleProductSubUnitAmountChange = (params: any, value: string) => {
        const updatedLadingList = detailTools?.data?.data?.details.map((item: { id: any; }) => {
            if (params.id === item.id) {
                return { ...item, productSubUnitAmount: +value }
            } else {
                return item
            }
        })
        setUnloadingList(updatedLadingList);
    };

    const onSubmit = async (values: any) => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })
        const formData: IUnloadingPermit = {
            transferRemittanceEntrancePermitId: entranceId,
            driverAccountNo: values.driverAccountNo.toString(),
            shippingName: values.shippingName,
            plaque: values.carPlaque,
            vehicleTypeId: values.vehicleTypeId,
            driverMobile: values.driverMobile,
            driverName: values.driverName,
            deliverDate: values.deliverDate,
            unloadingPlaceAddress: values.unloadingPlaceAddress,
            fareAmount: +values.fareAmount,
            otherCosts: +values.otherAmount,
            description: values.description,
            attachments: attachments,
            unloadingPermitDetails: UnloadingList.map((item: any) => ({
                transferRemittanceDetailId: item.id,
                unloadedAmount: +item.realAmount,
            })),
        };

        if(UnloadingList.every((item: {realAmount: ""}) => item.realAmount === "" || item.realAmount === null || item.realAmount === undefined)) {
            EnqueueSnackbar("وزن واقعی باسکول  مشخص نگردیده است", "warning")
        } else {
            postUnloading.mutate(formData, {
                onSuccess: (res) => {
                    if (res.succeeded) {
                        renderAlert(`مجوز تخلیه بارنامه با شماره ${res.data.unloadingPermitCode} با موفقیت ثبت شد`)
                    } else {
                        enqueueSnackbar(res.data.Message, {
                            variant: "error",
                            anchorOrigin: { vertical: "top", horizontal: "center" },
                        });
                    }
                },
            });
        }
    };


    if (detailTools.isLoading) {
        return <Backdrop loading={detailTools.isLoading} />
    }

    return (
        <>
            {postUnloading.isLoading && <Backdrop loading={postUnloading.isLoading} />}
            {/* <Typography color="primary" variant="h1" className="pb-8">ثبت مجوز تخلیه</Typography> */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 mb-8">
                {orderAndAmountInfo.map((item: {
                    title: string,
                    icon: React.ReactNode,
                    value: any
                }, index) => {
                    return <CardTitleValue key={index} title={item.title} value={item.value} icon={item.icon} />
                })}
                <div className="lg:col-span-3">
                    <CardTitleValue title={"آدرس محل تخلیه"} value={detailTools?.data?.data?.unloadingPlaceAddress || "ثبت نشده"} icon={<HomeOutlined color="secondary" />} />
                </div>
                <div className="lg:col-span-4">
                    <CardTitleValue title={"توضیحات"} value={detailTools?.data?.data?.description || "ثبت نشده"} icon={<Description color="secondary" />} />
                </div>
            </div>
            <ReusableCard cardClassName="mt-4">
                {/* <Typography variant="h2" color="primary" className="pb-4">
                    اقلام مجوز ورود
                </Typography> */}
                <MuiTable
                    onDoubleClick={() => { }}
                    headClassName="bg-[#272862]"
                    headCellTextColor="!text-white"
                    data={detailTools?.data?.data?.details}
                    columns={OrderDetailForUnloadingColumn(realAmount, productSubUnitAmount, handleRealAmountChange, handleProductSubUnitAmountChange)}
                />
            </ReusableCard>
            <ReusableCard cardClassName="mt-4">
                <Formik
                    enableReinitialize
                    innerRef={formikRef}
                    validationSchema={unloadingValidation}
                    initialValues={{
                        ...initialValues,
                        ...detailTools?.data?.data,
                        fareAmount: detailTools?.data?.data?.fareAmount === 0 ? "" : detailTools?.data?.data?.fareAmount?.toString(),
                        carPlaque: detailTools?.data?.data?.plaque ? detailTools?.data?.data?.plaque : "",
                        vehicleTypeId: detailTools?.data?.data?.vehicleTypeId === 0 ? "" : detailTools?.data?.data?.vehicleTypeId,
                        otherAmount: detailTools?.data?.data?.otherCosts === 0 ? "0" : detailTools?.data?.data?.otherCosts?.toString()
                    }}
                    onSubmit={onSubmit}
                >
                    {({ setFieldValue, handleSubmit }) => {
                        return (
                            <form className="mt-8">
                                {fields.map((rowFields, index) => (
                                    <div key={index} className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4">
                                        {rowFields.map((field, index) => parseFields(field, setFieldValue, index))}
                                    </div>
                                ))}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:space-y-0 space-y-4" >
                                    <FormikDescription name="description" label="توضیحات" />

                                    <div className="flex flex-col w-full">
                                        <Typography variant="h2" color="primary" className="pb-4">
                                            افزودن پیوست
                                        </Typography>
                                        <FileUpload files={files} setFiles={setFiles} />
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Button onClick={() => handleSubmit()} className="!bg-green-500 !text-white">
                                        <Typography className="py-1">
                                            ثبت مجوز
                                        </Typography>
                                    </Button>
                                </div>
                            </form>

                        );
                    }}
                </Formik>
            </ReusableCard>
        </>
    );
};

export default UnloadingPermit;
