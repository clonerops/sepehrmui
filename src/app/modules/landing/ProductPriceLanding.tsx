import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableTabComponent from "../../../_cloner/components/ReusableTab";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import { useRetrieveProductsByType } from "../generic/products/_hooks";
import { columnsProductPriceDashboard } from "../generic/productPrices/_columns";
import Backdrop from "../../../_cloner/components/Backdrop";

const ProductPriceLanding = () => {
    const { data: productsByType, isLoading } = useRetrieveProductsByType();

    const [results, setResults] = useState<any>([]);

    useEffect(() => {
        if (productsByType && productsByType.data) {
            const initialResults = productsByType.data.map((i: any) => i.products);
            setResults(initialResults);
        }
    }, [productsByType]);

    const renderAction = () => { };
    const tabs = productsByType?.data?.map((i: any, index: number) => {
        return {
            label: (
                <Box component="div" className="flex gap-x-2">
                    <Typography variant="h5">{i.desc}</Typography>
                </Box>
            ),
            content: (
                <Box>
                    <Box component="div" className="pb-4">
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
                    </Box>
                    <MuiDataGrid
                        columns={columnsProductPriceDashboard(renderAction)}
                        rows={results[index]}
                        data={i.products}
                        isLoading={isLoading}
                    />
                </Box>
            ),
        };
    });
    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            <Box component="div" className="flex flex-col">
                <ReusableTabComponent tabs={tabs} />
            </Box>
        </>
    );
};

export default ProductPriceLanding;
