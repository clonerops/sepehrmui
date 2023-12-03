import { useState, useRef, useEffect } from "react";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import FormikInput from "../../../_cloner/components/FormikInput";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import { dropdownCustomer } from "../generic/_functions";
import { useGetCustomers } from "../customer/core/_hooks";
import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { Delete, Person, Search, Add } from "@mui/icons-material";
import OrderDetail from "../order/OrderDetail";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import { useParams } from "react-router-dom";
import { useRetrieveOrder } from "../order/core/_hooks";
import { Formik, Form } from "formik";
import { dropdownProductLading } from "./helpers/dropdowns";
import MuiTable from "../../../_cloner/components/MuiTable";
import {
    useCargoById,
    useGetLadingLicenceById,
    usePostLadingLicence,
} from "./core/_hooks";
import FormikMaskInput from "../../../_cloner/components/FormikMaskInput";
import CardTitleValue from "../../../_cloner/components/CardTitleValue";
import { ILadingLicence } from "./core/_models";
import { enqueueSnackbar } from "notistack";
import FormikComboBox from "../../../_cloner/components/FormikComboBox";
import Backdrop from "../../../_cloner/components/Backdrop";
import FormikDescription from "../../../_cloner/components/FormikDescription";
import FileUpload from "../payment/components/FileUpload";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";

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

const ExitRemiitance = () => {
    const { id }: any = useParams();
    const { data, isLoading } = useGetLadingLicenceById(id);
    const postLadingLicence = usePostLadingLicence();

    let formikRef: any = useRef();
    let realAmount = useRef<HTMLInputElement>(null);
    let productSubUnitAmount = useRef<HTMLInputElement>(null);

    const [ladingList, setLadingList] = useState<any[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const orderOrderColumnMain = (
        realAmount: React.RefObject<HTMLInputElement>,
        productSubUnitAmount: React.RefObject<HTMLInputElement>
    ) => {
        return [
            {
                id: 1,
                headerName: "نام کالا",
                field: "productName",
                flex: 1,
                headerClassName: "headerClassName",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
            },
            {
                id: 2,
                headerName: "مقدار بارگیری",
                field: "ladingAmount",
                headerClassName: "headerClassName",
                flex: 1,
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
            },
            {
                id: 3,
                headerName: "مقدار واحد فرعی",
                field: "proximateAmount",
                headerClassName: "headerClassName",
                flex: 1,
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
            },
            {
                id: 4,
                headerName: "واحد فرعی",
                field: "productSubUnitDesc",
                flex: 1,
                headerClassName: "headerClassName",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
            },
            {
                id: 4,
                headerName: "مقدار واقعی بارگیری شده",
                field: "realAmount",
                flex: 1,
                headerClassName: "headerClassName",
                renderCell: (params: any) => {
                    console.log("params", params)
                    return (
                        <OutlinedInput
                            onChange={(e) => {
                                handleRealAmountChange(
                                    params.api.getRowIndex,
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
                headerName: "مقدار واقعی واحد فرعی",
                field: "productSubUnitAmount",
                flex: 1,
                headerClassName: "headerClassName",
                renderCell: (params: any) => {
                    return (
                        <OutlinedInput
                            inputRef={productSubUnitAmount}
                            onChange={(e) => {
                                handleProductSubUnitAmountChange(
                                    params.rowIndex,
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
                headerName: "واحد فرعی",
                field: "productSubUnitDesc",
                flex: 1,
                headerClassName: "headerClassName",
                renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
            },
        ];
    };

    useEffect(() => {
        if (data?.data?.ladingLicenseDetails.length > 0) {
            const destructureData = data?.data?.ladingLicenseDetails.map(
                (item: any) => {
                    return {
                        
                        productName: item?.orderDetail?.productName,
                        ladingAmount: item?.ladingAmount,
                        exchangeRate: item?.orderDetail?.product?.exchangeRate,
                        proximateAmount:
                            +item?.ladingAmount /
                            +item.orderDetail?.product?.exchangeRate,
                        productSubUnitDesc:
                            item?.orderDetail?.productSubUnitDesc,
                        productSubUnitAmount: 0,
                        realAmount: 0,
                    };
                }
            );
            if (destructureData) {
                setLadingList(destructureData);
            }
        }
    }, [data?.data?.ladingLicenseDetails]);

    const handleRealAmountChange = (index: number, value: string) => {
        const updatedLadingList: any = [...ladingList];
        console.log("index", index)
        // updatedLadingList[index].realAmount = value;
        // setLadingList(updatedLadingList);
    };

    const handleProductSubUnitAmountChange = (index: number, value: string) => {
        const updatedLadingList = [...ladingList];
        updatedLadingList[index].productSubUnitAmount = value;
        setLadingList(updatedLadingList);
    };

    const onSubmit = async (values: any) => {
        console.log("ladingList", ladingList);
        // const formData: any = {
        //     ladingLicenseId: id,
        //     bankAccountNo: values.bankAccountNo,
        //     creditCardNo: values.creditCardNo,
        //     fareAmount: values.fareAmount,
        //     otherAmount: values.otherAmount,
        //     description: values.description,
        //     cargoExitPermitDetails: ladingList.map((item: any) => ({
        //         ladingLicenseDetailId: item?.ladingLicenseDetailId,
        //         realAmount: item.realAmount,
        //         productSubUnitId: item.productSubUnitId,
        //         productSubUnitAmount: item.productSubUnitAmount,
        //     })),
        // };
        // postLadingLicence.mutate(formData, {
        //     onSuccess: (res) => {
        //         if (res.succeeded) {
        //             enqueueSnackbar(res.message, {
        //                 variant: "success",
        //                 anchorOrigin: { vertical: "top", horizontal: "center" },
        //             });
        //         } else {
        //             enqueueSnackbar(res.data.Message, {
        //                 variant: "error",
        //                 anchorOrigin: { vertical: "top", horizontal: "center" },
        //             });
        //         }
        //     },
        // });
    };

    if (isLoading) {
        return <Backdrop loading={isLoading} />;
    }

    return (
        <>
            <Box component="div" className="grid grid-cols-4 gap-x-4 gap-y-4">
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="شماره مجوز"
                    value={data?.data?.id}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="تاریخ ثبت مجوز"
                    value={data?.data?.createDate}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="شماره اعلام بار"
                    value={data?.data?.cargoAnnounce.cargoAnnounceNo}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="نوع خودروبر"
                    value={data?.data?.cargoAnnounce.vehicleTypeName}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="پلاک خودروبر"
                    value={data?.data?.cargoAnnounce.carPlaque}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="نام راننده"
                    value={data?.data?.cargoAnnounce.driverName}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="شماره همراه راننده"
                    value={data?.data?.cargoAnnounce.driverMobile}
                />
            </Box>
            <ReusableCard cardClassName="mt-4">
                <Typography variant="h2" color="primary" className="pb-4">
                    اقلام مجوز بارگیری
                </Typography>
                {/* <MuiTable
                    tooltipTitle={
                        data?.data?.order?.description ? (
                            <Typography>
                                {data?.data?.order?.description}
                            </Typography>
                        ) : (
                            ""
                        )
                    }
                    onDoubleClick={() => {}}
                    headClassName="bg-[#272862]"
                    headCellTextColor="!text-white"
                    data={data?.data?.ladingLicenseDetails}
                    columns={orderOrderColumnMain(realAmount, productSubUnitAmount)}
                /> */}
                <MuiDataGrid
                    rows={ladingList}
                    data={ladingList}
                    columns={orderOrderColumnMain(
                        realAmount,
                        productSubUnitAmount
                    )}
                />
            </ReusableCard>
            <ReusableCard cardClassName="mt-4">
                <Formik
                    innerRef={formikRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    {({ values }) => {
                        return (
                            <Form className="mt-8">
                                <Box
                                    component="div"
                                    className="flex items-center justify-center gap-x-4 mb-4"
                                >
                                    <FormikInput
                                        name="asdha"
                                        label="شماره حساب راننده"
                                    />
                                    <FormikInput
                                        name="asdha"
                                        label="شماره کارت راننده"
                                    />
                                    <FormikMaskInput
                                        thousandsSeparator=","
                                        mask={Number}
                                        name="ladingAmount"
                                        label={"مقدار سایر هزینه ها"}
                                    />
                                    <FormikMaskInput
                                        thousandsSeparator=","
                                        mask={Number}
                                        name="ladingAmount"
                                        label={"مقدار کرایه"}
                                    />
                                </Box>

                                <Box
                                    component="div"
                                    className="flex flex-row gap-x-4"
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

export default ExitRemiitance;
