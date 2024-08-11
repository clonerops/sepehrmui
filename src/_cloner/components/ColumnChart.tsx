/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
HC_exporting(Highcharts);

interface IProps {
    data?: any;
    isLoading?: boolean;
    isError?: boolean;
}

const ColumnChart: FC<IProps> = ({ data, isLoading, isError }) => {
    if (isLoading) {
        return <div>درحال بارگزاری...</div>;
    }

    if (isError) {
        return <div>داده ای برای نمایش یافت نشد</div>;
    }

    const options = {
        chart: {
            type: "column", // Specify the chart type as 'variablepie'
        },
        title: {
            text: "قیمت کالا",
            style: {
                fontFamily: "Yekan_reqular",
            },
        },
        series: [
            {
                name: "Data",
                data: data,
            },
        ],
    };

    return (
        <>
            <HighchartsReact
                allowChartUpdate={true}
                highcharts={Highcharts}
                options={options}
            />
        </>
    );
};

export { ColumnChart };
