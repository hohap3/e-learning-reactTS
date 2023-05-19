import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";

interface Props {
  data: number[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminStatisticChart({ data }: Props) {
  const chartData = {
    labels: ["Category List", "Course List", "Student List", "Teacher List"],
    datasets: [
      {
        label: "# of Votes",
        data,
        backgroundColor: ["#0097ec", "#f39034", "#9852f0", "#1fd071"],
        borderColor: ["#0097ec", "#f39034", "#9852f0", "#1fd071"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="bg-white py-10 rounded-md text-center">
      <h2 className="capitalize text-xl mb-6">Statistic Dashboard Chart</h2>

      {data.some((item) => item === 0) && <LoadingCircle />}
      {data.every((item) => item !== 0) && (
        <div>
          <Doughnut data={chartData} />
        </div>
      )}
    </section>
  );
}

export default AdminStatisticChart;
