import { useLocation } from "react-router-dom";
import RoleToggle from "../ui/RoleToggle";
import ThemeToggle from "../ui/ThemeToggle";
import ProfileMenu from "./ProfileMenu";

const titles = { "/": "Dashboard", "/transactions": "Transactions", "/insights": "Insights" };

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-10 mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white/85 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-800/85">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{titles[pathname] || "FinSight"}</h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <RoleToggle />
        <ProfileMenu />
      </div>
    </header>
  );
}
