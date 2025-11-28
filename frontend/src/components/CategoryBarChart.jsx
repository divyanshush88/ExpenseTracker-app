// src/components/CategoryBarChart.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CategoryBarChart = ({ byCategory }) => {
  const labels = byCategory.map((c) => c._id);
  const totals = byCategory.map((c) => c.total);

  const data = {
    labels,
    datasets: [
      {
        label: "Total spent",
        data: totals,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: {
      legend: {
        labels: { color: "#cbd5f5", boxWidth: 10 },
      },
      tooltip: {},
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { color: "rgba(148,163,184,0.15)", borderDash: [4, 4] },
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold">Top categories</h3>
        <span className="text-[10px] text-slate-500">
          Expenses by category
        </span>
      </div>
      {byCategory.length ? (
        <Bar data={data} options={options} />
      ) : (
        <div className="text-xs text-slate-500 text-center py-8">
          No category data yet.
        </div>
      )}
    </div>
  );
};

export default CategoryBarChart;
