import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { columnsModalProduct } from "../order/helpers/columns";
import {
    useRetrieveProductsByBrand,
    useRetrieveProductsByType,
} from "../product/core/_hooks";
import {
    columnsProductPrice,
    columnsProductPriceDashboard,
} from "../product/helpers/columns";
import ReusableTabComponent from "../../../_cloner/components/ReusableTab";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";
import FuzzySearch from "../../../_cloner/helpers/Fuse";

const ProductPriceLanding = () => {
    const { data: productsByType } = useRetrieveProductsByType();

    const [results, setResults] = useState<any>([]);

    const imageUrl = [
        { id: 1, url: "/media/product/border-design.png" },
        { id: 2, url: "/media/product/tubes.png" },
        { id: 3, url: "/media/product/beam.png" },
        { id: 4, url: "/media/product/steel.png" },
        { id: 5, url: "/media/product/tissue-roll.png" },
        { id: 6, url: "/media/product/conveyor-belt.png" },
        { id: 7, url: "/media/product/can.png" },
    ];

    const renderAction = () => {};
    const tabs = productsByType?.data?.map((i: any) => {
        const image: any = () => {
            switch (i.id) {
                case 1: 
                    return imageUrl[0].url;
                case 2:
                    return imageUrl[1].url;
                case 3:
                    return imageUrl[2].url;
                case 4:
                    return imageUrl[3].url;
                case 5:
                    return imageUrl[4].url;
                case 6:
                    return imageUrl[5].url;
                case 7:
                    return imageUrl[6].url;

                default:
                    break;
            }
        };
        return {
            label: (
                <Box component="div" className="flex gap-x-2">
                    <Box
                        component="img"
                        src={toAbsoulteUrl(image()?.toString())}
                        width={16}
                    />
                    <Typography variant="h5">{i.desc}</Typography>
                </Box>
            ),
            content: (
                <Box>
                    <FuzzySearch
                            keys={["productName", "productBrandName"]}
                            data={i.products}
                            threshold={0.5}
                            setResults={setResults}
                        />
                    <MuiDataGrid
                        columns={columnsProductPriceDashboard(renderAction)}
                        rows={i.products}
                        data={i.products}
                    />
                </Box>
            ),
        };
    });
    return (
        <>
            <Box component="div" className="flex flex-col pb-4">
                <ReusableTabComponent tabs={tabs} />
            </Box>
        </>
    );
};

export default ProductPriceLanding;
