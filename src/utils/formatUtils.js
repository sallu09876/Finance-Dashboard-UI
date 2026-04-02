import { format } from "date-fns";

export const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(amount) || 0);

export const formatDate = (dateStr) => format(new Date(dateStr), "dd MMM yyyy");

export const getMonthYear = (dateStr) => format(new Date(dateStr), "MMM yyyy");

export const getMonthKey = (dateStr) => format(new Date(dateStr), "yyyy-MM");
