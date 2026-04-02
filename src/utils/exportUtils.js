import Papa from "papaparse";
import { format } from "date-fns";

const download = (blob, extension) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `transactions_export_${format(new Date(), "yyyy-MM-dd")}.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (transactions) => {
  const rows = transactions.map((txn) => ({
    Date: `'${format(new Date(txn.date), "yyyy-MM-dd")}`,
    Description: txn.description,
    Category: txn.category,
    Type: txn.type,
    Amount: txn.amount
  }));
  const csv = Papa.unparse(rows);
  const csvWithBom = `\uFEFF${csv}`;
  download(new Blob([csvWithBom], { type: "text/csv;charset=utf-8;" }), "csv");
};

export const exportToJSON = (transactions) => {
  const json = JSON.stringify(transactions, null, 2);
  download(new Blob([json], { type: "application/json;charset=utf-8;" }), "json");
};
