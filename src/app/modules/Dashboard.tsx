import { Box, Typography } from "@mui/material";
import { MonetizationOn } from '@mui/icons-material';
import { counterValue } from "../../_cloner/helpers/counterValue";
import { ColumnChart } from "../../_cloner/components/ColumnChart";
import { separateAmountWithCommas } from "../../_cloner/helpers/SeprateAmount";
import { FC, useEffect, useState } from "react";
import { VariableRadiusPieChart3D } from "../../_cloner/components/VariableRadiusPieChart3D";

import ReusableCard from "../../_cloner/components/ReusableCard";
import MonitoringProdcuct from "../../_cloner/components/MonitoringProduct";

interface ICardInformation {
    title: string
    cardClassName: string
    value: any
}

const CardInformation: FC<ICardInformation> = ({ title, value, cardClassName }) => {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        counterValue(value, setCounter)
    }, [value]);
    
    return (
        <ReusableCard cardClassName={cardClassName}>
            <Box component="div" className="flex justify-between items-center space-y-4">
                <Typography variant="body1" className="text-white">{title}</Typography>
                <MonetizationOn className="!text-white" />
            </Box>
            <Typography variant="h2" data-target={value} className="text-white">
            {separateAmountWithCommas(counter)}
            </Typography>
        </ReusableCard>

    )
}


const Dashboard = () => {

    const data = [
        { name: "نبشی 8", y: 10, z: 10 },
        { name: "میلگرد 10", y: 20, z: 20 },
    ];

    return (
        <>
            <Box component="div" className="grid grid-cols-1 md:grid-cols-4 gap-x-8 space-y-4 md:space-y-0 my-4">
                <CardInformation cardClassName="!bg-[#3322D8]" title="تعداد سفارشات" value={25878} />
                <CardInformation cardClassName="!bg-[#369BFD]" title="فروش امروز" value={43242} />
                <CardInformation cardClassName="!bg-[#F8B30E]" title="میانگین قیمت" value={77754} />
                <CardInformation cardClassName="!bg-[#EB5553]" title="درآمد" value={77754} />
            </Box>
            <Box component="div" className="grid md:grid-cols-1 lg:grid-cols-2 gap-x-8">
                <ReusableCard>
                    <Typography variant="h2" className="pb-8 px-2">مانیتورینگ محصولات</Typography>
                    <MonitoringProdcuct />
                </ReusableCard>
                <Box className="flex flex-col gap-y-4">
                    <ReusableCard>
                        <ColumnChart data={data} />
                    </ReusableCard>
                    <ReusableCard>
                        <VariableRadiusPieChart3D data={data} />
                    </ReusableCard>
                </Box>
            </Box>

        </>
    );
};

export default Dashboard;
