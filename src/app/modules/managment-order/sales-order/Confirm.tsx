import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import FormikInput from "../../../../_cloner/components/FormikInput";
import { dropdownCustomerCompanies, dropdownInvoiceType } from "../helpers/dropdowns";
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox";
import { Description, LocalShipping, Newspaper, Person, PublishedWithChanges } from "@mui/icons-material";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FileUpload from "../../payment/components/FileUpload";
import MuiTable from "../../../../_cloner/components/MuiTable";
import { Formik } from "formik";
import CardTitleValue from "../../../../_cloner/components/CardTitleValue";
import Backdrop from "../../../../_cloner/components/Backdrop";
import FormikPrice from "../../../../_cloner/components/FormikPrice";
import { dropdownProductByInventory } from "../../generic/_functions";
import { convertFilesToBase64 } from "../../../../_cloner/helpers/ConvertToBase64";
import { useApproveInvoiceType, useRetrieveOrder } from "../core/_hooks";
import { useGetInvoiceType } from "../../generic/_hooks";
import { useGetCustomerCompaniesMutate } from "../../generic/customerCompany/_hooks";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { saleOrderFieldConfirm } from "./fields";
import FormikProduct from "../../../../_cloner/components/FormikProductComboSelect";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import { useRetrieveProductsByBrand } from "../../generic/products/_hooks";

const initialValues = {
    productName: "",
    proximateAmount: "",
    productPrice: "",

    invoiceTypeDesc: "",
    invoiceTypeId: "",
    description: "",
    invoiceTypeCheck: false,
    customerCompanyCheck: false
}

const SalesOrderConfirm = () => {
    const { id } = useParams()
    const { data, isLoading } = useRetrieveOrder(id)
    const { data: productsByBrand, } = useRetrieveProductsByBrand();
    const { data: factor } = useGetInvoiceType();
    const customerCompaniesTools = useGetCustomerCompaniesMutate();

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

    useEffect(() => {
        customerCompaniesTools.mutate(data?.data?.customer.id)
    }, [data?.data?.customer.id])

    const orderAndAmountInfo = [
        { id: 1, title: "شماره سفارش", icon: <Description color="secondary" />, value: data?.data?.orderCode },
        { id: 1, title: "مشتری", icon: <Person color="secondary" />, value: data?.data?.customerFirstName + " " + data?.data?.customerLastName },
        { id: 1, title: "اسم رسمی شرکت مشتری", icon: <Person color="secondary" />, value: data?.data?.customerOfficialCompany?.companyName },
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
        { id: 6, header: "مقدار", accessor: "proximateAmount", render: (params: any) => {
           return params.alternativeProductAmount === 0 ? params.proximateAmount : params.alternativeProductAmount
        }},
        { id: 7, header: "قیمت", accessor: "price", render: (params: any) => {
          return params.alternativeProductPrice === 0 ? params.price : params.alternativeProductPrice
        } }

    ]

    const orderParseFields = (fields: FieldType, values: any, setFieldValue: any, resetForm: any, index: number) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "product":
                return (
                    <Box key={index} component="div" className="flex gap-x-2 w-full">
                        <FormikProduct
                            disabled={!values.productName}
                            onChange={(value: any) => handleChangeProduct(value, setFieldValue)}
                            options={dropdownProductByInventory(productsByBrand?.data)}
                            {...rest}
                        />
                    </Box>
                );
            case "price":
                return <FormikPrice key={index} disabled={!values.productName} {...rest} />;
            case "input":
                return <FormikInput key={index} disabled={!values.productName} {...rest} />;
            case "disabled":
                return <FormikInput key={index} disabled={true}  {...rest} />;
            case "hidden":
                return <Button key={index} className="!invisible">
                    <PublishedWithChanges />
                </Button>
            case "add":
                return <Button key={index}  onClick={() => handleReplace(values, setFieldValue, resetForm)} className="!bg-[#fcc615]">
                    <PublishedWithChanges />
                </Button>
            default:
                return <FormikInput key={index} {...rest} />;
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
        // setFieldValue("productPrice", params.price)

        setSelectedRow(rowIndex)

    }

    const handleReplace = (values: any, setFieldValue: any, resetForm: any) => {
        if (selectedRow !== null) {
            const updatedData = [...cpData];
            updatedData[selectedRow] = {
                ...updatedData[selectedRow],
                productName: values.productNameReplace.label,
                alternativeProductName: values.productNameReplace.label,
                alternativeProductId: values.productNameReplace.value,
                alternativeProductAmount: +values.proximateAmountReplace,
                alternativeProductPrice: +values.productPriceReplace.replace(/,/g, ""),
            };
            setCpData(updatedData);
            resetForm()
            setFieldValue("productNameReplace", "")
            setFieldValue("productName", "")
            setFieldValue("proximateAmount", "")
            setFieldValue("productPrice", "")
        }
    }

    const handleConfirmOrder = (values: any, statusId: number) => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })

        const formData = {
            orderId: id,
            invoiceTypeId: values.invoiceTypeId ? values?.invoiceTypeId : approveTools?.data?.data?.invoiceTypeId,
            invoiceApproveDescription: values.description,
            attachments: attachments,
            orderStatusId: statusId,
            customerOfficialCompanyId: values.customerOfficialCompanyId,
            details: cpData.map((element: any) => ({
                id: element.id,
                alternativeProductId: element.alternativeProductId,
                alternativeProductAmount: element.alternativeProductAmount,
                alternativeProductPrice: element.alternativeProductPrice
            }))
        }
        approveTools.mutate(formData, {
            onSuccess: (message) => {
                if (message.succeeded) {
                    setApprove(false)
                    EnqueueSnackbar(statusId === 2 ? "تایید سفارش با موفقیت انجام گردید" : "عدم تایید سفارش با موفقیت انجام شد", "info")
                    
                }
                if (!message?.data?.Succeeded) {
                    EnqueueSnackbar( message.data.Message , "error")
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
                {({ values, setFieldValue, resetForm }) => {
                    return <>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                            {orderAndAmountInfo.map((item: {
                                title: string,
                                icon: React.ReactNode,
                                value: any
                            }, index) => {
                                return <CardTitleValue key={index} title={item.title} value={item.value} icon={item.icon} />
                            })}
                            <CardTitleValue key={orderAndAmountInfo.length + 1} className="md:col-span-4" title={"توضیحات"} value={data?.data?.description ? data?.data?.description : "ندارد"} icon={<Description color="secondary" />} />
                        </Box>
                        <ReusableCard cardClassName="my-4">
                            {saleOrderFieldConfirm.map((rowFields, index) => (
                                <Box
                                    key={index}
                                    component="div"
                                    className="md:flex md:justify-between flex-warp md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                                >
                                    {rowFields.map((field, index) =>
                                        orderParseFields(
                                            field,
                                            values,
                                            setFieldValue,
                                            resetForm,
                                            index
                                        )
                                    )}
                                </Box>
                            ))}
                        </ReusableCard>
                        <ReusableCard cardClassName="my-4">
                            <Typography variant="h2" color="primary" className="pb-4">اقلام سفارش</Typography>
                            <Box component="div" className="flex flex-col md:flex-row gap-x-4">
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
                                        <Typography variant="h2" color="primary" className="pb-4">شرکت رسمی و توضیحات</Typography>
                                        <Description color="secondary" />
                                    </Box>
                                    <Box component="div" className="flex items-center">
                                        <FormikCheckbox label="" name="customerCompanyCheck" />
                                        <Typography>آیا مایل به تغییر اسم رسمی شرکت مشتری می باشید؟</Typography>
                                    </Box>
                                    <FormikSelect
                                        disabeld={!values.customerCompanyCheck}
                                        className="mb-4"
                                        options={dropdownCustomerCompanies(customerCompaniesTools?.data?.data)}
                                        defaultValue={data?.data?.customerOfficialCompany?.id}
                                        name="customerOfficialCompanyId" label="اسم رسمی شرکت مشتری" />
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
                            confirmText={approveTools.isLoading ? "درحال پردازش ..." : "تایید"}
                            onCancel={() => setApprove(false)}
                            onConfirm={() => handleConfirmOrder(values, 2)}
                        />
                    </>
                }}
            </Formik>
        </>
    )
}

export default SalesOrderConfirm