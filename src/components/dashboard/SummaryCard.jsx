import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { formatINR } from "../../utils/formatUtils";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

export default function SummaryCard({ icon: Icon, title, value, color, index, isPercent = false, subLabel, subLabelClassName = "text-emerald-500" }) {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const animatedValue = useAnimatedCounter(value);
  const display = isPercent ? `${animatedValue}%` : formatINR(animatedValue);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-2xl border border-slate-200 bg-gradient-to-br p-4 sm:p-5 dark:border-slate-700 ${color}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</p>
        <Icon size={18} />
      </div>
      {showSkeleton ? (
        <div className="h-8 w-32 animate-pulse rounded bg-slate-300/40 dark:bg-slate-600/40" />
      ) : (
        <>
          <p className="break-words text-xl font-bold sm:text-2xl">{display}</p>
          {subLabel ? <p className={`mt-1 text-xs ${subLabelClassName}`}>{subLabel}</p> : null}
        </>
      )}
    </motion.div>
  );
}
