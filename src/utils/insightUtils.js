import { addMonths, endOfMonth, format, isWithinInterval, startOfMonth, subMonths } from "date-fns";
import { getMonthKey } from "./formatUtils";

const anchorDate = new Date();

const getLastSixMonths = () => Array.from({ length: 6 }, (_, i) => subMonths(anchorDate, 5 - i));

export function getMonthlyTotals(transactions) {
  return getLastSixMonths().map((monthDate) => {
    const from = startOfMonth(monthDate);
    const to = endOfMonth(monthDate);
    const monthTransactions = transactions.filter((txn) =>
      isWithinInterval(new Date(txn.date), { start: from, end: to })
    );
    const income = monthTransactions.filter((t) => t.type === "income").reduce((a, c) => a + c.amount, 0);
    const expenses = monthTransactions.filter((t) => t.type === "expense").reduce((a, c) => a + c.amount, 0);
    return { month: format(monthDate, "MMM yyyy"), key: format(monthDate, "yyyy-MM"), income, expenses, savings: income - expenses };
  });
}

export function getCategoryTotals(transactions, monthKey) {
  const filtered = transactions.filter((txn) => txn.type === "expense" && getMonthKey(txn.date) === monthKey);
  return filtered.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});
}

export function getHighestSpendingCategory(transactions, monthKey) {
  const totals = getCategoryTotals(transactions, monthKey);
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return { category: "No expenses", amount: 0 };
  return { category: entries[0][0], amount: entries[0][1] };
}

export function getMoMChange(transactions) {
  const current = getMonthKey(anchorDate);
  const prev = getMonthKey(addMonths(startOfMonth(anchorDate), -1));
  const currentExpenses = transactions
    .filter((t) => t.type === "expense" && getMonthKey(t.date) === current)
    .reduce((a, c) => a + c.amount, 0);
  const prevExpenses = transactions
    .filter((t) => t.type === "expense" && getMonthKey(t.date) === prev)
    .reduce((a, c) => a + c.amount, 0);
  if (prevExpenses === 0) return 0;
  return ((currentExpenses - prevExpenses) / prevExpenses) * 100;
}

export function getBestSavingsMonth(transactions) {
  const monthly = getMonthlyTotals(transactions);
  if (!monthly.length) return { month: "N/A", savings: 0 };
  return monthly.reduce((best, current) => (current.savings > best.savings ? current : best), monthly[0]);
}
