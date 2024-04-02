import { Form, Formik, FormikErrors } from "formik";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { Button, Typography } from "@mui/material";
import FormikWarehouse from "../../../../_cloner/components/FormikWarehouse";
import RadioGroup from "../../../../_cloner/components/RadioGroup";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import FormikAmount from "../../../../_cloner/components/FormikAmount";
import FormikInput from "../../../../_cloner/components/FormikInput";
import { dropdownVehicleType } from "../helpers/dropdowns";
import { useGetVehicleTypes, useGetWarehouses } from "../../generic/_hooks";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import { useEffect, useState } from "react";
import TransferAmount from "./TransferAmount";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import FormikWarehouseBasedOfType from "../../../../_cloner/components/FormikWarehouseBasedOfType";
import { useGetProductList } from "../../generic/products/_hooks";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import { useGetTransferRemitanceById, useGetTransferRemitanceByIdByMutation, usePostTransferRemittance, useUpdateTransferRemitance } from "../core/_hooks";
import Backdrop from "../../../../_cloner/components/Backdrop";
import _ from "lodash";
import { renderAlert } from "../../../../_cloner/helpers/SweetAlert";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import CustomButton from "../../../../_cloner/components/CustomButton";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import { billlandingValidation } from "./_validation";
import CardWithIcons from "../../../../_cloner/components/CardWithIcons";
import { AddTask, DesignServices } from "@mui/icons-material";
import moment from "moment-jalaali";
import { useParams } from "react-router-dom";

const initialValues = {
    originWarehouseId: "",
    destinationWarehouseId: "",
    transferRemittanceTypeId: "",
    description: ""
}

const fields: FieldType[][] = [
    [
        { label: "راننده", name: "driverName", type: "input" },
        { label: "باربری", name: "shippingName", type: "input" },
        { label: "پلاک خودرو", name: "carPlaque", type: "input" },
        { label: "نوع خودرو", name: "vehicleTypeId", type: "select" },
    ],
    [
        { label: "شماره همراه راننده", name: "driverMobile", type: "input" },
        { label: "تاریخ تحویل", name: "deliverDate", type: "datepicker" },
        { label: "مبلغ کرایه", name: "fareAmount", type: "amount" },
    ],
    [
        { label: "آدرس محل تخلیه", name: "unloadingPlaceAddress", type: "desc" },
        { label: "توضیحات", name: "description", type: "desc" },
    ]
];


const BilllandingEdit = () => {
    const { id }: any = useParams()

    const vehicleList = useGetVehicleTypes()
    const warehouse = useGetWarehouses()
    const productsInventory = useGetProductList()
    const detailTools = useGetTransferRemitanceByIdByMutation()
    const updateTools = useUpdateTransferRemitance()
    const [categories, setCategoies] = useState<any>([])

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [itemSelected, setItemSelected] = useState<any>({})
    const [productForBilllanding, setProductForBilllanding] = useState<any>([])

    const parseFields = (fields: FieldType, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>, index: number) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "datepicker":
                return <FormikDatepicker key={index} setFieldValue={setFieldValue} boxClassName="w-full" {...rest} />
            case "select":
                return <FormikSelect key={index} options={dropdownVehicleType(vehicleList.data)} {...rest} />
            // case "amount":
            //     return <FormikAmount key={index} {...rest} />;
            case "desc":
                return <FormikInput key={index} multiline minRows={3} {...rest} />;

            default:
                return <FormikInput key={index} {...rest} />;
        }
    };

    const columns = () => {
        const col = [
            {
                field: "productCode",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "کد کالا",
                headerClassName: "headerClassName",
                minWidth: 80,
                maxWidth: 80,
                flex: 1,
            },
            {
                field: "productName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام کالا",
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1,
            },
            {
                field: "productBrandName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "برند",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "purchaseInventory",
                renderCell: (params: any) => {
                    return <Typography className="text-green-500" variant="h4">{separateAmountWithCommas(params.value)}</Typography>;
                },
                headerName: "موجودی خرید",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                headerName: 'عملیات', flex: 1, renderCell: (params: any) => {
                    return <Button variant="contained" color="secondary" onClick={() => {
                        setIsOpen(true)
                        setItemSelected(params.row)
                    }}>
                        <Typography>انتقال</Typography>
                    </Button>
                }, headerClassName: "headerClassName", minWidth: 160
            }
        ];
        return col;
    };
    const columnsForBilllanding = () => {
        const col = [
            {
                field: "productName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام کالا",
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1,
            },
            {
                field: "brandName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.row.brandName ? params.row.brandName : params.row.productBrandName}</Typography>;
                },
                headerName: "برند",
                headerClassName: "headerClassName",
                minWidth: 90,
                flex: 1,
            },
            {
                field: "transferAmount",
                renderCell: (params: any) => {
                    return <Typography className="text-green-500" variant="h4">{separateAmountWithCommas(params.value)}</Typography>;
                },
                headerName: "مقدار واردشده جهت انتقال",
                headerClassName: "headerClassName",
                minWidth: 240,
                flex: 1,
            },
            {
                field: "delete",
                renderCell: (params: any) => {
                    return <Button onClick={() => renderDelete(params.row)} className="!bg-red-500" variant="contained">
                        <Typography>حذف</Typography>
                    </Button>
                },
                headerName: "حذف",
                headerClassName: "headerClassName",
                maxWidth: 80,
                minWidth: 80,
                flex: 1,
            },
        ];
        return col;
    };

    const renderDelete = (values: any) => {
        const filtered = productForBilllanding.filter((item: { productBrandId: number }) => {
            return +item.productBrandId !== +values.productBrandId
        })

        setProductForBilllanding(filtered)
    }

    const onFilterWarehouseFrom = (value: any) => {
        const filter = {
            ByBrand: true,
            HasPurchaseInventory: true,
            WarehouseId: +value
        }
        productsInventory.mutate(filter, {
            onSuccess: (response) => {
                setProductForBilllanding([])
            }
        })
    }

    const getDetail = () => {
        try {
            detailTools.mutate(id, {
                onSuccess: (response) => {
                    setProductForBilllanding(response?.data.details)
                    setCategoies(
                        [
                            { value: 1, title: "طبق برنامه", defaultChecked: response?.data?.transferRemittanceTypeId === 1 ? true : false },
                            { value: 2, title: "برای رزرو", defaultChecked: response?.data?.transferRemittanceTypeId === 2 ? true : false },
                            { value: 3, title: "برای انبار", defaultChecked: response?.data?.transferRemittanceTypeId === 3 ? true : false }
                        ]
                    )
                    const filter = {
                        ByBrand: true,
                        HasPurchaseInventory: true,
                        WarehouseId: response?.data.originWarehouseId
                    }
                    productsInventory.mutate(filter, {
                        onSuccess: (response) => { }
                    })
                }
            });

        } catch (error: any) {
            return error?.response;
        }
    };

    useEffect(() => {
        getDetail();
    }, [id]);


    const onUpdate = (values: any) => {
        const formData: any = {
            // ...values,
            originWarehouseId: values.originWarehouseId ? +values.originWarehouseId : detailTools?.data?.data?.originWarehouseId,
            fareAmount: values.fareAmount ? +values.fareAmount : detailTools?.data?.data?.fareAmount,
            destinationWarehouseId: values.destinationWarehouseId ? +values.destinationWarehouseId : detailTools?.data?.data?.destinationWarehouseId,
            transferRemittanceTypeId: +values.transferRemittanceTypeId ? +values.transferRemittanceTypeId : detailTools?.data?.data?.transferRemittanceTypeId,
            details: _.map(productForBilllanding, (item) => {
                return {
                    id: item.id ? +item.id : null,
                    productBrandId: +item.productBrandId,
                    transferAmount: +item.transferAmount,
                }
            }),
            description: values.description ? values.description : detailTools?.data?.data?.description,
            driverName: values.driverName ? values.driverName : detailTools?.data?.data?.driverName,
            shippingName: values.shippingName ? values.shippingName : detailTools?.data?.data?.shippingName,
            carPlaque: values.carPlaque ? values.carPlaque : detailTools?.data?.data?.carPlaque,
            vehicleTypeId: values.vehicleTypeId ? values.vehicleTypeId : detailTools?.data?.data?.vehicleTypeId === 0 ? null : detailTools?.data?.data?.vehicleTypeId,
            driverMobile: values.driverMobile ? values.driverMobile : detailTools?.data?.data?.driverMobile,
            deliverDate: values.deliverDate ? values.deliverDate : detailTools?.data?.data?.deliverDate,
            unloadingPlaceAddress: values.unloadingPlaceAddress ? values.unloadingPlaceAddress : detailTools?.data?.data?.unloadingPlaceAddress,
            id: +id,
          
        }
        updateTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    renderAlert(response.message || "ویرایش با موفقیت انجام شد")
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            },
        });
    };

    return (
        <>
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            <Typography color="primary" variant="h1" className="pb-8">ویرایش حواله</Typography>
            <Formik enableReinitialize initialValues={
                {
                    ...initialValues,
                    ...detailTools?.data?.data,
                }
            }
                onSubmit={onUpdate}>
                {({ values, setFieldValue, handleSubmit }) => {
                    return (
                        <Form>
                            <div className="grid grid-cols-1 lg:grid-cols-4 mb-4 gap-4">
                                <CardWithIcons
                                    title='شماره حواله'
                                    icon={<DesignServices className="text-white" />}
                                    value={detailTools?.data?.data?.id}
                                    iconClassName='bg-[#3322D8]' />
                                <CardWithIcons
                                    title='تاریخ حواله'
                                    icon={<AddTask className="text-white" />}
                                    value={moment(new Date(Date.now())).format('jYYYY/jMM/jDD')}
                                    iconClassName='bg-[#369BFD]' />
                                <ReusableCard cardClassName="flex flex-col gap-y-4">
                                    <FormikWarehouseBasedOfType
                                        name="originWarehouseId"
                                        label="انبار مبدا"
                                        onChange={onFilterWarehouseFrom}
                                        warehouse={warehouse?.data?.filter((item: { warehouseTypeId: number }) => item.warehouseTypeId === 4)}
                                        disabled
                                    />
                                    <FormikWarehouseBasedOfType
                                        name="destinationWarehouseId"
                                        label="انبار مقصد"
                                        onChange={onFilterWarehouseFrom}
                                        warehouse={warehouse?.data}
                                        disabled
                                    />
                                </ReusableCard>
                                <ReusableCard cardClassName="flex justify-center items-center flex-col gap-y-4">
                                    <RadioGroup
                                        categories={categories}
                                        id="transferRemittanceTypeId"
                                        key="transferRemittanceTypeId"
                                        name="transferRemittanceTypeId"
                                    />
                                </ReusableCard>
                            </div>
                            <ReusableCard cardClassName="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <Typography variant="h3" className="text-gray-500 pb-2">لیست کالاهای موجود در انبار</Typography>
                                    <MuiDataGrid
                                        columns={columns()}
                                        rows={productsInventory.data?.data || []}
                                        data={productsInventory.data?.data || []}
                                        isLoading={productsInventory.isLoading}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h3" className="text-gray-500 pb-2">لیست کالاهای انتخاب شده جهت انتقال حواله</Typography>
                                    <MuiDataGrid
                                        columns={columnsForBilllanding()}
                                        rows={productForBilllanding}
                                        data={productForBilllanding}
                                    />
                                </div>
                            </ReusableCard>
                            <ReusableCard cardClassName="mt-4">
                                <Typography variant="h3" className="text-gray-500 pb-2">جزئیات حمل توسط راننده</Typography>
                                {fields.map((rowFields, index) => (
                                    <div
                                        key={index}

                                        className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4"
                                    >
                                        {rowFields.map((field, index) =>
                                            parseFields(field, setFieldValue, index)
                                        )}
                                    </div>
                                ))}
                            </ReusableCard>
                            <div className="flex justify-end items-end mt-8">
                                <ButtonComponent onClick={() => handleSubmit()} disabled={productForBilllanding?.length < 0}>
                                    <Typography variant="h4" className="px-4 py-2 text-white">{"ویرایش حواله"}</Typography>
                                </ButtonComponent>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
            <TransitionsModal
                open={isOpen}
                isClose={() => setIsOpen(false)}
                width="50%"
                title="مقدار انتقال"
            >
                <TransferAmount productForBilllanding={productForBilllanding} setProductForBilllanding={setProductForBilllanding} setIsOpen={setIsOpen} item={itemSelected} />
            </TransitionsModal>

        </>
    );
};

export default BilllandingEdit;
