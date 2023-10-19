/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import React from "react";
HC_exporting(Highcharts);

interface IProps {
    data?: any;
    isLoading?: boolean;
    isError?: boolean;
}

const VariableRadiusPieChart: FC<IProps> = ({
    data,
    isLoading,
    isError,
}) => {
    if (isLoading) {
        return <div>درحال بارگزاری...</div>;
    }

    if (isError) {
        return <div>داده ای برای نمایش یافت نشد</div>;
    }

    const options = {
        chart: {
          type: 'pie', // Specify the chart type as 'variablepie'
        },
        title: {
          text: 'Variable Radius Pie Chart',
        },
        series: [
          {
            name: 'Data',
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

export { VariableRadiusPieChart };