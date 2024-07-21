import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableTabComponent from "../../../_cloner/components/ReusableTab";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import { useRetrieveProductsByType } from "../products/_hooks";
import { columnsProductPriceDashboard } from "../productPrices/_columns";
import Backdrop from "../../../_cloner/components/Backdrop";

const ProductPriceLanding = () => {
    const { data: productsByType, isLoading } = useRetrieveProductsByType();

    const [results, setResults] = useState<any>([]);

    useEffect(() => {
        if (productsByType && productsByType.data) {
            const initialResults = productsByType.data.map((i: any) => i.products);
            setResults(initialResults);
        }
         // eslint-disable-next-line
    }, [productsByType]);

    const renderAction = () => { };
    const tabs = productsByType?.data?.map((i: any, index: number) => {
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
                        columns={columnsProductPriceDashboard(renderAction)}
                        rows={results[index]}
                        data={i.products}
                        isLoading={isLoading}
                    />
                </div>
            ),
        };
    });
    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            <div className="flex flex-col">
                <ReusableTabComponent tabs={tabs} />
            </div>
        </>
    );
};

export default ProductPriceLanding;
