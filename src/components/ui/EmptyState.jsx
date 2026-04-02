import { SearchX } from "lucide-react";

export default function EmptyState({ message, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
      <div className="mb-4 rounded-full bg-indigo-500/10 p-4 text-indigo-500">
        <SearchX size={24} />
      </div>
      <p className="mb-4 text-slate-600 dark:text-slate-300">{message}</p>
      {onReset ? (
        <button onClick={onReset} className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600">
          Reset Filters
        </button>
      ) : null}
    </div>
  );
}
