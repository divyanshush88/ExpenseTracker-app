// src/App.jsx
import { useEffect, useState } from "react";
import api from "./api";
import Layout from "./components/Layout";
import SummaryCards from "./components/SummaryCards";
import AddTransactionForm from "./components/AddTransactionForm";
import FiltersBar from "./components/FiltersBar";
import ExpenseTrendsChart from "./components/ExpenseTrendsChart";
import CategoryBreakdownChart from "./components/CategoryBreakdownChart";
import TransactionsTable from "./components/TransactionsTable";
import AnalyticsView from "./components/AnalyticsView";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [filters, setFilters] = useState({
    type: "all",
    from: "",
    to: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState("dashboard"); // "dashboard" | "analytics"

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.type !== "all") params.type = filters.type;
      if (filters.from) params.from = filters.from;
      if (filters.to) params.to = filters.to;
      if (filters.category) params.category = filters.category;

      const [txRes, monthlyRes] = await Promise.all([
        api.get("/transactions", { params }),
        api.get("/transactions/summary/monthly"),
      ]);

      setTransactions(txRes.data);
      setMonthlySummary(monthlyRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleAdd = async (data) => {
    try {
      await api.post("/transactions", data);
      fetchTransactions();
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {activeView === "dashboard" ? (
        <div className="space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                ExpenseTracker – Personal Finance Visualizer
              </h1>
              <p className="text-slate-400 text-sm">
                Track daily expenses, visualize trends, and stay in control of your money.
              </p>
            </div>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              Built with React · Node · MongoDB
            </span>
          </header>

          <SummaryCards
            totalExpense={totalExpense}
            totalIncome={totalIncome}
            balance={totalIncome - totalExpense}
          />

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-4">
              <FiltersBar filters={filters} setFilters={setFilters} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ExpenseTrendsChart monthlySummary={monthlySummary} />
                <CategoryBreakdownChart transactions={transactions} />
              </div>
            </div>
            <div>
              <AddTransactionForm onAdd={handleAdd} />
            </div>
          </section>

          <TransactionsTable
            transactions={transactions}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <AnalyticsView />
      )}
    </Layout>
  );
}

export default App;
