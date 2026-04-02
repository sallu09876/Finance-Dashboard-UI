import { useState } from "react";
import { transactionCategories } from "../../data/mockData";
import Modal from "../ui/Modal";

export default function TransactionModal({ open, onClose, onSave, initial }) {
  const isEdit = Boolean(initial);
  const defaultValues = initial || {
    description: "",
    amount: "",
    category: transactionCategories[0],
    type: "expense",
    date: new Date().toISOString().split("T")[0]
  };
  const [formState, setFormState] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSave = () => {
    const nextErrors = {};
    const desc = String(formState.description ?? "").trim();
    if (!desc) nextErrors.description = "Description is required";
    const amt = Number(formState.amount);
    if (formState.amount === "" || Number.isNaN(amt) || amt <= 0) {
      nextErrors.amount = "Enter an amount greater than 0";
    }
    if (!formState.date) nextErrors.date = "Date is required";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    const payload = {
      id: initial?.id || `txn_${Date.now()}`,
      description: desc,
      amount: amt,
      category: formState.category,
      type: formState.type,
      date: formState.date
    };
    onSave(payload);
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose} title={isEdit ? "Edit Transaction" : "Add Transaction"}>
      <div className="space-y-3">
        <div>
          <input name="description" value={formState.description} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600" placeholder="Description" />
          {errors.description ? <p className="mt-1 text-xs text-rose-500">{errors.description}</p> : null}
        </div>
        <div>
          <input type="number" name="amount" value={formState.amount} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600" placeholder="Amount" />
          {errors.amount ? <p className="mt-1 text-xs text-rose-500">{errors.amount}</p> : null}
        </div>
        <select name="category" value={formState.category} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600">
          {transactionCategories.map((cat) => <option key={cat}>{cat}</option>)}
        </select>
        <div className="flex gap-4 text-sm">
          <label><input type="radio" name="type" value="income" checked={formState.type === "income"} onChange={handleChange} /> Income</label>
          <label><input type="radio" name="type" value="expense" checked={formState.type === "expense"} onChange={handleChange} /> Expense</label>
        </div>
        <div>
          <input type="date" name="date" value={formState.date} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600" />
          {errors.date ? <p className="mt-1 text-xs text-rose-500">{errors.date}</p> : null}
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-600">Cancel</button>
          <button type="button" onClick={handleSave} className="rounded-lg bg-indigo-500 px-4 py-2 text-white">{isEdit ? "Save Changes" : "Add Transaction"}</button>
        </div>
      </div>
    </Modal>
  );
}
