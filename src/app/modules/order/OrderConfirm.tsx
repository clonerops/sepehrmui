import { useLocation, useParams } from "react-router-dom";
import { Box, Button, Typography, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import { useConfirmOrder, useRetrieveOrder } from "./core/_hooks";
import { columnsOrderConfirm, columnsOrderDetail } from "./helpers/columns";
import { Add, AttachMoney, CancelPresentation, Description, Edit, LocalShipping, Newspaper, Person, PublishedWithChanges } from "@mui/icons-material";
import CardTitleValue from "../../../_cloner/components/CardTitleValue";
import MuiTable from "../../../_cloner/components/MuiTable";
import { orderFieldsConfirm } from "./helpers/fields";
import FormikPrice from "../product/components/FormikPrice";
import FormikInput from "../../../_cloner/components/FormikInput";
import { IProducts } from "../product/core/_models";
import FormikProximateAmount from "../product/components/FormikProximateAmount";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import { dropdownCustomer, dropdownProductByBrandName, dropdownProductByInventory } from "../generic/_functions";
import { dropdownInvoiceType, dropdownPurchaseInvoice } from "./helpers/dropdowns";
import FormikComboBox from "../../../_cloner/components/FormikComboBox";
import FormikProductComboSelect from "./components/FormikProductComboSelect";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { useRetrieveProductsByBrand, useRetrieveProductsByWarehouse } from "../product/core/_hooks";
import { Form, Formik } from "formik";
import FileUpload from "../payment/components/FileUpload";
import FormikCheckbox from "../../../_cloner/components/FormikCheckbox";
import { useGetInvoiceType } from "../generic/_hooks";

const initialValues = {
    productName: "",
    proximateAmount: "",
    productPrice: "",

    invoiceTypeDesc: "",
    description: "",
    invoiceTypeCheck: false
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
    const { data: factor } = useGetInvoiceType();


    const { mutate, data: confirmOrder } = useConfirmOrder()
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);
    const [cpData, setCpData] = useState(data?.data?.details)
    const [selectedRow, setSelectedRow] = useState<any>([])
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        setCpData(data?.data?.details)
    }, [data])


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
    ]
    const orderOrderColumnMain = [
        { id: 1, header: "نام کالا", accessor: "productName" },
        { id: 2, header: "انبار", accessor: "warehouseName" },
        { id: 3, header: "مقدار", accessor: "proximateAmount" },
        { id: 4, header: "قیمت", accessor: "price" },
    ]
    const orderOrderColumnReplace = [
        { id: 5, header: "کالا رسمی", accessor: "productName" },
        { id: 6, header: "مقدار", accessor: "proximateAmount" },
        { id: 7, header: "قیمت", accessor: "price" }

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
                return <Button onClick={() => handleReplace(values, setFieldValue)} className="!bg-[#fcc615]">
                    <PublishedWithChanges />
                </Button>
            // return isUpdate ? (
            //     <Button className="!bg-yellow-500">
            //         <Edit />
            //     </Button>
            // ) : (
            //     <Button onClick={() => handleReplace(values, setFieldValue)} className="!bg-[#fcc615]">
            //         <PublishedWithChanges />
            //     </Button>
            // );
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

    const handleDoubleClick = (params: any, setFieldValue: any, rowIndex: number) => {
        setFieldValue("productName", params.productName)
        setFieldValue("proximateAmount", params.proximateAmount)
        setFieldValue("productPrice", params.price)

        setSelectedRow(rowIndex)

    }

    const handleReplace = (values: any, setFieldValue: any) => {
        if (selectedRow !== null) {
            const updatedData = [...cpData];
            updatedData[selectedRow] = {
                ...updatedData[selectedRow],
                productName: values.productNameReplace.label,
                proximateAmount: values.proximateAmountReplace,
                productPrice: values.productPriceReplace,
            };

            setCpData(updatedData);
            console.log("updatedData", updatedData)
        }
    }


    // const fieldsToMap = isReplace ? orderFieldsConfirm : orderFieldsConfirm;


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
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-4 text-right gap-4 my-4">
                            {orderAndAmountInfo.map((item: {
                                title: string,
                                icon: React.ReactNode,
                                value: any
                            }) => {
                                return <CardTitleValue title={item.title} value={item.value} icon={item.icon} />
                            })}
                            <Box component="div" className="col-span-2">
                                <CardTitleValue title={"توضیحات"} value={data?.data?.description ? data?.data?.description : "ندارد"} icon={<Description color="secondary" />} />
                            </Box>
                        </Box>
                        <ReusableCard cardClassName="my-4">
                            {orderFieldsConfirm.map((rowFields) => (
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
                                <MuiTable tooltipTitle={data?.data?.description ? <Typography>{data?.data?.description}</Typography> : ""} onDoubleClick={(_: any, rowIndex: number) => handleDoubleClick(_, setFieldValue, rowIndex)} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={data?.data?.details} columns={orderOrderColumnMain} />
                                <MuiTable headClassName="bg-[#272862]" headCellTextColor="!text-white" data={cpData} columns={orderOrderColumnReplace} />
                            </Box>
                        </ReusableCard>

                        <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Box component="div" className="flex flex-col">
                                <ReusableCard >
                                    <Typography variant="h2" color="primary" className="pb-4">افزودن پیوست</Typography>
                                    <FileUpload files={files} setFiles={setFiles} />
                                </ReusableCard>
                            </Box>
                            <Box component="div" className="flex flex-col">
                                <ReusableCard>
                                    <Box component="div" className="flex justify-between items-center">
                                        <Typography variant="h2" color="primary" className="pb-4">فاکتور</Typography>
                                        <Newspaper color="secondary" />
                                    </Box>
                                    <Box component="div" className="flex items-center">
                                        <FormikCheckbox label="" name="invoiceTypeCheck" />
                                        <Typography>آیا مایل به تغییر نوع فاکتور می باشید؟</Typography>
                                    </Box>
                                    <FormikSelect
                                        disabeld={!values.invoiceTypeCheck}
                                        options={dropdownInvoiceType(factor)}
                                        label="" name="invoiceTypeDesc"
                                    />
                                </ReusableCard>
                            </Box>
                            <Box component="div" className="flex flex-col">
                                <ReusableCard>
                                    <Box component="div" className="flex justify-between items-center">
                                        <Typography variant="h2" color="primary" className="pb-4">توضیحات</Typography>
                                        <Description color="secondary" />
                                    </Box>
                                    <FormikInput
                                        multiline
                                        minRows={3}
                                        label="" name="description"
                                    />
                                </ReusableCard>
                            </Box>
                        </Box>
                        <Box component="div" className="flex justify-end items-end my-4">
                            <Button className="!bg-[#fcc615] !text-black">
                                <Typography className="py-2 px-4">ثبت تایید سفارش</Typography>
                            </Button>
                        </Box>
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default OrderConfirm