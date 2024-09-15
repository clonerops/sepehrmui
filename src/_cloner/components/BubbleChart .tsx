/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import { IBubbleChartProps } from "../helpers/_models";
HC_exporting(Highcharts);

const BubbleChart: FC<IBubbleChartProps> = ({ data, isLoading, isError }) => {
  if (isLoading) {
    return <div>درحال بارگزاری...</div>;
  }

  if (isError) {
    return <div>داده ای برای نمایش یافت نشد</div>;
  }

  const options = {
    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy',
    },
    title: {
      text: 'Bubble Chart',
    },
    series: [
      {
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

export { BubbleChart };