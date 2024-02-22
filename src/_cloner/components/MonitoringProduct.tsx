import React, {useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useGetProductList } from "../../app/modules/generic/products/_hooks";
import { useGetProductTypes } from "../../app/modules/generic/_hooks";
import { Form, Formik, FormikProps } from "formik";
import MuiDataGrid from "./MuiDataGrid";
import { columnsModalProduct } from "../../app/modules/managment-order/helpers/columns";
import FormikWarehouseType from "./FormikWarehouseType";
import FormikWarehouseBasedOfType from "./FormikWarehouseBasedOfType";
import { useGetWarehousesByFilter } from "../../app/modules/generic/warehouse/_hooks";
import FormikPeoductType from "./FormikProductType";
import Backdrop from "./Backdrop";
import FormikInput from "./FormikInput";
import SearchBackendInput from "./SearchBackendInput";


const MonitoringProdcuct = () => {
    const filterTools = useGetProductList();
    const filterWarehouse = useGetWarehousesByFilter()
    const [searchTerm, setSearchTerm] = useState<any>("")
    let formikRef = useRef<FormikProps<any>>(null);

    const onFilterProductType = (value: number) => {
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
                formikRef.current?.setFieldValue('productTypeId', -1)
                filterWarehouse.mutate({ warehouseTypeId: +value })
            }
        });
    };


    const onFilterProductByWarehouse = (value: any) => {
        const filter = {
            ByBrand: true,
            WarehouseTypeId: formikRef?.current?.values.warehouseTypeId,
            WarehouseId: +value,
            ProductTypeId: formikRef?.current?.values.productTypeId,
        }
        filterTools.mutate(filter);

    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filter = {
                ByBrand: true,
                WarehouseTypeId: formikRef?.current?.values.warehouseTypeId,
                WarehouseId: +formikRef?.current?.values.warehouseId,
                ProductTypeId: formikRef?.current?.values.productTypeId,
                ProductName : searchTerm
            }
            filterTools.mutate(filter);
    
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [searchTerm])
    

    return (
        <>
            {filterTools.isLoading && <Backdrop loading={filterTools.isLoading} />}
            <Formik innerRef={formikRef} initialValues={{ warehouseTypeId: 1, warehouseId: 6, productTypeId: -1, productName: "" }} onSubmit={() => { }}>
                {({ values }) => {
                    return <>
                        <Box className="grid grid-cols-8 gap-x-8">
                            <Box className="flex flex-col col-span-6">
                                <Box component="div" className="my-8 flex flex-col space-y-4">
                                    <FormikPeoductType name="productTypeId" label="نوع کالا" onChange={onFilterProductType} />
                                    <Form className="flex flex-col lg:flex-row gap-x-4">
                                        <FormikWarehouseType name="warehouseTypeId" label="نوع انبار" onChange={onFilterProductByWarehouseType} />
                                        <FormikWarehouseBasedOfType name="warehouseId" label="انبار" warehouse={filterWarehouse?.data?.data} onChange={onFilterProductByWarehouse} />
                                    </Form>
                                    <SearchBackendInput label="جستجو" name="productName" value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value)} />
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
