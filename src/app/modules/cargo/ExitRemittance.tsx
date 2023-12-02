import { useState, useRef } from "react";
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

const orderOrderColumnMain = [
    { id: 1, header: "نام کالا", accessor: "productName" },
    { id: 2, header: "مقدار بارگیری", accessor: "ladingAmount" },
    { id: 3, header: "مقدار واحد فرعی", accessor: "proximateAmount" },
    { id: 4, header: "واحد فرعی", accessor: "price" },
    { id: 4, header: "مقدار واقعی بارگیری شده", accessor: "price", render: (params: any) => {
        return <OutlinedInput size="small" />
    }},
    { id: 4, header: "مقدار واقعی واحد فرعی", accessor: "price", render: (params: any) => {
        return <OutlinedInput size="small" />
    }},
    { id: 4, header: "واحد فرعی", accessor: "price" },
];

const LadingLicence = () => {
    const { id }: any = useParams();
    const { data, isLoading } = useGetLadingLicenceById(id);
    const postLadingLicence = usePostLadingLicence();

    let formikRef: any = useRef();

    const [ladingList, setLadingList] = useState<ILadingList[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const lastCargoList: any = [
        { id: 1, header: "کالا", flex: 1, accessor: "orderDetailName" },
        { id: 2, header: "مقدار خروج", flex: 1, accessor: "ladingAmount" },
        {
            id: 3,
            header: "حذف",
            flex: 1,
            accessor: "",
            render: (params: any) => {
                return (
                    <Button onClick={() => handleDeleteProductInList(params)}>
                        <Delete className="!text-red-500" />
                    </Button>
                );
            },
        },
    ];

    const handleLadingList = (values: ILadingList) => {
        const newList: any = {
            orderDetailName: data?.data?.order?.details.find(
                (i: any) => i.productId === values?.orderDetailId?.productId
            ).productName,
            orderDetailId: values?.orderDetailId?.value,
            ladingAmount: +values.ladingAmount,
        };
        setLadingList((prev) => [...prev, newList]);
    };

    const handleDeleteProductInList = (rowData: any) => {
        const filtered = ladingList.filter(
            (item) => item.orderDetailId !== rowData.orderDetailId.value
        );
        setLadingList(filtered);
    };

    const onSubmit = async (values: any) => {
        const formData: ILadingLicence | any = {
            cargoAnnounceId: id,
            description: values.description,
            ladingLicenseDetails: ladingList.map((item: any) => ({
                orderDetailId: item?.orderDetailId,
                ladingAmount: item.ladingAmount,
            })),
        };
        postLadingLicence.mutate(formData, {
            onSuccess: (res) => {
                if (res.succeeded) {
                    enqueueSnackbar(res.message, {
                        variant: "success",
                        anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                    setOpen(false);
                } else {
                    enqueueSnackbar(res.data.Message, {
                        variant: "error",
                        anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                }
            },
        });
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
                    value={data?.data?.order?.customerName}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="شماره اعلام بار"
                    value={data?.data?.cargoAnnounce.cargoAnnounceNo}
                />
                <CardTitleValue
                    icon={<Person color="secondary" />}
                    title="نوع خودروبر"
                    value={data?.data?.cargoAnnounce.vehicleTypeDesc}
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
                    onDoubleClick={() => {}}
                    headClassName="bg-[#272862]"
                    headCellTextColor="!text-white"
                    data={data?.data?.ladingLicenseDetails}
                    columns={orderOrderColumnMain}
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

export default LadingLicence;
