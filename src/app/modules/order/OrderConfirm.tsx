import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import { useApproveInvoiceType, useConfirmOrder, useRetrieveOrder } from "./core/_hooks";
import { Description, LocalShipping, Newspaper, Person, PublishedWithChanges } from "@mui/icons-material";
import CardTitleValue from "../../../_cloner/components/CardTitleValue";
import MuiTable from "../../../_cloner/components/MuiTable";
import { orderFieldsConfirm } from "./helpers/fields";
import FormikPrice from "../product/components/FormikPrice";
import FormikInput from "../../../_cloner/components/FormikInput";
import { dropdownProductByInventory } from "../generic/_functions";
import { dropdownInvoiceType } from "./helpers/dropdowns";
import FormikProductComboSelect from "./components/FormikProductComboSelect";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { useRetrieveProductsByBrand, useRetrieveProductsByWarehouse } from "../product/core/_hooks";
import { Form, Formik } from "formik";
import FileUpload from "../payment/components/FileUpload";
import FormikCheckbox from "../../../_cloner/components/FormikCheckbox";
import { useGetInvoiceType } from "../generic/_hooks";
import Backdrop from "../../../_cloner/components/Backdrop";
import { convertFilesToBase64 } from "../../../_cloner/helpers/ConvertToBase64";
import { enqueueSnackbar } from "notistack";
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog";

const initialValues = {
    productName: "",
    proximateAmount: "",
    productPrice: "",

    invoiceTypeDesc: "",
    invoiceTypeId: "",
    description: "",
    invoiceTypeCheck: false
}

const OrderConfirm = () => {
    const { id } = useParams()
    const { data, isLoading } = useRetrieveOrder(id)
    const { data: productsByBrand, } = useRetrieveProductsByBrand();
    const { data: factor } = useGetInvoiceType();

    const approveTools = useApproveInvoiceType()
    const [cpData, setCpData] = useState(data?.data?.details)
    const [selectedRow, setSelectedRow] = useState<any>([])
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])
    const [approve, setApprove] = useState<boolean>(false);

    useEffect(() => {
        setCpData(data?.data?.details)
    }, [data])

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }
    }, [files]);

    const orderAndAmountInfo = [
        { id: 1, title: "شماره سفارش", icon: <Description color="secondary" />, value: data?.data?.orderCode },
        { id: 1, title: "مشتری", icon: <Person color="secondary" />, value: data?.data?.customerFirstName + " " + data?.data?.customerLastName },
        { id: 1, title: "اسم رسمی مشتری", icon: <Person color="secondary" />, value: data?.data?.officialName },
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
            case "hidden":
                return <Button className="!invisible">
                    <PublishedWithChanges />
                </Button>
            case "add":
                return <Button onClick={() => handleReplace(values)} className="!bg-[#fcc615]">
                    <PublishedWithChanges />
                </Button>
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

    const handleReplace = (values: any) => {
        if (selectedRow !== null) {
            const updatedData = [...cpData];
            updatedData[selectedRow] = {
                ...updatedData[selectedRow],
                productName: values.productNameReplace.label,
                alternativeProductId: values.productNameReplace.value,
                alternativeProductAmount: +values.proximateAmountReplace,
                alternativeProductPrice: +values.productPriceReplace.replace(/,/g, ""),
            };
            setCpData(updatedData);
        }
    }

    const handleConfirmOrder = (values: any, statusId: number) => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })

        console.log("attachments", attachments)
        const formData = {
            orderId: id,
            invoiceTypeId: values.invoiceTypeId ? values?.invoiceTypeId : approveTools?.data?.data?.invoiceTypeId,
            invoiceApproveDescription: values.description,
            attachments: attachments,
            orderStatusId: statusId,
            details: cpData.map((element: any) => ({
                id: element.id,
                alternativeProductId: element.alternativeProductId,
                alternativeProductAmount: element.alternativeProductAmount,
                alternativeProductPrice: element.alternativeProductPrice
            }))
        }
        approveTools.mutate(formData, {
            onSuccess: (message) => {
                console.log(message)
                if(message.succeeded) {
                    setApprove(false) 
                    enqueueSnackbar(statusId === 2 ? "تایید سفارش با موفقیت انجام گردید" : "عدم تایید سفارش با موفقیت انجام شد", {
                        variant: `${statusId === 2 ? "success" : "warning" }`,
                        anchorOrigin: { vertical: "top", horizontal: "center" }
                    })
                } 
                if(!message?.data?.Succeeded) {
                    enqueueSnackbar(message.data.Message, {
                        variant: `error`,
                        anchorOrigin: { vertical: "top", horizontal: "center" }
                    })

                }
            },

        })
    }

    if (isLoading) {
        return <Backdrop loading={isLoading} />
    }

    return (
        <>
            <Formik initialValues={{
                ...initialValues,
                invoiceTypeId: data?.data?.invoiceTypeId
            }
            } onSubmit={(_) => handleConfirmOrder(_, 0)}>
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
                                <CardTitleValue className="col-span-4" title={"توضیحات"} value={data?.data?.description ? data?.data?.description : "ندارد"} icon={<Description color="secondary" />} />
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
                                <MuiTable onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={data?.data?.details} columns={orderOrderColumnMain} />
                                <MuiTable onDoubleClick={(_: any, rowIndex: number) => handleDoubleClick(_, setFieldValue, rowIndex)} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={cpData} columns={orderOrderColumnReplace} />
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
                                        label="" name="invoiceTypeId"
                                        defaultValue={values.invoiceTypeId}
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
                        <Box component="div" className="flex justify-end items-end gap-x-4 my-4 ">
                            <Button onClick={() => setApprove(true)} className="!bg-[#fcc615] !text-black">
                                <Typography className="py-2 px-4">ثبت تایید سفارش</Typography>
                            </Button>
                        </Box>
                        <ConfirmDialog
                            open={approve}
                            hintTitle="آیا از تایید سفارش مطمئن هستید؟"
                            notConfirmText="لغو"
                            confirmText="تایید"
                            onCancel={() => setApprove(false)}
                            onConfirm={() => handleConfirmOrder(values, 2)}
                        />
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default OrderConfirm