export default function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-500/15 text-slate-500",
    emerald: "bg-emerald-500/15 text-emerald-500",
    rose: "bg-rose-500/15 text-rose-500",
    amber: "bg-amber-500/15 text-amber-500",
    indigo: "bg-indigo-500/15 text-indigo-500"
  };
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
