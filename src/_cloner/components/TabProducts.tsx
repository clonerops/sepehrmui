import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { toAbsoulteUrl } from "../helpers/AssetsHelper";
import { useGetProductTypes } from "../../app/modules/generic/_hooks";
import FuzzySearch from "../helpers/Fuse";
import MuiDataGrid from "./MuiDataGrid";
import { columnsModalProduct } from "../../app/modules/order/helpers/columns";
import { IProducts } from "../../app/modules/product/core/_models";

type Props = {
    handleSelectionChange: any;
    productsByBrand: any;
    setResults: any;
    results: any;
};

const TabProducts = (props: Props) => {
    const productTypeTools = useGetProductTypes();

    const [selectedTab, setSelectedTab] = useState<number>(-1);
    const [filteredTabs, setFilteredTabs] = useState<any>([]);

    useEffect(() => {
        const filtered = props.productsByBrand?.data.filter(
            (item: any) => item.productTypeId === selectedTab
        );
        setFilteredTabs(selectedTab === -1 ? props.productsByBrand?.data : filtered);
    }, [selectedTab]);

    const imageUrl = [
        { id: 1, url: "/media/product/border-design.png" },
        { id: 2, url: "/media/product/tubes.png" },
        { id: 3, url: "/media/product/beam.png" },
        { id: 4, url: "/media/product/steel.png" },
        { id: 5, url: "/media/product/tissue-roll.png" },
        { id: 6, url: "/media/product/conveyor-belt.png" },
        { id: 7, url: "/media/product/can.png" },
    ];
    const image: any = (index: number) => {
        switch (index) {
            case 0:
                return imageUrl[0].url;
            case 1:
                return imageUrl[1].url;
            case 2:
                return imageUrl[2].url;
            case 3:
                return imageUrl[3].url;
            case 4:
                return imageUrl[4].url;
            case 5:
                return imageUrl[5].url;
            case 6:
                return imageUrl[6].url;

            default:
                break;
        }
    };

    const onSelectTab = (id: any) => {
        setSelectedTab(id);
    };

    return (
        <>
            <Button
                className={`${
                    selectedTab == -1 ? "!bg-[#fcc615] !text-black" : ""
                }`}
                onClick={() => onSelectTab(-1)}
            >
                <Box
                    component="img"
                    src={toAbsoulteUrl(image(0))}
                    width={20}
                />
                <Typography className="px-2">کل محصولات</Typography>
            </Button>

            {productTypeTools?.data?.map((item: any, index: number) => {
                return (
                    <Button
                        className={`${
                            selectedTab == item.id
                                ? "!bg-[#fcc615] !text-black"
                                : ""
                        }`}
                        onClick={() => onSelectTab(item.id)}
                    >
                        <Box
                            component="img"
                            src={toAbsoulteUrl(image(index))}
                            width={20}
                        />
                        <Typography className="px-2">{item.desc}</Typography>
                    </Button>
                );
            })}
            <Box component="div" className="mt-4">
                <Box
                    component="div"
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-2"
                >
                    <FuzzySearch
                        keys={["productName"]}
                        data={filteredTabs}
                        threshold={0.5}
                        setResults={props.setResults}
                    />
                </Box>
                <MuiDataGrid
                    onDoubleClick={props.handleSelectionChange}
                    columns={columnsModalProduct()}
                    rows={filteredTabs}
                    data={filteredTabs}
                />
            </Box>
        </>
    );
};

export default TabProducts;
