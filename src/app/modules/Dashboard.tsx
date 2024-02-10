import { Box, Typography } from "@mui/material";
import { MonetizationOn } from '@mui/icons-material';

import { VariableRadiusPieChart } from "../../_cloner/components/VariableRadiusPieChart";
import { ColumnChart } from "../../_cloner/components/ColumnChart";
import ReusableCard from "../../_cloner/components/ReusableCard";
import { separateAmountWithCommas } from "../../_cloner/helpers/SeprateAmount";
import { FC } from "react";

interface ICardInformation {
    title: string
    cardClassName: string
    value: any
}

const CardInformation: FC<ICardInformation> = ({ title, value, cardClassName }) => {
    return (
        <ReusableCard cardClassName={cardClassName}>
            <Box component="div" className="flex justify-between items-center space-y-4">
                <Typography variant="body1" className="text-white">{title}</Typography>
                <MonetizationOn className="!text-white" />
            </Box>
            <Typography variant="h2" className="text-white">{value}</Typography>
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
                <CardInformation cardClassName="!bg-[#3322D8]" title="تعداد سفارشات" value={separateAmountWithCommas(25878)} />
                <CardInformation cardClassName="!bg-[#369BFD]" title="فروش امروز" value={separateAmountWithCommas(43242)} />
                <CardInformation cardClassName="!bg-[#F8B30E]" title="میانگین قیمت" value={separateAmountWithCommas(77754)} />
                <CardInformation cardClassName="!bg-[#EB5553]" title="درآمد" value={separateAmountWithCommas(77754)} />
            </Box>
            <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
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
