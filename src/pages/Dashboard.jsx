import { Landmark, PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import SpendingDonutChart from "../components/dashboard/SpendingDonutChart";
import SummaryCard from "../components/dashboard/SummaryCard";
import { useAppContext } from "../context/AppContext";
import { getMonthlyTotals } from "../utils/insightUtils";

export default function Dashboard() {
  const {
    state: { transactions }
  } = useAppContext();
  const monthly = getMonthlyTotals(transactions);
  const current = monthly[monthly.length - 1] || { income: 0, expenses: 0 };
  const previous = monthly[monthly.length - 2] || { income: 0, expenses: 0 };
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((a, c) => a + c.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((a, c) => a + c.amount, 0);
  const savingsRate = current.income ? Math.round(((current.income - current.expenses) / current.income) * 100) : 0;
  const previousSavingsRate = previous.income ? Math.round(((previous.income - previous.expenses) / previous.income) * 100) : 0;

  const monthlyBalances = monthly.reduce((acc, item) => {
    const prevBalance = acc.length ? acc[acc.length - 1] : 0;
    acc.push(prevBalance + item.savings);
    return acc;
  }, []);
  const currentBalance = monthlyBalances[monthlyBalances.length - 1] || 0;
  const previousBalance = monthlyBalances[monthlyBalances.length - 2] || 0;

  const getChangeMeta = (currentValue, previousValue) => {
    if (previousValue === 0) return { text: "0% vs last month", className: "text-emerald-500" };
    const percent = ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
    const isUp = percent >= 0;
    return {
      text: `${isUp ? "↑" : "↓"} ${Math.abs(percent).toFixed(0)}% vs last month`,
      className: isUp ? "text-emerald-500" : "text-rose-500"
    };
  };

  const balanceChange = getChangeMeta(currentBalance, previousBalance);
  const incomeChange = getChangeMeta(current.income, previous.income);
  const expenseChange = getChangeMeta(current.expenses, previous.expenses);
  const savingsRateChange = getChangeMeta(savingsRate, previousSavingsRate);

  const topSpending = Object.entries(
    transactions.filter((t) => t.type === "expense").reduce((acc, t) => ({ ...acc, [t.category]: (acc[t.category] || 0) + t.amount }), {})
  )
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={Landmark} title="Total Balance" value={totalIncome - totalExpense} color="from-indigo-500/10 to-indigo-500/0" index={0} subLabel={balanceChange.text} subLabelClassName={balanceChange.className} />
        <SummaryCard icon={TrendingUp} title="This Month Income" value={current.income} color="from-emerald-500/10 to-emerald-500/0" index={1} subLabel={incomeChange.text} subLabelClassName={incomeChange.className} />
        <SummaryCard icon={TrendingDown} title="This Month Expenses" value={current.expenses} color="from-rose-500/10 to-rose-500/0" index={2} subLabel={expenseChange.text} subLabelClassName={expenseChange.className} />
        <SummaryCard icon={PiggyBank} title="Savings Rate" value={savingsRate} color="from-violet-500/10 to-violet-500/0" index={3} isPercent subLabel={savingsRateChange.text} subLabelClassName={savingsRateChange.className} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <BalanceTrendChart data={monthly} />
        <SpendingDonutChart data={topSpending} />
      </div>
      <RecentTransactions transactions={[...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)} />
    </div>
  );
}
