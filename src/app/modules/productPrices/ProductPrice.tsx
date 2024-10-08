import { useState, useEffect } from "react";
import { Alert, Button, Typography } from "@mui/material";

import EditGridButton from "../../../_cloner/components/EditGridButton";
import DeleteGridButton from "../../../_cloner/components/DeleteGridButton";
import Backdrop from "../../../_cloner/components/Backdrop";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import FileUploadButton from "../../../_cloner/components/UploadFileButton";
import ReusableRadioGroup from "../../../_cloner/components/ReusableRadioGroup";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog";
import ProductPriceForm from "./ProductPriceForm";

import { DownloadExcelBase64File } from "../../../_cloner/helpers/downloadFiles";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { useDeleteProductPrice, useRetrieveProductPrice, useUploadFileProductPrice } from "./_hooks";
import { IProductPrice } from "./_models";
import { exportProductPrices } from "./_requests";
import { ProductPricesColumn } from "../../../_cloner/helpers/columns";

const radioOption: {
    label: string;
    value: any;
}[] = [
    { label: "همه", value: "" },
    { label: "فعال", value: true },
    { label: "غیر فعال", value: false },
];

const ProductPrice = () => {
    const {
        mutate: deleteMutate,
        isLoading: deleteLoading,
    } = useDeleteProductPrice();
    const uploadFileMethode = useUploadFileProductPrice();

    // State
    const [itemForEdit, setItemForEdit] = useState<IProductPrice | undefined>();
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [results, setResults] = useState<IProductPrice[]>([]);
    const [approve, setApprove] = useState<boolean>(false);
    const [deletedId, setDeletedId] = useState<string>("")
    const [isActiveValue, setIsActiveValue] = useState<
        boolean | number | null | string
    >("");

    const {
        refetch,
        data: productPrice,
        isLoading: productPriceLoading,
    } = useRetrieveProductPrice(isActiveValue);

    useEffect(() => {
        setResults(productPrice?.data);
         // eslint-disable-next-line
    }, [productPrice]);


    const handleEdit = (item: IProductPrice | undefined) => {
        setIsOpen(true);
        setItemForEdit(item);
    };

    const handleDelete = (id: string | undefined) => {
        if (id)
            deleteMutate(id, {
                onSuccess: (response) => {
                    if(response.succeeded) {
                        EnqueueSnackbar(response.message || "حذف با موفقیت انجام شد", "success")
                        setApprove(false)
                        refetch();
                      } else {
                        EnqueueSnackbar(response.data.Message, "error")
                      }
                },
            });
    };

    const renderAction = (item: any) => {
        return (
            <div className="flex gap-4">
                <EditGridButton onClick={() => handleEdit(item?.row)} />
                <DeleteGridButton onClick={() => handleOpenApprove(item?.row?.id)} />
            </div>
        );
    };

    const handleOpenApprove = (id: string) => {
        setApprove(true)
        setDeletedId(id)
      }    

    const handleDownloadExcel = async () => {
        try {
            const response: any = await exportProductPrices();
            const outputFilename = `ProductPrices${Date.now()}.csv`;
            DownloadExcelBase64File(response?.data, outputFilename);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeRadio = (value: any) => {
        setIsActiveValue(value);
    };

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {productPriceLoading && <Backdrop loading={productPriceLoading} />}
            <Alert className="mb-4">
                <div className="flex flex-col md:flex-row flex-warp items-center gap-x-4 mb-4">
                    <Typography variant="h4" className="text-red-500">
                        برای بارگزاری فایل قیمت ها بایستی این موارد رعایت گردد:
                    </Typography>
                    <div className="flex flex-col space-y-4">
                        <Typography variant="h4">
                            1) فایل بایستی بصورت اکسل باشد
                        </Typography>
                        <Typography variant="h4">
                            2) ستون های فایل بایستی شامل : کد کالا، کدکالابرند، قیمت
                            باشد
                        </Typography>
                    </div>
                </div>

            </Alert>
            <ReusableCard>
                <div
                    className="md:flex md:justify-between md:items-center space-y-2 mb-4"
                >
                    <div className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={["productName", "brandName", "price"]}
                            data={productPrice?.data}
                            threshold={0.5}
                            setResults={setResults}
                        />
                    </div>
                    <div className="flex flex-wrap gap-x-4">
                        <FileUploadButton
                            refetch={refetch}
                            uploadFileMethode={uploadFileMethode}
                        />
                        <Button
                            onClick={handleDownloadExcel}
                            variant="outlined"
                            color="primary"
                        >
                            <Typography variant="h4">خروجی اکسل</Typography>
                        </Button>
                        <ButtonComponent
                            onClick={() => setIsCreateOpen(true)}
                        >
                            <Typography variant="h4">
                                ایجاد قیمت کالا
                            </Typography>
                        </ButtonComponent>
                    </div>
                </div>
                <div>
                    <ReusableRadioGroup
                        label=""
                        options={radioOption}
                        value={isActiveValue}
                        onChange={handleChangeRadio}
                    />
                </div>
                <MuiDataGrid
                    columns={ProductPricesColumn(renderAction)}
                    rows={results}
                    data={productPrice?.data}
                    onDoubleClick={(item: any) => handleEdit(item?.row)}
                />
                <TransitionsModal
                    open={isCreateOpen}
                    isClose={() => setIsCreateOpen(false)}
                    width="30%"
                    title="ایجاد قیمت محصول"
                >
                    <ProductPriceForm refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
                </TransitionsModal>
                <TransitionsModal
                    open={isOpen}
                    isClose={() => setIsOpen(false)}
                    width="30%"
                    title="ویرایش قیمت محصول"
                >
                    <ProductPriceForm 
                        id={itemForEdit?.id}
                        items={itemForEdit}
                        refetch={refetch}
                        setIsCreateOpen={setIsCreateOpen}
                    />
                </TransitionsModal>
            </ReusableCard>
            <ConfirmDialog
                open={approve}
                hintTitle="آیا از حذف مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={deleteLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleDelete(deletedId)}

            />

        </>
    );
};

export default ProductPrice;
