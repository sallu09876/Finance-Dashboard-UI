import { useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionModal from "../components/transactions/TransactionModal";
import TransactionTable from "../components/transactions/TransactionTable";
import { useAppContext } from "../context/AppContext";
import { transactionCategories } from "../data/mockData";
import { exportToCSV, exportToJSON } from "../utils/exportUtils";

export default function Transactions() {
  const { state, dispatch } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);
  const isAdmin = state.role === "admin";

  const filtered = useMemo(() => {
    let list = [...state.transactions];
    if (state.filters.search) list = list.filter((t) => t.description.toLowerCase().includes(state.filters.search.toLowerCase()));
    if (state.filters.category !== "All") list = list.filter((t) => t.category === state.filters.category);
    if (state.filters.type !== "All") list = list.filter((t) => t.type === state.filters.type);
    if (state.filters.dateRange.from) list = list.filter((t) => t.date >= state.filters.dateRange.from);
    if (state.filters.dateRange.to) list = list.filter((t) => t.date <= state.filters.dateRange.to);
    list.sort((a, b) => {
      const x = state.filters.sortBy === "amount" ? a.amount : new Date(a.date).getTime();
      const y = state.filters.sortBy === "amount" ? b.amount : new Date(b.date).getTime();
      return state.filters.sortOrder === "asc" ? x - y : y - x;
    });
    return list;
  }, [state.transactions, state.filters]);

  const activeFilterCount = Number(Boolean(state.filters.search)) + Number(state.filters.category !== "All") + Number(state.filters.type !== "All") + Number(Boolean(state.filters.dateRange.from || state.filters.dateRange.to));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Transactions</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setExportOpen((p) => !p)} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600"><Download size={16} /> Export</button>
            {exportOpen ? (
              <div className="absolute right-0 top-11 z-10 w-44 rounded-lg border border-slate-200 bg-white p-1 shadow dark:border-slate-700 dark:bg-slate-800">
                <button onClick={() => exportToCSV(filtered)} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700">Export as CSV</button>
                <button onClick={() => exportToJSON(filtered)} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700">Export as JSON</button>
              </div>
            ) : null}
          </div>
          {isAdmin ? <button onClick={() => { setEditing(null); setModalOpen(true); }} className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-sm text-white"><Plus size={16} /> Add Transaction</button> : null}
        </div>
      </div>

      <TransactionFilters
        filters={state.filters}
        categories={transactionCategories}
        activeCount={activeFilterCount}
        onChange={(payload) => dispatch({ type: "SET_FILTER", payload })}
        onReset={() => dispatch({ type: "RESET_FILTERS" })}
      />

      <TransactionTable
        transactions={filtered}
        isAdmin={isAdmin}
        onSort={(sortBy) => dispatch({ type: "SET_FILTER", payload: { sortBy, sortOrder: state.filters.sortBy === sortBy && state.filters.sortOrder === "desc" ? "asc" : "desc" } })}
        onEdit={(txn) => { setEditing(txn); setModalOpen(true); }}
        onDelete={(id) => dispatch({ type: "DELETE_TRANSACTION", payload: id })}
        onReset={() => dispatch({ type: "RESET_FILTERS" })}
      />

      <TransactionModal
        key={`${editing?.id || "new"}-${modalOpen ? "open" : "closed"}`}
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSave={(payload) => dispatch({ type: editing ? "EDIT_TRANSACTION" : "ADD_TRANSACTION", payload })}
      />
    </div>
  );
}
