import React, { FC, useState } from "react";
import CardTitleValue from "../../../../_cloner/components/CardTitleValue";
import { usePurchaseOrderTransfer, useRetrievePurchaserOrder } from "../../managment-order/core/_hooks";
import {
    AttachMoney,
    CheckBox,
    ExitToApp,
    LocalShipping,
    Newspaper,
    Person,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import MuiTable from "../../../../_cloner/components/MuiTable";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import MaskInput from "../../../../_cloner/components/MaskInput";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FormikWarehouse from "../../../../_cloner/components/FormikWarehouse";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import { renderAlertGoBack } from "../../../../_cloner/helpers/SweetAlertNavigateGoBack";
import FormikWarehouseBasedOfCustomer from "../../../../_cloner/components/FormikWarehouseBasedOfCustomer";
import Backdrop from "../../../../_cloner/components/Backdrop";
interface IProps {
}

const initialValues = {
    warehouseId: 0,
}

const TransferBetweenWarehouseAction: FC<IProps> = () => {
    const { id } = useParams()

    const postTools = usePurchaseOrderTransfer()

    const [valueInput, setValueInput] = useState<{ [key: number]: string }>({})
    const { data, isLoading } = useRetrievePurchaserOrder(id);
    const orderAndAmountInfo = [
        {
            id: 1,
            title: "شماره سفارش",
            icon: <Person color="secondary" />,
            value: data?.data?.orderCode,
        },
        {
            id: 2,
            title: "فروشنده",
            icon: <Person color="secondary" />,
            value:
                data?.data?.customerFirstName +
                " " +
                data?.data?.customerLastName,
        },
        {
            id: 3,
            title: "نوع خروج",
            icon: <ExitToApp color="secondary" />,
            value: data?.data?.exitType === 1 ? "عادی" : "بعد از تسویه",
        },
        {
            id: 4,
            title: "نوع ارسال",
            icon: <LocalShipping color="secondary" />,
            value: data?.data?.orderSendTypeDesc,
        },
        {
            id: 5,
            title: "وضعیت",
            icon: <CheckBox color="secondary" />,
            value: data?.data?.purchaseOrderStatusDesc,
        },
        {
            id: 6,
            title: "نوع فاکتور",
            icon: <Newspaper color="secondary" />,
            value: data?.data?.invoiceTypeDesc,
        },
        {
            id: 7,
            title: "نوع کرایه",
            icon: <AttachMoney color="secondary" />,
            value: data?.data?.paymentTypeDesc,
        },
        {
            id: 8,
            title: "وضعیت تایید حسابداری",
            icon: <CheckBox color="secondary" />,
            value:
                data?.data?.confirmedStatus === false
                    ? "تایید نشده"
                    : "تایید شده",
        },
    ];

    const orderOrderColumnMain = [
        { id: 1, header: "کالا", accessor: "productName", render: (params: any) => { return params.productBrand.productName } },
        { id: 2, header: "برند", accessor: "brandName", render: (params: any) => { return params.productBrand.brandName } },
        { id: 3, header: "مقدار سفارش خرید", accessor: "proximateAmount", render: (params: any) => { return params.proximateAmount } },
        { id: 4, header: "تعداد در بسته", accessor: "numberInPackage", render: (params: any) => { return params.numberInPackage } },
        {
            id: 5, header: "مقدار انتقال به انبار", accessor: "transferedAmount",
            render: (params: any) =>
                <>
                    <Box component={"div"} className={"w-full"}>
                        <MaskInput
                            key={params.id}
                            mask={Number}
                            thousandsSeparator=","
                            label=""
                            color={+params.proximateAmount < +valueInput[params.id] ? "error" : "primary"}
                            error={+params.proximateAmount < +valueInput[params.id]}
                            value={valueInput[params.id]}
                            onAccept={(value, mask) => setValueInput({ ...valueInput, [params.id]: mask.unmaskedValue })}
                        />
                    </Box>
                </>
        },
    ]

    const onSubmit = (values: any) => {
        const formData = {
            orderId: id,
            warehouseId: +values.warehouseId,
            transferDetails: data?.data?.details.map((item: any) => {
                return {
                    purchaseOrderDetailId: item.id,
                    productBrandName: item.productBrand.brandName,
                    transferedAmount: +valueInput[item.id]
                }
            })
        }
        postTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    renderAlertGoBack(response.message)
                    
                } else {
                    EnqueueSnackbar(response.data.Message, "error")
                }
            }
        })
    }

    if (isLoading) {
        return <Typography>در حال بارگزاری</Typography>;
    }
    return (
        <>
            {postTools.isLoading && <Backdrop loading={postTools.isLoading} />}
            <Box
                component="div"
                className={`grid grid-cols-1 lg:grid-cols-4 gap-4 my-4`}
            >
                {orderAndAmountInfo.map(
                    (
                        item: {
                            title: string;
                            icon: React.ReactNode;
                            value: any;
                        },
                        index
                    ) => {
                        return (
                            <CardTitleValue
                                key={index}
                                title={item.title}
                                value={item.value}
                                icon={item.icon}
                            />
                        );
                    }
                )}
            </Box>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <>
                        <Box className="flex flex-col lg:flex-row gap-4 mb-4">
                            <ReusableCard cardClassName="flex flex-col gap-y-2">
                                <Typography variant="h3" className="text-yellow-500">از طریق لیست زیر می توانید انبار موردنظر خود را انتخاب کنید</Typography>
                                <Typography variant="h3" className="text-red-500">نکته:</Typography>
                                <Typography variant="h4" >کالا های سفارش در انباری که انتخاب می کنید قرار می گیرند</Typography>
                                <Box className="mt-4">
                                    <FormikWarehouseBasedOfCustomer name="warehouseId" label="انبار" customerId={data?.data?.customer?.id} />
                                </Box>
                            </ReusableCard>
                            <ReusableCard cardClassName="flex justify-center items-center">
                                <img src={toAbsoulteUrl('/media/logos/fo.png')} width={340} />
                            </ReusableCard>
                        </Box>
                        <MuiTable
                            onDoubleClick={() => { }}
                            headClassName="bg-[#272862]"
                            headCellTextColor="!text-white"
                            data={data?.data?.details}
                            columns={orderOrderColumnMain}
                        />
                        <Box className="mt-4">
                            <ButtonComponent onClick={() => handleSubmit()}>
                                <Typography className="text-white">ثبت انتقال</Typography>
                            </ButtonComponent>
                        </Box>
                    </>
                )}
            </Formik>
        </>
    );
};

export default TransferBetweenWarehouseAction;
