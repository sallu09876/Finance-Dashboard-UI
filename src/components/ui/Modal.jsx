import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

/**
 * Portals to document.body so `position: fixed` covers the full viewport.
 * Without this, ancestors with backdrop-filter/transform (e.g. sticky header blur)
 * trap fixed positioning to that element, so the overlay only fills the navbar.
 */
export default function Modal({ isOpen, title, onClose, children }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-y-auto overflow-x-hidden overscroll-contain bg-slate-950/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          <div
            className="flex min-h-full w-full items-start justify-center px-4 pb-10 pt-[max(1.25rem,env(safe-area-inset-top,0px))] sm:items-center sm:px-6 sm:pb-12 sm:pt-12"
            onClick={onClose}
          >
            <motion.div
              className="relative z-10 flex max-h-[min(90vh,calc(100vh-2.5rem))] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 sm:max-h-[min(90vh,calc(100vh-3rem))]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                {children}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
