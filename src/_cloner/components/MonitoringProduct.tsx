import React, { FC, memo, useEffect, useState } from "react";
import { Box, Button, OutlinedInput, Typography, FormControl, MenuItem, Select } from "@mui/material";
import { useGetProductList } from "../../app/modules/generic/products/_hooks";
import { useGetProductTypes, useGetWarehouseTypes } from "../../app/modules/generic/_hooks";
import { Form, Formik } from "formik";
import FormikRadioGroup from "./FormikRadioGroup";
import { dropdownWarehouseType } from "../../app/modules/managment-order/helpers/dropdowns";
import MuiDataGrid from "./MuiDataGrid";
import { columnsModalProduct } from "../../app/modules/managment-order/helpers/columns";



interface IFilter {
    ByBrand?: boolean
    WarehouseId?: number
    WarehouseTypeId?: number
    ProductTypeId?: number
    PageNumber?: number
    PageSize?: number
}

const MonitoringProdcuct = () => {    
    const filterTools = useGetProductList();
    const warehouseTypeTools = useGetWarehouseTypes();
    const productTypeTools = useGetProductTypes();


    const [currentFilter, setCurrentFilter] = useState<IFilter>({
        ByBrand: true,
        WarehouseTypeId: 1,
        ProductTypeId: -1
    })


    const handleFilterProduct = (filter: IFilter) => {
        filterTools.mutate(filter);
    }

    useEffect(() => {
        handleFilterProduct(currentFilter)
    }, [])

    return (
        <>
            <Box className="flex gap-x-8">
                <Box className="p-4 flex flex-col border border-r-2 rounded-md gap-y-2">
                    <Button
                        className={`${currentFilter.ProductTypeId == -1 ? "!bg-[#fcc615] !text-black" : ""
                            }`}
                            onClick={() => {
                                setCurrentFilter({
                                    ...currentFilter,
                                    ProductTypeId: -1
                                })
                                handleFilterProduct({
                                    ...currentFilter,
                                    ProductTypeId: -1
                                })
                            }} >
                        <Typography className="px-2">کل محصولات</Typography>
                    </Button>

                        {productTypeTools?.data?.map((item: any, index: number) => {
                            return (
                                <Button key={index}
                                    className={`${currentFilter.ProductTypeId == item.id
                                        ? "!bg-[#fcc615] !text-black"
                                        : ""
                                        }`}

                                    onClick={() => {
                                        setCurrentFilter({
                                            ...currentFilter,
                                            ProductTypeId: item.id
                                        })
                                        handleFilterProduct({
                                            ...currentFilter,
                                            ProductTypeId: item.id
                                        })

                                    }}
                                >
                                    <Typography className="px-2">{item.desc}</Typography>
                                </Button>
                            );
                        })}
                </Box>
                <Box className="flex flex-col">
                    <Box component="div" className="my-8 mr-3">
                        <Formik initialValues={{warehouseTypeId: "1"}} onSubmit={() => {}}>
                            {({}) => {
                                return <Form>
                                    <FormikRadioGroup
                                        onChange={(value: number) => {
                                            setCurrentFilter({
                                                ...currentFilter,
                                                WarehouseTypeId: +value
                                            })
                                            handleFilterProduct({
                                                ...currentFilter,
                                                WarehouseTypeId: +value
                                            })
                                        }}
                                        radioData={dropdownWarehouseType(warehouseTypeTools?.data)} 
                                        name="warehouseTypeId" />
                                </Form>
                            }}
                        </Formik>
                    </Box>
                    <MuiDataGrid
                        columns={columnsModalProduct()}
                        isLoading={filterTools.isLoading}
                        rows={filterTools?.data?.data}
                        data={filterTools?.data?.data}
                        // height={}
                    />
                </Box>
            </Box>
        </>
    );
};

export default MonitoringProdcuct
