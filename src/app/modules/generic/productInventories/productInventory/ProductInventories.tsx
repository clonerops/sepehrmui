import { Form, Formik, FormikProps } from "formik";
import { useGetProductList } from "../../../product/core/_hooks";
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

const ProductInventories = () => {
    const filterTools = useGetProductList();
    const warehouseTypeTools = useGetWarehouseTypes();
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

    const onFilterProductByWarehouse = (value: any) => {
        const filter = {
            ByBrand: true,
            WarehouseTypeId: +value
        }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                setResults(res?.data)
            }
        });
    };

    return (
        <>
            <ReusableCard>
                <Box
                    component="div"
                    className="md:flex md:justify-end md:items-end space-y-2 mb-4"
                >
                    <Box component="div" className="flex flex-wrap gap-x-4">
                        <Button
                            onClick={handleDownloadExcel}
                            variant="outlined"
                            color="primary"
                        >
                            <Typography>خروجی اکسل</Typography>
                        </Button>
                    </Box>
                </Box>
                <Box className="m-2">
                    <Formik innerRef={formikRef} initialValues={{ warehouseTypeId: 1 }} onSubmit={() => { }}>
                        {({ }) => {
                            return <Form>
                                <FormikRadioGroup onChange={onFilterProductByWarehouse} radioData={dropdownWarehouseType(warehouseTypeTools?.data)} name="warehouseTypeId" />
                            </Form>
                        }}
                    </Formik>
                </Box>
                <Box className="grid grid-cols-2 mt-4">
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
