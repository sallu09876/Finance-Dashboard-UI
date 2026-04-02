import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate, formatINR } from "../../utils/formatUtils";

export default function RecentTransactions({ transactions }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Recent Transactions</h3>
        <Link to="/transactions" className="inline-flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-600">
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="space-y-2">
        {transactions.map((txn) => (
          <div key={txn.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-900/50">
            <div>
              <p className="font-medium">{txn.description}</p>
              <p className="text-xs text-slate-500">{formatDate(txn.date)}</p>
            </div>
            <p className={txn.type === "income" ? "text-emerald-500" : "text-rose-500"}>{txn.type === "income" ? "+" : "-"}{formatINR(txn.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
