import { Form, Formik, FormikProps } from "formik";
import { useGetWarehouseTypes } from "../../_hooks";
import { useEffect, useRef, useState } from "react";
import { DownloadExcelBase64File } from "../../../../../_cloner/helpers/DownloadFiles";
import { Box, Button, Typography } from "@mui/material";
import ReusableCard from "../../../../../_cloner/components/ReusableCard";
import FormikRadioGroup from "../../../../../_cloner/components/FormikRadioGroup";
import MuiDataGrid from "../../../../../_cloner/components/MuiDataGrid";
import { columnsProductInventories } from "./columns";
import { toAbsoulteUrl } from "../../../../../_cloner/helpers/AssetsHelper";
import { dropdownWarehouseType } from "../../../managment-order/helpers/dropdowns";
import { exportProductInventories } from "../_requests";
import { useGetProductList } from "../../products/_hooks";
import FormikWarehouseType from "../../../../../_cloner/components/FormikWarehouseType";
import FormikWarehouse from "../../../../../_cloner/components/FormikWarehouse";
import FormikWarehouseBasedOfType from "../../../../../_cloner/components/FormikWarehouseBasedOfType";
import { useGetWarehouses, useGetWarehousesByFilter } from "../../warehouse/_hooks";

const ProductInventories = () => {
    const filterTools = useGetProductList();
    const warehouseTypeTools = useGetWarehouseTypes();
    const filterWarehouse = useGetWarehousesByFilter()
    let formikRef = useRef<FormikProps<any>>(null);

    // State
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        const filter = { ByBrand: true, warehouseTypeId: 1 }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                setResults(res?.data)
            }
        });
    }, []);


    const handleDownloadExcel = async () => {
        const filter = { WarehouseTypeId: 1 }

        try {
            const response: any = await exportProductInventories(filter);
            const outputFilename = `ProductInventories${Date.now()}.csv`;
            DownloadExcelBase64File(response?.data, outputFilename);
        } catch (error) {
            console.log(error);
        }
    };

    // const onFilterProductByWarehouse = (value: any) => {
    //     const filter = {
    //         ByBrand: true,
    //         WarehouseTypeId: +value
    //     }
    //     filterTools.mutate(filter, {
    //         onSuccess: (res) => {
    //             setResults(res?.data)
    //         }
    //     });
    // };
    const onFilterProductByWarehouseType = (value: any) => {
        const filter = {
            ByBrand: true,
            WarehouseTypeId: formikRef?.current?.values.warehouseTypeId
            
        }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                setResults(res?.data)
                filterWarehouse.mutate({warehouseTypeId: +formikRef?.current?.values.warehouseTypeId})
            }
        });
    };

    const onFilterProductByWarehouse = () => {

    }


    return (
        <>
            <ReusableCard>
                {/* <Box className="m-2">
                    <Formik innerRef={formikRef} initialValues={{ warehouseTypeId: 1 }} onSubmit={() => { }}>
                        {({ }) => {
                            return <Form>
                                <FormikRadioGroup onChange={onFilterProductByWarehouse} radioData={dropdownWarehouseType(warehouseTypeTools?.data)} name="warehouseTypeId" />
                            </Form>
                        }}
                    </Formik>
                </Box> */}
                    <Formik innerRef={formikRef} initialValues={{ warehouseTypeId: 1, warehouseId: 0 }} onSubmit={() => { }}>
                        {({ }) => {
                            return <Form className="flex flex-row lg:w-[50%] gap-4 mb-4">
                                <FormikWarehouseType name="warehouseTypeId" label="نوع انبار" onChange={onFilterProductByWarehouseType} />
                                <FormikWarehouseBasedOfType name="warehouseId" label="انبار" warehouse={filterWarehouse?.data?.data} onChange={onFilterProductByWarehouse} />
                            </Form>
                        }}
                    </Formik>

                    <Button
                            onClick={handleDownloadExcel}
                            variant="outlined"
                            color="success"
                    >
                        <Typography>خروجی اکسل</Typography>
                        <img
                            className={"mr-3"}
                            src={toAbsoulteUrl(
                                "/media/logos/excelLogo.png"
                            )}
                            width={30}
                            height={30}
                        />
                    </Button>
                <Box className="grid grid-cols-2 mt-2">
                    <MuiDataGrid
                        columns={columnsProductInventories()}
                        isLoading={filterTools.isLoading}
                        rows={results}
                        data={filterTools?.data?.data}
                        height={400}
                    />
                    <Box component="div">
                        <Box
                            component="div"
                            className="hidden md:flex md:justify-center md:items-center"
                        >
                            <Box component="img"
                                src={toAbsoulteUrl("/media/logos/11089.jpg")}
                                width={400}
                            />
                        </Box>

                    </Box>

                </Box>
            </ReusableCard>
        </>
    );
};

export default ProductInventories;
