"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Chart, registerables } from "chart.js"; // Import 'registerables'
import { typeChart } from "@/type/story.type";
import moment from "moment";

interface typedata {
  data: typeChart[];
}
const MyChart: React.FC<typedata> = ({ data }) => {
  const datas = useMemo(() => {
    return data?.map((item) => item.view_count);
  }, [data]);

  const daydata = useMemo(() => {
    return data?.map((item) => moment(item.date).format("L"));
  }, [data]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // Đăng ký tất cả các thành phần của Chart.js
    Chart.register(...registerables);

    if (!chartRef.current) return;
    const ctx: any = chartRef.current.getContext("2d");

    // Khởi tạo biểu đồ
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: daydata,
        datasets: [
          {
            label: "Chart View by day",
            data: datas,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Hủy biểu đồ khi component bị unmount
    return () => {
      myChart.destroy();
    };
  }, [datas, daydata]);

  return (
    <div style={{ marginTop: "50px" }}>
      <canvas className="canvas-chart" ref={chartRef} />
    </div>
  );
};
export default MyChart;
