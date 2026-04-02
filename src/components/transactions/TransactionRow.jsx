import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";
import { formatDate, formatINR } from "../../utils/formatUtils";

export default function TransactionRow({ txn, index, isAdmin, onEdit, onDelete }) {
  return (
    <motion.tr initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} className="border-b border-slate-200 dark:border-slate-700">
      <td className="p-3">{formatDate(txn.date)}</td>
      <td className="p-3">{txn.description}</td>
      <td className="p-3"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-500" />{txn.category}</span></td>
      <td className="p-3"><Badge tone={txn.type === "income" ? "emerald" : "rose"}>{txn.type}</Badge></td>
      <td className={`p-3 font-semibold ${txn.type === "income" ? "text-emerald-500" : "text-rose-500"}`}>{txn.type === "income" ? "+" : "-"}{formatINR(txn.amount)}</td>
      {isAdmin ? (
        <td className="p-3">
          <div className="flex gap-2">
            <button onClick={() => onEdit(txn)} className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-700"><Pencil size={16} /></button>
            <button onClick={() => onDelete(txn.id)} className="rounded p-1 hover:bg-rose-500/10 text-rose-500"><Trash2 size={16} /></button>
          </div>
        </td>
      ) : null}
    </motion.tr>
  );
}
