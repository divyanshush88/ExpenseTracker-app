// src/components/FiltersBar.jsx
const FiltersBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 flex flex-wrap gap-3 items-end text-xs">
      <div className="space-y-1">
        <label className="block text-[11px] text-slate-400">Type</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-1.5 outline-none"
        >
          <option value="all">All</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-[11px] text-slate-400">From</label>
        <input
          type="date"
          name="from"
          value={filters.from}
          onChange={handleChange}
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-1.5 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-[11px] text-slate-400">To</label>
        <input
          type="date"
          name="to"
          value={filters.to}
          onChange={handleChange}
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-1.5 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-[11px] text-slate-400">Category</label>
        <input
          name="category"
          placeholder="Food / Travel..."
          value={filters.category}
          onChange={handleChange}
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-1.5 outline-none"
        />
      </div>
    </div>
  );
};

export default FiltersBar;
