import { BarChart2, BarChart3, LayoutDashboard, Lightbulb } from "lucide-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: BarChart3 },
  { to: "/insights", label: "Insights", icon: Lightbulb }
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="fixed left-0 top-0 z-20 hidden h-full w-64 border-r border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800 lg:block">
        <div className="mb-8 flex items-center gap-2 text-xl font-bold text-indigo-500"><BarChart2 size={20} /> FinSight</div>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${isActive ? "border-l-4 border-indigo-500 bg-indigo-500/10 text-indigo-500" : "text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"}`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <button onClick={() => setOpen((p) => !p)} className="fixed left-4 top-4 z-40 hidden rounded-lg border border-slate-300 bg-white p-2 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 md:block lg:hidden">
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      {open ? (
        <div
          role="presentation"
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 hidden bg-black/40 backdrop-blur-sm md:block lg:hidden"
        />
      ) : null}
      {open ? (
        <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 border-r border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-800 md:block lg:hidden">
          <div className="mb-8 flex items-center gap-2 text-xl font-bold text-indigo-500"><BarChart2 size={20} /> FinSight</div>
          <nav className="space-y-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${isActive ? "border-l-4 border-indigo-500 bg-indigo-500/10 text-indigo-500" : "text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"}`}>
                <Icon size={18} /> {label}
              </NavLink>
            ))}
          </nav>
        </aside>
      ) : null}
      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-3 border-t border-slate-200 bg-white px-1.5 py-1.5 dark:border-slate-700 dark:bg-slate-800 md:hidden">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `flex flex-col items-center rounded-md py-1 text-[11px] leading-none ${isActive ? "text-indigo-500" : "text-slate-500 dark:text-slate-300"}`}>
            <Icon size={15} />
            <span className="w-full truncate px-1 text-center">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
