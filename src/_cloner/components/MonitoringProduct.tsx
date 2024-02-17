import {useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useGetProductList } from "../../app/modules/generic/products/_hooks";
import { useGetProductTypes } from "../../app/modules/generic/_hooks";
import { Form, Formik, FormikProps } from "formik";
import MuiDataGrid from "./MuiDataGrid";
import { columnsModalProduct } from "../../app/modules/managment-order/helpers/columns";
import FormikWarehouseType from "./FormikWarehouseType";
import FormikWarehouseBasedOfType from "./FormikWarehouseBasedOfType";
import { useGetWarehousesByFilter } from "../../app/modules/generic/warehouse/_hooks";


const MonitoringProdcuct = () => {
    const filterTools = useGetProductList();
    const filterWarehouse = useGetWarehousesByFilter()
    const productTypeTools = useGetProductTypes();
    let formikRef = useRef<FormikProps<any>>(null);
    const [currentSelectProductType, setCurrentSelectProductType] = useState(-1)
    const handleFilterProduct = (value: number) => {
        const filter = {
            ByBrand: true,
            ProductTypeId: +value,
            WarehouseTypeId: formikRef.current?.values.warehouseTypeId,
            WarehouseId: formikRef.current?.values.warehouseId

        }
        filterTools.mutate(filter);
    }

    useEffect(() => {
        const filter = {
            ByBrand: true,
            ProductTypeId: -1,
            WarehouseTypeId: 1,
            WarehouseId: 6

        }
        filterTools.mutate(filter, {
            onSuccess: () => {
                filterWarehouse.mutate({ warehouseTypeId: 1 })
            }
        });
    }, []);



    const onFilterProductByWarehouseType = (value: any) => {
        const filter = {
            ByBrand: true,
            WarehouseTypeId: +value

        }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                formikRef.current?.setFieldValue('warehouseId', 0)
                setCurrentSelectProductType(-1)
                filterWarehouse.mutate({ warehouseTypeId: +value })
            }
        });
    };


    const onFilterProductByWarehouse = (value: any) => {
        const filter = {
            ByBrand: true,
            WarehouseTypeId: formikRef?.current?.values.warehouseTypeId,
            WarehouseId: +value,
            ProductTypeId: currentSelectProductType,
        }
        filterTools.mutate(filter);

    }
    return (
        <>
            <Formik innerRef={formikRef} initialValues={{ warehouseTypeId: 1, warehouseId: 6, productTypeId: -1 }} onSubmit={() => { }}>
                {({ values }) => {
                    return <>
                        <Box className="grid grid-cols-8 gap-x-8">
                            <Box className="p-4 flex flex-col border border-r-2 rounded-md gap-y-2">
                                <Button
                                    className={`${currentSelectProductType == -1 ? "!bg-[#fcc615] !text-black" : ""
                                        }`}
                                    onClick={() => {
                                        setCurrentSelectProductType(-1)
                                        handleFilterProduct(-1)
                                    }} >
                                    <Typography className="px-2">کل محصولات</Typography>
                                </Button>

                                {productTypeTools?.data?.map((item: any, index: number) => {
                                    return (
                                        <Button key={index}
                                            className={`${currentSelectProductType == item.id
                                                ? "!bg-[#fcc615] !text-black"
                                                : ""
                                                }`}
                                            onClick={() => {
                                                setCurrentSelectProductType(item.id)
                                                handleFilterProduct(item.id)

                                            }}
                                        >
                                            <Typography className="px-2">{item.desc}</Typography>
                                        </Button>
                                    );
                                })}
                            </Box>
                            <Box className="flex flex-col col-span-6">
                                <Box component="div" className="my-8">
                                    <Form className="flex flex-col lg:flex-row gap-x-4">
                                        <FormikWarehouseType name="warehouseTypeId" label="نوع انبار" onChange={onFilterProductByWarehouseType} />
                                        <FormikWarehouseBasedOfType name="warehouseId" label="انبار" warehouse={filterWarehouse?.data?.data} onChange={onFilterProductByWarehouse} />

                                    </Form>
                                </Box>
                                <MuiDataGrid
                                    columns={columnsModalProduct()}
                                    isLoading={filterTools.isLoading}
                                    rows={filterTools?.data?.data}
                                    data={filterTools?.data?.data}
                                />
                            </Box>
                        </Box>
                    </>
                }}
            </Formik>
        </>
    );
};

export default MonitoringProdcuct
