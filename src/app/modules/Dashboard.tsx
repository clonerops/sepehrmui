import { Box, Card, Typography } from "@mui/material";
import { useRetrieveProducts } from "./product/core/_hooks";
import { VerticalCharts } from "../../_cloner/components/VerticalCharts";

const Dashboard = () => {
    const { data: products, isError, isLoading } = useRetrieveProducts()
    return (
        <>
            <Card>
                <Box component="div" className="flex flex-col justify-start items-start">
                    {/* <Box component="div" className="flex flex-col space-y-4">
                        <Typography variant="h3" className="text-3xl text-primary">کارخانه فولاد سپهر ایرانیان</Typography>
                        <Typography variant="h3" className="text-md">تولید کننده انواع میلگرد آجدار ، نبشی و ناودانی</Typography>
                    </Box> */}
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
