// src/components/AddTransactionForm.jsx
import { useState } from "react";
import { Plus } from "lucide-react";

const AddTransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "upi",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return alert("Title & amount are required");
    setLoading(true);
    try {
      await onAdd({
        ...form,
        amount: Number(form.amount),
        date: new Date(form.date),
      });
      setForm((prev) => ({ ...prev, title: "", amount: "", notes: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Add transaction</h2>
        <span className="text-[10px] text-slate-500">
          Quick add your daily spending
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div className="space-y-2">
          <label className="block text-slate-400">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Zomato, Uber, Salary..."
            className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 outline-none focus:ring-1 focus:ring-primary/70 text-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-slate-400">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 outline-none focus:ring-1 focus:ring-primary/70 text-xs"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-slate-400">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 outline-none focus:ring-1 focus:ring-primary/70 text-xs"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-slate-400">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 outline-none focus:ring-1 focus:ring-primary/70 text-xs"
            >
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Rent</option>
              <option>Salary</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-slate-400">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 outline-none focus:ring-1 focus:ring-primary/70 text-xs"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-slate-400">Payment method</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 outline-none focus:ring-1 focus:ring-primary/70 text-xs"
          >
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="cash">Cash</option>
            <option value="bank">Bank transfer</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-slate-400">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 outline-none focus:ring-1 focus:ring-primary/70 text-xs"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary hover:bg-indigo-500 transition px-3 py-2 text-xs font-medium shadow-lg shadow-indigo-500/30 disabled:opacity-60"
        >
          <Plus className="h-3 w-3" />
          {loading ? "Adding..." : "Add transaction"}
        </button>
      </form>
    </section>
  );
};

export default AddTransactionForm;
