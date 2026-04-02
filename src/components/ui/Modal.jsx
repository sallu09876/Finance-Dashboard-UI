import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

const backdropTransition = { duration: 0.2 };
const panelTransition = { type: "tween", ease: "easeOut", duration: 0.2 };

/**
 * Portals to document.body so `position: fixed` covers the full viewport.
 * Without this, ancestors with backdrop-filter/transform (e.g. sticky header blur)
 * trap fixed positioning to that element, so the overlay only fills the navbar.
 */
export default function Modal({ isOpen, title, onClose, children }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 z-[200] bg-slate-950/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={onClose}
            role="presentation"
            aria-hidden
          />
          <motion.div
            key="modal-panel"
            className="fixed left-1/2 top-[max(1.25rem,env(safe-area-inset-top,0px))] z-[201] w-full max-w-lg -translate-x-1/2 px-4 sm:top-1/2 sm:-translate-y-1/2"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={panelTransition}
          >
            <div className="flex max-h-[min(90vh,calc(100vh-2.5rem))] flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 sm:max-h-[min(90vh,calc(100vh-3rem))]">
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                {children}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
