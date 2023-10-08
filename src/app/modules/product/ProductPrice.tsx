import { useDeleteProductPrice, useRetrieveProductPrice } from "./core/_hooks";
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

const ProductPrice = () => {
    const {
        refetch,
        data: productPrice,
        isLoading: productPriceLoading,
    } = useRetrieveProductPrice();
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

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {productPriceLoading && <Backdrop loading={productPriceLoading} />}
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        deleteData?.data?.Message ||
                        deleteData?.message ||
                        "حذف با موفقیت انجام شد"
                    }
                />
            )}
            <Card className="p-8">
                <Typography color="primary" variant="h1" className="pb-2 !text-sm md:!text-2xl">
                    مدیریت قیمت کالا
                </Typography>
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2"
                >
                    <Box component="div" className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={["productName", "brandName", "price"]}
                            data={productPrice?.data}
                            threshold={0.5}
                            setResults={setResults}
                        />
                    </Box>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        variant="contained"
                        color="secondary"
                    >
                        <Typography>ایجاد قیمت کالا</Typography>
                    </Button>
                </Box>
                <MuiDataGrid
                    columns={columns(renderAction)}
                    rows={results}
                    data={productPrice?.data}
                />
                <TransitionsModal
                    open={isCreateOpen}
                    isClose={() => setIsCreateOpen(false)}
                    title="ایجاد قیمت محصول"
                    >
                    <CreateProductPrice refetch={refetch} />
                </TransitionsModal>
                <TransitionsModal
                    open={isOpen}
                    isClose={() => setIsOpen(false)}
                    title="ویرایش قیمت محصول"
                >
                    <EditProductPrice refetch={refetch} item={itemForEdit} />
                </TransitionsModal>
            </Card>
        </>
    );
};

export default ProductPrice;
