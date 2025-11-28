// src/components/CategoryBreakdownChart.jsx
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryBreakdownChart = ({ transactions }) => {
  const expenseTx = transactions.filter((t) => t.type === "expense");
  const totals = expenseTx.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});
  const labels = Object.keys(totals);
  const dataValues = Object.values(totals);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#cbd5f5", boxWidth: 10 },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold">Category breakdown</h3>
        <span className="text-[10px] text-slate-500">Expenses only</span>
      </div>
      {labels.length ? (
        <Doughnut data={data} options={options} />
      ) : (
        <div className="text-xs text-slate-500 text-center py-8">
          No expense data yet. Add some transactions.
        </div>
      )}
    </div>
  );
};

export default CategoryBreakdownChart;
