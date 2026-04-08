import { motion } from "framer-motion";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatINR } from "../../utils/formatUtils";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white shadow-lg">
      <p>{label}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)}>{p.name}: {formatINR(p.value)}</p>
      ))}
    </div>
  );
}

export default function MonthlyComparisonChart({ data }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 font-semibold">Monthly Income vs Expenses</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
            <YAxis width={44} tick={{ fontSize: 11 }} tickFormatter={formatINR} />
            <Tooltip formatter={(value) => [formatINR(value), ""]} content={<CustomTooltip />} />
            <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
