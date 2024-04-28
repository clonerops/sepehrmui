import { useState, useRef, useEffect } from "react";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FormikInput from "../../../../_cloner/components/FormikInput";
import { Button, OutlinedInput, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import MuiTable from "../../../../_cloner/components/MuiTable";
import {
    useCargoById,
    useGetLadingPermitById,
    usePostExitRemiitance,
} from "../core/_hooks";
import FormikMaskInput from "../../../../_cloner/components/FormikMaskInput";
import CardTitleValue from "../../../../_cloner/components/CardTitleValue";
import { IExitRemittance } from "../core/_models";
import { enqueueSnackbar } from "notistack";
import Backdrop from "../../../../_cloner/components/Backdrop";
import FormikDescription from "../../../../_cloner/components/FormikDescription";
import FileUpload from "../../payment/components/FileUpload";
import { convertFilesToBase64 } from "../../../../_cloner/helpers/ConvertToBase64";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import { renderAlert } from "../../../../_cloner/helpers/SweetAlert";

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

const ExitRemiitance = () => {
    const { id, ladingCode, ladingDateYear, ladingDateMonth, ladingDateDay }: any = useParams();
    const { data, isLoading } = useGetLadingPermitById("13");
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


    const orderOrderColumnMain = (
        realAmount: React.RefObject<HTMLInputElement>,
        productSubUnitAmount: React.RefObject<HTMLInputElement>
    ) => {
        return [
            {
                id: 1,
                header: "نام کالا",
                accessor: "productName",
                flex: 1,
                headerClassName: "headerClassName",
                render: (params: any) => {
                    return <Typography sx={{ minWidth: 140 }}>{params.productName}</Typography>;
                },
            },
            {
                id: 2,
                header: "مقدار بارگیری",
                accessor: "ladingAmount",
                headerClassName: "headerClassName",
                flex: 1,
                render: (params: any) => {
                    return <Typography>{params.ladingAmount}</Typography>;
                },
            },
            {
                id: 3,
                header: "مقدار واحد فرعی",
                accessor: "proximateAmount",
                headerClassName: "headerClassName",
                flex: 1,
                render: (params: any) => {
                    return <Typography>{params.proximateAmount}</Typography>;
                },
            },
            
            {
                id: 4,
                header: "مقدار واقعی بارگیری شده",
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
            {
                id: 4,
                header: "واحد اصلی",
                accessor: "productMainUnitDesc",
                flex: 1,
                headerClassName: "headerClassName",
                render: (params: any) => {
                    return <Typography>{params.productMainUnitDesc}</Typography>;
                },
            },
            {
                id: 4,
                header: "مقدار واقعی واحد فرعی",
                accessor: "productSubUnitAmount",
                flex: 1,
                headerClassName: "headerClassName",
                render: (params: any) => {
                    return (
                        <OutlinedInput
                            inputRef={productSubUnitAmount}
                            sx={{ minWidth: 140 }}
                            onChange={(e) => {
                                handleProductSubUnitAmountChange(
                                    params,
                                    e.target.value
                                );
                            }}
                            size="small"
                        />
                    );
                },
            },
            {
                id: 4,
                header: "واحد فرعی",
                accessor: "productSubUnitDesc",
                flex: 1,
                headerClassName: "headerClassName",
                render: (params: any) => {
                    return <Typography>{params.productSubUnitDesc}</Typography>;
                },
            },
        ];
    };

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
                    renderAlert(`مجوز خروج بارنامه با شماره ${res.data.ladingExitPermitCode} با موفقیت ثبت شد`)
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
                    columns={orderOrderColumnMain(realAmount, productSubUnitAmount)}
                />
            </ReusableCard>
            <ReusableCard cardClassName="mt-4">
                <Formik
                    enableReinitialize
                    innerRef={formikRef}
                    initialValues={{
                        ...initialValues,
                        fareAmount: cargoDetailTools?.data?.data?.fareAmount.toString()
                    }}
                    onSubmit={onSubmit}
                >
                    {({ values }) => {
                        return (
                            <Form className="mt-8">
                                <div
                                    // className="flex items-center justify-center gap-x-4 mb-4"
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

export default ExitRemiitance;
