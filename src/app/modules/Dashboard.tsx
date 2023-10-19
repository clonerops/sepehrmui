import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { useRetrieveProducts } from "./product/core/_hooks";
import { VerticalCharts } from "../../_cloner/components/VerticalCharts";
import BreadcrumbsComponent from "../../_cloner/components/Breadcumbs";
import { VariableRadiusPieChart } from "../../_cloner/components/VariableRadiusPieChart";
import { BubbleChart } from "../../_cloner/components/BubbleChart ";

const Dashboard = () => {
    const { data: products, isError, isLoading } = useRetrieveProducts()
    const data = [
        { name: 'Category 1', y: 10, z: 10 },
        { name: 'Category 2', y: 20, z: 20 },
      ];
    return (
        <>
            <Card>
                <Box component="div" className="flex flex-row flex-wrap justify-start items-start">
                    <VariableRadiusPieChart data={data} />
                    {/* <BubbleChart data={bubbleData} /> */}
                    <Box component="div" className="w-full">
                        <VerticalCharts
                            data={products?.data?.map((item: any) => item.productInventories.map((i: any) => i.approximateInventory))}
                            categories={products?.data?.map(
                                (item: any) => item.productName
                            )}
                            isLoading={isLoading}
                            isError={isError}
                            text=""
                        />
                    </Box>
                </Box>
            </Card>
        </>
    );
};

export default Dashboard;
