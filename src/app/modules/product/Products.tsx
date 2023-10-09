import { useState, useEffect } from "react";
import { IProducts } from "./core/_models";
import { useDisableProduct, useRetrieveProducts } from "./core/_hooks";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import { columns } from "./helpers/productColumns";
import EditGridButton from "../../../_cloner/components/EditGridButton";
// import DeleteGridButton from "../../../_cloner/components/DeleteGridButton";
import { Box, Button, Card, Typography } from "@mui/material";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import Backdrop from "../../../_cloner/components/Backdrop";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";

const Products = () => {
    const { data: products, isLoading: productsLoading, refetch } = useRetrieveProducts();
    const { mutate, data: deleteData, isLoading: deleteLoading } = useDisableProduct();
    const [results, setResults] = useState<IProducts[]>([])

    useEffect(() => {
        setResults(products?.data)
    }, [products])


    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IProducts>();
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);


    const handleEdit = (item: IProducts) => {
        setIsEditOpen(true);
        setItemForEdit(item);
    };
    // const handleDelete = (id: string | undefined) => {
    //     if (id) mutate(id, {
    //         onSuccess: (message) => {
    //            setSnackeOpen(true)
    //             refetch()
    //         }
    //     });
    // };

    const renderAction = (item: any) => {
        return <Box component="div" className="flex gap-4">
            <EditGridButton onClick={() => handleEdit(item?.row)} />
            {/* <DeleteGridButton onClick={() => handleDelete(item?.row?.id)} /> */}
        </Box>
    }

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {productsLoading && <Backdrop loading={productsLoading} />}
            {snackeOpen && (
                <PositionedSnackbar
                  open={snackeOpen}
                  setState={setSnackeOpen}
                  title={
                    deleteData?.data?.Message ||
                    deleteData?.message || "حذف با موفقیت انجام شد"
                  }
                />
              )}
                <Card className="p-8">
                    <Typography color="primary" variant="h1" className="pb-2 !text-sm md:!text-2xl">مدیریت کالا</Typography>
                    <Box component="div" className="md:flex md:justify-between md:items-center space-y-2">
                        <Box component="div" className="w-auto md:w-[40%]">
                            <FuzzySearch keys={['productCode','productName', 'productDetail.size', 'productDetail.productIntegratedName', 'approximateWeight', 'numberInPackage', 'productDetail.standard', 'productDetail.productState', 'description']} data={products?.data} threshold={0.5} setResults={setResults} />
                        </Box>
                        <Button onClick={() => setIsCreateOpen(true)} variant="contained" color="secondary">
                            <Typography>ایجاد کالا</Typography>
                        </Button>
                    </Box>
                    <MuiDataGrid columns={columns(renderAction)} rows={results} data={products?.data} />
                </Card>
                <TransitionsModal
                    open={isCreateOpen}
                    isClose={() => setIsCreateOpen(false)}
                    title="ایجاد محصول جدید"
                    >
                    <CreateProduct refetch={refetch} setIsCreateOpen={setIsCreateOpen} />
                </TransitionsModal>
                <TransitionsModal
                    open={isEditOpen}
                    isClose={() => setIsEditOpen(false)}
                    title="ویرایش محصول جدید"

                >
                    <EditProduct refetch={refetch} item={itemForEdit} />
                </TransitionsModal>
        </>
    );
};

export default Products;
