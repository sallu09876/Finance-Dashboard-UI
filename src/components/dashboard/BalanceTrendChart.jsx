import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatINR } from "../../utils/formatUtils";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white shadow-lg">
      <p>{label}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)}>{formatINR(p.value)}</p>
      ))}
    </div>
  );
}

export default function BalanceTrendChart({ data }) {
  const chartData = data.reduce((acc, m) => {
    const previousBalance = acc.length ? acc[acc.length - 1].balance : 0;
    acc.push({ month: m.month, balance: previousBalance + m.savings });
    return acc;
  }, []);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 font-semibold">Balance Trend</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="bal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatINR} />
            <Tooltip formatter={(value) => [formatINR(value), ""]} content={<CustomTooltip />} />
            <Area type="monotone" dataKey="balance" stroke="#6366f1" fill="url(#bal)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
