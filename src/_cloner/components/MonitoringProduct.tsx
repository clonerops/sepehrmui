import React, {useEffect, useRef, useState } from "react";
import { useGetProductList } from "../../app/modules/products/_hooks";
import { Form, Formik, FormikProps } from "formik";
import MuiDataGrid from "./MuiDataGrid";
import FormikWarehouseType from "./FormikWarehouseType";
import FormikWarehouseBasedOfType from "./FormikWarehouseBasedOfType";
import { useGetWarehousesByFilter } from "../../app/modules/warehouse/_hooks";
import FormikPeoductType from "./FormikProductType";
import Backdrop from "./Backdrop";
import SearchBackendInput from "./SearchBackendInput";
import { ModalProductColumn } from "../helpers/columns";


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
         // eslint-disable-next-line
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
         // eslint-disable-next-line
      }, [searchTerm])
    

    return (
        <>
            {filterTools.isLoading && <Backdrop loading={filterTools.isLoading} />}
            <Formik innerRef={formikRef} initialValues={{ warehouseTypeId: 1, warehouseId: 6, productTypeId: -1, productName: "" }} onSubmit={() => { }}>
                {() => {
                    return <>
                        <div className="">
                            <div className="flex flex-col col-span-6">
                                <div className="my-8 flex flex-col space-y-4">
                                    <FormikPeoductType name="productTypeId" label="نوع کالا" onChange={onFilterProductType} />
                                    <Form className="flex flex-col lg:flex-row gap-x-4">
                                        <FormikWarehouseType name="warehouseTypeId" label="نوع انبار" onChange={onFilterProductByWarehouseType} />
                                        <FormikWarehouseBasedOfType name="warehouseId" label="انبار" warehouse={filterWarehouse?.data?.data} onChange={onFilterProductByWarehouse} />
                                    </Form>
                                    <SearchBackendInput label="جستجو" name="productName" value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value)} />
                                </div>
                                <MuiDataGrid
                                    columns={ModalProductColumn()}
                                    isLoading={filterTools.isLoading}
                                    rows={filterTools?.data?.data}
                                    data={filterTools?.data?.data}
                                />
                            </div>
                        </div>
                    </>
                }}
            </Formik>
        </>
    );
};

export default MonitoringProdcuct
