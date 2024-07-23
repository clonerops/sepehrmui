import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableTabComponent from "../../../_cloner/components/ReusableTab";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import Backdrop from "../../../_cloner/components/Backdrop";
import { useGetProductsByType } from "../products/_hooks";
import { IProductFilters } from "../products/_models";
import { ProductPricesColumn } from "../../../_cloner/helpers/columns";

const ProductPriceLanding = () => {
    // const { data: productsByType, isLoading } = useRetrieveProductsByType();
    const productTypeTools = useGetProductsByType();

    const [results, setResults] = useState<any>([]);

    useEffect(() => {
        const filters: IProductFilters = {}

        productTypeTools.mutate(filters, {
            onSuccess: (response) => {
                if (response?.data.length > 0) {
                    const initialResults = response?.data.map((i: any) => i.products);
                    setResults(initialResults);
                }
            }
        })
         // eslint-disable-next-line
    }, [productTypeTools?.data?.data]);

    const renderAction = () => { };
    const tabs = productTypeTools?.data?.data?.map((i: any, index: number) => {
        return {
            label: (
                <div className="flex gap-x-2">
                    <Typography variant="h5">{i.desc}</Typography>
                </div>
            ),
            content: (
                <div>
                    <div className="pb-4">
                        <FuzzySearch
                            keys={["productName", "productBrandName"]}
                            data={i.products}
                            threshold={0.5}
                            setResults={(newResults: any) => {
                                const updatedResults = [...results];
                                updatedResults[index] = newResults;
                                setResults(updatedResults);
                            }}
                        />
                    </div>
                    <MuiDataGrid
                        columns={ProductPricesColumn(renderAction)}
                        rows={results[index]}
                        data={i.products}
                        isLoading={productTypeTools.isLoading}
                    />
                </div>
            ),
        };
    });
    return (
        <>
            {productTypeTools.isLoading && <Backdrop loading={productTypeTools.isLoading} />}
            <div className="flex flex-col">
                <ReusableTabComponent tabs={tabs} />
            </div>
        </>
    );
};

export default ProductPriceLanding;
