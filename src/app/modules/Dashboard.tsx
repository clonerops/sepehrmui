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
import { MonetizationOn } from '@mui/icons-material';
import { separateAmountWithCommas } from "../../_cloner/helpers/SeprateAmount";
const Dashboard = () => {
    const { data: products, isError, isLoading } = useRetrieveProducts();
    const data = [
        { name: "نبشی 8", y: 10, z: 10 },
        { name: "میلگرد 10", y: 20, z: 20 },
    ];

    return (
        <>
            <Box component="div" className="grid grid-cols-4 gap-x-8 my-4">
                <ReusableCard>
                    <Box component="div" className="flex justify-between items-center space-y-4">
                        <Typography variant="body1">تعداد سفارشات</Typography>
                        <MonetizationOn color="primary" />
                    </Box>
                    <Typography variant="h2">{separateAmountWithCommas(25878)}</Typography>
                </ReusableCard>
                <ReusableCard>
                    <Box component="div" className="flex justify-between items-center space-y-4">
                        <Typography variant="body1">فروش امروز</Typography>
                        <MonetizationOn color="primary" />
                    </Box>
                    <Typography variant="h2">{separateAmountWithCommas(786564)}</Typography>
                </ReusableCard>
                <ReusableCard>
                    <Box component="div" className="flex justify-between items-center space-y-4">
                        <Typography variant="body1">میانگین قیمت</Typography>
                        <MonetizationOn color="primary" />
                    </Box>
                    <Typography variant="h2">{separateAmountWithCommas(5343)}</Typography>
                </ReusableCard>
                <ReusableCard>
                    <Box component="div" className="flex justify-between items-center space-y-4">
                        <Typography variant="body1">درآمد</Typography>
                        <MonetizationOn color="primary" />
                    </Box>
                    <Typography variant="h2">{separateAmountWithCommas(42342441265)}</Typography>
                </ReusableCard>
            </Box>
            <Box
                component="div"
                // className="flex flex-col md:flex-row justify-center items-center gap-8 my-8 md:my-0"
                className="grid grid-cols-2 gap-x-8"
            >

                <ReusableCard>
                    <VariableRadiusPieChart data={data} />
                </ReusableCard>
                <ReusableCard>
                    <ColumnChart data={data} />
                </ReusableCard>
            </Box>
        </>
    );
};

export default Dashboard;
