import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import Badge from "./Badge";

export default function RoleToggle() {
  const {
    state: { role },
    dispatch
  } = useAppContext();

  const setRole = (nextRole) => dispatch({ type: "SET_ROLE", payload: nextRole });

  return (
    <div className="relative flex rounded-xl bg-slate-100 p-1 dark:bg-slate-700">
      <motion.div
        layout
        className="absolute inset-y-1 w-1/2 rounded-lg bg-indigo-500"
        animate={{ x: role === "viewer" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
      {["viewer", "admin"].map((option) => (
        <button
          key={option}
          onClick={() => setRole(option)}
          className="relative z-10 flex w-20 items-center justify-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-white sm:w-24 sm:gap-2 sm:px-3 sm:text-sm"
        >
          <span className="capitalize">{option}</span>
          <span className="hidden min-[360px]:inline-flex">
            <Badge tone={option === "admin" ? "amber" : "slate"}>{option === "admin" ? "A" : "V"}</Badge>
          </span>
        </button>
      ))}
    </div>
  );
}
