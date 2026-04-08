import { useState } from "react";
import { motion } from "framer-motion";
import EmptyState from "../ui/EmptyState";
import { Pencil, Trash2 } from "lucide-react";
import { formatDate, formatINR } from "../../utils/formatUtils";
import Badge from "../ui/Badge";

export default function TransactionTable({ transactions, isAdmin, onSort, onEdit, onDelete, onReset }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  if (!transactions.length) return <EmptyState message="No transactions found for selected filters." onReset={onReset} />;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="space-y-2.5 p-2.5 md:hidden">
        {transactions.map((txn) => (
          <div key={txn.id} className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-900/40">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{txn.description}</p>
                <p className="text-xs text-slate-500">{formatDate(txn.date)}</p>
              </div>
              <Badge tone={txn.type === "income" ? "emerald" : "rose"}>{txn.type}</Badge>
            </div>
            <div className="mb-2.5 flex items-center justify-between text-xs min-[360px]:text-sm">
              <span className="inline-flex min-w-0 items-center gap-2 truncate text-slate-600 dark:text-slate-300">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                {txn.category}
              </span>
              <p className={`font-semibold ${txn.type === "income" ? "text-emerald-500" : "text-rose-500"}`}>
                {txn.type === "income" ? "+" : "-"}
                {formatINR(txn.amount)}
              </p>
            </div>
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => onEdit(txn)} className="inline-flex items-center rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs dark:border-slate-600">
                  <Pencil size={14} />
                </button>
                {confirmDeleteId === txn.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(txn.id);
                        setConfirmDeleteId(null);
                      }}
                      className="rounded-lg bg-rose-500 px-2.5 py-1.5 text-xs font-medium text-white"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-500 dark:border-slate-600 dark:text-slate-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => setConfirmDeleteId(txn.id)} className="inline-flex items-center rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs text-rose-500 dark:border-rose-700/60">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/40">
            <tr>
              <th className="p-3"><button onClick={() => onSort("date")} className="font-semibold">Date</button></th>
              <th className="p-3 font-semibold">Description</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3"><button onClick={() => onSort("amount")} className="font-semibold">Amount</button></th>
              {isAdmin ? <th className="p-3 font-semibold">Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <motion.tr
                key={txn.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className="border-b border-slate-200 dark:border-slate-700"
              >
                <td className="p-3">{formatDate(txn.date)}</td>
                <td className="p-3">{txn.description}</td>
                <td className="p-3"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-500" />{txn.category}</span></td>
                <td className="p-3"><Badge tone={txn.type === "income" ? "emerald" : "rose"}>{txn.type}</Badge></td>
                <td className={`p-3 font-semibold ${txn.type === "income" ? "text-emerald-500" : "text-rose-500"}`}>{txn.type === "income" ? "+" : "-"}{formatINR(txn.amount)}</td>
                {isAdmin ? (
                  <td className="p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button type="button" onClick={() => onEdit(txn)} className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-700"><Pencil size={16} /></button>
                      {confirmDeleteId === txn.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              onDelete(txn.id);
                              setConfirmDeleteId(null);
                            }}
                            className="rounded px-2 py-1 text-xs font-medium bg-rose-500 text-white"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-500 dark:border-slate-600 dark:text-slate-400"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button type="button" onClick={() => setConfirmDeleteId(txn.id)} className="rounded p-1 text-rose-500 hover:bg-rose-500/10"><Trash2 size={16} /></button>
                      )}
                    </div>
                  </td>
                ) : null}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
