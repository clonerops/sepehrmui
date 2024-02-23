import { Form, Formik, FormikProps } from "formik";
import { useGetWarehouseTypes } from "../../_hooks";
import { useEffect, useRef, useState } from "react";
import { DownloadExcelBase64File } from "../../../../../_cloner/helpers/DownloadFiles";
import { Box, Button } from "@mui/material";
import ReusableCard from "../../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../../_cloner/components/MuiDataGrid";
import { columnsProductInventories } from "./columns";
import { toAbsoulteUrl } from "../../../../../_cloner/helpers/AssetsHelper";
import { exportProductInventories } from "../_requests";
import { useGetProductList } from "../../products/_hooks";
import FormikWarehouseType from "../../../../../_cloner/components/FormikWarehouseType";
import FormikWarehouseBasedOfType from "../../../../../_cloner/components/FormikWarehouseBasedOfType";
import { useGetWarehousesByFilter } from "../../warehouse/_hooks";
import FuzzySearch from "../../../../../_cloner/helpers/Fuse";

const ProductInventories = () => {
    const filterTools = useGetProductList();
    const filterWarehouse = useGetWarehousesByFilter()
    let formikRef = useRef<FormikProps<any>>(null);

    // State
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        const filter = { ByBrand: true, warehouseTypeId: 1 }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                setResults(res?.data)
                filterWarehouse.mutate({ warehouseTypeId: 1 })
            }
        });
    }, []);


    const handleDownloadExcel = async (values: { warehouseTypeId: number, warehouseId: number }) => {
        const filter = { WarehouseTypeId: values.warehouseTypeId, warehouseId: values.warehouseId }

        try {
            const response: any = await exportProductInventories(filter);
            const outputFilename = `ProductInventories${Date.now()}.csv`;
            DownloadExcelBase64File(response?.data, outputFilename);
        } catch (error) {
            console.log(error);
        }
    };

    const onFilterProductByWarehouseType = (value: any) => {
        const filter = {
            ByBrand: true,
            WarehouseTypeId: +value

        }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                formikRef.current?.setFieldValue('warehouseId', 0)
                setResults(res?.data)
                filterWarehouse.mutate({ warehouseTypeId: +formikRef?.current?.values.warehouseTypeId })
            }
        });
    };

    const onFilterProductByWarehouse = (value: any) => {
        const filter = {
            ByBrand: true,
            WarehouseTypeId: formikRef?.current?.values.warehouseTypeId,
            WarehouseId: +value,

        }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                setResults(res?.data)
            }
        });

    }


    return (
        <>
            <ReusableCard>
                <Formik innerRef={formikRef} initialValues={{ warehouseTypeId: 1, warehouseId: 0 }} onSubmit={() => { }}>
                    {({ values }) => {
                        return <Form className="flex flex-row lg:w-[50%] gap-4 mb-4">
                            <FormikWarehouseType name="warehouseTypeId" label="نوع انبار" onChange={onFilterProductByWarehouseType} />
                            <FormikWarehouseBasedOfType name="warehouseId" label="انبار" warehouse={filterWarehouse?.data?.data} onChange={onFilterProductByWarehouse} />
                            <Button
                                onClick={() => handleDownloadExcel(values)}
                                variant="outlined"
                                color="success"
                            >
                                <img
                                    className={"mr-3"}
                                    src={toAbsoulteUrl(
                                        "/media/logos/excelLogo.png"
                                    )}
                                    width={30}
                                    height={30}
                                />
                            </Button>
                        </Form>
                    }}
                </Formik>
                <Box component="div" className="mb-4 lg:w-[50%] w-full">
                    <FuzzySearch
                        keys={[
                            "productCode",
                            "productName",
                            "productBrandName",
                            "warehouseName",
                            "inventory",
                        ]}
                        data={filterTools?.data?.data}
                        setResults={setResults}
                    />
                </Box>

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
