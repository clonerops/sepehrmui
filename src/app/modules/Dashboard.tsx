import { Box, Typography } from "@mui/material";
import { MonetizationOn } from '@mui/icons-material';

import { VariableRadiusPieChart } from "../../_cloner/components/VariableRadiusPieChart";
import { ColumnChart } from "../../_cloner/components/ColumnChart";
import ReusableCard from "../../_cloner/components/ReusableCard";
import { separateAmountWithCommas } from "../../_cloner/helpers/SeprateAmount";

const Dashboard = () => {
    
    const data = [
        { name: "نبشی 8", y: 10, z: 10 },
        { name: "میلگرد 10", y: 20, z: 20 },
    ];

    return (
        <>
            <Box component="div" className="grid grid-cols-1 md:grid-cols-4 gap-x-8 space-y-4 md:space-y-0 my-4">
                <ReusableCard>
                    <Box component="div" className="flex justify-between items-center space-y-4">
                        <Typography variant="body1">تعداد سفارشات</Typography>
                        <MonetizationOn color="secondary" />
                    </Box>
                    <Typography variant="h2">{separateAmountWithCommas(25878)}</Typography>
                </ReusableCard>
                <ReusableCard>
                    <Box component="div" className="flex justify-between items-center space-y-4">
                        <Typography variant="body1">فروش امروز</Typography>
                        <MonetizationOn color="secondary" />
                    </Box>
                    <Typography variant="h2">{separateAmountWithCommas(786564)}</Typography>
                </ReusableCard>
                <ReusableCard>
                    <Box component="div" className="flex justify-between items-center space-y-4">
                        <Typography variant="body1">میانگین قیمت</Typography>
                        <MonetizationOn color="secondary" />
                    </Box>
                    <Typography variant="h2">{separateAmountWithCommas(5343)}</Typography>
                </ReusableCard>
                <ReusableCard>
                    <Box component="div" className="flex justify-between items-center space-y-4">
                        <Typography variant="body1">درآمد</Typography>
                        <MonetizationOn color="secondary" />
                    </Box>
                    <Typography variant="h2">{separateAmountWithCommas(42342441265)}</Typography>
                </ReusableCard>
            </Box>
            <Box
                component="div"
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
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
