import { useEffect, useRef, useState } from "react";
import { DownloadExcelBase64File } from "../../../../../_cloner/helpers/DownloadFiles";
import Backdrop from "../../../../../_cloner/components/Backdrop";
import { Alert, Box, Button, Typography } from "@mui/material";
import ReusableCard from "../../../../../_cloner/components/ReusableCard";
import FuzzySearch from "../../../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../../../_cloner/components/MuiDataGrid";
import { columnsProductInventories } from "./columns";
import { toAbsoulteUrl } from "../../../../../_cloner/helpers/AssetsHelper";
import TransitionsModal from "../../../../../_cloner/components/ReusableModal";
import CreateProductInventories from "./CreateProductInventories";
import { useUploadFileProductInventories } from "../_hooks";
import { exportProductInventories } from "../_requests";
import { useGetProductList } from "../../products/_hooks";
import { IProducts } from "../../products/_models";
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
        return <Button variant="contained" color="secondary" onClick={() => handleOpenModal(item)}>
            <Typography>افزایش موجودی</Typography>
        </Button>
    }

    const handleOpenModal = (item: {row: IProducts}) => {
        setProductItem(item)
        setIsCreateOpen(true)
    }

    return (
        <>
            {uploadFileMethode.isLoading && <Backdrop loading={uploadFileMethode.isLoading} />}
            <Alert color="info" className="mb-4">
                <Box>
                    <Typography variant="h3" color="red" className="pb-4">جهت آپلود فایل موجودی روزانه، رعایت موارد زیر الزامی باشد</Typography>
                    <ul className="space-y-4">
                        <Typography variant="h4">فرمت فایل باید بصورت اکسل (xlsx.) باشد</Typography>
                        <Typography variant="h4">ترتیب فیلدها مهم می باشد: کد کالابرند، کدانبار، موجودی تقریبی، موجودی کف، حداکثر موجودی، حداقل موجودی</Typography>
                    </ul>
                </Box>
            </Alert>
            <ReusableCard>
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2 mb-4"
                >
                    <Box component="div" className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={["productCode", "productName", "productBrandName", "warehouseName", "inventory"]}
                            data={filterTools?.data?.data}
                            setResults={setResults}
                        />
                    </Box>
                    <Box component="div" className="flex flex-wrap gap-x-4">
                    {/* <FileUploadButton uploadFileMethode={uploadFileMethode} /> */}
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
                            color="primary"
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
                    </Box>
                </Box>
                <Box className="grid grid-cols-1 lg:grid-cols-2 mt-4">
                    <MuiDataGrid
                        columns={columnsProductInventories(renderIncreaseInventory)}
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
