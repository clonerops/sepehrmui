import { useDeleteProductPrice, useExportProductPrice, useRetrieveProductPrice } from "./core/_hooks";
import { columns } from "./helpers/productPriceColumns";
import { IProductPrice } from "./core/_models";
import { useState, useEffect } from "react";
import CreateProductPrice from "./components/CreateProductPrice";
import EditProductPrice from "./components/EditProductPrice";
import { Box, Button, Card, Typography } from "@mui/material";
import EditGridButton from "../../../_cloner/components/EditGridButton";
import DeleteGridButton from "../../../_cloner/components/DeleteGridButton";
import Backdrop from "../../../_cloner/components/Backdrop";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import FileUploadButton from "../../../_cloner/components/UploadFileButton";
import { DownloadExcelBase64File } from "../../../_cloner/helpers/DownloadFiles";
import { exportProductPrices } from "./core/_requests";
import CreateProductInventories from "./components/CreateProductInventories";
import EditProductInventories from "./components/EditProductInventories";

const ProductInventories = () => {
    const {
        refetch,
        data: productPrice,
        isLoading: productPriceLoading,
    } = useRetrieveProductPrice(null);
    const {
        mutate: deleteMutate,
        data: deleteData,
        isLoading: deleteLoading,
    } = useDeleteProductPrice();
    // State
    const [itemForEdit, setItemForEdit] = useState<IProductPrice | undefined>();
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [results, setResults] = useState<IProductPrice[]>([]);
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);
    const [snackeUploadOpen, setSnackeUploadOpen] = useState<boolean>(false);
    const [excelLoading, setExcelLoading] = useState<boolean>(false);
    const [requestMessage, setRequestMessage] = useState<string>("");

    useEffect(() => {
        setResults(productPrice?.data);
    }, [productPrice]);

    const handleEdit = (item: IProductPrice | undefined) => {
        setIsOpen(true);
        setItemForEdit(item);
    };

    const handleDelete = (id: string | undefined) => {
        if (id)
            deleteMutate(id, {
                onSuccess: (message) => {
                    setSnackeOpen(true);
                    refetch();
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
        setExcelLoading(true);
        try {
            const response: any = await exportProductPrices();
            const outputFilename = `ProductPrices${Date.now()}.csv`;
            DownloadExcelBase64File(response?.data, outputFilename);
            setExcelLoading(false);
        } catch (error) {
            console.log(error);
            setExcelLoading(false);
        }
    };

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {productPriceLoading && <Backdrop loading={productPriceLoading} />}
            {snackeOpen && (<PositionedSnackbar open={snackeOpen} setState={setSnackeOpen} title={deleteData?.data?.Message || deleteData?.message || "حذف با موفقیت انجام شد"} />)}
            {snackeUploadOpen && (<PositionedSnackbar open={snackeUploadOpen} setState={setSnackeUploadOpen} title={requestMessage} />)}
            <Card className="p-8" elevation={8}>
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
                        <FileUploadButton refetch={refetch} setSnackeOpen={setSnackeUploadOpen} requestMessage={setRequestMessage} />
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
                            color="secondary"
                        >
                            <Typography>موجودی قابل فروش</Typography>
                        </Button>
                    </Box>
                </Box>
                <MuiDataGrid
                    columns={columns(renderAction)}
                    rows={results}
                    data={productPrice?.data}
                />
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
            </Card>
        </>
    );
};

export default ProductInventories;
