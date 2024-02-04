import { useDeleteProductPrice, useGetProductList, useRetrieveProductPrice, useUploadFileProductInventories, useUploadFileProductPrice } from "./core/_hooks";
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
import FormikRadioGroup from "../../../_cloner/components/FormikRadioGroup";

import { DownloadExcelBase64File } from "../../../_cloner/helpers/DownloadFiles";
import { exportProductPrices } from "./core/_requests";
import { EnqueueSnackbar } from "../../../_cloner/helpers/Snackebar";
import { columnsProductInventories } from "../managment-order/helpers/columns";
import { Form, Formik } from "formik";
import { dropdownWarehouseType } from "../managment-order/helpers/dropdowns";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";
import { useGetWarehouseTypes } from "../generic/_hooks";

const ProductInventories = () => {
    const { refetch, data: productPrice, isLoading: productPriceLoading } = useRetrieveProductPrice(null);
    const uploadFileMethode = useUploadFileProductInventories();
    const { mutate: deleteMutate, isLoading: deleteLoading, } = useDeleteProductPrice();
    const filterTools = useGetProductList();
    const warehouseTypeTools = useGetWarehouseTypes();

    // State
    const [itemForEdit, setItemForEdit] = useState<IProductPrice | undefined>();
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [results, setResults] = useState<IProductPrice[]>([]);

    useEffect(() => {
        const filter = { ByBrand: true, warehouseTypeId: 1 }
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
            {uploadFileMethode.isLoading && <Backdrop loading={uploadFileMethode.isLoading} />}
            <ReusableCard>
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2 mb-4"
                >
                    <Box>
                        <Typography variant="h3" color="secondary">جهت آپلود فایل موجودی روزانه، رعایت موارد زیر الزامی باشد</Typography>
                        <ul>
                            <li className="pt-2 text-[#272862] text-md">فرمت فایل باید بصورت اکسل (.xlsl) باشد</li>
                            <li className="py-2 text-[#272862] text-md">ترتیب فیلدها مهم می باشد: کد کالابرند، کدانبار، موجودی تقریبی، موجودی کف، حداکثر موجودی، حداقل موجودی</li>
                        </ul>
                    </Box>

                    <Box component="div" className="flex flex-wrap gap-x-4">
                        <FileUploadButton refetch={refetch} uploadFileMethode={uploadFileMethode} />
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
                <Box component="div" className="w-auto md:w-[40%]">
                    <FuzzySearch
                        keys={["productName", "brandName", "price"]}
                        data={productPrice?.data}
                        threshold={0.5}
                        setResults={setResults}
                    />
                </Box>
                <Box className="m-2">
                    <Formik initialValues={{ warehouseId: "-1" }} onSubmit={() => { }}>
                        {({ }) => {
                            return <Form>
                                <FormikRadioGroup onChange={onFilterProductByWarehouse} radioData={dropdownWarehouseType(warehouseTypeTools?.data)} name="warehouseId" />
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
