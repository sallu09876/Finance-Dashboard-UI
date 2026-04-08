import { useLocation } from "react-router-dom";
import RoleToggle from "../ui/RoleToggle";
import ThemeToggle from "../ui/ThemeToggle";
import ProfileMenu from "./ProfileMenu";

const titles = { "/": "Dashboard", "/transactions": "Transactions", "/insights": "Insights" };

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-10 mb-6 flex flex-col gap-2 rounded-xl border border-slate-200 bg-white/85 px-2.5 py-2.5 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3 dark:border-slate-700 dark:bg-slate-800/85">
      <h1 className="text-base font-semibold text-slate-900 sm:text-xl dark:text-slate-100">{titles[pathname] || "FinSight"}</h1>
      <div className="flex w-full flex-wrap items-center justify-end gap-1.5 sm:w-auto sm:gap-3">
        <ThemeToggle />
        <RoleToggle />
        <ProfileMenu />
      </div>
    </header>
  );
}
