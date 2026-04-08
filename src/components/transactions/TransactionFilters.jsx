import Badge from "../ui/Badge";

export default function TransactionFilters({ filters, categories, onChange, onReset, activeCount }) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 md:grid-cols-2 xl:grid-cols-7 dark:border-slate-700 dark:bg-slate-800">
      <input className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600" placeholder="Search description" value={filters.search} onChange={(e) => onChange({ search: e.target.value })} />
      <select className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600" value={filters.category} onChange={(e) => onChange({ category: e.target.value })}>
        <option>All</option>{categories.map((c) => <option key={c}>{c}</option>)}
      </select>
      <select className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600" value={filters.type} onChange={(e) => onChange({ type: e.target.value })}>
        <option>All</option><option value="income">Income</option><option value="expense">Expense</option>
      </select>
      <input type="date" className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600" value={filters.dateRange.from || ""} onChange={(e) => onChange({ dateRange: { ...filters.dateRange, from: e.target.value || null } })} />
      <input type="date" className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600" value={filters.dateRange.to || ""} onChange={(e) => onChange({ dateRange: { ...filters.dateRange, to: e.target.value || null } })} />
      <select className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600" value={filters.sortBy} onChange={(e) => onChange({ sortBy: e.target.value })}>
        <option value="date">Sort: Date</option><option value="amount">Sort: Amount</option>
      </select>
      <div className="flex items-center gap-2 sm:justify-start">
        <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600" onClick={() => onChange({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" })}>{filters.sortOrder.toUpperCase()}</button>
        <button className="rounded-lg bg-indigo-500 px-3 py-2 text-sm text-white" onClick={onReset}>Reset</button>
        <Badge tone="indigo">{activeCount}</Badge>
      </div>
    </div>
  );
}
