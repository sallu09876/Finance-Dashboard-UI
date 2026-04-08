import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatINR, getMonthKey } from "../../utils/formatUtils";

export default function CategoryBreakdown({ transactions, monthKey, previousMonthKey }) {
  const nowTotals = {};
  const prevTotals = {};
  transactions.forEach((t) => {
    if (t.type !== "expense") return;
    if (getMonthKey(t.date) === monthKey) nowTotals[t.category] = (nowTotals[t.category] || 0) + t.amount;
    if (getMonthKey(t.date) === previousMonthKey) prevTotals[t.category] = (prevTotals[t.category] || 0) + t.amount;
  });
  const total = Object.values(nowTotals).reduce((a, c) => a + c, 0);
  const sorted = Object.entries(nowTotals).sort((a, b) => b[1] - a[1]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 font-semibold">Category Breakdown (This Month)</h3>
      <div className="space-y-3">
        {sorted.map(([category, amount]) => {
          const pct = total ? (amount / total) * 100 : 0;
          const trendUp = amount > (prevTotals[category] || 0);
          return (
            <div key={category}>
              <div className="mb-1 flex items-center justify-between gap-2 text-xs min-[360px]:text-sm">
                <span className="truncate">{category}</span>
                <span className="flex shrink-0 items-center gap-1">{formatINR(amount)} {trendUp ? <ArrowUpRight size={14} className="text-rose-500" /> : <ArrowDownRight size={14} className="text-emerald-500" />}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
