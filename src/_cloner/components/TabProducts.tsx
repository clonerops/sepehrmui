import React, { useState, useEffect } from "react";
import { Button, Typography, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { toAbsoulteUrl } from "../helpers/AssetsHelper";
import { useGetProductTypes, useGetWarehouses } from "../../app/modules/generic/_hooks";
import FuzzySearch from "../helpers/Fuse";
import MuiDataGrid from "./MuiDataGrid";
import { columnsModalProduct } from "../../app/modules/order/helpers/columns";
import { IProducts } from "../../app/modules/product/core/_models";

type Props = {
    handleSelectionChange: any;
    productsByBrand: any;
};

const TabProducts = (props: Props) => {
    const productTypeTools = useGetProductTypes();
    const { data: warehouses } = useGetWarehouses();


    const [selectedTab, setSelectedTab] = useState<number>(-1);
    const [filteredTabs, setFilteredTabs] = useState<any>([]);
    const [tabResult, setTabResult] = useState<any>([]);
    const [results, setResults] = useState<IProducts[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState<any>("");

    useEffect(() => {
        const filtered = props.productsByBrand?.data.filter(
            (item: any) => item.productTypeId === selectedTab
        );
        setFilteredTabs(selectedTab === -1 ? props.productsByBrand?.data : filtered);
        setResults(selectedTab === -1 ? props.productsByBrand?.data : filtered);
        setSelectedWarehouse("")
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

    const onFilterProductByWarehouse = (e: SelectChangeEvent) => {
        setSelectedWarehouse(e.target.value);
        const filteredByWarehouse = filteredTabs.filter((i: any) => Number(i.warehouseId) === Number(e.target.value))
        if(e.target.value) {
            setResults(filteredByWarehouse)
        } else {
            setResults(filteredByWarehouse)
        }
        setTabResult(filteredByWarehouse)
    };

    return (
        <>
            <Button
                className={`${selectedTab == -1 ? "!bg-[#fcc615] !text-black" : ""
                    }`}
                onClick={() => onSelectTab(-1)}
            >
                {/* <Box
                    component="img"
                    src={toAbsoulteUrl(image(0))}
                    width={20}
                /> */}
                <Typography className="px-2">کل محصولات</Typography>
            </Button>

            {productTypeTools?.data?.map((item: any, index: number) => {
                return (
                    <Button
                        className={`${selectedTab == item.id
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
                        data={tabResult}
                        threshold={0.5}
                        setResults={setResults}
                    />
                    <FormControl size="small">
                        <InputLabel id="demo-simple-select-label">انبار</InputLabel>
                        <Select label="انبار" labelId="demo-simple-select-label" size="small" value={selectedWarehouse} onChange={onFilterProductByWarehouse}>
                            {warehouses.map((i: any) => {
                                return <MenuItem value={i.id}>{i.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <MuiDataGrid
                    onDoubleClick={props.handleSelectionChange}
                    columns={columnsModalProduct()}
                    rows={results}
                    data={filteredTabs}
                />
            </Box>
        </>
    );
};

export default TabProducts;
