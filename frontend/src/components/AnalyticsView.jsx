// src/components/AnalyticsView.jsx
import { useEffect, useState, useMemo } from "react";
import api from "../api";
import DailyExpenseChart from "./DailyExpenseChart";
import CategoryBarChart from "./CategoryBarChart";
import { TrendingUp, TrendingDown, Target } from "lucide-react";

const formatINR = (v) =>
  v.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

const AnalyticsView = () => {
  const [daily, setDaily] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [dailyRes, catRes, monthlyRes] = await Promise.all([
        api.get("/transactions/summary/daily", { params: { days: 30 } }),
        api.get("/transactions/summary/by-category"),
        api.get("/transactions/summary/monthly"),
      ]);

      setDaily(dailyRes.data);
      setByCategory(catRes.data);
      setMonthly(monthlyRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const analyticsStats = useMemo(() => {
    if (!monthly.length) return null;

    const totalExpense = monthly.reduce((s, m) => s + m.totalExpense, 0);
    const totalIncome = monthly.reduce((s, m) => s + m.totalIncome, 0);

    const latest = monthly[monthly.length - 1];
    const prev = monthly.length > 1 ? monthly[monthly.length - 2] : null;

    const latestNet = latest.totalIncome - latest.totalExpense;
    const prevNet = prev ? prev.totalIncome - prev.totalExpense : null;

    const netChange =
      prevNet !== null ? latestNet - prevNet : null;

    const topCategory =
      byCategory.length > 0
        ? byCategory.reduce((max, cur) =>
            cur.total > max.total ? cur : max
          )
        : null;

    return {
      totalExpense,
      totalIncome,
      latestNet,
      netChange,
      topCategory,
    };
  }, [monthly, byCategory]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Advanced Analytics
          </h1>
          <p className="text-slate-400 text-sm">
            Deep dive into your spending behaviour, top categories, and trends.
          </p>
        </div>
        {loading && (
          <span className="text-xs text-slate-500 border border-slate-700 rounded-full px-3 py-1">
            Refreshing…
          </span>
        )}
      </header>

      {analyticsStats && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wide">
                Lifetime Expense
              </span>
              <TrendingUp className="h-4 w-4 text-rose-400" />
            </div>
            <div className="text-xl font-semibold">
              {formatINR(analyticsStats.totalExpense)}
            </div>
            <p className="text-[11px] text-slate-500">
              Total money you&apos;ve spent across all time.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wide">
                Last month net
              </span>
              <TrendingDown className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-xl font-semibold">
              {formatINR(analyticsStats.latestNet)}
            </div>
            {analyticsStats.netChange !== null && (
              <p className="text-[11px] text-slate-500">
                {analyticsStats.netChange >= 0 ? "↑ Better" : "↓ Worse"} than
                previous month by {formatINR(Math.abs(analyticsStats.netChange))}
              </p>
            )}
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wide">
                Highest spend category
              </span>
              <Target className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="text-xl font-semibold">
              {analyticsStats.topCategory
                ? analyticsStats.topCategory._id
                : "No data"}
            </div>
            {analyticsStats.topCategory && (
              <p className="text-[11px] text-slate-500">
                You&apos;ve spent{" "}
                {formatINR(analyticsStats.topCategory.total)} here so far.
              </p>
            )}
          </article>
        </section>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DailyExpenseChart daily={daily} />
        </div>
        <div>
          <CategoryBarChart byCategory={byCategory} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-2">
          Category breakdown (detailed)
        </h2>
        <div className="overflow-x-auto text-xs">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-900/80 text-[11px] text-slate-400">
              <tr>
                <th className="px-3 py-2 text-left font-normal">Category</th>
                <th className="px-3 py-2 text-right font-normal">Total spent</th>
                <th className="px-3 py-2 text-right font-normal"># Tx</th>
              </tr>
            </thead>
            <tbody>
              {byCategory.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-3 py-4 text-center text-slate-500"
                  >
                    No expense data yet.
                  </td>
                </tr>
              ) : (
                byCategory.map((row) => (
                  <tr key={row._id} className="border-t border-slate-800/60">
                    <td className="px-3 py-2 text-slate-200">{row._id}</td>
                    <td className="px-3 py-2 text-right">
                      {formatINR(row.total)}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-400">
                      {row.count}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsView;
