// src/components/SummaryCards.jsx
import { ArrowDownCircle, ArrowUpCircle, Wallet2 } from "lucide-react";

const formatCurrency = (value) =>
  value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

const SummaryCards = ({ totalExpense, totalIncome, balance }) => {
  const cards = [
    {
      label: "Total Income",
      icon: ArrowDownCircle,
      value: formatCurrency(totalIncome),
      badge: "+ inflow",
      gradient: "from-emerald-500/20 to-emerald-500/5",
      ring: "ring-emerald-500/40",
    },
    {
      label: "Total Expense",
      icon: ArrowUpCircle,
      value: formatCurrency(totalExpense),
      badge: "- outflow",
      gradient: "from-rose-500/20 to-rose-500/5",
      ring: "ring-rose-500/40",
    },
    {
      label: "Net Balance",
      icon: Wallet2,
      value: formatCurrency(balance),
      badge: balance >= 0 ? "On track" : "Overspending",
      gradient: "from-indigo-500/20 to-indigo-500/5",
      ring: "ring-indigo-500/40",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className={`relative rounded-2xl border border-slate-800/80 bg-gradient-to-br ${card.gradient} ring-1 ${card.ring} shadow-[0_18px_50px_rgba(15,23,42,0.85)] overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />
          <div className="relative px-4 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {card.label}
              </span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-slate-900/60 border border-slate-700/80 text-slate-300">
                {card.badge}
              </span>
            </div>
            <div className="flex items-end justify-between gap-2">
              <div className="text-xl font-semibold">{card.value}</div>
              <div className="h-9 w-9 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center">
                <card.icon className="h-4 w-4 text-slate-200" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default SummaryCards;
