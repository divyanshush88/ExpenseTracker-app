// src/components/TransactionsTable.jsx
import { Trash2 } from "lucide-react";

const TransactionsTable = ({ transactions, loading, onDelete }) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl mt-4">
      <div className="px-4 py-3 flex items-center justify-between text-xs border-b border-slate-800">
        <h2 className="font-semibold">Recent transactions</h2>
        <span className="text-slate-500">
          {transactions.length} record{transactions.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="overflow-x-auto text-xs">
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="bg-slate-900/80 text-[11px] text-slate-400">
            <tr>
              <th className="px-4 py-2 text-left font-normal">Title</th>
              <th className="px-4 py-2 text-left font-normal">Type</th>
              <th className="px-4 py-2 text-right font-normal">Amount</th>
              <th className="px-4 py-2 text-left font-normal">Category</th>
              <th className="px-4 py-2 text-left font-normal">Date</th>
              <th className="px-4 py-2 text-left font-normal">Method</th>
              <th className="px-4 py-2 text-center font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-slate-500">
                  Loading...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-slate-500">
                  No transactions yet. Start by adding your first one.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx._id} className="border-t border-slate-800/60">
                  <td className="px-4 py-2">{tx.title}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        tx.type === "expense"
                          ? "bg-rose-500/15 text-rose-300 border border-rose-500/40"
                          : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    ₹{tx.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-2 text-slate-300">{tx.category}</td>
                  <td className="px-4 py-2 text-slate-400">
                    {new Date(tx.date).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-2 text-slate-400">{tx.paymentMethod}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => onDelete(tx._id)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-700 p-1 hover:bg-rose-500/20 hover:border-rose-500/60"
                    >
                      <Trash2 className="h-3 w-3 text-slate-300" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionsTable;
