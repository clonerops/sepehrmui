import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";


import EditGridButton from "../../../../_cloner/components/EditGridButton";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import Backdrop from "../../../../_cloner/components/Backdrop";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import ActiveText from "../../../../_cloner/components/ActiveText";
import ProductForm from "./ProductForm";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { useDisableProduct, useRetrieveProducts } from "./_hooks";
import { IProducts } from "./_models";
import CardInformation from "../../../../_cloner/components/CardInformation";
import _ from 'lodash'
import CardWithIcons from "../../../../_cloner/components/CardWithIcons";
import { AddTask, AdfScanner, DesignServices, TextDecrease } from "@mui/icons-material";

const Products = () => {
    const {
        data: products,
        isLoading: productsLoading,
        refetch,
    } = useRetrieveProducts();
    const {
        mutate,
        data: deleteData,
        isLoading: deleteLoading,
    } = useDisableProduct();
    const [results, setResults] = useState<IProducts[]>([]);

    useEffect(() => {
        setResults(products?.data);
    }, [products]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IProducts>();

    const columns = (renderAction: any) => {
        const col = [
            {
                field: "productCode",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "کد کالا",
                cellClassName: "font-bold",
                headerClassName: "headerClassName",
                minWidth: 60,
                maxWidth: 80,
                flex: 1,
            },
            {
                field: "productName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام کالا",
                cellClassName: "bg-green-100 font-bold",
                headerClassName: "headerClassName",
                minWidth: 240,
                flex: 1,
            },
            {
                field: "productTypeDesc",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "نوع کالا",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "isActive",
                renderCell: (params: any) => {
                    return (
                        <ActiveText
                            params={params}
                            successTitle="فعال"
                            dangerTitle="غیرفعال"
                        />
                    );
                },
                headerName: "وضعیت",
                headerClassName: "headerClassName",
                minWidth: 60,
                flex: 1,
            },
            {
                field: "productSize",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "سایز",
                headerClassName: "headerClassName",
                minWidth: 60,
                flex: 1,
            },
            {
                field: "productThickness",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "ضخامت",
                headerClassName: "headerClassName",
                minWidth: 60,
                flex: 1,
            },
            {
                field: "approximateWeight",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "وزن",
                headerClassName: "headerClassName",
                minWidth: 60,
                flex: 1,
            },
            {
                field: "numberInPackage",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "تعداد در بسته",
                headerClassName: "headerClassName",
                minWidth: 100,
                flex: 1,
            },
            {
                field: "productStandardDesc",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "استاندارد",
                headerClassName: "headerClassName",
                maxWidth: 70,
                minWidth: 70,
                flex: 1,
            },
            {
                field: "productStateDesc",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "حالت",
                headerClassName: "headerClassName",
                maxWidth: 70,
                minWidth: 70,
                flex: 1,
            },
            {
                field: "productMainUnitDesc",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "واحد اصلی",
                headerClassName: "headerClassName",
                maxWidth: 70,
                minWidth: 70,
                flex: 1,
            },
            {
                field: "productSubUnitDesc",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "واحد فرعی",
                headerClassName: "headerClassName",
                maxWidth: 70,
                minWidth: 70,
                flex: 1,
            },
            {
                field: "maxInventory",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "حداکثر موجودی",
                headerClassName: "headerClassName",
                maxWidth: 100,
                minWidth: 100,

                flex: 1,
            },
            {
                field: "minInventory",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "حداقل موجودی",
                headerClassName: "headerClassName",
                maxWidth: 100,
                minWidth: 100,

                flex: 1,
            },
            {
                field: "inventotyCriticalPoint",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "نقطه بحرانی",
                headerClassName: "headerClassName",
                maxWidth: 100,
                minWidth: 100,

                flex: 1,
            },
            {
                headerName: "عملیات",
                flex: 1,
                renderCell: renderAction,
                headerClassName: "headerClassName w-full",
                minWidth: 160,
            },
        ];
        return col;
    };

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
        return (
            <Box component="div" className="flex gap-4">
                <EditGridButton onClick={() => handleEdit(item?.row)} />
                {/* <DeleteGridButton onClick={() => handleDelete(item?.row?.id)} /> */}
            </Box>
        );
    };

    return (
        <>
            {deleteLoading && <Backdrop loading={deleteLoading} />}
            {productsLoading && <Backdrop loading={productsLoading} />}
            <Box component="div" className="grid grid-cols-1 md:grid-cols-4 gap-x-8 space-y-4 md:space-y-0 my-4">
                <CardWithIcons
                    title='تعداد سرویس های ثبت شده'
                    icon={<DesignServices className="text-white" />}
                    value={products?.data && +products?.data?.length}
                    iconClassName='bg-[#3322D8]' />
                <CardWithIcons
                    title='میانگین حداقل موجودی'
                    icon={<AddTask className="text-white" />}
                    value={Math.ceil(+_.sumBy(products?.data && products?.data, 'minInventory') / +products?.data?.length)}
                    iconClassName='bg-[#369BFD]' />
                <CardWithIcons
                    title='میانگین حداکثر موجودی'
                    icon={<TextDecrease className="text-white" />}
                    value={Math.ceil(+_.sumBy(products?.data && products?.data, 'maxInventory') / +products?.data?.length)}
                    iconClassName='bg-[#F8B30E]' />
                <CardWithIcons
                    title='میانگین نقطه بحرانی'
                    icon={<AdfScanner className="text-white" />}
                    value={Math.ceil(+_.sumBy(products?.data && products?.data, 'inventotyCriticalPoint') / +products?.data?.length)}
                    iconClassName='bg-[#EB5553]' />
            </Box>

            <ReusableCard>
                <Box
                    component="div"
                    className="md:flex md:justify-between md:items-center space-y-2 mb-4"
                >
                    <Box component="div" className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={[
                                "productCode",
                                "productName",
                                "productDetail.size",
                                "productDetail.productIntegratedName",
                                "approximateWeight",
                                "numberInPackage",
                                "productDetail.standard",
                                "productDetail.productState",
                                "description",
                            ]}
                            data={products?.data}
                            // threshold={0.5}
                            setResults={setResults}
                        />
                    </Box>
                    <ButtonComponent
                        onClick={() => setIsCreateOpen(true)}
                    >
                        <Typography variant="h4" className="px-4 py-1 text-white">ایجاد کالا</Typography>
                    </ButtonComponent>
                </Box>
                <MuiDataGrid
                    columns={columns(renderAction)}
                    getRowId={(row: { id: string }) => row.id}
                    rows={results}
                    data={products?.data}
                />
            </ReusableCard>
            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد محصول جدید"
                width="60%"
                description="لطفاً مشخصات محصول را با دقت وارد کنید تا مشتریان به آسانی اطلاعات مورد نیاز را بیابند اگر سوال یا نیاز به راهنمایی بیشتر دارید، با تیم پشتیبانی تماس بگیرید."
            >
                <ProductForm
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
            <TransitionsModal
                open={isEditOpen}
                isClose={() => setIsEditOpen(false)}
                title="ویرایش محصول جدید"
                width="60%"
                description=" درصورتی که محصولی نیاز به ویرایش داشته باشد می توانید از طریق فرم زیر اقدام به ویرایش محصول نمایید"
            >
                <ProductForm
                    id={itemForEdit?.id}
                    refetch={refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
        </>
    );
};

export default Products;
