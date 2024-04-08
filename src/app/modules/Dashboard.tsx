import { Typography } from "@mui/material";
import { ColumnChart } from "../../_cloner/components/ColumnChart";
import { VariableRadiusPieChart3D } from "../../_cloner/components/VariableRadiusPieChart3D";

import ReusableCard from "../../_cloner/components/ReusableCard";
import MonitoringProdcuct from "../../_cloner/components/MonitoringProduct";
import CardInformation from "../../_cloner/components/CardInformation";

const Dashboard = () => {

    const data = [
        { name: "نبشی 8", y: 10, z: 10 },
        { name: "میلگرد 10", y: 20, z: 20 },
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 space-y-4 md:space-y-0 my-4">
                <CardInformation cardClassName="!bg-[#3322D8]" title="تعداد سفارشات" value={25878} />
                <CardInformation cardClassName="!bg-[#369BFD]" title="فروش امروز" value={43242} />
                <CardInformation cardClassName="!bg-[#F8B30E]" title="میانگین قیمت" value={77754} />
                <CardInformation cardClassName="!bg-[#EB5553]" title="درآمد" value={77754} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 space-y-4 lg:space-y-0">
                <ReusableCard cardClassName="col-span-2 w-full">
                    <Typography variant="h2" className="pb-8 px-2">مانیتورینگ محصولات</Typography>
                    <MonitoringProdcuct />
                </ReusableCard>

                <div className="flex flex-col gap-y-4">
                    <ReusableCard>
                        <ColumnChart data={data} />
                    </ReusableCard>
                    <ReusableCard>
                        <VariableRadiusPieChart3D data={data} />
                    </ReusableCard>
                </div>
            </div>

        </>
    );
};

export default Dashboard;
