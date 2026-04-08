import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatINR } from "../../utils/formatUtils";

const colors = ["#6366f1", "#10b981", "#f43f5e", "#f59e0b", "#3b82f6"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white shadow-lg">
      <p>{label || payload[0].name}</p>
      <p>{formatINR(payload[0].value)}</p>
    </div>
  );
}

export default function SpendingDonutChart({ data }) {
  const total = data.reduce((a, c) => a + c.amount, 0);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 font-semibold">Top Spending Categories</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="amount" nameKey="category" innerRadius={65} outerRadius={90}>
              {data.map((entry, index) => (
                <Cell key={entry.category} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [formatINR(value), ""]} content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 space-y-1">
        {data.map((item, i) => (
          <div key={item.category} className="flex flex-col gap-1 text-xs min-[360px]:text-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="flex min-w-0 items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: colors[i] }} /><span className="truncate">{item.category}</span></span>
            <span className="break-all sm:break-normal">{formatINR(item.amount)} ({total ? ((item.amount / total) * 100).toFixed(1) : 0}%)</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
