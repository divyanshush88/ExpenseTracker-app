// src/components/DailyExpenseChart.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DailyExpenseChart = ({ daily }) => {
  const labels = daily.map((d) => {
    const { day, month } = d._id;
    return `${day}/${month}`;
  });

  const expenses = daily.map((d) => d.totalExpense);
  const incomes = daily.map((d) => d.totalIncome);

  const data = {
    labels,
    datasets: [
      {
        label: "Daily expense",
        data: expenses,
        borderWidth: 2,
        tension: 0.35,
      },
      {
        label: "Daily income",
        data: incomes,
        borderWidth: 2,
        borderDash: [4, 4],
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#cbd5f5", boxWidth: 10 },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8", maxRotation: 0, autoSkip: true },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid: { color: "rgba(148,163,184,0.15)", borderDash: [4, 4] },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold">Daily trend (last 30 days)</h3>
        <span className="text-[10px] text-slate-500">Income vs expense</span>
      </div>
      {daily.length ? (
        <Line data={data} options={options} />
      ) : (
        <div className="text-xs text-slate-500 text-center py-8">
          Not enough data to plot daily trend.
        </div>
      )}
    </div>
  );
};

export default DailyExpenseChart;
