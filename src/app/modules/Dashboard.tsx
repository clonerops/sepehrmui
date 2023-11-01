import React, { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { useRetrieveProducts } from "./product/core/_hooks";
import { VerticalCharts } from "../../_cloner/components/VerticalCharts";
import BreadcrumbsComponent from "../../_cloner/components/Breadcumbs";
import { VariableRadiusPieChart } from "../../_cloner/components/VariableRadiusPieChart";
import { BubbleChart } from "../../_cloner/components/BubbleChart ";
import { ColumnChart } from "../../_cloner/components/ColumnChart";
import ReusableCard from "../../_cloner/components/ReusableCard";
import ProductPriceLanding from "./landing/ProductPriceLanding";
import BottomDrawer from "../../_cloner/components/BottomSheetDrawer";

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

                <ReusableCard>
                    <VariableRadiusPieChart data={data} />
                </ReusableCard>
                <ReusableCard>
                    <ColumnChart data={data} />
                </ReusableCard>
                {/* <BottomDrawer
                 open={isDrawerOpen} onClose={handleCloseDrawer} title="My Bottom Drawer">
                    {/* Content for the drawer */}
                    {/* <p>This is the content of the drawer.</p>
                </BottomDrawer> */}
            </Box>
        </>
    );
};

export default Dashboard;
