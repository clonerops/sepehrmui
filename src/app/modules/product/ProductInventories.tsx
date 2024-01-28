import { useDeleteProductPrice, useGetProductList, useRetrieveProductPrice } from "./core/_hooks";
import { columns } from "./helpers/productPriceColumns";
import { IProductPrice } from "./core/_models";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

import EditGridButton from "../../../_cloner/components/EditGridButton";
import DeleteGridButton from "../../../_cloner/components/DeleteGridButton";
import Backdrop from "../../../_cloner/components/Backdrop";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import FileUploadButton from "../../../_cloner/components/UploadFileButton";
import CreateProductInventories from "./components/CreateProductInventories";
import EditProductInventories from "./components/EditProductInventories";
import ReusableCard from "../../../_cloner/components/ReusableCard";

import { DownloadExcelBase64File } from "../../../_cloner/helpers/DownloadFiles";
import { exportProductPrices } from "./core/_requests";
import { EnqueueSnackbar } from "../../../_cloner/helpers/Snackebar";
import { columnsModalProduct } from "../managment-order/helpers/columns";
import { Form, Formik } from "formik";
import FormikRadioGroup from "../../../_cloner/components/FormikRadioGroup";
import { dropdownWarehouseType, dropdownWarehouses } from "../managment-order/helpers/dropdowns";
import { useGetWarehouses } from "../generic/warehouse/_hooks";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";
import { useGetWarehouseTypes } from "../generic/_hooks";

const ProductInventories = () => {
    const { refetch, data: productPrice, isLoading: productPriceLoading } = useRetrieveProductPrice(null);
    const { mutate: deleteMutate, isLoading: deleteLoading, } = useDeleteProductPrice();
    const filterTools = useGetProductList();
    const warehouseTypeTools = useGetWarehouseTypes();

    // State
    const [itemForEdit, setItemForEdit] = useState<IProductPrice | undefined>();
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [results, setResults] = useState<IProductPrice[]>([]);

    useEffect(() => {
        const filter = { ByBrand: true }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                setResults(res?.data)
            }
        });
    }, []);

    const handleEdit = (item: IProductPrice | undefined) => {
        setIsOpen(true);
        setItemForEdit(item);
    };

    const handleDelete = (id: string | undefined) => {
        if (id)
            deleteMutate(id, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "حذفبا موفقیت انجام شد", "success")
                        refetch();
                    } else {
                        EnqueueSnackbar(response.data.Message, "error")
                    }
                },
            });
    };

    const renderAction = (item: any) => {
        return (
            <Box component="div" className="flex gap-4">
                <EditGridButton onClick={() => handleEdit(item?.row)} />
                <DeleteGridButton onClick={() => handleDelete(item?.row?.id)} />
            </Box>
        );
    };

    const handleDownloadExcel = async () => {
        try {
            const response: any = await exportProductPrices();
            const outputFilename = `ProductPrices${Date.now()}.csv`;
            DownloadExcelBase64File(response?.data, outputFilename);
        } catch (error) {
            console.log(error);
        }
    };

    const onFilterProductByWarehouse = (value: any) => {
        const filter = {
            ByBrand: true,
            WarehouseId: +value
        }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                setResults(res?.data)
            }
        });
    };

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {productPriceLoading && <Backdrop loading={productPriceLoading} />}
            <ReusableCard>
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2 mb-4"
                >
                    <Box component="div" className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={["productName", "brandName", "price"]}
                            data={productPrice?.data}
                            threshold={0.5}
                            setResults={setResults}
                        />
                    </Box>
                    <Box component="div" className="flex flex-wrap gap-x-4">
                        <FileUploadButton refetch={refetch} />
                        <Button
                            onClick={handleDownloadExcel}
                            variant="outlined"
                            color="primary"
                        >
                            <Typography>خروجی اکسل</Typography>
                        </Button>
                        <Button
                            onClick={() => setIsCreateOpen(true)}
                            variant="contained"
                            disabled={true}
                            color="secondary"
                        >
                            <Typography>موجودی قابل فروش</Typography>
                        </Button>
                    </Box>
                </Box>
                <Formik initialValues={{ warehouseId: "-1" }} onSubmit={() => { }}>
                    {({ }) => {
                        return <Form>
                            <FormikRadioGroup onChange={onFilterProductByWarehouse} radioData={dropdownWarehouseType(warehouseTypeTools?.data)} name="warehouseId" />
                        </Form>
                    }}
                </Formik>
                <Box className="grid grid-cols-2 mt-4">
                    <MuiDataGrid
                        columns={columnsModalProduct()}
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
                <TransitionsModal
                    open={isCreateOpen}
                    isClose={() => setIsCreateOpen(false)}
                    width="50%"
                    title="ایجاد موجودی قابل فروش"
                >
                    <CreateProductInventories refetch={refetch} />
                </TransitionsModal>
                <TransitionsModal
                    open={isOpen}
                    isClose={() => setIsOpen(false)}
                    width="50%"
                    title="ویرایش موجودی قابل فروش"
                >
                    <EditProductInventories refetch={refetch} item={itemForEdit} />
                </TransitionsModal>
            </ReusableCard>
        </>
    );
};

export default ProductInventories;
