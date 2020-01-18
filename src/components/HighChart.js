import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

function HighChart({ data }) {
  const [newData, setData] = useState(null);

  useEffect(() => {
    const chartStartDateInMilliSec = () => {
      let date = new Date();
      let lastVideoDate = new Date(
        data.videos[data.videos.length - 1].snippet.publishedAt
      );
      if (lastVideoDate.getTime() > date.setMonth(date.getMonth() - 18))
        return lastVideoDate.getTime();
      return date.getTime();
    };

    let dataArr = [];
    if (data.videos.length > 0) {
      let startDate = chartStartDateInMilliSec();

      let toggle = true;
      let i = 0;
      while (toggle) {
        let publishedDate = new Date(
          data.videos[i].snippet.publishedAt
        ).getTime();
        if (publishedDate <= startDate) toggle = false;
        dataArr.push([publishedDate, 1]);
        i++;
      }

      dataArr = dataArr.sort((a, b) => {
        return a[0] - b[0];
      });

      let interval = 24 * 3600 * 1000;
      let j = 0;
      let k = dataArr[0][0] + interval;

      for (j; j < dataArr.length; j++) {
        for (k; k < dataArr[j][0]; k += interval) {
          dataArr.push([k, 0]);
        }
        k += interval;
      }

      dataArr = dataArr.sort((a, b) => {
        return a[0] - b[0];
      });

      setData(dataArr);
    }
  }, [data.videos]);

  const options = {
    title: {
      text: "Video Uploads Per Week"
    },
    yAxis: {
      title: {
        text: "Upload Count"
      }
    },
    xAxis: {
      title: {
        text: "Date"
      },
      type: "datetime",
      tickInterval: 24 * 3600 * 1000
    },
    navigator: {
      enabled: false
    },
    rangeSelector: {
      enabled: false,
      inpuEnabled: false
    },
    credits: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    series: [
      {
        type: "area",
        data: newData,
        name: "Videos Uploaded",
        dataGrouping: {
          forced: true,
          approximation: "sum",
          units: [["week", [1]]]
        }
      }
    ]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={"stockChart"}
    />
  );
}

export default HighChart;
