import React, { FC } from "react";
import CardTitleValue from "../../../../_cloner/components/CardTitleValue";
import { useRetrievePurchaserOrder } from "../../managment-order/core/_hooks";
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
import FormikProduct from "../../../../_cloner/components/FormikProductComboSelect";
import { dropdownProduct } from "../_functions";
interface IProps {
    rowSelected: any;
}

const TransferBetweenWarehouseAction: FC<IProps> = ({ rowSelected }) => {
    const { data, isLoading } = useRetrievePurchaserOrder(rowSelected.id);
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

    if (isLoading) {
        return <Typography>در حال بارگزاری</Typography>;
    }

    console.log(data)

    return (
        <>
            <Box
                component="div"
                className={`grid grid-cols-1 md:grid-cols-4 gap-4 my-4`}
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
                <Formik initialValues={{}} onSubmit={() => {}}>
                    {({}) => (
                        <></>
                    )}
                </Formik>
            </Box>
        </>
    );
};

export default TransferBetweenWarehouseAction;
