import { useState, useEffect } from "react";
import { Fab, Typography } from "@mui/material";


import EditGridButton from "../../../_cloner/components/EditGridButton";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import Backdrop from "../../../_cloner/components/Backdrop";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ProductForm from "./ProductForm";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import CardWithIcons from "../../../_cloner/components/CardWithIcons";

import {  IProducts } from "./_models";
import {  useGetProducts } from "./_hooks";
import { AddTask, AdfScanner, DesignServices, TextDecrease } from "@mui/icons-material";

import _ from 'lodash'
import { ProductsColumn } from "../../../_cloner/helpers/columns";

const Products = () => {
    // const productTools = useRetrieveProducts()
    // const productTools = useGetProductList()
    const productTools = useGetProducts()

    const [results, setResults] = useState<IProducts[]>([]);

    useEffect(() => {
        setResults(productTools?.data?.data)
        // eslint-disable-next-line
    }, [productTools?.data?.data]);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [itemForEdit, setItemForEdit] = useState<IProducts>();


    const handleEdit = (item: IProducts) => {
        setIsEditOpen(true);
        setItemForEdit(item);
    };

    const renderAction = (item: any) => {
        return (
            <Fab size="small" color="secondary">
                <EditGridButton onClick={() => handleEdit(item?.row)} />
            </Fab>
        );
    };

    if(productTools?.isLoading) 
        return <Backdrop loading={productTools.isLoading} />

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 space-y-4 md:space-y-0 my-4">
                <CardWithIcons
                    title='تعداد سرویس های ثبت شده'
                    icon={<DesignServices className="text-white" />}
                    value={productTools?.data?.data && +productTools?.data?.data?.length}
                    iconClassName='bg-[#3322D8]' />
                <CardWithIcons
                    title='میانگین حداقل موجودی'
                    icon={<AddTask className="text-white" />}
                    value={Math.ceil(+_.sumBy(productTools?.data?.data && productTools?.data?.data, 'minInventory') / +productTools?.data?.data?.length)}
                    iconClassName='bg-[#369BFD]' />
                <CardWithIcons
                    title='میانگین حداکثر موجودی'
                    icon={<TextDecrease className="text-white" />}
                    value={Math.ceil(+_.sumBy(productTools?.data?.data && productTools?.data?.data, 'maxInventory') / +productTools?.data?.data?.length)}
                    iconClassName='bg-[#F8B30E]' />
                <CardWithIcons
                    title='میانگین نقطه بحرانی'
                    icon={<AdfScanner className="text-white" />}
                    value={Math.ceil(+_.sumBy(productTools?.data?.data && productTools?.data?.data, 'inventotyCriticalPoint') / +productTools?.data?.data?.length)}
                    iconClassName='bg-[#EB5553]' />
            </div>

            <ReusableCard>
                <div
                    className="md:flex md:justify-between md:items-center space-y-2 mb-4"
                >
                    <div className="w-auto md:w-[40%]">
                        <FuzzySearch
                            keys={[
                                "productCode",
                                "productName",
                                "productSize",
                                "approximateWeight",
                                "numberInPackage",
                                "productStandardDesc",
                                "productStateDesc",
                                "productMainUnitDesc",
                                "productSubUnitDesc",
                                "description",
                            ]}
                            data={productTools?.data?.data}
                            setResults={setResults}
                        />
                    </div>
                    <ButtonComponent
                        onClick={() => setIsCreateOpen(true)}
                    >
                        <Typography variant="h4" className="px-4 py-1 text-white">ایجاد کالا</Typography>
                    </ButtonComponent>
                </div>
                <MuiDataGrid
                    columns={ProductsColumn(renderAction)}
                    getRowId={(row: { id: string }) => row.id}
                    rows={results}
                    data={productTools?.data?.data}
                    onDoubleClick={(item: any) => handleEdit(item?.row)}
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
                    refetch={productTools.refetch}
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
                    refetch={productTools.refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>
        </>
    );
};

export default Products;
