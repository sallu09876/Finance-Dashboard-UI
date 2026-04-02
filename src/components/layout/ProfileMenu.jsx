import { useMemo, useState } from "react";
import { Camera, UserPen } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import ProfileModal from "./ProfileModal";

function initialsFromName(name = "") {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export default function ProfileMenu() {
  const { state } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  const initials = useMemo(() => initialsFromName(state.profile?.name), [state.profile?.name]);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="group relative h-10 w-10 overflow-hidden rounded-full border border-slate-300 bg-indigo-500 text-sm font-semibold text-white transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600"
          aria-label="Open profile menu"
        >
          {state.profile?.avatar ? (
            <img src={state.profile.avatar} alt="User avatar" className="h-full w-full object-cover" />
          ) : (
            <span>{initials || "U"}</span>
          )}
          <span className="pointer-events-none absolute inset-0 hidden place-items-center bg-slate-900/35 text-white group-hover:grid">
            <Camera size={14} />
          </span>
        </button>
        {menuOpen ? (
          <div className="absolute right-0 top-12 z-20 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="rounded-lg px-3 py-2">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{state.profile?.name}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{state.profile?.email}</p>
            </div>
            <button
              onClick={() => {
                setEditorOpen(true);
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <UserPen size={15} />
              Edit profile
            </button>
          </div>
        ) : null}
      </div>

      {editorOpen ? <ProfileModal open={editorOpen} onClose={() => setEditorOpen(false)} /> : null}
    </>
  );
}
