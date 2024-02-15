/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import highcharts3D from 'highcharts/highcharts-3d'; // Import 3D module
import React from "react";

HC_exporting(Highcharts);
highcharts3D(Highcharts); // Enable 3D module

interface IProps {
    data?: any;
    isLoading?: boolean;
    isError?: boolean;
}

const VariableRadiusPieChart3D: FC<IProps> = ({ data, isLoading, isError }) => {
    if (isLoading) {
        return <div>درحال بارگزاری...</div>;
    }

    if (isError) {
        return <div>داده ای برای نمایش یافت نشد</div>;
    }

    const options = {
        chart: {
            type: "pie", // Specify the chart type as 'variablepie'
            options3d: {
                enabled: true,
                alpha: 45,
              },
        },
        title: {
            text: "موجودی کالا",
            style: {
                fontFamily: "Yekan_reqular",
            },
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
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

export { VariableRadiusPieChart3D };
