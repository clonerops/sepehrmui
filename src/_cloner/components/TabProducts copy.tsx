import React, { ReactNode, useState, useEffect } from "react";
import {
    Tabs,
    Tab,
    Box,
    Typography,
    TabsPropsIndicatorColorOverrides,
} from "@mui/material";
import { useGetProductTypes } from "../../app/modules/generic/_hooks";
import { useRetrieveProductsByBrand } from "../../app/modules/product/core/_hooks";
import { IProducts } from "../../app/modules/product/core/_models";
import FuzzySearch from "../helpers/Fuse";
import MuiDataGrid from "./MuiDataGrid";
import { columnsModalProduct } from "../../app/modules/order/helpers/columns";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

interface ReusableTabProps {
    indicatorColor?: "primary" | "secondary";
    allProduct: React.ReactNode;
    handleSelectionChange: any;
    results: any;
    setResults: any;
    productsByBrand: any
}

const TabProducts: React.FC<ReusableTabProps> = ({
    indicatorColor = "secondary",
    allProduct,
    handleSelectionChange,
    results,
    setResults,
    productsByBrand
}) => {
    const productTypeTools = useGetProductTypes();
    const productTools = useRetrieveProductsByBrand();

    const [value, setValue] = useState(-1);
    const [filteredData, setFilteredData] = useState<IProducts[]>([]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        setFilteredData(
            productTools?.data?.data.filter(
                (item: any) => item.productTypeId === value
            )
        );
    }, [value]);

    useEffect(() => {
        if (filteredData) setResults(filteredData);
    }, [filteredData]);

    return (
        // <Box sx={{ bgcolor: "" }}>
        <Box sx={{}}>
            <Tabs
                className="rounded-2xl"
                variant="fullWidth"
                // orientation="vertical"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#D97D54",
                    },
                }}
                sx={
                    {
                        // "& .MuiTabs-flexContainer": {
                        //     flexWrap: "wrap",
                        // },
                        // borderRight: 1,
                        // borderColor: 'divider'
                    }
                }
                indicatorColor={indicatorColor}
                value={value}
                onChange={handleChange}
                centered
            >
                <Tab key={0} label={<Typography>کل محصولات</Typography>} />
                {productTypeTools?.data?.map((tab: any, index: number) => (
                    <Tab
                        key={index}
                        label={<Typography>{tab.desc}</Typography>}
                    />
                ))}
            </Tabs>
            {filteredData?.map((tab: any, index: number) =>
                value === -1 ? (
                    <TabPanel key={-1} value={-1} index={-1}>
                        <FuzzySearch
                            keys={["productName"]}
                            data={productsByBrand?.data}
                            threshold={0.5}
                            setResults={results}
                        />

                        <MuiDataGrid
                            onDoubleClick={handleSelectionChange}
                            columns={columnsModalProduct()}
                            rows={results}
                            data={productsByBrand?.data}
                        />
                    </TabPanel>
                ) : (
                    <TabPanel key={index} value={value} index={index}>
                        <>
                            <Box
                                component="div"
                                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-2"
                            >
                                <FuzzySearch
                                    keys={["productName"]}
                                    data={tab}
                                    threshold={0.5}
                                    setResults={setResults}
                                />
                            </Box>
                            <MuiDataGrid
                                onDoubleClick={handleSelectionChange}
                                columns={columnsModalProduct()}
                                rows={results}
                                data={tab}
                            />
                        </>
                    </TabPanel>
                )
            )}
        </Box>
    );
};

export default TabProducts;
