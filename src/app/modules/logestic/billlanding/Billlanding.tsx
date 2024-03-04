import { Form, Formik, FormikErrors } from "formik";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { Box, Button, Typography } from "@mui/material";
import FormikWarehouse from "../../../../_cloner/components/FormikWarehouse";
import RadioGroup from "../../../../_cloner/components/RadioGroup";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox";
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import FormikAmount from "../../../../_cloner/components/FormikAmount";
import FormikInput from "../../../../_cloner/components/FormikInput";
import { dropdownVehicleType } from "../helpers/dropdowns";
import { useGetVehicleTypes, useGetWarehouses } from "../../generic/_hooks";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import { useState } from "react";
import TransferAmount from "./TransferAmount";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import FormikWarehouseBasedOfType from "../../../../_cloner/components/FormikWarehouseBasedOfType";
import { useGetProductList } from "../../generic/products/_hooks";

const initialValues = {
    warehouseFrom: ""
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
        { label: "تاریخ تحویل", name: "deliveryDate", type: "datepicker" },
        { label: "مبلغ کرایه", name: "fareAmount", type: "amount" },
        { label: "ندارد", name: "isComplete", type: "checkbox" },
    ],
    [
        { label: "آدرس محل تخلیه", name: "unloadingPlaceAddress", type: "desc" },
        { label: "توضیحات", name: "description", type: "desc" },
    ]
];

const categories = [
    {value: 1, title: "طبق برنامه", defaultChecked: true},
    {value: 2, title: "برای رزرو", defaultChecked: false},
    {value: 3, title: "برای انبار", defaultChecked: false}
]


const Billlanding = () => {
    const vehicleList = useGetVehicleTypes()
    const warehouse = useGetWarehouses()
    const productsInventory = useGetProductList()

    console.log(warehouse?.data)


    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [itemSelected, setItemSelected] = useState<any>({})

    const parseFields = (fields: FieldType, setFieldValue:  (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>, index: number) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "checkbox":
                return (
                    <Box key={index} component="div" className="w-full flex items-center">
                        <FormikCheckbox
                            name="isComplete"
                            label=""
                        />
                        <Typography variant="h3">
                            تکمیل بارگیری
                        </Typography>
                    </Box>
                );
            case "datepicker":
                return <FormikDatepicker key={index} setFieldValue={setFieldValue} boxClassName="w-full" {...rest} />
            case "select":
                return <FormikSelect key={index} options={dropdownVehicleType(vehicleList.data)} {...rest} />
            case "amount":
                return <FormikAmount key={index} {...rest} />;
            case "desc":
                return <FormikInput key={index} multiline minRows={3} {...rest} />;

            default:
                return <FormikInput key={index} {...rest} />;
        }
    };

    const columns = (renderAction: () => void) => {
        const col = [
            {
                field: "productCode",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "کد کالا",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "productName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام کالا",
                headerClassName: "headerClassName",
                minWidth: 120,
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
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "موجودی خرید",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            { headerName: 'عملیات', flex: 1, renderCell: (params: any) => {
                return <Button variant="contained" color="secondary" onClick={() => {
                    setIsOpen(true)
                    setItemSelected(params.row)
                }}>
                    <Typography>انتقال</Typography>
                </Button> 
            } , headerClassName: "headerClassName", minWidth: 160 }
        ];
        return col;
    };
    const columnsForBilllanding = (renderAction: () => void) => {
        const col = [
            {
                field: "productCode",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "کد کالا",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "productName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام کالا",
                headerClassName: "headerClassName",
                minWidth: 120,
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
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "موجودی خرید",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
        ];
        return col;
    };


    const renderAction = () => {
        return   
    }

    const onFilterWarehouseFrom =  (value: any) => {
        const filter = {
            ByBrand: true,
            HasPurchaseInventory: true,
            WarehouseId: +value
        }
        productsInventory.mutate(filter, {
            onSuccess: (response) => {
                console.log(response)
            }
        })
    }

console.log("productsInventory.data", productsInventory.data)

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={() => {}}>
                {({values, setFieldValue}) => {
                    return (
                        <Form>
                            <Box className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <ReusableCard>
                                    <Box className="flex justify-center items-center gap-4">
                                        <FormikWarehouseBasedOfType
                                            name="warehouseFrom"
                                            label="انبار مبدا"
                                            onChange={onFilterWarehouseFrom}
                                            warehouse={warehouse?.data?.filter((item: {warehouseTypeId: number}) => item.warehouseTypeId === 4)}
                                        />
                                        <FormikWarehouse
                                            name="warehouseTo"
                                            label="انبار مقصد"
                                        />
                                    </Box>
                                    <Box className="my-4">
                                        <RadioGroup
                                            onChange={(e: any) => () => {}}
                                            categories={categories}
                                            id="saleTotalTypeDetail"
                                            key="saleTotalTypeDetail"
                                        />
                                    </Box>
                                </ReusableCard>
                                <ReusableCard cardClassName="flex justify-center items-center">
                                    <Box
                                        component="img"
                                        src={toAbsoulteUrl("/media/logos/fo.png")}
                                        className="rounded-md"
                                        width={400}
                                    />
                                </ReusableCard>
                            </Box>
                            <ReusableCard cardClassName="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                                <Box>
                                    <Typography variant="h3" className="text-gray-500 pb-2">لیست کالاهای موجود در انبار</Typography>
                                    <MuiDataGrid
                                        columns={columns(renderAction)}
                                        rows={productsInventory.data?.data || null}
                                        data={productsInventory.data?.data || null}
                                        isLoading={productsInventory.isLoading}
                                        />
                                </Box>
                                <Box>
                                    <Typography variant="h3" className="text-gray-500 pb-2">لیست کالاهای انتخاب شده جهت انتقال حواله</Typography>
                                    <MuiDataGrid
                                        columns={columnsForBilllanding(renderAction)}
                                        rows={[{}]}
                                        data={[{}]}
                                        />
                                </Box>
                            </ReusableCard>
                            <ReusableCard cardClassName="mt-4">
                                <Typography variant="h3" className="text-gray-500 pb-2">جزئیات حمل توسط راننده</Typography>
                                {fields.map((rowFields, index) => (
                                <Box
                                    key={index}
                                    component="div"
                                    className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4"
                                >
                                    {rowFields.map((field, index) =>
                                        parseFields(field, setFieldValue, index)
                                    )}
                                </Box>
                            ))}
                            </ReusableCard>
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
                <TransferAmount item={itemSelected} />
            </TransitionsModal>

        </>
    );
};

export default Billlanding;
