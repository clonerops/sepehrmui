import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { useRetrieveProducts } from "./product/core/_hooks";
import { VerticalCharts } from "../../_cloner/components/VerticalCharts";
import BreadcrumbsComponent from "../../_cloner/components/Breadcumbs";
import { VariableRadiusPieChart } from "../../_cloner/components/VariableRadiusPieChart";
import { BubbleChart } from "../../_cloner/components/BubbleChart ";
import { ColumnChart } from "../../_cloner/components/ColumnChart";

const Dashboard = () => {
    const { data: products, isError, isLoading } = useRetrieveProducts();
    const data = [
        { name: "نبشی 8", y: 10, z: 10 },
        { name: "میلگرد 10", y: 20, z: 20 },
    ];
    return (
        <>
            <Box
                component="div"
                className="flex flex-col md:flex-row justify-center items-center gap-8 my-8 md:my-0"
            >
                <Card elevation={1}>
                    <VariableRadiusPieChart data={data} />
                </Card>
                <Card elevation={1}>
                    <ColumnChart data={data} />
                </Card>

                {/* <BubbleChart data={bubbleData} /> */}
                {/* <Box component="div" className="w-full">
                        <VerticalCharts
                            data={products?.data?.map((item: any) => item.productInventories.map((i: any) => i.approximateInventory))}
                            categories={products?.data?.map(
                                (item: any) => item.productName
                            )}
                            isLoading={isLoading}
                            isError={isError}
                            text=""
                        />
                    </Box> */}
            </Box>
        </>
    );
};

export default Dashboard;
