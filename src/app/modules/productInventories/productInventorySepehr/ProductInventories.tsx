import { useEffect, useState } from "react";
import { DownloadExcelBase64File } from "../../../../_cloner/helpers/downloadFiles";
import { Alert, Button, Fab, Tooltip, Typography } from "@mui/material";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/assetsHelper";
import { useUploadFileProductInventories } from "../_hooks";
import { exportProductInventories } from "../_requests";
import { useGetProductList } from "../../products/_hooks";
import { IProducts } from "../../products/_models";
import { Add } from "@mui/icons-material";
import { SepehrInventoryColumn } from "../../../../_cloner/helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import Backdrop from "../../../../_cloner/components/Backdrop";
import FuzzySearch from "../../../../_cloner/helpers/fuse";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import CreateProductInventories from "./CreateProductInventories";
import UploadFileInventorySepehr from "./UploadFileInventorySepehr";
import DownloadInventory from "./DownloadInventory";

const ProductInventoriesSepehr = () => {
    const uploadFileMethode = useUploadFileProductInventories();
    const filterTools = useGetProductList();
    // State
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isUploadpen, setIsUploadOpen] = useState<boolean>(false);
    const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
    const [productItem, setProductItem] = useState<{row: IProducts}>()
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        const filter = { ByBrand: true, warehouseId: 1 }
        filterTools.mutate(filter, {
            onSuccess: (res) => {
                setResults(res?.data)
            }
        });
         // eslint-disable-next-line
    }, []);


    const handleDownloadExcel = async () => {
        const filter = { WarehouseId: 1 }
        try {
            const response: any = await exportProductInventories(filter);
            const outputFilename = `ProductInventories${Date.now()}.csv`;
            DownloadExcelBase64File(response?.data, outputFilename);
        } catch (error) {
            console.log(error);
        }
    };

    const renderIncreaseInventory = (item: {row: IProducts}) => {
        return <Tooltip title={<Typography variant='h3'>افزایش موجودی</Typography>}>
            <Fab size="small" color="secondary" onClick={() => handleOpenModal(item)}>
                <Add /> 
            </Fab>
        </Tooltip>
    }

    const handleOpenModal = (item: {row: IProducts}) => {
        setProductItem(item)
        setIsCreateOpen(true)
    }

    return (
        <>
            {uploadFileMethode.isLoading && <Backdrop loading={uploadFileMethode.isLoading} />}
            <Alert color="info" className="mb-4">
                <div>
                    <Typography variant="h3" color="red" className="pb-4">جهت آپلود فایل موجودی روزانه، رعایت موارد زیر الزامی باشد</Typography>
                    <ul className="space-y-4">
                        <Typography variant="h4">فرمت فایل باید بصورت اکسل (xlsx.) باشد</Typography>
                    </ul>
                </div>
            </Alert>
            <ReusableCard>
                <div className="md:flex md:justify-between md:items-center space-y-2 mb-4"
                >
                    <div className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={["productCode", "productName", "productBrandName", "warehouseName", "inventory"]}
                            data={filterTools?.data?.data}
                            setResults={setResults}
                        />
                    </div>
                    <div className="flex flex-wrap gap-x-4">
                        <Button
                            onClick={() => setIsUploadOpen(true)}
                            variant="outlined"
                            color="secondary"
                        >
                            <Typography>آپلود فایل</Typography>
                        </Button>
                        <Button
                            onClick={handleDownloadExcel}
                            variant="outlined"
                            color="success"
                        >
                            <Typography>خروجی اکسل</Typography>
                        </Button>
                        <Button
                            onClick={() => setIsDownloadOpen(true)}
                            variant="outlined"
                            color="primary"
                        >
                            <Typography>خروجی اکسل براساس تاریخ</Typography>
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 mt-4">
                    <div className="col-span-2">
                        <MuiDataGrid
                            columns={SepehrInventoryColumn(renderIncreaseInventory)}
                            isLoading={filterTools.isLoading}
                            rows={results}
                            data={filterTools?.data?.data}
                            height={400}
                            onDoubleClick={(item: any) => handleOpenModal(item)}
                        />
                    </div>
                    <div>
                        <div
                        
                            className="hidden md:flex md:justify-center md:items-center"
                        >
                            <img alt="sepehriranian"
                                src={toAbsoulteUrl("/media/logos/11089.jpg")}
                                width={400}
                            />
                        </div>

                    </div>

                </div>
                <TransitionsModal
                    open={isCreateOpen}
                    isClose={() => setIsCreateOpen(false)}
                    width="50%"
                    title="ایجاد موجودی قابل فروش"
                >
                    <CreateProductInventories productItem={productItem} />
                </TransitionsModal>
                <TransitionsModal
                    open={isUploadpen}
                    isClose={() => setIsUploadOpen(false)}
                    width="50%"
                    title="آپلود فایل موجودی"
                >
                    <UploadFileInventorySepehr />
                </TransitionsModal>
                <TransitionsModal
                    open={isDownloadOpen}
                    isClose={() => setIsDownloadOpen(false)}
                    width="50%"
                    title="دریافت فایل موجودی"
                >
                    <DownloadInventory />
                </TransitionsModal>
            </ReusableCard>
        </>
    );
};

export default ProductInventoriesSepehr;
