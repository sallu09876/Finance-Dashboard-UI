import { subMonths } from "date-fns";
import CategoryBreakdown from "../components/insights/CategoryBreakdown";
import InsightCard from "../components/insights/InsightCard";
import MonthlyComparisonChart from "../components/insights/MonthlyComparisonChart";
import { useAppContext } from "../context/AppContext";
import { formatINR, getMonthKey } from "../utils/formatUtils";
import { getBestSavingsMonth, getHighestSpendingCategory, getMoMChange, getMonthlyTotals } from "../utils/insightUtils";

export default function Insights() {
  const {
    state: { transactions }
  } = useAppContext();
  const currentDate = new Date();
  const monthKey = getMonthKey(currentDate);
  const prevKey = getMonthKey(subMonths(currentDate, 1));
  const highest = getHighestSpendingCategory(transactions, monthKey);
  const mom = getMoMChange(transactions);
  const best = getBestSavingsMonth(transactions);
  const monthly = getMonthlyTotals(transactions);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <InsightCard title="Highest Spending Category" value={`${highest.category} (${formatINR(highest.amount)})`} subtitle="This month" />
        <InsightCard title="Month over Month Change" value={`Expenses ${mom >= 0 ? "up" : "down"} ${Math.abs(mom).toFixed(1)}%`} subtitle="vs last month" />
        <InsightCard title="Best Savings Month" value={`${best.month} (${formatINR(best.savings)})`} subtitle="last 6 months" />
      </div>
      <MonthlyComparisonChart data={monthly} />
      <CategoryBreakdown transactions={transactions} monthKey={monthKey} previousMonthKey={prevKey} />
    </div>
  );
}
