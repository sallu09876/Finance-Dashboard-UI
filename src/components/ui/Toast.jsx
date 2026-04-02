import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const icons = {
  success: "✓",
  error: "✗",
  info: "ℹ"
};

function ToastItem({ toast }) {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const id = toast.id;
    const t = setTimeout(() => dispatch({ type: "REMOVE_TOAST", payload: id }), 3000);
    return () => clearTimeout(t);
  }, [toast.id, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.2 }}
      className="flex min-w-[240px] max-w-[320px] items-center gap-3 rounded-xl bg-slate-800 px-4 py-3 text-sm text-white shadow-lg dark:bg-white dark:text-slate-900"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm dark:bg-slate-200">
        {icons[toast.type] ?? icons.info}
      </span>
      <p className="min-w-0 flex-1">{toast.message}</p>
      <button
        type="button"
        onClick={() => dispatch({ type: "REMOVE_TOAST", payload: toast.id })}
        className="shrink-0 rounded p-1 text-slate-300 hover:bg-white/10 dark:text-slate-600 dark:hover:bg-slate-100"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </motion.div>
  );
}

export default function ToastContainer() {
  const { state } = useAppContext();

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {state.toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
