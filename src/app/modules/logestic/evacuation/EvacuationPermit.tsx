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
    usePostEvacuation,
    usePostExitRemiitance,
    usePostLadingLicence,
} from "../core/_hooks";
import FormikMaskInput from "../../../../_cloner/components/FormikMaskInput";
import CardTitleValue from "../../../../_cloner/components/CardTitleValue";
import { IEvacuationPermit, IExitRemittance, ILadingLicence } from "../core/_models";
import { enqueueSnackbar } from "notistack";
import Backdrop from "../../../../_cloner/components/Backdrop";
import FormikDescription from "../../../../_cloner/components/FormikDescription";
import FileUpload from "../../payment/components/FileUpload";
import { convertFilesToBase64 } from "../../../../_cloner/helpers/ConvertToBase64";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import { useGetVehicleTypes } from "../../generic/_hooks";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import MaskInput from "../../../../_cloner/components/MaskInput";
import { evacuationValidation } from "./_validation";

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
    driverCreditCardNo: "",
    otherAmount: "",
};

const EvacuationPermit = () => {
    const { id, entranceId }: any = useParams();
    const detailTools = useGetTransferRemitanceById(id)
    const postEvacuation = usePostEvacuation();
    const vehicleList = useGetVehicleTypes()

    let realAmount = useRef<HTMLInputElement>(null);

    const [evacuationList, setEvacuationList] = useState<any[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }
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
                    };
                }
            );
            if (destructureData) {
                setEvacuationList(destructureData);
            }
        }
    }, [detailTools?.data?.data?.details]);


    const orderAndAmountInfo = [
        { id: 1, title: "شماره حواله", icon: <NumbersOutlined color="secondary" />, value: detailTools?.data?.data?.id },
        { id: 2, title: "تاریخ حواله", icon: <DateRangeRounded color="secondary" />, value: detailTools?.data?.data?.registerDate },
        { id: 3, title: "نوع انتقال", icon: <TypeSpecimenTwoTone color="secondary" />, value: detailTools?.data?.data?.transferRemittanceTypeDesc },
        { id: 4, title: "انبار مبدا", icon: <HomeMaxRounded color="secondary" />, value: detailTools?.data?.data?.originWarehouseName },
        { id: 5, title: "انبار مقصد", icon: <HomeMiniOutlined color="secondary" />, value: detailTools?.data?.data?.destinationWarehouseName },
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


    const detailTransfer = [
        { id: 2, header: "نام کالا", accessor: "productName" },
        { id: 3, header: "برند", accessor: "brandName" },
        { id: 3, header: "مقدار انتقال داده شده", accessor: "transferAmount", render: (params: any) => <Typography variant="h3">{`${separateAmountWithCommas(params.transferAmount)} ${params.product.productMainUnitDesc}`}</Typography> },
        {
            id: 4,
            header: "مقدار واقعی تخلیه شده",
            accessor: "realAmount",
            flex: 1,
            headerClassName: "headerClassName",
            render: (params: any) => {
                return (
                    <MaskInput
                        thousandsSeparator=","
                        mask={Number}
                        label=""
                        key={params.id}
                        sx={{ minWidth: 140 }}
                        onAccept={(value, mask) => handleRealAmountChange(params, mask.unmaskedValue)}

                        // onChange={(e) => {
                        //     handleRealAmountChange(
                        //         params,
                        //         e.target.value
                        //     );
                        // }}
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
        setEvacuationList(updatedLadingList)
    };

    const onSubmit = async (values: any) => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })
        const formData: any = {
            driverAccountNo: values.driverAccountNo.toString(),
            driverCreditCardNo: values.driverCreditCardNo.toString(),
            bankAccountOwnerName: "",
            shippingName: values.shippingName,
            plaque: values.carPlaque,
            vehicleTypeId: values.vehicleTypeId,
            driverMobile: values.driverMobile,
            driverName: values.driverName,
            deliverDate: values.deliverDate,
            unloadingPlaceAddress: values.shippingName,
            purchaseOrderTransferRemittanceEntrancePermitId: entranceId,
            fareAmount: +values.fareAmount,
            otherCosts: +values.otherAmount,
            description: values.description,
            attachments: attachments,
            purchaseOrderTransferRemittanceUnloadingPermitDetails: evacuationList.map((item: any) => ({
                purchaseOrderTransferRemittanceDetailId: item?.id,
                unloadedAmount: +item.realAmount,
            })),
        };

        console.log(formData)

        let requiredRealAmount = evacuationList.some((item) => {
            return !item.realAmount
         })

        //  let isValidRealAmount = evacuationList.some((item) => {
        //     return item.realAmount > item.transferAmount
        //  })
         if(requiredRealAmount) {
             enqueueSnackbar("افزودن مقدار واقعی تمامی اقلام سفارش اجباری می باشد", {
                 variant: "error",
                 anchorOrigin: { vertical: "top", horizontal: "center" },
             });
             return ;
         } 
        //  if(isValidRealAmount) {
        //      enqueueSnackbar("مقدار واقعی بیشتر از مقدار ثبت شده است    ", {
        //          variant: "error",
        //          anchorOrigin: { vertical: "top", horizontal: "center" },
        //      });
        //      return ;
        //  } 

         postEvacuation.mutate(formData, {
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

    if(detailTools.isLoading) {
        return <Backdrop loading={detailTools.isLoading} />
    }

    return (
        <>
            {postEvacuation.isLoading && <Backdrop loading={postEvacuation.isLoading} />}
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
                    enableReinitialize
                    initialValues={
                        {
                            ...initialValues,
                            ...detailTools?.data?.data,
                            fareAmount: detailTools?.data?.data?.fareAmount === 0 ? "" : detailTools?.data?.data?.fareAmount?.toString(),
                            carPlaque: detailTools?.data?.data?.plaque ? detailTools?.data?.data?.plaque : "",
                            vehicleTypeId: detailTools?.data?.data?.vehicleTypeId === 0 ? "" : detailTools?.data?.data?.vehicleTypeId,
                            otherAmount: detailTools?.data?.data?.otherCosts === 0 ? "0" : detailTools?.data?.data?.otherAmount?.toString()
                        
                        }
                    }
                    onSubmit={onSubmit}
                    validationSchema={evacuationValidation}

                >
                    {({ setFieldValue, handleSubmit }) => {
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
                                    className="grid grid-cols-1 md:grid-cols-3 gap-x-4 mb-4 md:space-y-0 space-y-4"
                                >
                                    <FormikInput
                                        name="driverAccountNo"
                                        label="شماره حساب راننده"
                                        type="number"
                                        />
                                    <FormikInput
                                        name="driverCreditCardNo"
                                        label="شماره کارت راننده"
                                        type="number"
                                        />
                                    <FormikMaskInput
                                        thousandsSeparator=","
                                        mask={Number}
                                        name="otherAmount"
                                        label={"مقدار سایر هزینه ها"}
                                    />
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
                                        onClick={() => handleSubmit()}
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
