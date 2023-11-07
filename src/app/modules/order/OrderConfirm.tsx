import { useLocation, useParams } from "react-router-dom";
import { Box, Button, Typography, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import { useConfirmOrder, useRetrieveOrder } from "./core/_hooks";
import { columnsOrderConfirm, columnsOrderDetail } from "./helpers/columns";
import { Add, AttachMoney, CancelPresentation, Edit, LocalShipping, Person, PublishedWithChanges } from "@mui/icons-material";
import CardTitleValue from "../../../_cloner/components/CardTitleValue";
import MuiTable from "../../../_cloner/components/MuiTable";
import { orderFieldsConfirm } from "./helpers/fields";
import FormikPrice from "../product/components/FormikPrice";
import FormikInput from "../../../_cloner/components/FormikInput";
import { IProducts } from "../product/core/_models";
import FormikProximateAmount from "../product/components/FormikProximateAmount";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import { dropdownCustomer, dropdownProductByBrandName, dropdownProductByInventory } from "../generic/_functions";
import { dropdownPurchaseInvoice } from "./helpers/dropdowns";
import FormikComboBox from "../../../_cloner/components/FormikComboBox";
import FormikProductComboSelect from "./components/FormikProductComboSelect";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { useRetrieveProductsByBrand, useRetrieveProductsByWarehouse } from "../product/core/_hooks";
import { Form, Formik } from "formik";

const initialValues = {
    productName: "",
    proximateAmount: "",
    productPrice: "",
    productNameReplace: "",
    proximateAmountReplace: "",
    productPriceReplace: "",
}

type Props = {
    data: any | undefined;
    isConfirm?: boolean;
    isError: boolean;
    isLoading: boolean;
}

const OrderConfirm = (props: Props) => {
    const location = useLocation();
    const { id } = useParams()
    const { isConfirmed }: any = location.state;
    const { data } = useRetrieveOrder(id)
    const { data: productsByBrand, isLoading: productByBrandLoading, isError: productByBrandError, } = useRetrieveProductsByBrand();
    const productsTools = useRetrieveProductsByWarehouse();


    const { mutate, data: confirmOrder, isLoading } = useConfirmOrder()
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);
    const [isReplace, setIsReplace] = useState<boolean>(false); // OK
    const [isUpdate, setIsUpdate] = useState<boolean>(false); // OK

    const [replaceData, setReplaceData] = useState<any[]>([])



    const handleConfirmOrder = () => {
        if (id)
            mutate(id, {
                onSuccess: (message) => {
                    setSnackeOpen(true)
                },

            })
    }

    const orderAndAmountInfo = [
        { id: 1, title: "مشتری", icon: <Person color="secondary" />, value: data?.data?.customerFirstName + " " + data?.data?.customerLastName },
        { id: 2, title: "نوع ارسال", icon: <LocalShipping color="secondary" />, value: data?.data?.orderSendTypeDesc },
        { id: 3, title: "نوع خروج", icon: <CancelPresentation color="secondary" />, value: data?.data?.exitType === 1 ? "عادی" : "بعد از تسویه" },
        { id: 4, title: "نوع کرایه", icon: <AttachMoney color="secondary" />, value: data?.data?.paymentTypeDesc }
    ]


    const orderServiceColumn = [
        { id: 1, header: "بسته خدمت", accessor: "name" },
        { id: 2, header: "هزینه", accessor: "age" }
    ]

    const orderServiceData = [
        { id: 1, name: 'بسته بندی محصول', age: "125,577" },
    ]
    const orderPaymentColumn = [
        { id: 1, header: "مبلغ", accessor: "name" },
        { id: 2, header: "روز", accessor: "age" },
        { id: 3, header: "تاریخ", accessor: "date" }
    ]

    const orderPaymentData = [
        { id: 1, name: '125,844 ریال', age: "0 روز بعد از وزن", date: "1402/12/02" },
    ]

    const orderOrderColumnMain = [
        { id: 1, header: "نام کالا", accessor: "productName" },
        { id: 2, header: "انبار", accessor: "warehouseName" },
        { id: 3, header: "مقدار", accessor: "proximateAmount" },
        { id: 4, header: "قیمت", accessor: "price" },
    ]
    const orderOrderColumnReplace = [
        { id: 5, header: "کالا رسمی", accessor: isReplace ? "productNameReplace" : "productName" },
        { id: 6, header: "مقدار", accessor: isReplace ? "proximateAmountReplace" : "proximateAmount" },
        { id: 7, header: "قیمت", accessor: isReplace ? "productPriceReplace" : "price" }

    ]

    const orderParseFields = (fields: FieldType, values: any, setFieldValue: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "product":
                return (
                    <Box component="div" className="flex gap-x-2 w-full">
                        <FormikProductComboSelect
                            onChange={(value: any) => handleChangeProduct(value, setFieldValue)}
                            options={dropdownProductByInventory(productsByBrand?.data)}
                            {...rest}
                        />
                    </Box>
                );
            case "price":
                return <FormikPrice  {...rest} />;
            case "input":
                return <FormikInput  {...rest} />;
            case "disabled":
                return <FormikInput disabled={true}  {...rest} />;
            case "add":
                return isUpdate ? (
                    <Button className="!bg-yellow-500">
                        <Edit />
                    </Button>
                ) : (
                    <Button onClick={() => handleReplace(values, setFieldValue)} className="!bg-[#fcc615]">
                        <PublishedWithChanges />
                    </Button>
                );
            default:
                return <FormikInput {...rest} />;
        }
    };

    const handleChangeProduct = (value: any, setFieldValue: any) => {
        const fieldValue = [
            { id: 1, title: "productNameReplace", value: value?.productNameReplace },
        ]
        fieldValue.forEach((i: { title: string, value: any }) => setFieldValue(i.title, i.value))
    }


    const handleDoubleClick = (params: any, setFieldValue: any) => {
        setFieldValue("productName", params.productName)
        setFieldValue("proximateAmount", params.proximateAmount)
        setFieldValue("productPrice", params.price)
    }

    const handleReplace = (values: any, setFieldValue: any) => {
        setFieldValue("productNameReplace", values.productNameReplace.label)
        setFieldValue("proximateAmountReplace", values.proximateAmountReplace)
        setFieldValue("productPriceReplace", values.productPriceReplace)
        setReplaceData(
            [
                { id: 1, productNameReplace: values.productNameReplace.label, proximateAmountReplace: values.proximateAmountReplace, productPriceReplace: values.productPriceReplace },
            ]
        )
        setIsReplace(true)
    }

    const fieldsToMap = isReplace ? orderFieldsConfirm : orderFieldsConfirm;


    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        confirmOrder?.data?.Message ||
                        confirmOrder?.message || "تایید سفارش با موفقیت ثبت گردید"
                    }
                />
            )}
            <Formik initialValues={initialValues} onSubmit={() => { }}>
                {({ values, setFieldValue }) => {
                    return <Form>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-4 text-right gap-4">
                            {orderAndAmountInfo.map((item: {
                                title: string,
                                icon: React.ReactNode,
                                value: any
                            }) => {
                                return <CardTitleValue title={item.title} value={item.value} icon={item.icon} />
                            })}
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 text-right gap-4 my-4">
                            <ReusableCard>
                                <Typography variant="h2" color="primary" className="pb-4">بسته های خدمت</Typography>
                                <MuiTable headClassName="bg-[#E2E8F0]" columns={orderServiceColumn} data={orderServiceData} />
                            </ReusableCard>
                            <ReusableCard>
                                <Typography variant="h2" color="primary" className="pb-4">تسویه حساب</Typography>
                                <MuiTable headClassName="bg-[#E2E8F0]" columns={orderPaymentColumn} data={orderPaymentData} />
                            </ReusableCard>
                        </Box>

                        <ReusableCard>
                            {fieldsToMap.map((rowFields) => (
                                <Box
                                    component="div"
                                    className="md:flex md:justify-between flex-warp md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                                >
                                    {rowFields.map((field) =>
                                        orderParseFields(
                                            field,
                                            values,
                                            setFieldValue
                                        )
                                    )}
                                </Box>
                            ))}
                        </ReusableCard>

                        <ReusableCard cardClassName="my-4">
                            <Typography variant="h2" color="primary" className="pb-4">اقلام سفارش</Typography>
                            <Box component="div" className="flex gap-x-4">
                                <MuiTable onDoubleClick={(_: any) => handleDoubleClick(_, setFieldValue)} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={data?.data?.details} columns={orderOrderColumnMain} / >
                                <MuiTable onDoubleClick={(_: any) => handleDoubleClick(_, setFieldValue)} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={replaceData.length > 0 ?replaceData : data?.data?.details} columns={orderOrderColumnReplace} />
                            </Box>
                            {/* <MuiDataGrid columns={columnsOrderConfirm} data={data?.data?.details} rows={data?.data?.details} /> */}
                        </ReusableCard>

                    </Form>
                }}
            </Formik>
        </>
    )
}

export default OrderConfirm