import { useState, useRef, useEffect } from "react";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import FormikInput from "../../../_cloner/components/FormikInput";
import { Button, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import MuiTable from "../../../_cloner/components/MuiTable";
import FormikMaskInput from "../../../_cloner/components/FormikMaskInput";
import CardTitleValue from "../../../_cloner/components/CardTitleValue";
import { enqueueSnackbar } from "notistack";
import Backdrop from "../../../_cloner/components/Backdrop";
import FormikDescription from "../../../_cloner/components/FormikDescription";
import { convertFilesToBase64 } from "../../../_cloner/helpers/convertToBase64";
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount";
import FileUpload from "../../../_cloner/components/FileUpload";
import { useCargoById } from "../cargoAnnouncment/_hooks";
import { useGetLadingLicenceById } from "../ladingLicence/_hooks";
import { usePostExitRemiitance } from "./_hooks";
import { IExitRemittance } from "./_models";
import { OrderDetailForExitRemittanceColumn } from "../../../_cloner/helpers/columns";

interface ILadingList {
    id?: number;
    description?: string;
    fareAmount?: string;
    bankAccountNo?: string;
    bankAccountOwnerName?: string;
    otherAmount?: string;
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
    fareAmount: "",
    bankAccountNo: "",
    bankAccountOwnerName: "",
    otherAmount: "",
    orderDetailId: {
        value: 0,
        label: "",
        productId: "",
    },
    orderDetailName: "",
    ladingAmount: 0,
};

const ExitRemiitanceEdit = () => {
    const { id, ladingCode, ladingDateYear, ladingDateMonth, ladingDateDay }: any = useParams();
    const { data } = useGetLadingLicenceById(ladingCode);
    const cargoDetailTools = useCargoById(id)
    const postExitRemittance = usePostExitRemiitance();


    let formikRef: any = useRef();
    let realAmount = useRef<HTMLInputElement>(null);
    let productSubUnitAmount = useRef<HTMLInputElement>(null);

    const [ladingList, setLadingList] = useState<any[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }
         // eslint-disable-next-line
    }, [files]);


    useEffect(() => {
        if (cargoDetailTools?.data?.data?.cargoAnnounceDetails?.length > 0) {
            const destructureData = cargoDetailTools?.data?.data?.cargoAnnounceDetails?.map(
                (item: any) => {
                    return {
                        id: item.id,
                        productName: item?.orderDetail?.productName,
                        ladingAmount: item?.ladingAmount,
                        exchangeRate: item?.orderDetail?.product?.exchangeRate,
                        proximateAmount: Math.ceil(+item?.ladingAmount / +item.orderDetail?.product?.exchangeRate),
                        productSubUnitDesc:
                            item?.orderDetail?.product?.productSubUnitDesc,
                        productMainUnitDesc:
                            item?.orderDetail?.product.productMainUnitDesc,
                        productSubUnitId:
                            item?.orderDetail?.productSubUnitId,
                        productSubUnitAmount: 0,
                        realAmount: 0,
                    };
                }
            );
            if (destructureData) {
                setLadingList(destructureData);
            }
        }
         // eslint-disable-next-line
    }, [cargoDetailTools?.data?.data?.cargoAnnounceDetails]);

    const handleRealAmountChange = (params: any, value: string) => {
        const updatedLadingList = ladingList.map((item) => {
            if (params.id === item.id) {
                return { ...item, realAmount: +value }
            } else {
                return item
            }
        })
        setLadingList(updatedLadingList);
    };

    const handleProductSubUnitAmountChange = (params: any, value: string) => {
        const updatedLadingList = ladingList.map((item) => {
            if (params.id === item.id) {
                return { ...item, productSubUnitAmount: +value }
            } else {
                return item
            }
        })
        setLadingList(updatedLadingList);
    };

    const onSubmit = async (values: any) => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })
        const formData: IExitRemittance = {
            ladingPermitId: +ladingCode,
            bankAccountNo: values.bankAccountNo,
            bankAccountOwnerName: values.bankAccountOwnerName,
            creditCardNo: values.bankAccountNo ,
            fareAmount: +values.fareAmount,
            otherAmount: +values.otherAmount,
            hasExitPermit: true,
            exitPermitDescription: values.description,
            attachments: attachments,
            ladingExitPermitDetails: ladingList.map((item: any) => ({
                cargoAnnounceDetailId: +item?.id,
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

    if (cargoDetailTools?.isLoading) {
        return <Backdrop loading={cargoDetailTools?.isLoading} />;
    }
    
    return (
        <>
            {postExitRemittance.isLoading && <Backdrop loading={postExitRemittance.isLoading} />}
            <Typography color="primary" variant="h1" className="pb-8">ثبت مجوز خروج</Typography>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4">
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="شماره مجوز بارگیری"
                    // value={data?.data?.id}
                    value={ladingCode}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="تاریخ ثبت مجوز بارگیری"
                    value={`${ladingDateYear}/${ladingDateMonth}/${ladingDateDay}`}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="شماره اعلام بار"
                    value={cargoDetailTools?.data?.data?.cargoAnnounceNo}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="کرایه(ریال)"
                    value={separateAmountWithCommas(cargoDetailTools?.data?.data?.fareAmount)}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="پلاک خودروبر"
                    value={cargoDetailTools?.data?.data?.carPlaque}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="نام راننده"
                    value={cargoDetailTools?.data?.data?.driverName}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="شماره همراه راننده"
                    value={cargoDetailTools?.data?.data?.driverMobile}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="تاریخ تحویل"
                    value={cargoDetailTools?.data?.data?.deliveryDate}
                />
            </div>
            <ReusableCard cardClassName="mt-4">
                <Typography variant="h2" color="primary" className="pb-4">
                    اقلام مجوز بارگیری
                </Typography>
                <MuiTable
                    tooltipTitle={
                        data?.data?.order?.description ? (
                            <Typography>
                                {data?.data?.order?.description}
                            </Typography>
                        ) : (
                            ""
                        )
                    }
                    onDoubleClick={() => { }}
                    headClassName="bg-[#272862]"
                    headCellTextColor="!text-white"
                    data={ladingList}
                    columns={OrderDetailForExitRemittanceColumn(realAmount, productSubUnitAmount, handleRealAmountChange, handleProductSubUnitAmountChange)}
                />
            </ReusableCard>
            <ReusableCard cardClassName="mt-4">
                <Formik
                    enableReinitialize
                    innerRef={formikRef}
                    initialValues={{
                        ...initialValues,
                        ...cargoDetailTools?.data?.data,
                        // fareAmount: cargoDetailTools?.data?.data?.fareAmount
                    }}
                    onSubmit={onSubmit}
                >
                    {({ values }) => {
                        return (
                            <Form className="mt-8">
                                <div
                                    className="grid grid-cols-1 md:grid-cols-5 gap-x-4 mb-4 md:space-y-0 space-y-4"
                                >
                                    <FormikInput
                                        name="bankAccountNo"
                                        label="شماره حساب/کارت راننده"
                                    />
                                    <FormikInput
                                        name="bankAccountOwnerName"
                                        label="صاحب حساب"
                                    />
                                    {/* <FormikInput
                                        name="creditCardNo"
                                        label="شماره کارت راننده"
                                    /> */}
                                    <FormikMaskInput
                                        thousandsSeparator=","
                                        mask={Number}
                                        name="otherAmount"
                                        label={"مقدار سایر هزینه ها"}
                                    />
                                    <FormikMaskInput
                                        thousandsSeparator=","
                                        mask={Number}
                                        name="fareAmount"
                                        label={"مقدار کرایه"}
                                    />
                                </div>

                                <div
                                    // className="flex flex-row gap-x-4"
                                    className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:space-y-0 space-y-4"
                                >
                                    <FormikDescription
                                        name="description"
                                        label="توضیحات"
                                    />

                                    <div
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
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Button
                                        onClick={() => onSubmit(values)}
                                        className="!bg-green-500 !text-white"
                                    >
                                        <Typography className="py-1">
                                            ثبت مجوز
                                        </Typography>
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </ReusableCard>
        </>
    );
};

export default ExitRemiitanceEdit;
